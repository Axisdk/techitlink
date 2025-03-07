import {Component} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {TokenService} from "../../../core/services/token.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true
})

export class MenuComponent {

  constructor(
    private _router: Router,
  ) {}

  public logOut() {
    localStorage.clear()
    this._router.navigate(['/'])
    window.location.reload();
  }

}
