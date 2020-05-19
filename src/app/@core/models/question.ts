import {Form} from "./form";

export interface Question {
	id: string;
	question: string;
	choice: string[];
	type: string;
	compulsory: boolean;
	form_id: string;
	form: Form;
	answer: string;
}
