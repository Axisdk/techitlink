import {Component, OnInit} from '@angular/core';
import { RouterModule} from "@angular/router";
import {LocalStorageService} from "./core/services/localstorage.service";
import {UserService} from "./core/services/user.service";
import {NotificationComponent} from "./shared/components/notification/notification.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        RouterModule,
        NotificationComponent
    ]
})
export class AppComponent implements OnInit {

  constructor(
    private _localStorageService: LocalStorageService,
    private _userService: UserService,
  ) {}

  private _initUser() {
    this._userService.initUser()
  }

  ngOnInit() {
    this._localStorageService.initializeTheme()
    this._initUser()
  }

}
