import { ApplicationConfig } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(appRoutes), provideHttpClient()],
};
