import { Routes } from "@angular/router";
import { UserDashboardComponent } from "../components/user-dashboard/user-dashboard.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { SignInComponent } from "../components/sign-in/sign-in.component";

export const routes: Routes = [
  { path: "", redirectTo: "/sign-up", pathMatch: "full" },
  { path: "timeline", component: UserDashboardComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "sign-in", component: SignInComponent },
];
