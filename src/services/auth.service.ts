import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { environment } from "../environments/environment.development";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { Register } from "../interfaces/register";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  
  constructor() {}

  auth = getAuth(initializeApp(environment.firebaseConfig));

  register(data: Register): Observable<void> {
    const newUser = createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    ).then((response) => {
      updateProfile(response.user, { displayName: data.userName });
    });

    return from(newUser);
  }
}
