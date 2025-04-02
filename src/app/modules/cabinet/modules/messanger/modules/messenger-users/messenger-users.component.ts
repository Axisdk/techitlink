import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal, WritableSignal} from "@angular/core";
import {delay, Subject, takeUntil} from "rxjs";
import {MessengerInterface} from "../../../../../../core/interfaces/messenger.interface";
import {UserInterface} from "../../../../../../core/interfaces/user.interface";
import {MessengerService} from "../../../../../../core/services/messanger/messenger.service";
import {UserService} from "../../../../../../core/services/user/user.service";

@Component({
  selector: "app-messenger-users",
  templateUrl: "./messenger-users.component.html",
})
export class MessengerUsers implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>()

  @Input() user!: UserInterface | undefined
  @Output() messageId: EventEmitter<number> = new EventEmitter<number>()
  @Output() companion: EventEmitter<Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>> =
    new EventEmitter<Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>>

  protected userMessages: WritableSignal<MessengerInterface[]> = signal([])
  protected isLoading: WritableSignal<boolean> = signal(false)

  protected companionsMap: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>[] = []

  constructor(
    private _messengerService: MessengerService,
    private _userService: UserService
  ) {}

  private _getDialogs() {
    this.isLoading.update((value: boolean): boolean => !value)
    this._messengerService.getMessengers((this.user?.id ?? 0))

    setTimeout(() => {
      this._messengerService.messenger$
        .pipe(takeUntil(this._destroy$))
        .subscribe((messengers: MessengerInterface[] | null) => {
          if (!messengers) return
          this.userMessages.set(messengers)
          this._companionsUser()
          this.isLoading.update((value: boolean): boolean => !value)
        });
    }, 2000)
  }

  private _companionsUser(): void {
    if (!this.userMessages() || !this.user) return
    this.companionsMap = [];

    const uniqueCompanions: Set<number> = new Set<number>();

    this.userMessages().forEach((message: MessengerInterface) => {
      const companionId: number | undefined = message.participants.find(
        (id: number): boolean => id !== (this.user?.id ?? 0)
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

  protected getFullNameCompanion(companion: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>) {
    if (!companion) return ''
    return companion.fname + ' ' +  companion.lname
  }

  protected getLastMessage(messages: MessengerInterface): string {
    if (!messages) return ''
    return messages.messages[messages.messages.length - 1].message
  }

  protected openMessage(messageId: number, companion: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'>): void {
    this.messageId.emit(messageId)
    this.companion.emit(companion)
  }

  ngOnInit(): void {
    if(!this.user) return
    this._getDialogs()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }

}
