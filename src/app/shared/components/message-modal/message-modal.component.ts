import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {MessengerInterface} from "../../../core/interfaces/messenger.interface";
import {Subject, takeUntil} from "rxjs";
import {MessageModalService} from "./message-modal.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})

export class MessageModalComponent implements OnInit, OnDestroy {

  @Input() message!: MessengerInterface

  public destroy$: Subject<void> = new Subject<void>();

  public isOpen: boolean = false

  constructor(
    private _messageModalService: MessageModalService
  ) {}

  public toggleModal() {
    this._messageModalService.toggleModal()
  }

  ngOnInit() {

    this._messageModalService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen) => {
        this.isOpen = isOpen
      })

  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
