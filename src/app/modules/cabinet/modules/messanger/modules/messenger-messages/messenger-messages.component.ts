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
import { Subject, takeUntil } from 'rxjs';
import { MessengerInterface } from '../../../../../../core/interfaces/messenger.interface';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessengerService } from '../../../../../../core/services/messanger/messenger.service';
import { NotificationService } from '../../../../../../shared/components/notification/notification.service';
import { NotificationTypeEnum } from '../../../../../../shared/components/notification/core/enums/notification-type.enum';
import { MessageComponent } from '../../../../../../shared/components/message/message.component';
import { MessengerHelperService } from '../../../../../../core/services/messanger/messenger-helper.service';
import { CompanionInterface } from '../../../../../../core/interfaces/companion.interface';
import { UserRoleBadgeComponent } from '../../../../../../shared/components/user-role-badge/user-role-badge.component';

@Component({
	selector: 'app-messenger-messages',
	templateUrl: './messenger-messages.component.html',
	imports: [MessageComponent, ReactiveFormsModule, UserRoleBadgeComponent],
})
export class MessengerMessagesComponent implements OnInit, OnDestroy, AfterViewChecked {
	@ViewChild('messageContainer') private _messageContainer!: ElementRef;

	private _destroy$: Subject<void> = new Subject<void>();

	protected form!: FormGroup;

	protected message: WritableSignal<MessengerInterface | null> = signal(null);
	protected isLoadingPages: WritableSignal<boolean> = signal(false);
	protected isLoading: WritableSignal<boolean> = signal(false);
	protected isLoadingMessage: WritableSignal<boolean> = signal(false);

	protected companion!: CompanionInterface | null;

	constructor(
		private _messengerService: MessengerService,
		private _messengerHelperService: MessengerHelperService,
		private _formBuilder: FormBuilder,
		private _notificationService: NotificationService,
	) {}

	private _scrollToBottom(): void {
		if (this.isLoadingMessage()) return;
		const msg: MessengerInterface | null = this.message();
		if (!msg || msg.messages.length <= 8) return;
		this._messageContainer.nativeElement.scrollTop = this._messageContainer.nativeElement.scrollHeight;
	}

	private _initForm(): void {
		this.form = this._formBuilder.group({
			message: [null, [Validators.required]],
		});
	}

	private _getCompanion(): void {
		this._messengerService.companion$
			.pipe(takeUntil(this._destroy$))
			.subscribe((companion: CompanionInterface | null) => {
				this.companion = companion;
				this.form.reset();
			});
	}

	private _loadMessenger(): void {
		this.isLoading.set(true);

		this._messengerService.messenger$
			.pipe(takeUntil(this._destroy$))
			.subscribe((messenger: MessengerInterface | null) => {
				this.message.set(messenger);
				this.isLoading.set(false);
				this._scrollToBottom();
			});
	}

	protected getCompanionName(companion: CompanionInterface): string {
		return this._messengerHelperService.getFullNameCompanion(companion);
	}

	protected sendMessage(): void {
		const currentMessage: MessengerInterface | null = this.message();
		if (!currentMessage) return;

		const errorEvent = (): void => {
			this.isLoadingMessage.set(false);
			this.form.reset();
			this.form.get('message')?.enable();
			this._notificationService.showNotification({
				type: NotificationTypeEnum.error,
				title: 'Ошибка',
				message: 'Ошибка в отправке сообщения, неправильный формат текста',
			});
		};

		this.isLoadingMessage.set(true);
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
		this.isLoadingMessage.set(false);
		formControl.enable();
		this.form.reset();
	}

	ngOnInit(): void {
		this.isLoadingPages.set(true);

		setTimeout(() => {
			this.isLoadingPages.set(false);
		}, 1500);
		this._initForm();
		this._loadMessenger();
		this._getCompanion();
	}

	ngAfterViewChecked(): void {
		this._scrollToBottom();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
		this._messengerService.messengers$.next(null);
		this._messengerService.messenger$.next(null);
		this._messengerService.companion$.next(null);
	}
}
