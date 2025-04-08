import { LessonsEnum } from '../enums/lessons.enum';
import { TeacherEnum } from '../enums/teacher.enum';

export interface TimeTableInterface {
	forUser: number;
	item: LessonsEnum;
	teacher: TeacherEnum;
	grade: number;
}
