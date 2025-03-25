import {Component} from '@angular/core';
import { RouterModule} from "@angular/router";
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
export class AppComponent {

  constructor() {}

}
