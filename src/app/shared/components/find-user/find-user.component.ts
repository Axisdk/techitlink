import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FindUserService } from './find-user.service';
import { UserInterface } from '../../../core/interfaces/user.interface';
import { MessengerService } from '../../../core/services/messanger/messenger.service';
import { UserHelperService } from '../../../core/services/user/user-helper.service';
import { UserRoleBadgeComponent } from '../user-role-badge/user-role-badge.component';

@Component({
	selector: 'app-find-user',
	templateUrl: './find-user.component.html',
	imports: [ReactiveFormsModule, UserRoleBadgeComponent],
})
export class FindUserComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected form!: FormGroup;
	protected users: WritableSignal<UserInterface[] | undefined> = signal(undefined);
	protected isOpen: WritableSignal<boolean> = signal(false);
	protected isLoading: WritableSignal<boolean> = signal(false);

	constructor(
		private _formBuilder: FormBuilder,
		private _findUserService: FindUserService,
		private _messengerService: MessengerService,
		private _userHelperService: UserHelperService,
	) {}

	private _initForm(): void {
		this.form = this._formBuilder.group({
			name: ['', [Validators.maxLength(30)]],
		});
	}

	private _listeningInput(): void {
		const nameControl: AbstractControl<string> | null = this.form.get('name');
		if (!nameControl) return;

		nameControl.valueChanges
			.pipe(takeUntil(this._destroy$), debounceTime(300), distinctUntilChanged())
			.subscribe((value: string) => {
				this._findUserService.getUsers(value);
			});
	}

	private _listeningUsers(): void {
		this._findUserService.users$.pipe(takeUntil(this._destroy$)).subscribe((users: UserInterface[] | undefined) => {
			if (!users) return;
			this.isLoading.set(true);

			setTimeout(() => {
				this.users.set(users);
				this.isLoading.set(false);
			}, 1000);
		});
	}

	private _listeningIsOpenModal(): void {
		this._findUserService.isOpen$.pipe(takeUntil(this._destroy$)).subscribe((isOpen: boolean) => {
			this.isOpen.set(isOpen);
		});
	}

	protected toggleModal(): void {
		this._findUserService.toggleModal();
		this.form.reset();
	}

	protected getNameUser(user: UserInterface): string {
		return this._userHelperService.getUserName(user);
	}

	protected openDialogWithUser(userId: number): void {
		this._messengerService.createMessengers(userId);
		this.toggleModal();
	}

	ngOnInit(): void {
		this._findUserService.getUsers('');

		this._initForm();
		this._listeningInput();
		this._listeningUsers();
		this._listeningIsOpenModal();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
