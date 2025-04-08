import { UserRoleEnum } from '../enums/user-role.enum';

export interface UserInterface {
	id: number;
	role: UserRoleEnum;
	fname: string;
	lname: string;
	email: string;
	phone: string;
	password: string;
	avatar_url: string;
}
