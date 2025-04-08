import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { UserInterface } from '../../../../core/interfaces/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../core/services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../../shared/components/notification/notification.service';
import { NotificationTypeEnum } from '../../../../shared/components/notification/core/enums/notification-type.enum';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	imports: [CardComponent, ReactiveFormsModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();
	private _trackedFields = ['email', 'password', 'phone'] as const;
	private _changes: Partial<UserInterface> = {};

	protected user: WritableSignal<UserInterface | undefined> = signal(undefined);
	protected isShowPassword: WritableSignal<boolean> = signal(false);
	protected isChangeControl: WritableSignal<boolean> = signal(false);
	protected isSendUserChange: WritableSignal<boolean> = signal(false);

	protected form!: FormGroup;

	get isValidForm(): boolean {
		return !this.form.invalid;
	}

	constructor(
		private _formBuilder: FormBuilder,
		private _userService: UserService,
		private _notificationService: NotificationService,
	) {}

	private _createForm(user: UserInterface | undefined): FormGroup {
		return this._formBuilder.group({
			fname: [{ value: user?.fname, disabled: true }],
			lname: [{ value: user?.lname, disabled: true }],
			email: [{ value: user?.email, disabled: true }],
			password: [{ value: user?.password, disabled: true }, [Validators.minLength(8)]],
			phone: [{ value: user?.phone, disabled: true }, Validators.pattern(/^\+7\d{10}$/)],
			id: [{ value: user?.id, disabled: true }],
		});
	}

	private _initUser(): void {
		this._userService.user$.pipe(takeUntil(this._destroy$)).subscribe((user: UserInterface | null) => {
			if (!user) return;
			this.user.set(user);
		});
	}

	private _initForm(): void {
		this.form = this._createForm(this.user());
	}

	private _setupChangeTracking(): void {
		this._trackedFields.forEach((field) => {
			const control = this.form.get(field);
			if (control) {
				control.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((newValue) => {
					this.isChangeControl.set(true);
					this._changes[field] = newValue;
				});
			}
		});
	}

	protected toggleShowPassword(): void {
		this.isShowPassword.update((value: boolean): boolean => !value);
	}

	protected onChange(formField: string): void {
		const control = this.form.get(formField);
		if (!control) return;

		control.enabled ? control.disable() : control.enable();
	}

	protected cancelEdit(): void {
		this.form = this._createForm(this.user());
		this.isShowPassword.set(false);
		this.isChangeControl.set(false);
	}

	protected async sendChange(): Promise<void> {
		if (!this.isValidForm) return;
		this.isSendUserChange.set(true);

		try {
			await this._userService.changeUserData(this.form.value);
			this._notificationService.showNotification({
				type: NotificationTypeEnum.success,
				title: 'Данные изменены',
				message: 'Данные успешно изменены',
			});
			this.cancelEdit();
			this.isSendUserChange.set(false);
		} catch {
			this._notificationService.showNotification({
				type: NotificationTypeEnum.error,
				title: 'Ошибка',
				message: 'Произошла ошибка при изменении данных',
			});

			this.isSendUserChange.set(false);
		}
	}

	ngOnInit(): void {
		this._initUser();
		this._initForm();
		this._setupChangeTracking();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
