import {Component, Input} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {TokenService} from "../../../core/services/token.service";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true
})

export class MenuComponent {

  @Input() user!: UserInterface

  constructor(
    private _router: Router,
    private _userService: UserService,
  ) {}

  public logout() {
    this._userService.logout()
    this._router.navigate(['/'])
    window.location.reload();
  }

}
