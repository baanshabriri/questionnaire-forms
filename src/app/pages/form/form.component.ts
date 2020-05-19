import {Component, OnInit} from '@angular/core';
import {FormService} from '../../@core/services/form.service';
import {ActivatedRoute} from "@angular/router";
import {Form} from "../../@core/models/form";
import {Question} from "../../@core/models/question";
import {FormAnswer} from "../../@core/models/form-answer";
import {Answer} from "../../@core/models/answer";

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	questions: Question;
	form: Form;
	constructor(private http: FormService, private activatedRoute: ActivatedRoute) {

		this.activatedRoute.queryParams.subscribe(res => {
			console.log(res);
			localStorage.setItem('token', res['token']);
			this.getForm(res['formId'])
		})
	}

	ngOnInit(): void {
	}

	async getForm(formId: string) {
		this.form = (await this.http.get(formId, {}, 'form'));
		console.log(this.form);
	}

	async saveForm() {
		const formAnswer: FormAnswer = {answers:  []} as FormAnswer;
		formAnswer.form_id = this.form.id;
		this.form.questions.forEach(question => {
			question.answer ? formAnswer.answers.push({question_id: question.id, answer: question.answer} as Answer) : null;
		});
		await this.http.create(formAnswer, {__only: ['id']}, 'form_answer');
	}


}
