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
import { By } from "@angular/platform-browser";

export const routes: Routes = [{ path: "sign-up", component: SignUpComponent }];

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let htmlPage: any;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let errorMessage: HTMLElement;
  let showPasswordBox: HTMLElement;
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

    emailInput = fixture.debugElement.query(
      By.css('input[type="email"]')
    ).nativeElement;

    passwordInput = fixture.debugElement.query(
      By.css('input[formControlName="password"]')
    ).nativeElement;

    showPasswordBox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    ).nativeElement;
  });

  it("should update the email input", () => {
    const email = "luka@gmail.com";
    component.registerForm.get("email")?.setValue(email);

    fixture.detectChanges();

    expect(htmlPage.querySelector("#email").value).toBe(email);
  });

  it("should update the password input", () => {
    const password = "1asdfg#";
    component.registerForm.get("password")?.setValue(password);

    fixture.detectChanges();

    expect(htmlPage.querySelector("#password").value).toBe(password);
  });

});
