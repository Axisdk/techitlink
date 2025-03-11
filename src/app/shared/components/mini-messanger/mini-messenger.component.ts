import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {MessengerInterface} from "../../../core/interfaces/messenger.interface";
import {NgForOf, NgIf} from "@angular/common";
import {MessageModalComponent} from "../message-modal/message-modal.component";
import {BehaviorSubject, takeUntil} from "rxjs";
import {MessageModalService} from "../message-modal/message-modal.service";
import {CardComponent} from "../card/card.component";

@Component({
    selector: 'app-mini-messenger',
    templateUrl: 'mini-messenger.component.html',
    imports: [
        NgForOf,
        MessageModalComponent,
        CardComponent,
        NgIf
    ]
})

export class MiniMessengerComponent implements OnInit, OnDestroy {

  @Input() userMessages!: MessengerInterface[]

  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isLoading: boolean = false
  public loadingStates: { [key: string]: boolean } = {};


  constructor(
    private _messageModalService: MessageModalService
  ) {}

  public openMessage(message: MessengerInterface) {
    // Включаем загрузку для конкретного сообщения
    this.loadingStates[message.id] = true;

    setTimeout(() => {
      this._messageModalService.toggleModal();
      this._messageModalService.loadMessage(message);
      this.loadingStates[message.id] = false;
    }, 1500);
  }

  ngOnInit() {
    this.isLoading = true
    setTimeout(() => {
      if (!this.userMessages) return
      this.isLoading = false
    }, 3000)

    this._messageModalService.isOpen$
      .pipe(takeUntil(this.isOpen$))
      .subscribe((isOpen) => this.isOpen$.next(isOpen))
  }

  ngOnDestroy() {
    this.isOpen$.next(false)
    this.isOpen$.complete()
  }

}
