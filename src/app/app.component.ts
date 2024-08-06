import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { initFlowbite } from "flowbite";
import { environment } from "../environments/environment.development";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "codeShare";

  ngOnInit(): void {
    initFlowbite();
    initializeApp(environment.firebaseConfig)
    
  }
}
