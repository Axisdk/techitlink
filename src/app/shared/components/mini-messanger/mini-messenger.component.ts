import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {MessengerInterface} from "../../../core/interfaces/messenger.interface";
import {NgForOf} from "@angular/common";
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
    CardComponent
  ],
  standalone: true
})

export class MiniMessengerComponent implements OnInit, OnDestroy {

  @Input() userMessages!: MessengerInterface[]

  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private _messageModalService: MessageModalService
  ) {}

  public openMessage(message: MessengerInterface) {
    this._messageModalService.toggleModal()
    this._messageModalService.loadMessage(message)
  }

  ngOnInit() {

    this._messageModalService.isOpen$
      .pipe(takeUntil(this.isOpen$))
      .subscribe((isOpen) => this.isOpen$.next(isOpen))

  }

  ngOnDestroy() {
    this.isOpen$.next(false)
    this.isOpen$.complete()
  }

}
