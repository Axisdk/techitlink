import { LessonsEnum } from '../core/enums/lessons.enum';
import { TeacherEnum } from '../core/enums/teacher.enum';
import { CourseInterface } from '../core/interfaces/course.interface';

export const courses: CourseInterface[] = [
	{
		id: 1,
		imageUrl:
			'https://img.freepik.com/free-vector/mobile-wireframe-concept-illustration_114360-5214.jpg?t=st=1745260332~exp=1745263932~hmac=0021ac4c61c2bd4f13c0b54893abd02939a33360c5f571d80487c3eaddd35f11&w=740',
		title: LessonsEnum.web_development,
		description:
			'Научитесь создавать современные веб-приложения с нуля. Изучите HTML, CSS и JavaScript на практике. Освойте работу с DOM и асинхронными запросами. Подготовим к работе над реальными проектами.',
		description_total:
			'Курс по веб-разработке рассчитан на начинающих и охватывает полный спектр основ — от базовой структуры HTML и стилей CSS до динамики на JavaScript. Вы узнаете, как взаимодействовать с DOM-элементами, делать асинхронные запросы и строить адаптивные интерфейсы. Практические задания и мини-проекты помогут закрепить навыки. Финальным этапом станет создание полноценного проекта с отзывами, валидацией форм и анимацией.',
		faq: [
			{
				title: 'Нужно ли знание программирования для начала?',
				answer: 'Нет, курс подходит для новичков и начинается с самых основ.',
			},
			{
				title: 'Будет ли итоговый проект?',
				answer: 'Да, каждый участник создаст полноценное веб-приложение.',
			},
		],
		badges: ['Рекомендуется'],
		tags: ['HTML', 'CSS', 'JavaScript'],
		teacher: TeacherEnum.kupriyanov_danil,
		subscribers: [4],
	},
	{
		id: 2,
		imageUrl:
			'https://img.freepik.com/premium-photo/hand-holds-code-element-concept-programming-3d-render-illustration_567294-1953.jpg?w=740',
		title: LessonsEnum.frontend_development,
		description:
			'Погрузитесь в мир современных фронтенд-фреймворков. Научитесь создавать SPA-приложения на Angular и TypeScript. Узнайте лучшие практики state-менеджмента. Оптимизируйте производительность ваших приложений.',
		description_total:
			'Курс предназначен для тех, кто уже знаком с основами JavaScript и хочет углубиться в современную разработку интерфейсов. Вы научитесь строить модульную архитектуру на Angular, использовать RxJS для реактивного программирования, работать с сервисами, роутингом, формами и lazy loading. Также будут рассмотрены инструменты тестирования и деплоя приложений.',
		faq: [
			{
				title: 'Можно ли пройти курс без опыта в Angular?',
				answer: 'Желателен опыт в JavaScript, Angular будет изучаться с нуля.',
			},
			{
				title: 'Какие проекты будут в курсе?',
				answer: 'Вы создадите полноценное SPA-приложение с аутентификацией и API.',
			},
		],
		badges: ['Новое'],
		tags: ['Angular', 'TypeScript'],
		teacher: TeacherEnum.an_vladislav,
		subscribers: [9],
	},
	{
		id: 3,
		imageUrl:
			'https://img.freepik.com/free-vector/new-app-development-desktop_23-2148684987.jpg?t=st=1745260469~exp=1745264069~hmac=413b19a3c71da0d1db5f8be053850748554ac718ae1d9b03131028113cc2bc29&w=740',
		title: LessonsEnum.backend_development,
		description:
			'Освойте создание серверной части приложений на Java Spring. Научитесь проектировать RESTful API и работать с MongoDB. Узнайте про безопасность и масштабирование backend-систем. Практика с реальными кейсами.',
		description_total:
			'Курс охватывает основы серверной разработки с использованием Java и Spring Boot. Учащиеся научатся строить RESTful API, использовать базы данных (MongoDB), обеспечивать безопасность JWT и OAuth2. Рассматриваются архитектурные подходы, деплой, логгирование, мониторинг и масштабирование приложений.',
		faq: [
			{
				title: 'Будет ли покрытие темы безопасности?',
				answer: 'Да, вы научитесь реализовывать аутентификацию и авторизацию.',
			},
			{
				title: 'Насколько глубоко изучается база данных?',
				answer: 'MongoDB рассматривается на уровне интеграции с Spring Data и построения запросов.',
			},
		],
		badges: [],
		tags: ['Java Spring', 'MongoDB', 'API'],
		teacher: TeacherEnum.kupriyanov_danil,
		subscribers: [9],
	},
	{
		id: 4,
		imageUrl:
			'https://img.freepik.com/free-photo/smartphone-with-user-interface-concept_52683-104212.jpg?t=st=1745260492~exp=1745264092~hmac=fe5bdf6c925e63fb11940d0381952d44b5c182baafd863cc0d9b3ad0d0d82c64&w=826',
		title: LessonsEnum.mobile_development,
		description:
			'Создавайте кроссплатформенные приложения на Flutter. Изучите Dart и все аспекты мобильной разработки. Научитесь публиковать приложения в AppStore и Google Play. Работа с камерой, геолокацией и API.',
		description_total:
			'В рамках курса вы освоите основы языка Dart и разработку на Flutter — популярном фреймворке от Google. На практике научитесь создавать адаптивные интерфейсы, подключать сторонние библиотеки, работать с REST API, Firebase и системами навигации. Финальная часть курса — публикация вашего приложения в сторах.',
		faq: [
			{
				title: 'Можно ли пройти курс без опыта в мобильной разработке?',
				answer: 'Да, все объясняется пошагово и с нуля.',
			},
			{
				title: 'Какие темы покрываются в части публикации?',
				answer: 'Вы научитесь собирать релизные сборки, настраивать и публиковать их в AppStore и Google Play.',
			},
		],
		badges: ['Хит'],
		tags: ['Flutter', 'iOS', 'Android'],
		teacher: TeacherEnum.an_vladislav,
		subscribers: [4],
	},
	{
		id: 5,
		imageUrl:
			'https://img.freepik.com/free-vector/hand-drawn-flat-design-metaverse-illustration_23-2149245320.jpg?t=st=1745260523~exp=1745264123~hmac=4b1aa0c2e1b845615fb80244cc83f1bb7fed78c71acd126a715a7fa254922a20&w=740',
		title: LessonsEnum.game_development,
		description:
			'Разрабатывайте 2D/3D игры на Unity с нуля. Изучите C# и принципы геймдизайна. Создадите собственную игру с физикой и AI. Узнайте про монетизацию и публикацию игр на платформах.',
		description_total:
			'Этот курс охватывает весь цикл разработки игр в Unity. От написания скриптов на C# и создания игровых объектов до реализации физики, звука и AI. Вы узнаете, как разрабатывать уровни, создавать интерактивность, подключать UI-элементы и адаптировать игры под разные платформы. Также рассмотрены способы монетизации и продвижения игр.',
		faq: [
			{
				title: 'Нужен ли опыт в программировании?',
				answer: 'Базовые знания C# будут полезны, но необязательны.',
			},
			{
				title: 'Можно ли опубликовать свою игру после курса?',
				answer: 'Да, будет блок по публикации на Google Play и itch.io.',
			},
		],
		badges: ['Экспериментальный'],
		tags: ['Unity', 'C#', 'Game Design'],
		teacher: TeacherEnum.kupriyanov_danil,
		subscribers: [4],
	},
	{
		id: 6,
		imageUrl: 'https://img.freepik.com/premium-photo/3d-uiux-mobile-screen-with-user-elements_621266-29.jpg?w=740',
		title: LessonsEnum.ui_ux_design,
		description:
			'Освойте Figma и принципы создания интуитивных интерфейсов. Изучите UX-исследования и прототипирование. Научитесь презентовать свои дизайн-решения. Подготовка портфолио для трудоустройства.',
		description_total:
			'Курс даст полное понимание UI/UX-дизайна: от сбора требований и построения пользовательских сценариев до проектирования макетов в Figma. Вы научитесь проводить UX-исследования, строить прототипы, тестировать их и презентовать клиентам. Итогом станет портфолио из нескольких кейсов.',
		faq: [
			{
				title: 'Какие инструменты мы будем использовать?',
				answer: 'Основной инструмент — Figma, также рассмотрим FigJam и UXPin.',
			},
			{
				title: 'Будут ли домашние задания?',
				answer: 'Да, каждое занятие сопровождается практикой и мини-проектами.',
			},
		],
		badges: ['Популярный', 'Скоро старт'],
		tags: ['Figma', 'UI/UX'],
		teacher: TeacherEnum.an_vladislav,
		subscribers: [9],
	},
];
