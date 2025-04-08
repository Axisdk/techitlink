import { MessengerInterface } from '../core/interfaces/messenger.interface';

export const MessengersMocks: MessengerInterface[] = [
	{
		id: 1,
		participants: [1, 2],
		messages: [
			{
				id: 1,
				senderId: 1,
				message: 'Привет, Владислав!',
			},
			{
				id: 2,
				senderId: 2,
				message: 'Привет, Жансая! Как дела?',
			},
		],
	},
	{
		id: 2,
		participants: [1, 3],
		messages: [
			{
				id: 3,
				senderId: 1,
				message: 'Привет, Айдын!',
			},
			{
				id: 4,
				senderId: 3,
				message: 'Привет, Жансая! Что нового?',
			},
		],
	},
	{
		id: 3,
		participants: [1, 4],
		messages: [
			{
				id: 5,
				senderId: 1,
				message: 'Привет, Мария!',
			},
			{
				id: 6,
				senderId: 4,
				message: 'Привет, Жансая! Как успехи?',
			},
		],
	},
	{
		id: 4,
		participants: [2, 3],
		messages: [
			{
				id: 7,
				senderId: 2,
				message: 'Привет, Айдын!',
			},
			{
				id: 8,
				senderId: 3,
				message: 'Привет, Владислав! Как дела?',
			},
		],
	},
	{
		id: 5,
		participants: [2, 4],
		messages: [
			{
				id: 9,
				senderId: 2,
				message: 'Привет, Мария!',
			},
			{
				id: 10,
				senderId: 4,
				message: 'Привет, Владислав! Что нового?',
			},
		],
	},
	{
		id: 6,
		participants: [3, 4],
		messages: [
			{
				id: 11,
				senderId: 3,
				message: 'Привет, Мария!',
			},
			{
				id: 12,
				senderId: 4,
				message: 'Привет, Айдын! Как дела?',
			},
		],
	},
];
