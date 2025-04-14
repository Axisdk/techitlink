import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageInterface } from '../../../core/interfaces/message.interface';
import { UserInterface } from '../../../core/interfaces/user.interface';
import { UserService } from '../../../core/services/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { MessagePopoverActionService } from '../message-popover-action/message-popover-action.service';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	standalone: true,
})
export class MessageComponent implements OnInit, OnDestroy {
	@Input() message!: MessageInterface;

	private _destroy$: Subject<void> = new Subject<void>();

	protected user!: UserInterface;

	constructor(
		private _userService: UserService,
		private _messagePopoverActionService: MessagePopoverActionService,
	) {}

	protected openPopover(event: MouseEvent, messengerId: number): void {
		event.preventDefault();
		this._messagePopoverActionService.openPopover();
		this._messagePopoverActionService.setPopoverAction({ event, messengerId });
	}

	ngOnInit(): void {
		this._userService.user$.pipe(takeUntil(this._destroy$)).subscribe((user: UserInterface | null) => {
			if (!user) return;
			this.user = user;
		});
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
