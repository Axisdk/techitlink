import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { CabinetComponent } from './modules/cabinet/cabinet.component';
import { CabinetInfoComponent } from './modules/cabinet/modules/cabinet-info/cabinet-info.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TokenGuard } from './core/guards/token.guard';
import { SettingsComponent } from './modules/cabinet/modules/settings/settings.component';
import { MessengerModuleComponent } from './modules/cabinet/modules/messanger/messenger.component';
import { CoursesComponent } from './modules/cabinet/modules/courses/courses.component';
import { JournalComponent } from './modules/cabinet/modules/journal/journal.component';
import { JournalDetailInfoComponent } from './modules/cabinet/modules/journal/modules/journal-detail-info/journal-detail-info.component';
import { JournalInfoComponent } from './modules/cabinet/modules/journal/modules/journal-info/journal-info.component';

export const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/auth',
		pathMatch: 'full',
	},
	{
		path: 'auth',
		component: AuthComponent,
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
				path: 'courses',
				component: CoursesComponent,
			},
			{
				path: 'messenger',
				component: MessengerModuleComponent,
			},
			{
				path: 'settings',
				component: SettingsComponent,
			},
			{
				path: 'journal',
				component: JournalComponent,
				children: [
					{
						path: '',
						component: JournalInfoComponent,
					},
					{
						path: 'info',
						component: JournalInfoComponent,
					},
					{
						path: ':id',
						component: JournalDetailInfoComponent,
					},
				],
			},
		],
	},
];
