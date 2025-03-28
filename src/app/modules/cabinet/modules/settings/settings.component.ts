import {Component, OnDestroy, OnInit, signal, WritableSignal} from "@angular/core";
import {CardComponent} from "../../../../shared/components/card/card.component";
import {UserInterface} from "../../../../core/interfaces/user.interface";
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../../../../core/services/user/user.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  imports: [
    CardComponent
  ]
})
export class SettingsComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  protected user: WritableSignal<UserInterface | undefined> = signal(undefined)

  constructor(
    private _userService: UserService,
  ) {}

  private _initUser(): void {
    this._userService.user$
      .pipe(takeUntil(this._destroy$))
      .subscribe((user: UserInterface | null) => {
        if(!user) return
        this.user.set(user)
      })
  }

  ngOnInit(): void {
    this._initUser()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
