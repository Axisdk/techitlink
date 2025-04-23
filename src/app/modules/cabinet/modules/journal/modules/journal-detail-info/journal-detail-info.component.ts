import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { CourseInterface } from '../../../../../../core/interfaces/course.interface';
import { Observable, Subject } from 'rxjs';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { UserInterface } from '../../../../../../core/interfaces/user.interface';
import { UserService } from '../../../../../../core/services/user/user.service';
import { CoursesService } from '../../../../../../core/services/courses/courses.service';
import { MessengerService } from '../../../../../../core/services/messanger/messenger.service';
import { RatingTableService } from '../../../../../../core/services/rating-table/rating-table.service';
import { TimeTableInterface } from '../../../../../../core/interfaces/time-table.interface';

@Component({
	selector: 'app-journal-detail-info',
	templateUrl: './journal-detail-info.component.html',
	imports: [CardComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalDetailInfoComponent implements OnInit, OnDestroy {
	protected readonly number = Number;

	private _destroy$: Subject<void> = new Subject<void>();

	protected course: WritableSignal<CourseInterface | undefined> = signal(undefined);
	protected students: WritableSignal<UserInterface[] | undefined> = signal(undefined);

	constructor(
		private _router: Router,
		private _userService: UserService,
		private _coursesService: CoursesService,
		private _messengerService: MessengerService,
		private _ratingTableService: RatingTableService,
	) {
		const nav: Navigation | null = this._router.getCurrentNavigation();
		this.course.set(nav?.extras?.state?.['course'] ?? null);
	}

	private _initStudents(): void {
		const course: CourseInterface | undefined = this.course();
		if (!course) return;

		const updateStudents: UserInterface[] = [];

		course.subscribers.forEach((studentId: number) => {
			const user: UserInterface | null = this.getUser(studentId);
			if (user) {
				updateStudents.push(user);
			}
		});

		this.students.set(updateStudents);
	}

	protected getUser(id: number): UserInterface | null {
		return this._userService.getUser(id) ?? null;
	}

	protected setGrade(studentId: number, grade: string): void {
		const course: CourseInterface | undefined = this.course();
		const parsedGrade: number = this.number.parseInt(grade);

		if (
			!grade ||
			this.number.isNaN(grade) ||
			parsedGrade < 0 ||
			parsedGrade > 100 ||
			!course ||
			!course.teacher ||
			!course.title
		)
			return;

		const rating: TimeTableInterface = {
			forUser: studentId,
			grade: parsedGrade,
			item: course.title,
			teacher: course.teacher,
		};

		this._ratingTableService.setRatingForUser(rating);
		console.log(`Студент ID: ${studentId}, оценка: ${parsedGrade}`);
	}

	protected contactWithStudent(studentId: number): void {
		this._messengerService.createMessengers(studentId);
		this._router.navigate(['/cabinet/messenger']);
	}

	protected expelStudent(studentId: number): void {
		let updatedCourse: CourseInterface | undefined = this.course();
		if (!updatedCourse) return;

		updatedCourse.subscribers = updatedCourse.subscribers.filter((student: number) => student !== studentId);

		this._coursesService.updateCourses(updatedCourse);
		this.course.set(updatedCourse);
		this._initStudents();
	}

	ngOnInit(): void {
		this._initStudents();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
