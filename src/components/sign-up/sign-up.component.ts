import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
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
    userName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    terms: new FormControl(false),
  });

  emptyUserName: string = "";
  invalidEmail: string = "";
  invalidPassword: string = "";
  noMatch: string = "";
  unTickedTerms: string = "";
  show: boolean = false;

  ngOnInit(): void {}

  isUserNameValid(name: string): boolean {
    let valid = false;

    if (name === "") {
      this.emptyUserName = "Enter username";
      valid = false;
    } else {
      this.emptyUserName = "";
      valid = true;
    }

    return valid;
  }

  isEmailValid(): boolean {
    const email = this.registerForm.value.email;
    let valid = false;

    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
      this.invalidEmail = "Invalid email";
      valid = false;
    } else {
      this.invalidEmail = "";
      valid = true;
    }
    return valid;
  }

  isPasswordLengthValid(password: string): boolean {
    let valid = false;

    if (password.length < 6) {
      this.invalidPassword =
        "The password should be at least 6 characters long";
      valid = false;
    } else {
      this.invalidPassword = "";
      valid = true;
    }
    return valid;
  }

  passwordHasDigitsOrCharacters(password: string): boolean {
    let valid = false;

    if (
      !/[0-9]/.test(password) ||
      !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/.test(password)
    ) {
      this.invalidPassword =
        "The password should contain at least one digit and special character";
      valid = false;
    } else {
      this.invalidPassword = "";
      valid = true;
    }
    return valid;
  }

  validatePassword(): boolean {
    const password = this.registerForm.value.password;

    return password && password.length < 6
      ? this.isPasswordLengthValid(password)
      : this.passwordHasDigitsOrCharacters(password);
  }

  showPassword(): void {
    const password = this.registerForm.value.password;

    if (password == "") {
      this.invalidPassword = "The password can't be empty";
    } else {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  }

  doPasswordsMatch(): boolean {
    const { password, confirmPassword } = this.registerForm.value;
    let valid = false;

    if (password !== confirmPassword) {
      this.noMatch = "Passwords don't match";
      valid = false;
    } else {
      this.noMatch = "";
      valid = true;
    }
    return valid;
  }

  isTermsTicked(): boolean {
    const terms = this.registerForm.value.terms;
    let valid = false;
    if (!terms) {
      this.unTickedTerms = "Accept the terms and conditions";
      valid = false;
    } else {
      this.unTickedTerms = "";
      valid = true;
    }
    return valid;
  }

  register(): void {
    const { userName, email, password, confirmPassword, terms } =
      this.registerForm.value;

    if (
      !this.isUserNameValid(userName) ||
      !this.validatePassword() ||
      !this.doPasswordsMatch() ||
      !this.isTermsTicked()
    ) {
      this.isUserNameValid(userName);
      return;
    }

    console.log(this.registerForm.value);
    this.registerForm.reset();
  }
}
