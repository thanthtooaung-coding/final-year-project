import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private websiteNameSubject = new BehaviorSubject<string>("Default Website Name");
  websiteName$ = this.websiteNameSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchWebsiteName(): Observable<{ name: string }> {
    return this.http.get<{ name: string }>('/api/website-name');
  }

  setWebsiteName(name: string) {
    this.websiteNameSubject.next(name);
  }

  getWebsiteName(): string {
    return this.websiteNameSubject.value;
  }
}
