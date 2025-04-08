import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { CabinetComponent } from './modules/cabinet/cabinet.component';
import { CabinetInfoComponent } from './modules/cabinet/modules/cabinet-info/cabinet-info.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TokenGuard } from './core/guards/token.guard';
import { SettingsComponent } from './modules/cabinet/modules/settings/settings.component';
import { MessengerModuleComponent } from './modules/cabinet/modules/messanger/messenger.component';

export const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/auth',
		pathMatch: 'full',
	},
	{
		path: 'auth',
		component: AuthComponent,
		canActivate: [TokenGuard],
	},
	{
		path: 'cabinet',
		component: CabinetComponent,
		canActivate: [TokenGuard, AuthGuard],
		children: [
			{
				path: '',
				redirectTo: 'info',
				pathMatch: 'full',
			},
			{
				path: 'info',
				component: CabinetInfoComponent,
			},
			{
				path: 'messenger',
				component: MessengerModuleComponent,
			},
			{
				path: 'settings',
				component: SettingsComponent,
			},
		],
	},
];
