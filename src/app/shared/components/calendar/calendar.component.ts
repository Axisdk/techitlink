import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { weekDays } from '../../../core/consts/week-days.const';
import { monthNames } from '../../../core/consts/months-name.const';

interface CalendarDay {
	date: Date;
	day: number;
	isCurrentMonth: boolean;
	isToday: boolean;
}

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	imports: [CardComponent],
})
export class CalendarComponent implements OnInit {
	protected readonly monthNames: string[] = monthNames;
	protected readonly weekDays: string[] = weekDays;

	protected currentDate: Date = new Date();
	protected currentMonth: number = this.currentDate.getMonth();
	protected currentYear: number = this.currentDate.getFullYear();

	protected calendarDays: CalendarDay[] = [];
	protected weeks: CalendarDay[][] = [];

	constructor() {}

	protected currentMonthName(): string {
		return this.monthNames[this.currentMonth];
	}

	protected generateCalendar(): void {
		this.calendarDays = [];

		// Первый день текущего месяца
		const firstDay: Date = new Date(this.currentYear, this.currentMonth, 1);
		// Последний день текущего месяца
		const lastDay: Date = new Date(this.currentYear, this.currentMonth + 1, 0);

		// День недели первого дня месяца (0 - воскресенье, 1 - понедельник и т.д.)
		const firstDayOfWeek: number = (firstDay.getDay() + 6) % 7; // Преобразуем к формату Пн-0, Вт-1 и т.д.

		// Добавляем дни предыдущего месяца
		const prevMonthLastDay: number = new Date(this.currentYear, this.currentMonth, 0).getDate();
		for (let i: number = firstDayOfWeek - 1; i >= 0; i--) {
			const day: number = prevMonthLastDay - i;
			const date: Date = new Date(this.currentYear, this.currentMonth - 1, day);
			this.calendarDays.push({
				date,
				day,
				isCurrentMonth: false,
				isToday: this.isToday(date),
			});
		}

		// Добавляем дни текущего месяца
		for (let day: number = 1; day <= lastDay.getDate(); day++) {
			const date: Date = new Date(this.currentYear, this.currentMonth, day);
			this.calendarDays.push({
				date,
				day,
				isCurrentMonth: true,
				isToday: this.isToday(date),
			});
		}

		// Добавляем дни следующего месяца
		const lastDayOfWeek: number = (lastDay.getDay() + 6) % 7;
		const daysToAdd: number = 6 - lastDayOfWeek;
		for (let day: number = 1; day <= daysToAdd; day++) {
			const date: Date = new Date(this.currentYear, this.currentMonth + 1, day);
			this.calendarDays.push({
				date,
				day,
				isCurrentMonth: false,
				isToday: this.isToday(date),
			});
		}

		// Генерируем недели
		this.generateWeeks();
	}

	protected generateWeeks(): void {
		this.weeks = [];
		let week: CalendarDay[] = [];

		this.calendarDays.forEach((day: CalendarDay, index: number) => {
			week.push(day);

			// Каждые 7 дней или в конце массива создаем новую неделю
			if ((index + 1) % 7 === 0 || index === this.calendarDays.length - 1) {
				this.weeks.push([...week]);
				week = [];
			}
		});
	}

	protected isToday(date: Date): boolean {
		const today: Date = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}

	protected previousMonth(): void {
		this.currentMonth--;
		if (this.currentMonth < 0) {
			this.currentMonth = 11;
			this.currentYear--;
		}
		this.generateCalendar();
	}

	protected nextMonth(): void {
		this.currentMonth++;
		if (this.currentMonth > 11) {
			this.currentMonth = 0;
			this.currentYear++;
		}
		this.generateCalendar();
	}

	ngOnInit(): void {
		this.generateCalendar();
	}
}
