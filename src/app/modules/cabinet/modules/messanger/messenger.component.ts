import { Component, OnDestroy } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { MessengerMessagesComponent } from './modules/messenger-messages/messenger-messages.component';
import { Subject } from 'rxjs';
import { FindUserComponent } from '../../../../shared/components/find-user/find-user.component';
import { MessengerUsersComponent } from './modules/messenger-users/messenger-users.component';
import { MessengerPopoverService } from '../../../../shared/components/messenger-popover/messenger-popover.service';
import { MessagePopoverActionComponent } from '../../../../shared/components/message-popover-action/message-popover-action.component';

@Component({
	selector: 'app-messenger-module',
	templateUrl: './messenger.component.html',
	imports: [
		CardComponent,
		MessengerUsersComponent,
		MessengerMessagesComponent,
		FindUserComponent,
		MessagePopoverActionComponent,
	],
	providers: [MessengerPopoverService],
})
export class MessengerModuleComponent implements OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	constructor() {}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
