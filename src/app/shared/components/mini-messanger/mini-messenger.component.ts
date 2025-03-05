import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-mini-messenger',
  templateUrl: 'mini-messenger.component.html',
  standalone: true
})

export class MiniMessengerComponent implements OnInit {

  @Input() userMessages = 12

  constructor() {}

  ngOnInit() {
    console.log(123)
  }

}
