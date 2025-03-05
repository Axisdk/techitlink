import {Component} from "@angular/core";
import {TimetableComponent} from "../../../../shared/components/timetable/timetable.component";
import {TimeTableInterface} from "../../../../core/interfaces/time-table.interface";
import {TimeTableMocks} from "../../../../mocks/time-table.mocks";

@Component({
  selector: 'app-cabinet-info',
  templateUrl: './cabinet-info.component.html',
  imports: [
    TimetableComponent
  ],
  standalone: true
})

export class CabinetInfoComponent {

  protected readonly tablePosition: TimeTableInterface[] = TimeTableMocks

  constructor() {}

}
