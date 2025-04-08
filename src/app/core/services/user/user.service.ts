import { Injectable } from '@angular/core';
import { userLocalstorageConst } from '../../consts/user-localstorage.const';
import { AuthInterface } from '../../interfaces/auth.interface';
import { userMocks } from '../../../mocks/user.mocks';
import { UserInterface } from '../../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	protected readonly userMocks: UserInterface[] = userMocks;

	public user$: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

	constructor(private _localStorageService: LocalStorageService) {}

	private _changeUserInLocalStorage(updatedUser: UserInterface): void {
		const users: UserInterface[] = this.getUsers();
		const updatedUsers: UserInterface[] = users.map(
			(user: UserInterface): UserInterface => (user.id === updatedUser.id ? updatedUser : user),
		);

		localStorage.setItem('users', JSON.stringify(updatedUsers));
	}

	public getUsers(): UserInterface[] {
		const usersJson: string | null = localStorage.getItem('users');

		if (!usersJson) {
			const defaultUsers: string = JSON.stringify(this.userMocks);
			localStorage.setItem('users', defaultUsers);
			return this.userMocks;
		}

		return JSON.parse(usersJson) || this.userMocks;
	}

	public checkAuthUser(): boolean {
		const user: UserInterface | null = this._localStorageService.getUser ?? null;
		if (!user) {
			this.logout();
			return false;
		}

		this.user$.next(user);
		return true;
	}

	public setUser(userData: AuthInterface): void {
		localStorage.setItem(userLocalstorageConst, JSON.stringify(userData));
	}

	public getUser(id: number): UserInterface | null {
		const foundUser: UserInterface | undefined = this.userMocks.find(
			(user: UserInterface): boolean => user.id === id,
		);
		if (!foundUser) return null;

		return foundUser;
	}

	public getIdThisUser(): number | null {
		return this.user$.value?.id ?? null;
	}

	public authUser(userData: AuthInterface): boolean {
		if (!userData) return false;

		const foundUser: UserInterface | undefined = this.getUsers().find((user: UserInterface) => {
			return user.email === userData.email && user.password === userData.password;
		});

		if (foundUser) {
			this._localStorageService.setUser(foundUser);
			this.user$.next(foundUser);
			return true;
		}

		return false;
	}

	public changeUserData(user: Partial<UserInterface>): boolean {
		const thisUser: UserInterface | null = this.user$.value;
		if (!thisUser) return false;

		const updatedUser: UserInterface = { ...thisUser, ...user };

		this._changeUserInLocalStorage(updatedUser);
		this._localStorageService.setUser(updatedUser);
		this.user$.next(updatedUser);

		return true;
	}

	public logout(): void {
		localStorage.removeItem(userLocalstorageConst);
	}
}
