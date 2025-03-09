import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {NotificationInterface} from "./core/interfaces/notification.interface";
import {NotificationTypeEnum} from "./core/enums/notification-type.enum";
import {NgClass, NgIf} from "@angular/common";
import {NotificationService} from "./notification.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  imports: [
    NgIf,
    NgClass
  ],
  standalone: true,
})
export class NotificationComponent implements OnInit, OnDestroy {

  protected readonly NotificationTypeEnum = NotificationTypeEnum;

  private _destroy$: Subject<void> = new Subject<void>();

  public notification!: NotificationInterface | null;
  public isVisible: boolean = false;

  constructor(
    private _notificationService: NotificationService,
  ) {}

  public showNotification(): void {
    this.isVisible = true
    setTimeout(() => {
      this.hideNotification()
    }, 5000)
  }

  public hideNotification(): void {
    this.isVisible = false
  }

  ngOnInit() {
    this._notificationService.notifications$
      .pipe(takeUntil(this._destroy$))
      .subscribe((notification: NotificationInterface | null) => {
        if (!notification) return
        this.notification = notification
        this.showNotification()
      })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
