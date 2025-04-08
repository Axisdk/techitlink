import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	standalone: true,
})
export class CardComponent {
	@Input() title!: string;

	constructor() {}
}
