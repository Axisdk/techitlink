import { TeacherEnum } from '../enums/teacher.enum';
import { LessonsEnum } from '../enums/lessons.enum';

export interface CourseInterface {
	id: number;
	imageUrl: string;
	title: LessonsEnum;
	description: string;
	description_total: string;
	faq: {
		title: string;
		answer: string;
	}[];
	badges: string[];
	tags: string[];
	teacher: TeacherEnum;
	subscribers: number[];
}
