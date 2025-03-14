import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {MessengerInterface} from "../../../core/interfaces/messenger.interface";
import {MessageModalComponent} from "../message-modal/message-modal.component";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {MessageModalService} from "../message-modal/message-modal.service";
import {CardComponent} from "../card/card.component";
import {MessengerService} from "../../../core/services/messenger.service";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {UserService} from "../../../core/services/user.service";
import {MessageInterface} from "../../../core/interfaces/message.interface";

@Component({
    selector: 'app-mini-messenger',
    templateUrl: 'mini-messenger.component.html',
    imports: [
        MessageModalComponent,
        CardComponent
    ]
})

export class MiniMessengerComponent implements OnInit, OnDestroy {

  @Input() user!: UserInterface

  private _destroy$: Subject<void> = new Subject<void>();

  protected isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  protected isLoading: boolean = false
  protected loadingStates: { [key: string]: boolean } = {};
  protected userMessages!: MessengerInterface[]
  public companionsMap: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>[] = []

  constructor(
    private _messengerService: MessengerService,
    private _messageModalService: MessageModalService,
    private _userService: UserService
  ) {}

  private _getDialogs() {
    this.isLoading = true
    this._messengerService.getMessengers(this.user.id)

    setTimeout(() => {
      this._messengerService.messenger$
        .pipe(takeUntil(this._destroy$))
        .subscribe((messengers: MessengerInterface[] | null) => {
          if (!messengers) return
          this.userMessages = messengers
          this._companionsUser()
          this.isLoading = false
        });
    }, 2000);
  }

  private openMessageModal() {
    this._messageModalService.isOpen$
      .pipe(takeUntil(this.isOpen$))
      .subscribe((isOpen: boolean) => this.isOpen$.next(isOpen))
  }

  private _companionsUser() {
    this.companionsMap = [];

    const uniqueCompanions: Set<number> = new Set<number>();

    this.userMessages.forEach((message: MessengerInterface) => {
      const companionId: number | undefined = message.participants.find(
        (id: number): boolean => id !== this.user.id
      );

      if (companionId && !uniqueCompanions.has(companionId)) {
        uniqueCompanions.add(companionId);

        const user: UserInterface | null = this._userService.getUser(companionId);

        if (user) {
          this.companionsMap.push({
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            avatar_url: user.avatar_url,
          });
        }
      }
    });
  }

  public getFullNameCompanion(companion: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>) {
    if (!companion) return ''
    return companion.fname + ' ' +  companion.lname
  }

  public getLastMessage(messages: MessengerInterface): string {
    if (!messages) return ''
    return messages.messages[messages.messages.length - 1].message
  }

  public openMessage(message: MessengerInterface, companion: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>) {
    this.loadingStates[message.id] = true;

    setTimeout(() => {
      this._messageModalService.toggleModal();
      this._messageModalService.loadMessage(message.id, companion);
      this.loadingStates[message.id] = false;
    }, 1500);
  }

  ngOnInit() {
    this._getDialogs()
    this.openMessageModal()
  }

  ngOnDestroy() {
    this.isOpen$.next(false)
    this.isOpen$.complete()
    this._destroy$.next()
    this._destroy$.complete()
  }

}
