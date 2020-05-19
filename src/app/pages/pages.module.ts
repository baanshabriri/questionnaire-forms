import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { FormComponent } from './form/form.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../@shared/shared.module";
import {NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [FormComponent],
	imports: [
		SharedModule,
		PagesRoutingModule,
		FormsModule,
		NgbButtonsModule,
	]
})
export class PagesModule { }
