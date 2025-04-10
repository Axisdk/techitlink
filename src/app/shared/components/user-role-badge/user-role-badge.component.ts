import { Component, Input } from '@angular/core';
import { UserRoleEnum } from '../../../core/enums/user-role.enum';

@Component({
	selector: 'app-user-role-badge',
	templateUrl: './user-role-badge.component.html',
})
export class UserRoleBadgeComponent {
	protected readonly userRoleEnum = UserRoleEnum;

	@Input() role!: UserRoleEnum | undefined;

	constructor() {}
}
