import {Component, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, WritableSignal} from "@angular/core";
import {CardComponent} from "../../../../shared/components/card/card.component";
import {MessengerMessagesComponent} from "./modules/messenger-messages/messenger-messages.component";
import {MessengerUsers} from "./modules/messenger-users/messenger-users.component";
import {UserService} from "../../../../core/services/user/user.service";
import {UserInterface} from "../../../../core/interfaces/user.interface";
import {Subject, take, takeUntil} from "rxjs";
import {FindUserComponent} from "../../../../shared/components/find-user/find-user.component";

@Component({
  selector: "app-messenger-module",
  templateUrl: "./messenger.component.html",
  imports: [
    CardComponent,
    MessengerUsers,
    MessengerMessagesComponent
  ]
})

export class MessengerModuleComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  protected user: WritableSignal<UserInterface | undefined> = signal(undefined)
  protected messageId: WritableSignal<number | undefined> = signal(undefined)
  protected companion: WritableSignal<Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'> | undefined> = signal(undefined)

  constructor(
    private _userService: UserService,
  ) {}

  private _initUser(): void {
    this._userService.user$
      .pipe(takeUntil(this._destroy$))
      .subscribe((user: UserInterface | null) => {
        if(!user) return
        this.user.set(user)
      })
  }

  ngOnInit(): void {
    this._initUser();
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
