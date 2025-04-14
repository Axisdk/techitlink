import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessengerPopoverActionInterface } from '../../../core/interfaces/messenger-popover-action.interface';

@Injectable({
	providedIn: 'root',
})
export class MessagePopoverActionService {
	public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public popoverAction$: BehaviorSubject<MessengerPopoverActionInterface | null> =
		new BehaviorSubject<MessengerPopoverActionInterface | null>(null);

	constructor() {}

	public openPopover(): void {
		this.isOpen$.next(true);
	}

	public closePopover(): void {
		this.isOpen$.next(false);
	}

	public setPopoverAction(action: MessengerPopoverActionInterface): void {
		this.popoverAction$.next(action);
	}
}
