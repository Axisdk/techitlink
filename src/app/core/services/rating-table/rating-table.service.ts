import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeTableInterface } from '../../interfaces/time-table.interface';
import { TimeTableMocks } from '../../../mocks/time-table.mocks';

@Injectable({
	providedIn: 'root',
})
export class RatingTableService {
	public ratingTable$: BehaviorSubject<TimeTableInterface[] | null> = new BehaviorSubject<
		TimeTableInterface[] | null
	>(null);

	private _ratingTable: TimeTableInterface[] = TimeTableMocks;

	constructor() {}

	public setRatingTableLocalStorage(ratingTable: TimeTableInterface[]): void {
		localStorage.setItem('ratingTable', JSON.stringify(ratingTable));
	}

	public getRatingTableFromLocalStorage(): TimeTableInterface[] {
		return JSON.parse(localStorage.getItem('ratingTable') ?? 'null');
	}

	public getRatingTable(): TimeTableInterface[] | null {
		const ratingTable: TimeTableInterface[] = this.getRatingTableFromLocalStorage();
		if (!ratingTable) {
			this.setRatingTableLocalStorage(this._ratingTable);
			return this._ratingTable;
		}

		return ratingTable;
	}

	public getRatingTableForUser(userId: number): void {
		const ratingTable: TimeTableInterface[] | null = this.getRatingTable();
		if (!ratingTable) return;
		const filteredRatingTable: TimeTableInterface[] | null = ratingTable.filter(
			(table: TimeTableInterface): boolean => table.forUser === userId,
		);

		this.ratingTable$.next(filteredRatingTable);
	}

	public setRatingForUser(ratingStudent: TimeTableInterface): void {
		let ratingTable: TimeTableInterface[] | null = this.getRatingTable();
		if (!ratingTable) return;
		ratingTable.push(ratingStudent);
		this.setRatingTableLocalStorage(ratingTable);
	}
}
