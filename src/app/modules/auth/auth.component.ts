import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {TokenService} from "../../core/services/token.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule,
  ],
  standalone: true
})

export class AuthComponent implements OnInit{

  public formGroup!: FormGroup
  public isShowPassword: boolean = false
  public isLoading: boolean = false

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _tokenService: TokenService
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
    this.isLoading = true
    setTimeout(() => {
      this._tokenService.setToken()
      this.isLoading = false

      this._router.navigate(['/cabinet']).then()
    }, 1000)
  }

  ngOnInit() {
    this._initForm()
  }
}
