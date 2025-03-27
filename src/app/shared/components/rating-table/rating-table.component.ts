import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {TimeTableInterface} from "../../../core/interfaces/time-table.interface";
import {ProgressComponent} from "../progress/progress.component";
import {CardComponent} from "../card/card.component";
import {Subject, takeUntil} from "rxjs";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {RatingTableService} from "../../../core/services/rating-table/rating-table.service";

@Component({
    selector: 'app-rating-table',
    templateUrl: './rating-table.component.html',
    imports: [
        ProgressComponent,
        CardComponent,
    ]
})

export class RatingTableComponent implements OnInit, OnDestroy {

  @Input() user!: UserInterface

  private _destroy$: Subject<void> = new Subject<void>();

  public isLoading: boolean = false
  public tablePosition!: TimeTableInterface[]

  constructor(
    private _ratingTableService: RatingTableService,
  ) {}

  ngOnInit(): void {
    this._ratingTableService.getRatingTable(this.user.id)
    this.isLoading = true

    setTimeout(() => {
      this._ratingTableService.ratingTable$
        .pipe(takeUntil(this._destroy$))
        .subscribe((ratingTable : TimeTableInterface[] | null) => {
          if (!ratingTable) return
          this.tablePosition = ratingTable
          this.isLoading = false
        })
    }, 3000)
  }

  ngOnDestroy() {
    this._destroy$.next()
    this._destroy$.complete()
  }

}
