import { Injectable } from '@angular/core';
import { ThemeEnum } from '../../enums/theme.enum';
import { themeLocalStorage } from '../../consts/theme-localstorage.const';
import { UserInterface } from '../../interfaces/user.interface';
import { userLocalstorageConst } from '../../consts/user-localstorage.const';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	get getTheme(): string | null {
		return localStorage.getItem(themeLocalStorage) ?? null;
	}

	get getUser(): UserInterface | null {
		const userData: string | null = localStorage.getItem(userLocalstorageConst);
		return userData ? JSON.parse(userData) : null;
	}

	constructor() {}

	private applyTheme(theme: string): void {
		const htmlElement: HTMLElement = document.documentElement;

		if (theme === ThemeEnum.dark) {
			htmlElement.classList.add(ThemeEnum.dark);
		} else {
			htmlElement.classList.remove(ThemeEnum.dark);
		}
	}

	public changeTheme(theme: string | null): void {
		if (!theme) return;

		// Сохраняем тему в localStorage
		localStorage.setItem(themeLocalStorage, theme);

		// Применяем тему к документу
		this.applyTheme(theme);
	}

	public initializeTheme(): void {
		const savedTheme: string | null = this.getTheme;

		if (savedTheme) {
			this.applyTheme(savedTheme);
		} else {
			const isSystemDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
			this.changeTheme(isSystemDark ? ThemeEnum.dark : ThemeEnum.light);
		}
	}

	public setUser(user: UserInterface): void {
		localStorage.setItem(userLocalstorageConst, JSON.stringify(user));
	}
}
