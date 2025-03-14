import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MessengerInterface } from "../../../core/interfaces/messenger.interface";
import { Subject, takeUntil } from "rxjs";
import { MessageModalService } from "./message-modal.service";
import { MessageComponent } from "../message/message.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {MessengerService} from "../../../core/services/messenger.service";
import {MessageInterface} from "../../../core/interfaces/message.interface";
import {UserService} from "../../../core/services/user.service";

@Component({
    selector: 'app-message-modal',
    templateUrl: './message-modal.component.html',
    imports: [
        MessageComponent,
        ReactiveFormsModule
    ]
})
export class MessageModalComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messageContainer') private _messageContainer!: ElementRef;

  public destroy$: Subject<void> = new Subject<void>();

  protected message!: MessengerInterface;
  protected companion!: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'> | null;
  public formGroup!: FormGroup;
  public isOpen: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private _messageModalService: MessageModalService,
    private _messengerService: MessengerService,
    private _userService: UserService,
    private _formBuilder: FormBuilder
  ) {}

  private _scrollToBottom(): void {
    if (!this.isOpen) return
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

  private _checkIsOpenModal() {
    this._messageModalService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen: boolean) => {
        this.isOpen = isOpen;
      });
  }

  private _getMessages() {
    this._messageModalService.message$
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: MessengerInterface | null) => {
        if (!message) return
        this.message = message
        console.log(message)

        setTimeout(() => {
          this._scrollToBottom()
        }, 0)
      })
  }

  private _getCompanionDialog() {
    this._messageModalService.companion$
      .pipe(takeUntil(this.destroy$))
      .subscribe((companion: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'> | null) => {
        if (!companion) return
        this.companion = companion

        setTimeout(() => {
          this._scrollToBottom();
        }, 0)
      });
  }

  private _setMessage(message: string): MessageInterface {
    return {
      id: new Date().getTime(),
      senderId: this._userService.getIdThisUser() ?? 0,
      message: message
    }
  }

  public toggleModal() {
    this._messageModalService.toggleModal();
  }

  public sendMessage() {
    this.isLoading = true

    if (this.formGroup.valid) {
      this._messengerService.sendMessage(this.message.id , this._setMessage(this.formGroup.value.message))
      this.isLoading = false

      setTimeout(() => {
        this._scrollToBottom()
      }, 1000)
    }

    this.isLoading = false
    this.formGroup.reset()
  }

  ngOnInit() {
    this._initForm()
    this._checkIsOpenModal()
    this._getMessages()
    this._getCompanionDialog()
  }

  ngAfterViewChecked() {
    this._scrollToBottom()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
