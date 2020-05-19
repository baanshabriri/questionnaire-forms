import { Component, OnInit } from '@angular/core';
import {FormService} from '../../@core/services/form.service';
import {buildMonths} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  questions: any = {};
  form: any = {
                "id": "68a90f0d-8d80-44ca-8833-ecc977883bdb",
                "name": "Test1",
                "questions": [
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "0cdad74e-1569-4aff-b563-134eaa210ccd",
                    "question": "Current staying district ?",
                    "type": "SHORT"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "cbe6cb26-e50b-4f2d-a0b1-3c3cf293fcc2",
                    "question": "Current staying state ?",
                    "type": "SHORT"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "13265a08-120a-4b9e-b4cb-20a03396df17",
                    "question": "Please mention your body temperature here",
                    "type": "SHORT"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "208b4a2b-af3f-46eb-8f12-b13ff90a4f60",
                    "question": "Do you have any other suspected symptoms such as cough, difficulty in breathing etc ? ",
                    "type": "LONG"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "aa3ebac0-f089-45d8-ac61-e6fd57e6c269",
                    "question": "Are you experiencing lost of taste today ? ",
                    "type": "BOOLEAN"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "81490d37-e05a-4038-b3c3-ec1b003d12d7",
                    "question": "Are you experiencing loss of smell today ?",
                    "type": "BOOLEAN"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "da9f4929-632b-4b10-bc88-47ab5ef4352a",
                    "question": "Do you have any symptoms  of diarrhoea ?",
                    "type": "BOOLEAN"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "d2295e45-1493-4dc5-8308-236539a61b95",
                    "question": "Any family member or close contact have any suspected symptoms such as fever, cough or difficulty in breathing ?",
                    "type": "LONG"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "5f56901c-5b32-449a-870c-c5524ceb3e2e",
                    "question": "Do you find any Covid-19 positive cases in your neighbourhood ?",
                    "type": "SHORT"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "dd3bffa2-0c29-40b2-a312-638b38d69046",
                    "question": "What mode of transport do you use to reach office ?",
                    "type": "SHORT"
                  },
                  {
                    "choice": null,
                    "compulsory": true,
                    "id": "55d0ce64-5356-4fd1-a5c7-eafc70482d9a",
                    "question": "Do you need any emergency support related to health ?",
                    "type": "LONG"
                  }
                ]
              };
  constructor(private http: FormService) { }

  ngOnInit(): void {
    this.questions = this.form.questions;
    console.log(this.questions[0].type);
    this.getForm();
  }

  async getForm() {
    this.form = (await this.http.query({}, 'form')).data;
    console.log(this.form);
  }


}
