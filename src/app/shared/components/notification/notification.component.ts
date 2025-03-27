import {Component, OnDestroy, OnInit, signal, WritableSignal} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {NotificationInterface} from "./core/interfaces/notification.interface";
import {NotificationTypeEnum} from "./core/enums/notification-type.enum";
import {NgClass} from "@angular/common";
import {NotificationService} from "./notification.service";

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
    imports: [
        NgClass
    ]
})
export class NotificationComponent implements OnInit, OnDestroy {

  protected readonly NotificationTypeEnum = NotificationTypeEnum;

  private _destroy$: Subject<void> = new Subject<void>();

  public notification!: NotificationInterface | null;
  public isVisible: WritableSignal<boolean> = signal(false);

  constructor(
    private _notificationService: NotificationService,
  ) {}

  private _onCreateNotification(): void {
    this._notificationService.notifications$
      .pipe(takeUntil(this._destroy$))
      .subscribe((notification: NotificationInterface | null) => {
        if (!notification) return
        this.notification = notification
        this.showNotification()
      })
  }

  public showNotification(): void {
    this.isVisible.update((value: boolean): boolean => !value)
    setTimeout(() => {
      this.isVisible.update((value: boolean): boolean => !value)
    }, 5000)
  }

  ngOnInit() {
    this._onCreateNotification()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete()
  }

}
