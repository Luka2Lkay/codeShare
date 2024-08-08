import { Injectable} from '@angular/core';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from '@firebase/auth'
import { Register } from '../interfaces/register';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  auth = getAuth()

  // register(data: Register): Observable<void> {
  //   const newUser =  createUserWithEmailAndPassword(this.auth, data.email, data.password).then(response => {
  //     updateProfile(response.user, )
  //   })
  // }
}
