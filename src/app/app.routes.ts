import { Routes } from "@angular/router";
import { AuthComponent } from "./modules/auth/auth.component";
import {CabinetComponent} from "./modules/cabinet/cabinet.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'cabinet', component: CabinetComponent }
];
