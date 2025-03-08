import {MessengerInterface} from "./messenger.interface";

export interface UserInterface {
  fname: string
  lname: string
  email: string
  password: string
  avatar_url: string
  message: MessengerInterface[]
}
