import {Injectable} from "@angular/core";
import {ThemeEnum} from "../../enums/theme.enum";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "../localstorage/localstorage.service";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  public currentTheme$: BehaviorSubject<ThemeEnum> = new BehaviorSubject<ThemeEnum>(ThemeEnum.light)

  constructor(
    private _localstorageService: LocalStorageService,
  ) {}

  public initTheme(): void {
    this.currentTheme$.next(this._localstorageService.getTheme as ThemeEnum)
  }

  public toggleTheme(): void {
    const newTheme: ThemeEnum = this.currentTheme$.value === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light
    this.currentTheme$.next(newTheme)
    this._localstorageService.changeTheme(this.currentTheme$.value)
  }

}
