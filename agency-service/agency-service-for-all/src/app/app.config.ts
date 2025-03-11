import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch  } from '@angular/common/http'; 
import { routes } from './app.routes';
import { provideAnimations } from "@angular/platform-browser/animations"
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ]
};
