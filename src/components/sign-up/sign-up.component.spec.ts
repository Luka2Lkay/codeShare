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

export const routes: Routes = [{ path: "sign-up", component: SignUpComponent }];

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let htmlPage: any;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let emailMessage: HTMLElement;
  let checkbox: HTMLInputElement;
  let passwordMessage: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, RouterLink, ReactiveFormsModule, FormsModule],
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
      checkbox =
      fixture.debugElement.nativeElement.querySelector("#show-password");
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

});
