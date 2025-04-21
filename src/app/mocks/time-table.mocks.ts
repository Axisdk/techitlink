import { TimeTableInterface } from '../core/interfaces/time-table.interface';
import { TeacherEnum } from '../core/enums/teacher.enum';
import { LessonsEnum } from '../core/enums/lessons.enum';

export const TimeTableMocks: TimeTableInterface[] = [
	{
		forUser: 1,
		item: LessonsEnum.web_development,
		teacher: TeacherEnum.kupriyanov_danil,
		grade: 78,
	},
	{
		forUser: 1,
		item: LessonsEnum.web_development,
		teacher: TeacherEnum.an_vladislav,
		grade: 88,
	},
	{
		forUser: 1,
		item: LessonsEnum.frontend_development,
		teacher: TeacherEnum.kupriyanov_danil,
		grade: 92,
	},
	{
		forUser: 2,
		item: LessonsEnum.backend_development,
		teacher: TeacherEnum.an_vladislav,
		grade: 85,
	},
	{
		forUser: 2,
		item: LessonsEnum.mobile_development,
		teacher: TeacherEnum.kupriyanov_danil,
		grade: 74,
	},
	{
		forUser: 2,
		item: LessonsEnum.web_development,
		teacher: TeacherEnum.an_vladislav,
		grade: 90,
	},
	{
		forUser: 3,
		item: LessonsEnum.web_development,
		teacher: TeacherEnum.kupriyanov_danil,
		grade: 81,
	},
	{
		forUser: 3,
		item: LessonsEnum.web_development,
		teacher: TeacherEnum.an_vladislav,
		grade: 77,
	},
	{
		forUser: 3,
		item: LessonsEnum.game_development,
		teacher: TeacherEnum.kupriyanov_danil,
		grade: 83,
	},
	{
		forUser: 4,
		item: LessonsEnum.ui_ux_design,
		teacher: TeacherEnum.an_vladislav,
		grade: 89,
	},
	{
		forUser: 4,
		item: LessonsEnum.web_development,
		teacher: TeacherEnum.kupriyanov_danil,
		grade: 91,
	},
	{
		forUser: 4,
		item: LessonsEnum.web_development,
		teacher: TeacherEnum.an_vladislav,
		grade: 84,
	},
];
