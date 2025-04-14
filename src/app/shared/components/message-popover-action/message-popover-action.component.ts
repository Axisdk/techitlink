import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessengerPopoverActionInterface } from '../../../core/interfaces/messenger-popover-action.interface';
import { CommonModule } from '@angular/common';
import { MessagePopoverActionService } from './message-popover-action.service';
import { ClickOutsideDirective } from '../../../core/directives/click-outside.directive';
import { MessengerService } from '../../../core/services/messanger/messenger.service';
import { NotificationTypeEnum } from '../notification/core/enums/notification-type.enum';
import { NotificationService } from '../notification/notification.service';

@Component({
	selector: 'app-message-popover-action',
	templateUrl: './message-popover-action.component.html',
	imports: [CommonModule, ClickOutsideDirective],
})
export class MessagePopoverActionComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected isOpen: WritableSignal<boolean> = signal(false);
	protected popoverActions: WritableSignal<MessengerPopoverActionInterface | null> = signal(null);
	protected popoverX: WritableSignal<number> = signal(0);
	protected popoverY: WritableSignal<number> = signal(0);

	constructor(
		private _messagePopoverActionService: MessagePopoverActionService,
		private _messengerService: MessengerService,
		private _notificationService: NotificationService,
	) {}

	private _listenPopover(): void {
		this._messagePopoverActionService.isOpen$.pipe(takeUntil(this._destroy$)).subscribe((isOpen: boolean) => {
			this.isOpen.set(isOpen);
		});
	}

	private _listenAction(): void {
		this._messagePopoverActionService.popoverAction$
			.pipe(takeUntil(this._destroy$))
			.subscribe((action: MessengerPopoverActionInterface | null) => {
				if (!action) return;
				this.popoverActions.set(action);
				this._setPopoverPosition();
			});
	}

	private _setPopoverPosition(): void {
		if (!this.popoverActions()) return;
		this.popoverX.set(this.popoverActions()?.event.pageX ?? 0);
		this.popoverY.set(this.popoverActions()?.event.pageY ?? 0);
	}

	protected close(): void {
		this._messagePopoverActionService.closePopover();
	}

	protected deleteMessage(): void {
		if (!this.popoverActions() && !this.popoverActions()?.messengerId) return;
		const isDeleted: boolean = this._messengerService.deleteMessage(this.popoverActions()?.messengerId ?? null);
		this.close();
		if (isDeleted)
			this._notificationService.showNotification({
				type: NotificationTypeEnum.success,
				title: 'Успешно',
				message: 'Сообщение удалено',
			});
		else
			this._notificationService.showNotification({
				type: NotificationTypeEnum.error,
				title: 'Ошибка',
				message: 'Не удалось удалить сообщение',
			});
	}

	protected editMessage(): void {
		if (!this.popoverActions()) return;

		this.close();
	}

	ngOnInit(): void {
		this._listenPopover();
		this._listenAction();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
