import {MessageInterface} from "./message.interface";

export interface MessengerInterface {
  id: number
  avatar?: string
  name: string
  message: MessageInterface[]
}
