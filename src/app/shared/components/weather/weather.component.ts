import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { WeatherService } from './weather.service';
import { WeatherApiResponse } from '../../../core/interfaces/weather.interface';

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit, OnDestroy {
	private _weatherSubscription!: Subscription;
	private _destroy$: Subject<void> = new Subject<void>();
	private _timerId: number | null = null;

	protected time: WritableSignal<string | null> = signal(null);
	protected weather: WritableSignal<WeatherApiResponse | null> = signal(null);

	constructor(private _weatherService: WeatherService) {}

	private _getTime(date: Date): string {
		return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	}

	private _initTimer(): void {
		if (this._timerId) {
			clearInterval(this._timerId);
		}

		this._timerId = window.setInterval(() => {
			const date: Date = new Date();
			this.time.set(this._getTime(date));
		}, 1000);
	}

	private _stopTimer(): void {
		if (this._timerId) {
			window.clearInterval(this._timerId);
			this._timerId = null;
		}
	}

	private _getWeather(): void {
		this._weatherSubscription = this._weatherService
			.getWeather()
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (weather: WeatherApiResponse | null) => {
					if (!weather) return;
					this.weather.set(weather);
				},
				error: (err) => console.error('Weather error:', err),
			});
	}

	ngOnInit(): void {
		this._initTimer();
		this._getWeather();
	}

	ngOnDestroy(): void {
		this._weatherSubscription?.unsubscribe();
		this._destroy$.next();
		this._destroy$.complete();
		this._stopTimer();
	}
}
