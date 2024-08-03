import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.css",
})
export class SignUpComponent implements OnInit {
  constructor() {}

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    terms: new FormControl(false),
  });

  invalidEmail: string = "";
  invalidPassword: string = "";
  show: boolean = false;

  ngOnInit(): void {}

  validateEmail(): void {
    const email = this.registerForm.value.email;

    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
      this.invalidEmail = "Invalid email";
    } else {
      this.invalidEmail = "";
    }
  }

  checkPasswordLength(password: string): void {
    if (password.length < 6) {
      this.invalidPassword =
        "The password should be at least 6 characters long";
    } else {
      this.invalidPassword = "";
    }
  }

  checkPasswordDigits(password: string): void {
    if (
      !/[0-9]/.test(password) ||
      !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/.test(password)
    ) {
      this.invalidPassword =
        "The password should contain at least one digit and special character";
    } else {
      this.invalidPassword = "";
    }
  }

  validatePassword(): void {
    const password = this.registerForm.value.password;

    if (password.length < 6) {
      this.checkPasswordLength(password);
    } else {
      this.checkPasswordDigits(password);
    }
  }

  showPassword(): void {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  register(): void {
    this.validateEmail();
    console.log(this.registerForm.value);
  }
}
