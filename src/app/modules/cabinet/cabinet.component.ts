import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { TopLineComponent } from '../../shared/components/top-line/top-line.component';
import { MessengerService } from '../../core/services/messanger/messenger.service';
import { MessengerHelperService } from '../../core/services/messanger/messenger-helper.service';

@Component({
	selector: 'app-cabinet',
	templateUrl: './cabinet.component.html',
	imports: [MenuComponent, TopLineComponent, RouterOutlet],
	providers: [MessengerService, MessengerHelperService],
})
export class CabinetComponent {
	constructor() {}
}
