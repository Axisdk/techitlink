import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { TimeTableInterface } from '../../../core/interfaces/time-table.interface';
import { ProgressComponent } from '../progress/progress.component';
import { CardComponent } from '../card/card.component';
import { Subject, takeUntil } from 'rxjs';
import { RatingTableService } from '../../../core/services/rating-table/rating-table.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
	selector: 'app-rating-table',
	templateUrl: './rating-table.component.html',
	imports: [ProgressComponent, CardComponent],
})
export class RatingTableComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected isLoading: WritableSignal<boolean> = signal(false);
	protected tablePosition!: TimeTableInterface[];

	constructor(
		private _ratingTableService: RatingTableService,
		private _userService: UserService,
	) {}

	private _initTable(): void {
		const userId: number | null = this._userService.getIdThisUser();
		if (!userId) return;
		this._ratingTableService.getRatingTable(userId);
		this.isLoading.update((value: boolean): boolean => !value);

		setTimeout(() => {
			this._ratingTableService.ratingTable$
				.pipe(takeUntil(this._destroy$))
				.subscribe((ratingTable: TimeTableInterface[] | null) => {
					if (!ratingTable) return;
					this.tablePosition = ratingTable;
					this.isLoading.update((value: boolean): boolean => !value);
				});
		}, 3000);
	}

	ngOnInit(): void {
		this._initTable();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
