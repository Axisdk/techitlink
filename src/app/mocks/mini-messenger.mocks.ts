import {MessengerInterface} from "../core/interfaces/messenger.interface";

export const MiniMessengerMocks: MessengerInterface[] = [
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
]
