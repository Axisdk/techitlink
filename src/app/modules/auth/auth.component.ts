import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {TokenService} from "../../core/services/token.service";
import {AuthInterface} from "../../core/interfaces/auth.interface";
import {UserService} from "../../core/services/user.service";
import {NotificationService} from "../../shared/components/notification/notification.service";
import {NotificationTypeEnum} from "../../shared/components/notification/core/enums/notification-type.enum";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    imports: [
        NgIf,
        ReactiveFormsModule,
    ]
})

export class AuthComponent implements OnInit{

  public authData!: AuthInterface
  public formGroup!: FormGroup
  public isShowPassword: boolean = false
  public isLoading: boolean = false

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _tokenService: TokenService,
    private _userService: UserService,
    private _notificationService: NotificationService
  ) {}

  private _initForm() {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: ['']
    })
  }

  public toggleTypeInput() {
    this.isShowPassword = !this.isShowPassword
  }

  public onSubmit() {
    this.isLoading = true;

    setTimeout(() => {
      this.authData = this.formGroup.value;

      this._userService.setUser(this.authData);

      const isCorrectUser: boolean = this._userService.authUser(this.authData);

      if (!isCorrectUser) {
        this._notificationService.showNotification({
          type: NotificationTypeEnum.error,
          title: 'Ошибка',
          message: 'Неверный логин или пароль'
        })
        this.isLoading = false;
        return;
      }

      this._tokenService.setToken();
      this._notificationService.showNotification({
        type: NotificationTypeEnum.success,
        title: 'Добро пожаловать!',
        message: 'Спасибо за авторизацию'
      })
      this.isLoading = false;

      this._router.navigate(['/cabinet']).then();
    }, 1000);
  }

  ngOnInit() {
    this._initForm()
  }
}
