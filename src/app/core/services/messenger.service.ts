import {Injectable} from "@angular/core";
import {messengerLocalStorage} from "../consts/messenger-localstorage";
import {MessengerInterface} from "../interfaces/messenger.interface";
import {MessengersMocks} from "../../mocks/messenger.mocks";
import {BehaviorSubject} from "rxjs";
import {UserService} from "./user.service";
import {UserInterface} from "../interfaces/user.interface";
import {MessageInterface} from "../interfaces/message.interface";

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  protected readonly MessengerMocks: MessengerInterface[] = MessengersMocks

  public messenger$: BehaviorSubject<MessengerInterface[] | null> = new BehaviorSubject<MessengerInterface[] | null>(null)

  constructor(
    private _userService: UserService
  ) {}

  private setMessengersInLocalStorage(messenger: MessengerInterface[]) {
    localStorage.setItem(messengerLocalStorage, JSON.stringify(messenger))
  }

  private getMessengerFromLocalStorage(): MessengerInterface[] {
    const messenger: string | null = localStorage.getItem(messengerLocalStorage)
    if (messenger) return JSON.parse(messenger)

    this.setMessengersInLocalStorage(this.MessengerMocks)
    return this.MessengerMocks
  }


  public sendMessage(dialogId: number, newMessage: MessageInterface) {
    const allMessengers: MessengerInterface[] = this.getMessengerFromLocalStorage();
    const dialogIndex: number = allMessengers.findIndex(
      (messenger: MessengerInterface): boolean => messenger.id === dialogId
    );

    if(dialogIndex === -1) return

    const updatedDialog: MessengerInterface = { ...allMessengers[dialogIndex] };
    updatedDialog.messages = [...updatedDialog.messages, newMessage];
    allMessengers[dialogIndex] = updatedDialog;

    this.setMessengersInLocalStorage(allMessengers);

    const filteredMessengers: MessengerInterface[] = allMessengers.filter((messenger: MessengerInterface) =>
      messenger.participants.includes(this._userService.getIdThisUser() || 0)
    );

    this.messenger$.next(filteredMessengers);
  }

  public getMessengers(userId: number): void {
    const messengers: MessengerInterface[] = this.getMessengerFromLocalStorage();

    const filteredMessenger: MessengerInterface[] = messengers.filter((messenger: MessengerInterface) =>
      messenger.participants.includes(userId)
    );

    this.messenger$.next(filteredMessenger);
  }

}
