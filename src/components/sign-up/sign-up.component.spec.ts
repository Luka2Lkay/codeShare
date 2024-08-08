import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  RouterLink,
  Router,
  Routes,
  provideRouter,
  withInMemoryScrolling,
} from "@angular/router";
import { SignUpComponent } from "./sign-up.component";
import { AuthService } from "../../services/auth.service";

export const routes: Routes = [{ path: "sign-up", component: SignUpComponent }];

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let htmlPage: any;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let emailMessage: HTMLElement;
  let userNameMessage: HTMLElement;
  let passwordMessage: HTMLElement;
  let termsMessage: HTMLElement;
  let matchMessage: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, RouterLink, ReactiveFormsModule, FormsModule, AuthService, Router],
      providers: [provideRouter(routes, withInMemoryScrolling())],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    htmlPage = fixture.debugElement.nativeElement;

    router = TestBed.inject(Router);

    fixture.detectChanges();

    emailInput = fixture.debugElement.nativeElement.querySelector("#email");
    passwordInput =
      fixture.debugElement.nativeElement.querySelector("#password");
    emailMessage =
      fixture.debugElement.nativeElement.querySelector("#invalid-email");
    passwordMessage =
      fixture.debugElement.nativeElement.querySelector("#invalid-password");
    termsMessage =
      fixture.debugElement.nativeElement.querySelector("#unticked-terms");
    matchMessage =
      fixture.debugElement.nativeElement.querySelector("#no-match");
    userNameMessage =
      fixture.debugElement.nativeElement.querySelector("#empty-username");
  });

  it("should update the email input", () => {
    const email = "luka@gmail.com";
    emailInput.value = email;

    fixture.detectChanges();

    expect(htmlPage.querySelector("#email").value).toBe(email);
  });

  it("should update the password input", () => {
    const password = "1asdfg#";
    passwordInput.value = password;

    fixture.detectChanges();

    expect(htmlPage.querySelector("#password").value).toBe(password);
  });

  it("should show invalid email when the email is invalid", () => {
    const invalidEmail = "Invalid email";
    component.invalidEmail = invalidEmail;

    fixture.detectChanges();

    expect(emailMessage.textContent).toBe(invalidEmail);
  });

  it("should show an empty string when the email is valid", () => {
    const validEmail = "";
    component.invalidEmail = validEmail;

    fixture.detectChanges();

    expect(emailMessage.textContent).toBe(validEmail);
  });

  it("should show 'Enter username' when the username field is empty", () => {
    component.registerForm.value.userName = "";

    component.isUserNameValid(component.registerForm.value.userName);

    fixture.detectChanges();

    expect(userNameMessage.textContent).toBe("Enter username");
  });

  it("should not show error message when the username field is not empty", () => {
    component.registerForm.value.userName = "Luka";

    component.isUserNameValid(component.registerForm.value.userName);

    fixture.detectChanges();

    expect(userNameMessage.textContent).toBe("");
  });

  it("should show the relevant message when the password is missing a special character or digit", () => {
    const invalidPassword =
      "The password should contain at least one digit and special character";
    component.invalidPassword = invalidPassword;

    fixture.detectChanges();

    expect(passwordMessage.textContent).toBe(invalidPassword);
  });

  it("should show the relevant message when the password is less than 6 characters long", () => {
    const invalidPassword = "The password should be at least 6 characters long";
    component.invalidPassword = invalidPassword;

    fixture.detectChanges();

    expect(passwordMessage.textContent).toBe(invalidPassword);
  });

  it("should show an empty string when the password is valid", () => {
    const validPassword = "";
    component.invalidPassword = validPassword;

    fixture.detectChanges();

    expect(passwordMessage.textContent).toBe(validPassword);
  });

  it("should show the relavant message when the password and confirmPassword do not match do match", () => {
    component.registerForm.value.password = "1abcdefg#";
    component.registerForm.value.confirmPassword = "1asfdg#";

    component.doPasswordsMatch();

    fixture.detectChanges();

    expect(component.noMatch).toBe("Passwords don't match");
    expect(matchMessage.textContent).toBe("Passwords don't match");
  });

  it("should show an empty string when password and confirmPassword match", () => {
    component.registerForm.value.password = "1asfdg#";
    component.registerForm.value.confirmPassword = "1asfdg#";

    component.doPasswordsMatch();

    fixture.detectChanges();

    expect(component.noMatch).toBe("");
    expect(matchMessage.textContent).toBe("");
  });

  it("should show an empty string when the terms checkbox has been clicked", () => {
    component.registerForm.get("terms")?.setValue(true);

    component.isTermsTicked();

    fixture.detectChanges();

    expect(component.unTickedTerms).toBe("");
    expect(termsMessage.textContent).toBe("");
  });

  it("should show the relevant message when the terms checkbox has not been clicked", () => {
    component.registerForm.get("terms")?.setValue(false);

    component.isTermsTicked();

    fixture.detectChanges();

    expect(component.unTickedTerms).toBe("Accept the terms and conditions");
    expect(termsMessage.textContent).toBe("Accept the terms and conditions");
  });
});
