import {MessengerInterface} from "./messenger.interface";
import {UserRoleEnum} from "../enums/user-role.enum";

export interface UserInterface {
  id: number
  role: UserRoleEnum
  fname: string
  lname: string
  email: string
  password: string
  avatar_url: string
}
