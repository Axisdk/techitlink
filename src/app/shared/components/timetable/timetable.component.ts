import {Component, Input, OnInit} from "@angular/core";
import {TimeTableInterface} from "../../../core/interfaces/time-table.interface";
import {NgForOf, NgIf} from "@angular/common";
import {ProgressComponent} from "../progress/progress.component";
import {CardComponent} from "../card/card.component";

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    imports: [
        NgForOf,
        ProgressComponent,
        CardComponent,
    ]
})

export class TimetableComponent implements OnInit {

  @Input() tablePosition!: TimeTableInterface[]

  public isLoading: boolean = false

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true

    setTimeout(() => {
      if (!this.tablePosition) return
      this.isLoading = false
    }, 3000)
  }

}
