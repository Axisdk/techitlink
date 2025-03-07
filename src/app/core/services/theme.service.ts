import {Injectable} from "@angular/core";
import {ThemeEnum} from "../enums/theme.enum";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  protected readonly themeEnum = ThemeEnum

  public currentTheme$: BehaviorSubject<ThemeEnum> = new BehaviorSubject<ThemeEnum>(ThemeEnum.light)

  get currentTheme() {
    return this._localstorageService.getTheme
  }

  constructor(
    private _localstorageService: LocalStorageService,
  ) {}

  public toggleTheme() {
    const newTheme: ThemeEnum = this.currentTheme$.value === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light
    this.currentTheme$.next(newTheme)
    this._localstorageService.changeTheme(this.currentTheme$.value)
    console.log(this.currentTheme$.value)
  }

}
