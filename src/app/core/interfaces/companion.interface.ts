import { UserInterface } from './user.interface';

export type CompanionInterface = Pick<UserInterface, 'id' | 'avatar_url' | 'fname' | 'lname' | 'role'>;
