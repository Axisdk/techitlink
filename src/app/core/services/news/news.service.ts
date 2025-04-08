import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewsInterface } from '../../interfaces/news.interface';
import { newsMocks } from '../../../mocks/news.mocks';

@Injectable({
	providedIn: 'root',
})
export class NewsService {
	protected readonly news: NewsInterface[] = newsMocks;

	public news$: BehaviorSubject<NewsInterface[] | null> = new BehaviorSubject<NewsInterface[] | null>(null);

	constructor() {}

	public getNews(): void {
		if (!this.news) return;
		this.news$.next(this.news);
	}
}
