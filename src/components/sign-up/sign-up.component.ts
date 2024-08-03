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

  ngOnInit(): void {
    this.validatePassword();
  }

  validateEmail() {
    const email = this.registerForm.value.email;

    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
      this.invalidEmail = "Invalid email";
    } else {
      this.invalidEmail = "";
    }
  }

  validatePassword() {
    const password = this.registerForm.value.password;

    if (password.length < 6) {
      this.invalidPassword = "too short";
    } else if (!/0-9/.test(password)) {
      this.invalidPassword = "password should contain at least one digit";
    }
  }

  register() {
    this.validateEmail();
    console.log(this.registerForm.value);
  }
}
