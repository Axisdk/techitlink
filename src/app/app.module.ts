import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './modules/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { JournalDetailInfoComponent } from './modules/cabinet/modules/journal/modules/journal-detail-info/journal-detail-info.component';
import { JournalInfoComponent } from './modules/cabinet/modules/journal/modules/journal-info/journal-info.component';

@NgModule({
	declarations: [],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AuthComponent,
		RouterOutlet,
		RouterModule,
		AppComponent,
		HttpClientModule,
		JournalInfoComponent,
		JournalDetailInfoComponent,
	],
	providers: [provideHttpClient()],
	bootstrap: [AppComponent],
})
export class AppModule {}
