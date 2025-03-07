import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable } from "rxjs"
import { tap } from "rxjs/operators"
import type { User } from "../models/comment.model"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  private apiUrl = "api/auth" // Replace with your actual API URL

  constructor(private http: HttpClient) {
    this.loadUserFromStorage()
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem("currentUser")
    if (userJson) {
      try {
        const user = JSON.parse(userJson)
        this.currentUserSubject.next(user)
      } catch (error) {
        console.error("Error parsing user from localStorage", error)
        localStorage.removeItem("currentUser")
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user))
        this.currentUserSubject.next(user)
      }),
    )
  }

  register(userData: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      tap((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user))
        this.currentUserSubject.next(user)
      }),
    )
  }

  logout(): void {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value
  }

  isAgency(): boolean {
    const user = this.currentUserSubject.value
    return !!user && user.role === "agency"
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }
}

