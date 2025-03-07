import {Component, Input} from "@angular/core";
import {TimeTableInterface} from "../../../core/interfaces/time-table.interface";
import {NgForOf} from "@angular/common";
import {ProgressComponent} from "../progress/progress.component";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  imports: [
    NgForOf,
    ProgressComponent,
    CardComponent
  ],
  standalone: true
})

export class TimetableComponent {

  @Input() tablePosition!: TimeTableInterface[]

  constructor() {}

}
