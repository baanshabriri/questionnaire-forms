import {Question} from "./question";

export interface Form {
	id: string
	name: string;
	description: string;
	questions: Question[];
}
