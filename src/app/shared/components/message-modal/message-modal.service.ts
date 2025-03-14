import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { MessengerInterface } from "../../../core/interfaces/messenger.interface";
import { UserInterface } from "../../../core/interfaces/user.interface";
import { MessengerService } from "../../../core/services/messenger.service";

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {

  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public message$: BehaviorSubject<MessengerInterface | null> = new BehaviorSubject<MessengerInterface | null>(null);
  public companion$: BehaviorSubject<Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'> | null> =
    new BehaviorSubject<Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'> | null>(null);

  public messenger: MessengerInterface | null = null;
  protected companion!: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>;

  constructor(
    private _messengerService: MessengerService
  ) {}

  public toggleModal() {
    this.isOpen$.next(!this.isOpen$.value);
  }

  public getDialogMessages(dialogId: number) {
    this._messengerService.messenger$
      .pipe(
        filter((messengers: MessengerInterface[] | null) => !!messengers),
        map((messengers: MessengerInterface[]) =>
          messengers.find((messenger: MessengerInterface): boolean => messenger.id === dialogId) || null
        )
      )
      .subscribe((dialog: MessengerInterface | null) => {
        this.message$.next(dialog);
      });
  }

  public loadMessage(dialogId: number, companion?: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>) {
    this.getDialogMessages(dialogId);

    if (companion) {
      this.companion = companion;
      this.companion$.next(companion);
    }
  }
}
