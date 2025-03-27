import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {TimeTableInterface} from "../../interfaces/time-table.interface";
import {TimeTableMocks} from "../../../mocks/time-table.mocks";

@Injectable({
  providedIn: 'root'
})
export class RatingTableService {

  private _ratingTable: TimeTableInterface[] = TimeTableMocks

  public ratingTable$: BehaviorSubject<TimeTableInterface[] | null> = new BehaviorSubject<TimeTableInterface[] | null>(null);

  constructor() {}

  public getRatingTable(userId: number): void {
    const filteredRatingTable: TimeTableInterface[] | null =
      this._ratingTable.filter((table: TimeTableInterface): boolean => table.forUser === userId);

    this.ratingTable$.next(filteredRatingTable);
  }

}
