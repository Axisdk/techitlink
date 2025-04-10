import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessengerPopoverService } from './messenger-popover.service';
import { MessengerPopoverActionInterface } from '../../../core/interfaces/messenger-popover-action.interface';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../core/directives/click-outside.directive';
import { MessengerService } from '../../../core/services/messanger/messenger.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationTypeEnum } from '../notification/core/enums/notification-type.enum';

@Component({
	selector: 'app-messenger-popover',
	templateUrl: './messenger-popover.component.html',
	imports: [CommonModule, ClickOutsideDirective],
})
export class MessengerPopoverComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected isOpen: WritableSignal<boolean> = signal(false);
	protected popoverActions: WritableSignal<MessengerPopoverActionInterface | null> = signal(null);
	protected popoverX: WritableSignal<number> = signal(0);
	protected popoverY: WritableSignal<number> = signal(0);

	constructor(
		private _messengerPopoverService: MessengerPopoverService,
		private _messengerService: MessengerService,
		private _notificationService: NotificationService,
	) {}

	private _listenPopover(): void {
		this._messengerPopoverService.isOpen$.pipe(takeUntil(this._destroy$)).subscribe((isOpen: boolean) => {
			this.isOpen.set(isOpen);
		});
	}

	private _listenAction(): void {
		this._messengerPopoverService.popoverAction$
			.pipe(takeUntil(this._destroy$))
			.subscribe((action: MessengerPopoverActionInterface | null) => {
				if (!action) return;
				this.popoverActions.set(action);
				this._setPopoverPosition();
			});
	}

	private _setPopoverPosition(): void {
		if (!this.popoverActions()) return;
		this.popoverX.set(this.popoverActions()?.event.clientX ?? 0);
		this.popoverY.set(this.popoverActions()?.event.clientY ?? 0);
	}

	protected close(): void {
		this._messengerPopoverService.closePopover();
	}

	protected cleanMessenger(): void {
		if (!this.popoverActions()) return;

		const isCleaned: boolean = this._messengerService.cleanMessenger(this.popoverActions()?.messengerId);

		if (isCleaned)
			this._notificationService.showNotification({
				type: NotificationTypeEnum.success,
				title: 'Успешно',
				message: 'Вы очистили диалог',
			});
		else
			this._notificationService.showNotification({
				type: NotificationTypeEnum.error,
				title: 'Ошибка',
				message: 'Не удалось получить Id диалога',
			});

		this.close();
	}

	protected deleteMessenger(): void {
		if (!this.popoverActions()) return;
		const isDeleted: boolean = this._messengerService.deleteMessenger(this.popoverActions()?.messengerId);

		if (isDeleted)
			this._notificationService.showNotification({
				type: NotificationTypeEnum.success,
				title: 'Успешно',
				message: 'Вы удалили диалог',
			});
		else
			this._notificationService.showNotification({
				type: NotificationTypeEnum.error,
				title: 'Ошибка',
				message: 'Не удалось удалить диалог',
			});

		this.close();
	}

	protected reportMessenger(): void {
		this._notificationService.showNotification({
			type: NotificationTypeEnum.success,
			title: 'Успешно',
			message: 'Вы отправили жалобу на диалог',
		});

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
