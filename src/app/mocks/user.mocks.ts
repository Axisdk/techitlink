import {UserInterface} from "../core/interfaces/user.interface";
import {UserRoleEnum} from "../core/enums/user-role.enum";

export const userMocks: UserInterface[] = [
  {
    id: 1,
    role: UserRoleEnum.teacher,
    fname: 'Atom',
    lname: 'Mato',
    email: 'user329@test.com',
    password: 'Test123&123',
    avatar_url: 'https://32dent.ua/sites/default/files/2020-04/22_0.jpg',
  },
  {
    id: 2,
    role: UserRoleEnum.user,
    fname: 'Mary',
    lname: 'Jane',
    email: 'maryjane666@gmail.com',
    password: 'test123123',
    avatar_url: 'https://32dent.ua/sites/default/files/2020-04/22_0.jpg',
  },
  {
    id: 3,
    role: UserRoleEnum.user,
    fname: 'Jake',
    lname: 'Paul',
    email: 'jpaul@gmail.com',
    password: 'test123123',
    avatar_url: 'https://avatars.mds.yandex.net/i?id=4e3b3a880596108f026aebf4dc88f8eb202b3620-7134052-images-thumbs&n=13',
  },
  {
    id: 4,
    role: UserRoleEnum.user,
    fname: 'Kennedy',
    lname: 'Jakob',
    email: 'kennedy1986@gmail.com',
    password: 'test123123',
    avatar_url: 'https://32dent.ua/sites/default/files/2020-04/22_0.jpg',
  }
]
