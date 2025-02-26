import {Component, OnInit} from "@angular/core";
import {TokenService} from "../../core/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
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
