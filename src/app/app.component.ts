import {Component, OnInit} from '@angular/core';
import { RouterModule} from "@angular/router";
import {NotificationComponent} from "./shared/components/notification/notification.component";
import {LocalStorageService} from "./core/services/localstorage/localstorage.service";
import {userMocks} from "./mocks/user.mocks";
import {UserInterface} from "./core/interfaces/user.interface";

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
  ) {}

  ngOnInit() {
    this._localStorageService.initializeTheme()
  }

}
