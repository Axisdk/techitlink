import {UserInterface} from "../core/interfaces/user.interface";
import {UserRoleEnum} from "../core/enums/user-role.enum";

export const userMocks: UserInterface[] = [
  {
    id: 1,
    role: UserRoleEnum.teacher,
    fname: 'Жансая',
    lname: 'Абдыкалык',
    email: 'user329@test.com',
    password: 'Test123&123',
    avatar_url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rainy.img?w=1920&h=1091&m=4&q=89',
  },
  {
    id: 2,
    role: UserRoleEnum.user,
    fname: 'Владислав',
    lname: 'Ан',
    email: 'maryjane666@gmail.com',
    password: 'test123123',
    avatar_url: 'https://32dent.ua/sites/default/files/2020-04/22_0.jpg',
  },
  {
    id: 3,
    role: UserRoleEnum.user,
    fname: 'Айдын',
    lname: 'Кельбетов',
    email: 'jpaul@gmail.com',
    password: 'test123123',
    avatar_url: 'https://avatars.mds.yandex.net/i?id=4e3b3a880596108f026aebf4dc88f8eb202b3620-7134052-images-thumbs&n=13',
  },
  {
    id: 4,
    role: UserRoleEnum.user,
    fname: 'Мария',
    lname: 'Марьянова',
    email: 'kennedy1986@gmail.com',
    password: 'test123123',
    avatar_url: 'https://i.pinimg.com/originals/7a/39/e9/7a39e9ae2da1cb8ad319d406539cd627.jpg',
  }
]
