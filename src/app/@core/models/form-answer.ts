import {Answer} from "./answer";

export interface FormAnswer {
	form_id: string;
	rider_id?: string;
	answers: Answer[];
}
