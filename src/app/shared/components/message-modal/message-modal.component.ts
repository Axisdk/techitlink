import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessengerInterface } from '../../../core/interfaces/messenger.interface';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalService } from './message-modal.service';
import { MessageComponent } from '../message/message.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../../../core/interfaces/user.interface';
import { MessengerService } from '../../../core/services/messanger/messenger.service';
import { MessageInterface } from '../../../core/interfaces/message.interface';
import { UserService } from '../../../core/services/user/user.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationTypeEnum } from '../notification/core/enums/notification-type.enum';

@Component({
	selector: 'app-message-modal',
	templateUrl: './message-modal.component.html',
	imports: [MessageComponent, ReactiveFormsModule],
})
export class MessageModalComponent implements OnInit, OnDestroy, AfterViewChecked {
	@ViewChild('messageContainer') private _messageContainer!: ElementRef;

	protected destroy$: Subject<void> = new Subject<void>();

	protected message!: MessengerInterface;
	protected companion!: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'> | null;
	protected formGroup!: FormGroup;
	protected isOpen: boolean = false;
	protected isLoading: boolean = false;

	constructor(
		private _messageModalService: MessageModalService,
		private _messengerService: MessengerService,
		private _userService: UserService,
		private _formBuilder: FormBuilder,
		private _notificationService: NotificationService,
	) {}

	private _scrollToBottom(): void {
		if (!this.isOpen) return;
		try {
			this._messageContainer.nativeElement.scrollTop = this._messageContainer.nativeElement.scrollHeight;
		} catch (err) {
			console.error('Ошибка при прокрутке:', err);
		}
	}

	private _initForm(): void {
		this.formGroup = this._formBuilder.group({
			message: ['', [Validators.required]],
		});
	}

	private _checkIsOpenModal(): void {
		this._messageModalService.isOpen$.pipe(takeUntil(this.destroy$)).subscribe((isOpen: boolean) => {
			this.isOpen = isOpen;
		});
	}

	private _getMessages(): void {
		this._messageModalService.message$
			.pipe(takeUntil(this.destroy$))
			.subscribe((message: MessengerInterface | null) => {
				if (!message) return;
				this.message = message;

				setTimeout(() => {
					this._scrollToBottom();
				}, 0);
			});
	}

	private _getCompanionDialog(): void {
		this._messageModalService.companion$
			.pipe(takeUntil(this.destroy$))
			.subscribe((companion: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'> | null) => {
				if (!companion) return;
				this.companion = companion;

				setTimeout(() => {
					this._scrollToBottom();
				}, 0);
			});
	}

	private _setMessage(message: string): MessageInterface {
		return {
			id: new Date().getTime(),
			senderId: this._userService.getIdThisUser() ?? 0,
			message: message,
		};
	}

	public toggleModal(): void {
		this._messageModalService.toggleModal();
	}

	public sendMessage(): void {
		this.isLoading = true;
		this.formGroup.get('message')?.disabled;

		setTimeout(() => {
			if (!this.formGroup.valid) {
				this.isLoading = false;
				this._notificationService.showNotification({
					type: NotificationTypeEnum.error,
					title: 'Ошибка',
					message: 'Ошибка в отправке сообщения, неправильный формат текста',
				});
				return;
			}

			this._messengerService.sendMessage(this.message.id, this._setMessage(this.formGroup.value.message));
			this.isLoading = false;
			this.formGroup.get('message')?.enable();
			this.formGroup.reset();
			this._scrollToBottom();
		}, 1000);
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
	}
}
