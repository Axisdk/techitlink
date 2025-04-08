import { Injectable } from '@angular/core';
import { UserInterface } from '../../interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class UserHelperService {
	constructor() {}

	public getUserName(user: UserInterface | null): string {
		if (!user) return '';
		return `${user.lname + ' ' + user.fname}`;
	}
}
