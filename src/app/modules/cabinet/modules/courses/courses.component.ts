import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Subject, takeUntil } from 'rxjs';
import { CoursesService } from '../../../../core/services/courses/courses.service';
import { CourseInterface } from '../../../../core/interfaces/course.interface';
import { CourseDetailModalComponent } from '../../../../shared/components/course-detail-modal/course-detail-modal.component';
import { CourseDetailModalService } from '../../../../shared/components/course-detail-modal/course-detail-modal.sevice';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	imports: [CardComponent, CourseDetailModalComponent],
})
export class CoursesComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected isLoading: WritableSignal<boolean> = signal(false);
	protected courses: WritableSignal<CourseInterface[] | undefined> = signal(undefined);

	constructor(
		private _coursesService: CoursesService,
		private _courseDetailModalService: CourseDetailModalService,
	) {}

	private _initCourses(): void {
		this._coursesService.getCourses();

		this._coursesService.courses$.pipe(takeUntil(this._destroy$)).subscribe((courses: CourseInterface[] | null) => {
			if (!courses) return;
			this.isLoading.set(true);

			setTimeout(() => {
				this.courses.set(courses);
				this.isLoading.set(false);
			}, 1500);
		});
	}

	protected openCourseDetail(course: CourseInterface): void {
		this._courseDetailModalService.toggleModal();
		this._courseDetailModalService.setCourse(course);
	}

	ngOnInit(): void {
		this._initCourses();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
