import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import { catchError, tap } from "rxjs/operators"
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router"
import { filter } from "rxjs/operators"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private websiteName = "Default Website"
  private apiBaseUrl = environment.apiBaseUrl + "/pages"
  private currentSiteName = ""

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateCurrentSiteName()
    })

    this.updateCurrentSiteName()
  }

  private updateCurrentSiteName(): void {
    if (typeof window !== 'undefined') {
      const urlPath = window.location.pathname
      const pathSegments = urlPath.split("/").filter((segment) => segment)

      if (pathSegments.length > 0) {
        this.currentSiteName = pathSegments[0]
      } else {
        this.currentSiteName = "agency-connect"
      }
    }
  }

  getCurrentSiteName(): string {
    return this.currentSiteName
  }

  setWebsiteName(name: string): void {
    this.websiteName = name
  }

  getWebsiteName(): string {
    return this.websiteName
  }

  fetchWebsiteName(): Observable<any> {    
    const url = `${this.apiBaseUrl}/${this.getCurrentSiteName()}`;
  
    return this.http.get<any>(url).pipe(
      tap((response) => {
        if (response && response.name) {
          this.setWebsiteName(response.name);
        }
      }),
      catchError((error) => {
        console.error("Error fetching website data:", error);
  
        if (error.status === 0) {
          console.error("Network error or CORS issue");
        } else {
          console.error("API Error:", error.message);
        }
  
        return of({ name: `${this.getCurrentSiteName()}` });
      }),
    );
  }
  
  
}
