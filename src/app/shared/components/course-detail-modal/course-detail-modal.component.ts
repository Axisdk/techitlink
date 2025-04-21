import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CourseInterface } from '../../../core/interfaces/course.interface';
import { CourseDetailModalService } from './course-detail-modal.sevice';
import { UserService } from '../../../core/services/user/user.service';
import { UserInterface } from '../../../core/interfaces/user.interface';
import { CoursesService } from '../../../core/services/courses/courses.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationTypeEnum } from '../notification/core/enums/notification-type.enum';

@Component({
	selector: 'app-course-detail-modal',
	templateUrl: './course-detail-modal.component.html',
})
export class CourseDetailModalComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected isOpen: WritableSignal<boolean> = signal(false);
	protected course: WritableSignal<CourseInterface | undefined> = signal(undefined);
	protected isLoading: WritableSignal<boolean> = signal(false);

	constructor(
		private _courseDetailModalService: CourseDetailModalService,
		private _userService: UserService,
		private _courseService: CoursesService,
		private _notificationService: NotificationService,
	) {}

	private _listenOpenedMenu(): void {
		this._courseDetailModalService.isOpen$.pipe(takeUntil(this._destroy$)).subscribe((isOpened: boolean) => {
			this.isOpen.set(isOpened);
		});
	}

	private _listenActiveCourse(): void {
		this._courseDetailModalService.course$
			.pipe(takeUntil(this._destroy$))
			.subscribe((course: CourseInterface | undefined) => {
				if (!course) return;
				this.course.set(course);
			});
	}

	protected checkIsSubscription(): boolean {
		return !!this.course()?.subscribers.find(
			(userId: number): boolean => userId === this._userService.getIdThisUser(),
		);
	}

	protected getSubscriberAvatar(subscriberId: number): string {
		const subscriber: UserInterface | null = this._userService.getUser(subscriberId);
		if (!subscriber) return '';

		return subscriber.avatar_url;
	}

	protected closeModal(): void {
		this._courseDetailModalService.toggleModal();
		this._courseDetailModalService.course$.next(undefined);
	}

	protected signUp(): void {
		const userId: number | null = this._userService.getIdThisUser();
		if (!userId) return;
		const courseId: number | undefined = this.course()?.id;
		if (!courseId) return;

		this.isLoading.set(true);

		setTimeout(() => {
			this.isLoading.set(false);
			const isSubscribe: boolean = this._courseService.subscribeOnCourse(userId, courseId);

			if (isSubscribe) {
				this._notificationService.showNotification({
					type: NotificationTypeEnum.success,
					title: 'Успех',
					message: 'Вы успешно подписались на курс',
				});
			} else {
				this._notificationService.showNotification({
					type: NotificationTypeEnum.error,
					title: 'Ошибка',
					message: 'Не удалось подписаться на курс',
				});
			}
		}, 2000);
	}

	ngOnInit(): void {
		this._listenOpenedMenu();
		this._listenActiveCourse();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
