import { MessageInterface } from './message.interface';

export interface MessengerInterface {
	id: number;
	participants: number[];
	messages: MessageInterface[];
}
