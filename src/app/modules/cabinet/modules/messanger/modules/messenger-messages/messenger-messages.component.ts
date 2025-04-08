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

@Component({
	selector: 'app-messenger-messages',
	templateUrl: './messenger-messages.component.html',
	imports: [MessageComponent, ReactiveFormsModule],
})
export class MessengerMessagesComponent implements OnInit, OnDestroy, AfterViewChecked {
	@ViewChild('messageContainer') private _messageContainer!: ElementRef;

	private _destroy$: Subject<void> = new Subject<void>();

	protected form!: FormGroup;

	protected message: WritableSignal<MessengerInterface | null> = signal(null);
	protected isLoadingPages: WritableSignal<boolean> = signal(false);
	protected isLoading: WritableSignal<boolean> = signal(false);
	protected isLoadingMessage: WritableSignal<boolean> = signal(false);

	protected companion!: CompanionInterface;

	constructor(
		private _messengerService: MessengerService,
		private _messengerHelperService: MessengerHelperService,
		private _formBuilder: FormBuilder,
		private _notificationService: NotificationService,
	) {}

	private _scrollToBottom(): void {
		if (!this.isLoadingMessage()) return;
		this._messageContainer.nativeElement.scrollTop = this._messageContainer.nativeElement.scrollHeight;
	}

	private _initForm(): void {
		this.form = this._formBuilder.group({
			message: ['', [Validators.required]],
		});
	}

	private _getCompanion(): void {
		this._messengerService.companion$
			.pipe(takeUntil(this._destroy$))
			.subscribe((companion: CompanionInterface | null) => {
				if (!companion) return;
				this.companion = companion;
			});
	}

	private _loadMessenger(): void {
		this.isLoading.set(true);
		this._messengerService.messenger$
			.pipe(takeUntil(this._destroy$))
			.subscribe((messenger: MessengerInterface | null) => {
				if (!messenger) return;
				setTimeout(() => {
					this.message.set(messenger);
					this.isLoading.set(false);
				}, 1000);
			});
	}

	protected getCompanionName(companion: CompanionInterface): string {
		return this._messengerHelperService.getFullNameCompanion(companion);
	}

	protected sendMessage(): void {
		const currentMessage: MessengerInterface | null = this.message();
		if (!currentMessage) return;

		this.isLoadingMessage.set(true);
		const formControl: AbstractControl<string, string> | null = this.form.get('message');
		if (!formControl) return;

		formControl.disable();

		setTimeout(() => {
			if (!this.form.valid) {
				this.isLoadingMessage.set(false);
				this._notificationService.showNotification({
					type: NotificationTypeEnum.error,
					title: 'Ошибка',
					message: 'Ошибка в отправке сообщения, неправильный формат текста',
				});
				return;
			}

			this._messengerService.sendMessage(
				currentMessage.id,
				this._messengerHelperService.setMessage(formControl.value),
			);
			this.isLoadingMessage.set(false);
			this.form.get('message')?.enable();
			this.form.reset();
			this._scrollToBottom();
		}, 1000);
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
		this._messengerService.messenger$.next(null);
	}
}
