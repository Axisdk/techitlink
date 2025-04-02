import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, signal,
  SimpleChanges,
  ViewChild, WritableSignal
} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {MessengerInterface} from "../../../../../../core/interfaces/messenger.interface";
import {UserInterface} from "../../../../../../core/interfaces/user.interface";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessengerService} from "../../../../../../core/services/messanger/messenger.service";
import {UserService} from "../../../../../../core/services/user/user.service";
import {NotificationService} from "../../../../../../shared/components/notification/notification.service";
import {MessageInterface} from "../../../../../../core/interfaces/message.interface";
import {NotificationTypeEnum} from "../../../../../../shared/components/notification/core/enums/notification-type.enum";
import {MessageComponent} from "../../../../../../shared/components/message/message.component";
import {filter, map} from "rxjs/operators";

@Component({
  selector: "app-messenger-messages",
  templateUrl: "./messenger-messages.component.html",
  imports: [
    MessageComponent,
    ReactiveFormsModule
  ]
})
export class MessengerMessagesComponent implements OnChanges, OnInit, OnDestroy, AfterViewChecked {

  @Input() messageId!: number | undefined
  @Input() companion!: Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname'> | undefined

  @ViewChild('messageContainer') private _messageContainer!: ElementRef

  public destroy$: Subject<void> = new Subject<void>()

  protected message: WritableSignal<MessengerInterface | null> = signal(null)
  public form!: FormGroup
  public isOpen: boolean = false
  public isLoading: WritableSignal<boolean> = signal(false)
  public isLoadingMessage: WritableSignal<boolean> = signal(false)

  constructor(
    private _messengerService: MessengerService,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService
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
    this.form = this._formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  private _loadMessage(): void {
    if (!this.messageId) return

    this.isLoading.set(true)
    this._messengerService.messenger$
      .pipe(
        filter((messengers: MessengerInterface[] | null) => !!messengers),
        map((messengers: MessengerInterface[]) =>
          messengers.find((messenger: MessengerInterface): boolean  => this.messageId === messenger.id
        )
      ))
      .subscribe((messenger: MessengerInterface | undefined) => {
        if (!messenger) return
        setTimeout(() => {
          this.message.set(messenger)
          this.isLoading.set(false)
        }, 1000)
      })
  }

  private _loadMessenger(): void {
    if (!this.messageId && !this.companion) return
    this._loadMessage()
  }

  private _setMessage(message: string): MessageInterface {
    return {
      id: new Date().getTime(),
      senderId: this._userService.getIdThisUser() ?? 0,
      message: message
    }
  }

  public sendMessage(): void {
    const currentMessage: MessengerInterface | null = this.message()
    if (!currentMessage) return

    this.isLoadingMessage.set(true)
    this.form.get('message')?.disabled

    setTimeout(() => {

      if (!this.form.valid) {
        this.isLoadingMessage.set(false)
        this._notificationService.showNotification({
          type: NotificationTypeEnum.error,
          title: 'Ошибка',
          message: 'Ошибка в отправке сообщения, неправильный формат текста'
        })
        return
      }

      this._messengerService.sendMessage(currentMessage.id , this._setMessage(this.form.value.message))
      this.isLoadingMessage.set(false)
      this.form.get('message')?.enable()
      this.form.reset()
      this._scrollToBottom()
    }, 1000)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['messageId'] && changes['companion']) {
      this._loadMessenger()
    }
  }

  ngOnInit() {
    this._initForm()
  }

  ngAfterViewChecked() {
    this._scrollToBottom()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
