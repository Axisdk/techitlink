import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {LocalStorageService} from "./core/services/localstorage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterModule
  ],
  standalone: true,
})
export class AppComponent implements OnInit {

  constructor(
    private _localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this._localStorageService.initializeTheme()
  }

}
