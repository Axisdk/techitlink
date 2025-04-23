import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { Subject, takeUntil } from 'rxjs';
import { CoursesService } from '../../../../../../core/services/courses/courses.service';
import { UserService } from '../../../../../../core/services/user/user.service';
import { CourseInterface } from '../../../../../../core/interfaces/course.interface';
import { UserInterface } from '../../../../../../core/interfaces/user.interface';
import { Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-journal-info',
	templateUrl: './journal-info.component.html',
	imports: [CardComponent, RouterOutlet],
})
export class JournalInfoComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected courses: WritableSignal<CourseInterface[] | undefined> = signal(undefined);

	constructor(
		private _coursesService: CoursesService,
		private _userService: UserService,
		private _router: Router,
	) {}

	private _getTeacherName(): string {
		const user: UserInterface | null = this._userService.user$.getValue();
		if (!user) return '';
		return `${user.lname} ${user.fname}`;
	}

	private _filteredCoursesForTeacher(courses: CourseInterface[]): CourseInterface[] {
		return courses.filter(
			(course: CourseInterface) => course.teacher.toLowerCase() === this._getTeacherName().toLowerCase(),
		);
	}

	private _initCourses(): void {
		this._coursesService.getCourses();

		this._coursesService.courses$.pipe(takeUntil(this._destroy$)).subscribe((courses: CourseInterface[] | null) => {
			if (!courses) return;
			this.courses.set(this._filteredCoursesForTeacher(courses));
		});
	}

	protected openJournal(course: CourseInterface): void {
		this._router.navigate(['cabinet/journal', course.id], {
			state: { course },
		});
	}

	ngOnInit(): void {
		this._initCourses();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
