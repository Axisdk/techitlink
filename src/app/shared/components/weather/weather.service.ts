import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { enveronments } from '../../../core/enveronments/enveronments';
import { WeatherApiResponse } from '../../../core/interfaces/weather.interface';

@Injectable({
	providedIn: 'root',
})
export class WeatherService {
	public weather$: BehaviorSubject<WeatherApiResponse | null> = new BehaviorSubject<WeatherApiResponse | null>(null);

	constructor(private _httpClient: HttpClient) {}

	public getWeather(): Observable<WeatherApiResponse> {
		return this._httpClient.get<WeatherApiResponse>(enveronments.apiWeather).pipe(
			tap((weather: WeatherApiResponse) => {
				this.weather$.next(weather);
			}),
			catchError((error: HttpErrorResponse) => {
				this.weather$.next(null);
				return throwError(() => new Error('Failed to load weather data' + error));
			}),
		);
	}
}
