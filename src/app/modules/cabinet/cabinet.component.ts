import {Component, OnInit} from "@angular/core";
import {TokenService} from "../../core/services/token.service";
import {Router} from "@angular/router";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {TopLineComponent} from "../../shared/components/top-line/top-line.component";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  imports: [
    MenuComponent,
    TopLineComponent
  ],
  standalone: true
})

export class CabinetComponent implements OnInit {

  constructor(
    private _router: Router,
    private _tokenService: TokenService
  ) {}

  public checkToken() {
    if (!this._tokenService.getToken()) {
      this._tokenService.clearStorage()
      this._router.navigate(['/auth']).then()
    }
  }


  ngOnInit() {
    this.checkToken()
  }
}
