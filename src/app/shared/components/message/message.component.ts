import {Component, Input} from "@angular/core";
import {MessageInterface} from "../../../core/interfaces/message.interface";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  standalone: true,
})

export class MessageComponent {

  @Input() message!: MessageInterface;

  constructor() {}

}
