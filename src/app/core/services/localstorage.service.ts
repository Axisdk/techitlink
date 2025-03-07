import {Injectable} from "@angular/core";
import {ThemeEnum} from "../enums/theme.enum";
import {themeLocalStorage} from "../consts/theme-localstorage.const";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  get getTheme(): string | null {
    return localStorage.getItem(themeLocalStorage) ?? null
  }

  constructor() {}



  public changeTheme(theme: string | null) {
    if (!theme) return;

    // Сохраняем тему в localStorage
    localStorage.setItem(themeLocalStorage, theme);

    // Применяем тему к документу
    this.applyTheme(theme);
  }

  private applyTheme(theme: string) {
    const htmlElement: HTMLElement = document.documentElement;

    if (theme === ThemeEnum.dark) {
      htmlElement.classList.add(ThemeEnum.dark);
    } else {
      htmlElement.classList.remove(ThemeEnum.dark);
    }
  }

  public initializeTheme() {
    const savedTheme = this.getTheme;

    if (savedTheme) {
      this.applyTheme(savedTheme);
    } else {
      const isSystemDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.changeTheme(isSystemDark ? ThemeEnum.dark : ThemeEnum.light);
    }
  }
}
