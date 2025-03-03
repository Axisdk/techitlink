import {Injectable} from "@angular/core";
import {ThemeEnum} from "../enums/theme.enum";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  protected readonly themeEnum = ThemeEnum

  public currentTheme$: BehaviorSubject<ThemeEnum> = new BehaviorSubject<ThemeEnum>(ThemeEnum.light)

  constructor() {}

  public toggleTheme() {
    const newTheme = this.currentTheme$.value === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light
    this.currentTheme$.next(newTheme)
  }

}
