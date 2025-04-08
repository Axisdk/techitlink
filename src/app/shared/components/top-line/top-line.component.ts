import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ThemeEnum } from '../../../core/enums/theme.enum';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../../core/services/theme/theme.service';

@Component({
	selector: 'app-top-line',
	templateUrl: './top-line.component.html',
})
export class TopLineComponent implements OnInit, OnDestroy {
	protected readonly themeEnum = ThemeEnum;

	private _destroy$: Subject<void> = new Subject<void>();

	protected currentTheme: WritableSignal<ThemeEnum> = signal(this.themeEnum.light);

	constructor(private _themeService: ThemeService) {}

	private _initTheme(): void {
		this._themeService.initTheme();
	}

	private _getTheme(): void {
		this._themeService.currentTheme$.pipe(takeUntil(this._destroy$)).subscribe((theme: ThemeEnum): void => {
			this.currentTheme.set(theme);
		});
	}

	protected toggleTheme(): void {
		this._themeService.toggleTheme();
	}

	ngOnInit(): void {
		this._initTheme();
		this._getTheme();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
