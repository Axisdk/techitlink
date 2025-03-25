import {Component, Input, OnInit} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {UserService} from "../../../core/services/user/user.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    imports: [
        NgIf
    ]
})

export class MenuComponent implements OnInit {

  @Input() user!: UserInterface

  public isLoading: boolean = false

  constructor(
    private _router: Router,
    private _userService: UserService,
  ) {}

  public logout() {
    this._userService.logout()
    this._router.navigate(['/']).then()
    window.location.reload();
  }

  ngOnInit() {
    this.isLoading = true

    setTimeout(() => {
      if(!this.user) return
      this.isLoading = false
    }, 3000)
  }

}
