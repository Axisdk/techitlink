import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {MessageInterface} from "../../../core/interfaces/message.interface";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {UserService} from "../../../core/services/user.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  standalone: true,
})

export class MessageComponent implements OnInit, OnDestroy {

  @Input() message!: MessageInterface

  private _destroy$: Subject<void> = new Subject<void>();

  public user!: UserInterface

  constructor(
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._destroy$))
      .subscribe((user: UserInterface | null)  => {
        if (!user) return
        this.user = user;
      })
  }

  ngOnDestroy() {
    this._destroy$.next()
    this._destroy$.complete()
  }

}
