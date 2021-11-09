import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from '../models/user';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private jwtService: JwtService,
    private http: HttpClient
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      
      this.http.get(environment.urlUsers)
      .subscribe(data => {
        this.setAuth(data);
      }, err => {
        this.purgeAuth();
      }); 

    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: any) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user.user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: string | String, credentials: any): Observable<any> {

    var route = (type === 'login') ? '/login' : '/register';
   
    return this.http.post(environment.urlUsers + route, {user: credentials})
    .pipe(map(data => {
      this.setAuth(data);
      return data;
    }));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: any): Observable<any> {

    return this.http.put(environment.urlUsers + '/update', {user})
    .pipe(map(data => {
      this.currentUserSubject.next(data);
      return data;
    }));
    // return this.apiService
    // .put('/user', { user })
    // .pipe(map(data => {
    //   // Update the currentUser observable
    //   this.currentUserSubject.next(data.user);
    //   return data.user;
    // }));
  }

  follow(username: string): Observable<any> {
    return this.http.post(environment.urlUsers + '/follow', {username: username});
  }

  unfollow(username: string): Observable<any> {
    return this.http.delete(environment.urlUsers + '/follow/' + username);
  }

}