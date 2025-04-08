import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NewsInterface } from '../../../core/interfaces/news.interface';
import { Subject, takeUntil } from 'rxjs';
import { NewsService } from '../../../core/services/news/news.service';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	imports: [CardComponent],
})
export class NewsComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected news!: NewsInterface[];
	protected isLoading: WritableSignal<boolean> = signal(false);

	constructor(private _newsService: NewsService) {}

	protected parseDate(date: Date): string {
		const year: number = date.getFullYear();
		const month: string = String(date.getMonth() + 1).padStart(2, '0');
		const day: string = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	ngOnInit(): void {
		this.isLoading.update((value: boolean): boolean => !value);
		this._newsService.getNews();

		setTimeout(() => {
			this._newsService.news$.pipe(takeUntil(this._destroy$)).subscribe((news: NewsInterface[] | null) => {
				if (!news) return;
				this.news = news.slice(0, 5).map((newsItem: NewsInterface, index: number) => {
					return {
						...newsItem,
						order: index + 1,
					};
				});
				this.isLoading.update((value: boolean): boolean => !value);
			});
		}, 3000);
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
