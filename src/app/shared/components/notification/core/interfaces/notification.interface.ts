import {NotificationTypeEnum} from "../enums/notification-type.enum";

export interface NotificationInterface {
  type?: NotificationTypeEnum
  title: string
  message: string
}
