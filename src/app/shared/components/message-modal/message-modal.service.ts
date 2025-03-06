import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {MessengerInterface} from "../../../core/interfaces/messenger.interface";

@Injectable({
  providedIn: 'root'
})

export class MessageModalService {

  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public message$: BehaviorSubject<MessengerInterface | null> = new BehaviorSubject<MessengerInterface | null>(null)

  public messenger: MessengerInterface | null = null

  constructor() {}

  public toggleModal() {
    this.isOpen$.next(!this.isOpen$.value);
  }

  public loadMessage(message: MessengerInterface) {
    this.message$.next(message)
    this.messenger = message
  }

  public sendMessage(message: string) {
    console.log(message)
    this.messenger?.message.push(
      {
        id: this.messenger?.message.length + 1,
        send: 'me',
        message: message
      }
    )

    this.message$.next(this.messenger);
  }

}
