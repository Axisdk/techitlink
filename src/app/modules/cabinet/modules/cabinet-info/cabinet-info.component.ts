import {Component, OnInit} from "@angular/core";
import {TimetableComponent} from "../../../../shared/components/timetable/timetable.component";
import {TimeTableInterface} from "../../../../core/interfaces/time-table.interface";
import {TimeTableMocks} from "../../../../mocks/time-table.mocks";
import {MiniMessengerComponent} from "../../../../shared/components/mini-messanger/mini-messenger.component";
import {MiniMessengerMocks} from "../../../../mocks/mini-messenger.mocks";
import {MessengerInterface} from "../../../../core/interfaces/messenger.interface";
import {Subject, takeUntil} from "rxjs";
import {UserInterface} from "../../../../core/interfaces/user.interface";
import {UserService} from "../../../../core/services/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cabinet-info',
  templateUrl: './cabinet-info.component.html',
  imports: [
    TimetableComponent,
    MiniMessengerComponent,
    NgIf
  ],
  standalone: true
})

export class CabinetInfoComponent implements OnInit {

  protected readonly tablePosition: TimeTableInterface[] = TimeTableMocks

  public destroy$: Subject<void> = new Subject<void>();
  public user!: UserInterface | null;

  constructor(
    private _userService: UserService,
  ) {}

  ngOnInit() {
    this._userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null) => {
        this.user = user;
      })
  }

}
