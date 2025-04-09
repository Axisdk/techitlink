import {
	AfterViewChecked,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	signal,
	ViewChild,
	WritableSignal,
} from '@angular/core';
import { MessengerInterface } from '../../../core/interfaces/messenger.interface';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalService } from './message-modal.service';
import { MessageComponent } from '../message/message.component';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MessengerService } from '../../../core/services/messanger/messenger.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationTypeEnum } from '../notification/core/enums/notification-type.enum';
import { MessengerHelperService } from '../../../core/services/messanger/messenger-helper.service';
import { CompanionInterface } from '../../../core/interfaces/companion.interface';
import { UserRoleBadgeComponent } from '../user-role-badge/user-role-badge.component';

@Component({
	selector: 'app-message-modal',
	templateUrl: './message-modal.component.html',
	imports: [MessageComponent, ReactiveFormsModule, UserRoleBadgeComponent],
})
export class MessageModalComponent implements OnInit, OnDestroy, AfterViewChecked {
	@ViewChild('messageContainer') private _messageContainer!: ElementRef;

	protected destroy$: Subject<void> = new Subject<void>();

	protected companion!: CompanionInterface | null;
	protected form!: FormGroup;
	protected message: WritableSignal<MessengerInterface | undefined> = signal(undefined);
	protected isOpen: WritableSignal<boolean> = signal(false);
	protected isLoading: WritableSignal<boolean> = signal(false);

	get userName(): string {
		if (!this.companion) return '';
		return this._messengerHelperService.getFullNameCompanion(this.companion);
	}

	constructor(
		private _messageModalService: MessageModalService,
		private _messengerService: MessengerService,
		private _messengerHelperService: MessengerHelperService,
		private _formBuilder: FormBuilder,
		private _notificationService: NotificationService,
	) {}

	private _scrollToBottom(): void {
		if (!this.isOpen()) return;
		this._messageContainer.nativeElement.scrollTop = this._messageContainer.nativeElement.scrollHeight;
	}

	private _initForm(): void {
		this.form = this._formBuilder.group({
			message: ['', [Validators.required]],
		});
	}

	private _checkIsOpenModal(): void {
		this._messageModalService.isOpen$.pipe(takeUntil(this.destroy$)).subscribe((isOpen: boolean) => {
			if (!isOpen) this._messengerService.messenger$.next(null);
			this.isOpen.set(isOpen);
		});
	}

	private _getMessages(): void {
		this._messengerService.messenger$
			.pipe(takeUntil(this.destroy$))
			.subscribe((message: MessengerInterface | null) => {
				if (!message) return;
				this.message.set(message);

				setTimeout(() => {
					this._scrollToBottom();
				}, 0);
			});
	}

	private _getCompanionDialog(): void {
		this._messengerService.companion$
			.pipe(takeUntil(this.destroy$))
			.subscribe((companion: CompanionInterface | null) => {
				if (!companion) return;
				this.companion = companion;

				setTimeout(() => {
					this._scrollToBottom();
				}, 0);
			});
	}

	protected toggleModal(): void {
		this._messageModalService.toggleModal();
	}

	protected sendMessage(): void {
		const currentMessage: MessengerInterface | undefined = this.message();
		if (!currentMessage) return;

		const errorEvent = (): void => {
			this.isLoading.set(false);
			this.form.reset();
			this.form.get('message')?.enable();
			this._notificationService.showNotification({
				type: NotificationTypeEnum.error,
				title: 'Ошибка',
				message: 'Ошибка в отправке сообщения, неправильный формат текста',
			});
		};

		this.isLoading.set(true);
		const formControl: AbstractControl<string, string> | null = this.form.get('message');
		if (!formControl) return;

		formControl.disable();

		const message: string = formControl.value;
		if (!message || !message.length) {
			errorEvent();
			return;
		}

		if (this.form.valid) {
			errorEvent();
			return;
		}

		this._messengerService.sendMessage(currentMessage.id, this._messengerHelperService.setMessage(message));
		this.isLoading.set(false);
		formControl.enable();
		this.form.reset();
	}

	ngOnInit(): void {
		this._initForm();
		this._checkIsOpenModal();
		this._getMessages();
		this._getCompanionDialog();
	}

	ngAfterViewChecked(): void {
		this._scrollToBottom();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
		this._messengerService.messenger$.next(null);
	}
}
