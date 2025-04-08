import { ApplicationConfig } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(appRoutes)],
};
