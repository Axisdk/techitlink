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
    message: [
      {
        id: 1,
        avatar: 'https://avatars.mds.yandex.net/get-ydo/1523397/2a00000170b58d98c2310ee5615f9c8e563d/diploma',
        name: 'Абдыкалык Жансая',
        message: [
          {
            id: 1,
            send: 'me',
            message: 'Привет'
          },
          {
            id: 2,
            send: 'teacher',
            message: 'Привет'
          },
          {
            id: 3,
            send: 'me',
            message: 'Мне нужна помощь'
          },
          {
            id: 4,
            send: 'teacher',
            message: 'Какая, вам нужна помошь?'
          },
          {
            id: 1,
            send: 'me',
            message: 'Привет'
          },
          {
            id: 2,
            send: 'teacher',
            message: 'Привет'
          },
          {
            id: 3,
            send: 'me',
            message: 'Мне нужна помощь'
          },
          {
            id: 4,
            send: 'teacher',
            message: 'Какая, вам нужна помошь?'
          },
          {
            id: 1,
            send: 'me',
            message: 'Привет'
          },
          {
            id: 2,
            send: 'teacher',
            message: 'Привет'
          },
          {
            id: 3,
            send: 'me',
            message: 'Мне нужна помощь'
          },
          {
            id: 4,
            send: 'teacher',
            message: 'Какая, вам нужна помошь?'
          }
        ]
      },
      {
        "id": 2,
        "avatar": "https://avatars.mds.yandex.net/i?id=d00bc7d3196fb64b2fa7ba04cc618fd4_l-4910248-images-thumbs&n=13",
        "name": "Ан Владислав",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Здравствуйте"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Здравствуйте, Иван"
          },
          {
            "id": 3,
            "send": "me",
            "message": "У меня вопрос по домашнему заданию"
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Какой именно вопрос?"
          }
        ]
      },
      {
        "id": 3,
        "avatar": "https://i.ytimg.com/vi/7219n4MKiNA/maxresdefault.jpg?v=5c6f9ec8",
        "name": "Кельбетов Айдын",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Добрый день"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Добрый день, Анна"
          },
          {
            "id": 3,
            "send": "me",
            "message": "Я не поняла тему урока"
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Какая именно тема?"
          }
        ]
      },
      {
        "id": 4,
        "avatar": "https://example.com/avatar4.jpg",
        "name": "Иванова Мария",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Здравствуйте!"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Здравствуйте, Мария! Чем могу помочь?"
          },
          {
            "id": 3,
            "send": "me",
            "message": "Я не могу найти материалы по прошлому уроку."
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Конечно, я отправлю вам ссылку на материалы."
          },
          {
            "id": 5,
            "send": "me",
            "message": "Спасибо большое!"
          },
          {
            "id": 6,
            "send": "teacher",
            "message": "Не за что! Если будут вопросы, обращайтесь."
          }
        ]
      },
    ]
  },
  {
    id: 2,
    role: UserRoleEnum.user,
    fname: 'Mary',
    lname: 'Jane',
    email: 'maryjane666@gmail.com',
    password: 'test123123',
    avatar_url: 'https://32dent.ua/sites/default/files/2020-04/22_0.jpg',
    message: [
      {
        "id": 4,
        "avatar": "https://example.com/avatar4.jpg",
        "name": "Иванова Мария",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Здравствуйте!"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Здравствуйте, Мария! Чем могу помочь?"
          },
          {
            "id": 3,
            "send": "me",
            "message": "Я не могу найти материалы по прошлому уроку."
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Конечно, я отправлю вам ссылку на материалы."
          },
          {
            "id": 5,
            "send": "me",
            "message": "Спасибо большое!"
          },
          {
            "id": 6,
            "send": "teacher",
            "message": "Не за что! Если будут вопросы, обращайтесь."
          }
        ]
      },
      {
        "id": 3,
        "avatar": "https://i.ytimg.com/vi/7219n4MKiNA/maxresdefault.jpg?v=5c6f9ec8",
        "name": "Кельбетов Айдын",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Добрый день"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Добрый день, Анна"
          },
          {
            "id": 3,
            "send": "me",
            "message": "Я не поняла тему урока"
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Какая именно тема?"
          }
        ]
      },
    ]
  },
  {
    id: 3,
    role: UserRoleEnum.user,
    fname: 'Jake',
    lname: 'Paul',
    email: 'jpaul@gmail.com',
    password: 'test123123',
    avatar_url: 'https://avatars.mds.yandex.net/i?id=4e3b3a880596108f026aebf4dc88f8eb202b3620-7134052-images-thumbs&n=13',
    message: [
      {
        "id": 5,
        "avatar": "https://example.com/avatar5.jpg",
        "name": "Петров Алексей",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Добрый вечер!"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Добрый вечер, Алексей! Что вас беспокоит?"
          },
          {
            "id": 3,
            "send": "me",
            "message": "Я не понял, как решать задачу №3."
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Давайте разберем её вместе. На каком шаге у вас возникли трудности?"
          },
          {
            "id": 5,
            "send": "me",
            "message": "На шаге с формулой."
          },
          {
            "id": 6,
            "send": "teacher",
            "message": "Хорошо, я объясню. Формула выглядит так: ..."
          }
        ]
      },
      {
        "id": 3,
        "avatar": "https://i.ytimg.com/vi/7219n4MKiNA/maxresdefault.jpg?v=5c6f9ec8",
        "name": "Кельбетов Айдын",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Добрый день"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Добрый день, Анна"
          },
          {
            "id": 3,
            "send": "me",
            "message": "Я не поняла тему урока"
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Какая именно тема?"
          }
        ]
      },
    ]
  },
  {
    id: 4,
    role: UserRoleEnum.user,
    fname: 'Kennedy',
    lname: 'Jakob',
    email: 'kennedy1986@gmail.com',
    password: 'test123123',
    avatar_url: 'https://32dent.ua/sites/default/files/2020-04/22_0.jpg',
    message: [
      {
        "id": 6,
        "avatar": "https://example.com/avatar6.jpg",
        "name": "Смирнова Ольга",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Привет!"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Привет, Ольга! Как дела?"
          },
          {
            "id": 3,
            "send": "me",
            "message": "Всё хорошо, спасибо! А у вас?"
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Тоже всё отлично. Чем могу помочь?"
          },
          {
            "id": 5,
            "send": "me",
            "message": "Я хотела уточнить насчёт дедлайна проекта."
          },
          {
            "id": 6,
            "send": "teacher",
            "message": "Дедлайн — следующая пятница. Успеваете?"
          },
          {
            "id": 7,
            "send": "me",
            "message": "Думаю, да. Спасибо!"
          },
          {
            "id": 8,
            "send": "teacher",
            "message": "Удачи! Если что-то понадобится, пишите."
          }
        ]
      },
      {
        "id": 3,
        "avatar": "https://i.ytimg.com/vi/7219n4MKiNA/maxresdefault.jpg?v=5c6f9ec8",
        "name": "Кельбетов Айдын",
        "message": [
          {
            "id": 1,
            "send": "me",
            "message": "Добрый день"
          },
          {
            "id": 2,
            "send": "teacher",
            "message": "Добрый день, Анна"
          },
          {
            "id": 3,
            "send": "me",
            "message": "Я не поняла тему урока"
          },
          {
            "id": 4,
            "send": "teacher",
            "message": "Какая именно тема?"
          }
        ]
      },
    ]
  }
]
