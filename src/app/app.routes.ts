import { Routes } from "@angular/router";
import { AuthComponent } from "./modules/auth/auth.component";
import {CabinetComponent} from "./modules/cabinet/cabinet.component";
import {CabinetInfoComponent} from "./modules/cabinet/modules/cabinet-info/cabinet-info.component";

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'cabinet',
    component: CabinetComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: CabinetInfoComponent
      }
    ]
  }
];
