import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseInterface } from '../../../core/interfaces/course.interface';

@Injectable({
	providedIn: 'root',
})
export class CourseDetailModalService {
	public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public course$: BehaviorSubject<CourseInterface | undefined> = new BehaviorSubject<CourseInterface | undefined>(
		undefined,
	);

	constructor() {}

	public toggleModal(): void {
		this.isOpen$.next(!this.isOpen$.value);
	}

	public setCourse(course: CourseInterface): void {
		this.course$.next(course);
	}
}
