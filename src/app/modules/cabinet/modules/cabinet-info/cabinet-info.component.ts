import {Component, OnInit} from "@angular/core";
import {RatingTableComponent} from "../../../../shared/components/rating-table/rating-table.component";
import {TimeTableInterface} from "../../../../core/interfaces/time-table.interface";
import {TimeTableMocks} from "../../../../mocks/time-table.mocks";
import {MiniMessengerComponent} from "../../../../shared/components/mini-messanger/mini-messenger.component";
import {Subject, takeUntil} from "rxjs";
import {UserInterface} from "../../../../core/interfaces/user.interface";
import {UserService} from "../../../../core/services/user.service";
import {NewsComponent} from "../../../../shared/components/news/news.component";

@Component({
    selector: 'app-cabinet-info',
    templateUrl: './cabinet-info.component.html',
    imports: [
        RatingTableComponent,
        MiniMessengerComponent,
        NewsComponent
    ]
})

export class CabinetInfoComponent implements OnInit {

  public destroy$: Subject<void> = new Subject<void>();
  public user!: UserInterface | null;
  public isLoading: boolean = false

  constructor(
    private _userService: UserService,
  ) {}

  ngOnInit() {
    this.isLoading = true

    this._userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null) => {
        this.user = user;
      })

    setTimeout(() => {
      this.isLoading = false
    }, 3000)

  }

}
