import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseInterface } from '../../interfaces/course.interface';
import { courses } from '../../../mocks/courses.mock';

@Injectable({
	providedIn: 'root',
})
export class CoursesService {
	public courses$: BehaviorSubject<CourseInterface[] | null> = new BehaviorSubject<CourseInterface[] | null>(null);

	private courses: CourseInterface[] = courses;

	constructor() {}

	private _getCourseById(id: number): CourseInterface | null {
		return this.courses$.getValue()?.find((course: CourseInterface) => course.id === id) ?? null;
	}

	private _updateCourses(course: CourseInterface): void {
		const courses: CourseInterface[] = this.getCoursesInLocalStorage();
		if (!courses) return;

		const updatedCourses: CourseInterface[] = courses.map((sourceCourse: CourseInterface) =>
			sourceCourse.id === course.id ? course : sourceCourse,
		);

		this.courses$.next(updatedCourses);
		this.setCoursesInLocalStorage(updatedCourses);
	}

	public setCoursesInLocalStorage(courses: CourseInterface[]): void {
		localStorage.setItem('courses', JSON.stringify(courses));
	}

	public getCoursesInLocalStorage(): CourseInterface[] {
		const courses: CourseInterface[] | null = JSON.parse(localStorage.getItem('courses') ?? 'null');
		if (!courses) return this.courses;

		return courses;
	}

	public getCourses(): void {
		const courses: CourseInterface[] = this.getCoursesInLocalStorage();
		if (!courses) return;
		this.setCoursesInLocalStorage(courses);
		this.courses$.next(courses);
	}

	public subscribeOnCourse(userId: number, courseId: number): boolean {
		const course: CourseInterface | null = this._getCourseById(courseId);
		if (!course) return false;

		course.subscribers.push(userId);

		this._updateCourses(course);
		return true;
	}
}
