import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
	selector: '[clickOutside]',
	standalone: true,
})
export class ClickOutsideDirective {
	@Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();

	constructor(private elementRef: ElementRef) {}

	@HostListener('document:click', ['$event.target'])
	public onClick(targetElement: HTMLElement): void {
		const clickedInside = this.elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.clickOutside.emit();
		}
	}
}
