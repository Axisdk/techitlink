import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {NotificationInterface} from "./core/interfaces/notification.interface";
import {NotificationTypeEnum} from "./core/enums/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notifications$: BehaviorSubject<NotificationInterface | null> = new BehaviorSubject<NotificationInterface | null>(null);

  public showNotification(notification: NotificationInterface): void {
    this.notifications$.next(notification);
  }
}
