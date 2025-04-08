import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../../../core/interfaces/user.interface';
import { UserService } from '../../../core/services/user/user.service';

@Injectable({
	providedIn: 'root',
})
export class FindUserService {
	public users$: BehaviorSubject<UserInterface[] | undefined> = new BehaviorSubject<UserInterface[] | undefined>(
		undefined,
	);
	public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private _userService: UserService) {}

	private shuffleArray(array: UserInterface[]): UserInterface[] {
		const newArray: UserInterface[] = [...array];
		for (let i: number = newArray.length - 1; i > 0; i--) {
			const j: number = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	}

	public toggleModal(): void {
		this.isOpen$.next(!this.isOpen$.value);
	}

	public getUsers(name: string | null): void {
		const users: UserInterface[] = this._userService
			.getUsers()
			.filter((user: UserInterface) => user.id !== this._userService.getIdThisUser());
		let foundUsers: UserInterface[] = [];

		if (name) {
			foundUsers = users.filter((user: UserInterface) => {
				const fullNameUser: string = `${user.fname}${user.lname}`;
				return fullNameUser.toLowerCase().trim().includes(name.toLowerCase().trim());
			});
		} else {
			foundUsers = [...users];
		}

		this.users$.next(this.shuffleArray(foundUsers));
	}
}
