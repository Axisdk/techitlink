import {Component, OnDestroy, OnInit} from "@angular/core";
import {TokenService} from "../../core/services/token.service";
import {Router, RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {TopLineComponent} from "../../shared/components/top-line/top-line.component";
import {MessageModalComponent} from "../../shared/components/message-modal/message-modal.component";
import {BehaviorSubject, Subject, take, takeUntil} from "rxjs";
import {UserInterface} from "../../core/interfaces/user.interface";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  imports: [
    MenuComponent,
    TopLineComponent,
    RouterOutlet,
    MessageModalComponent
  ],
  standalone: true
})

export class CabinetComponent implements OnInit {

  public destroy$: Subject<void> = new Subject<void>();
  public user!: UserInterface;

  constructor(
    private _router: Router,
    private _tokenService: TokenService,
    private _userService: UserService
  ) {}

  public checkToken() {
    if (!this._tokenService.getToken()) {
      this._router.navigate(['/auth']).then()
    }
  }

  ngOnInit() {
    this.checkToken()

    this._userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null) => {
        if (!user) return
        this.user = user
      })
  }

}
