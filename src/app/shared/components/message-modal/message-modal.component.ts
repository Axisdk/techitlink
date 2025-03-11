import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MessengerInterface } from "../../../core/interfaces/messenger.interface";
import { Subject, takeUntil } from "rxjs";
import { MessageModalService } from "./message-modal.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { MessageComponent } from "../message/message.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'app-message-modal',
    templateUrl: './message-modal.component.html',
    imports: [
        NgClass,
        MessageComponent,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ]
})
export class MessageModalComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messageContainer') private _messageContainer!: ElementRef;

  protected message!: MessengerInterface | null;

  public destroy$: Subject<void> = new Subject<void>();

  public isOpen: boolean = false;
  public formGroup!: FormGroup;

  constructor(
    private _messageModalService: MessageModalService,
    private _formBuilder: FormBuilder
  ) {}

  private _scrollToBottom(): void {
    try {
      this._messageContainer.nativeElement.scrollTop = this._messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Ошибка при прокрутке:', err);
    }
  }

  private _initForm() {
    this.formGroup = this._formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  public toggleModal() {
    this._messageModalService.toggleModal();
  }

  public sendMessage() {
    if (this.formGroup.valid) {
      this._messageModalService.sendMessage(this.formGroup.value.message);
      this.formGroup.reset();

      setTimeout(() => {
        this._scrollToBottom();
      }, 0);
    }
  }

  ngOnInit() {
    this._initForm();

    this._messageModalService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen) => {
        this.isOpen = isOpen;
      });

    this._messageModalService.message$
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: MessengerInterface | null) => {
        this.message = message;

        setTimeout(() => {
          this._scrollToBottom();
        }, 0);
      });
  }

  ngAfterViewChecked() {
    this._scrollToBottom();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
