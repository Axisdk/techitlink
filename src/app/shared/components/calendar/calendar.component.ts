import {Component} from "@angular/core";
import {CardComponent} from "../card/card.component";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  imports: [CardComponent],
  standalone: true
})
export class CalendarComponent {

  constructor() {}

}
