import {Component} from "@angular/core";
import {TimetableComponent} from "../../../../shared/components/timetable/timetable.component";
import {TimeTableInterface} from "../../../../core/interfaces/time-table.interface";
import {TimeTableMocks} from "../../../../mocks/time-table.mocks";
import {MiniMessengerComponent} from "../../../../shared/components/mini-messanger/mini-messenger.component";

@Component({
  selector: 'app-cabinet-info',
  templateUrl: './cabinet-info.component.html',
  imports: [
    TimetableComponent,
    MiniMessengerComponent
  ],
  standalone: true
})

export class CabinetInfoComponent {

  protected readonly tablePosition: TimeTableInterface[] = TimeTableMocks
  protected readonly userMessages = 123

  constructor() {}

}
