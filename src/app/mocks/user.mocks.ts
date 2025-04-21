import { UserInterface } from '../core/interfaces/user.interface';
import { UserRoleEnum } from '../core/enums/user-role.enum';

export const userMocks: UserInterface[] = [
	{
		id: 1,
		role: UserRoleEnum.user,
		fname: 'Жансая',
		lname: 'Абдыкалык',
		email: 'user329@test.com',
		phone: '+77073355212',
		password: 'Test123&123',
		avatar_url: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rainy.img?w=1920&h=1091&m=4&q=89',
	},
	{
		id: 2,
		role: UserRoleEnum.teacher,
		fname: 'Владислав',
		lname: 'Ан',
		email: 'maryjane666@gmail.com',
		phone: '+77072121345',
		password: 'test123123',
		avatar_url: 'https://32dent.ua/sites/default/files/2020-04/22_0.jpg',
	},
	{
		id: 3,
		role: UserRoleEnum.user,
		fname: 'Айдын',
		lname: 'Кельбетов',
		email: 'jpaul@gmail.com',
		phone: '+77077689543',
		password: 'test123123',
		avatar_url:
			'https://avatars.mds.yandex.net/i?id=4e3b3a880596108f026aebf4dc88f8eb202b3620-7134052-images-thumbs&n=13',
	},
	{
		id: 4,
		role: UserRoleEnum.user,
		fname: 'Мария',
		lname: 'Марьянова',
		email: 'kennedy1986@gmail.com',
		phone: '+77075553212',
		password: 'test123123',
		avatar_url: 'https://i.pinimg.com/originals/7a/39/e9/7a39e9ae2da1cb8ad319d406539cd627.jpg',
	},
	{
		id: 5,
		role: UserRoleEnum.user,
		fname: 'Дмитрий',
		lname: 'Смирнов',
		email: 'dmitry.smirnov@example.com',
		phone: '+79031234567',
		password: 'securepass123',
		avatar_url:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
	},
	{
		id: 6,
		role: UserRoleEnum.admin,
		fname: 'Александр',
		lname: 'Петров',
		email: 'alex.petrov@company.com',
		phone: '+79165554433',
		password: 'admin@1234',
		avatar_url:
			'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
	},
	{
		id: 7,
		role: UserRoleEnum.teacher,
		fname: 'Данил',
		lname: 'Куприянов',
		email: 'danil@gmail.com',
		phone: '+79165554433',
		password: '1234test1234',
		avatar_url:
			'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
	},
	{
		id: 9,
		role: UserRoleEnum.user,
		fname: 'Анна',
		lname: 'Соколова',
		email: 'anna.sokolova@gmail.com',
		phone: '+79034448899',
		password: 'anna_sokol',
		avatar_url:
			'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
	},
];
