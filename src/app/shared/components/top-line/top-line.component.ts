import {Component, OnDestroy, OnInit} from "@angular/core";
import {ThemeEnum} from "../../../core/enums/theme.enum";
import {ThemeService} from "../../../core/services/theme.service";
import {Subject} from "rxjs";

@Component({
    selector: 'app-top-line',
    templateUrl: './top-line.component.html'
})

export class TopLineComponent implements OnInit, OnDestroy {

  protected readonly themeEnum = ThemeEnum

  private _destroy$: Subject<void> = new Subject<void>()

  public currentTheme: string | null = ThemeEnum.light

  constructor(
    private _themeService: ThemeService
  ) {}

  public toggleTheme() {
    this._themeService.toggleTheme()
    this.getTheme()
  }

  private getTheme() {
    this.currentTheme = this._themeService.currentTheme ?? null
  }

  ngOnInit() {
    this.getTheme()
  }

  ngOnDestroy() {
    this._destroy$.next()
    this._destroy$.complete()
  }


}
