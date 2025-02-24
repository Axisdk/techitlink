import { ApplicationConfig } from "@angular/platform-browser";
import { provideRouter, withDebugTracing } from "@angular/router";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withDebugTracing())]
};
