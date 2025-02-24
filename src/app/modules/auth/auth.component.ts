import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterOutlet
  ],
  standalone: true
})

export class AuthComponent implements OnInit{

  public formGroup!: FormGroup
  public isShowPassword: boolean = false
  public isLoading: boolean = false

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  public toggleTypeInput() {
    this.isShowPassword = !this.isShowPassword
  }

  public onSubmit() {
    this.isLoading = true
    setTimeout(() => {
      if (this.formGroup.valid) console.log(this.formGroup.value)
      else console.log('Invalid form')

      this.isLoading = false
    }, 2000)
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: ['']
    })
  }
}
