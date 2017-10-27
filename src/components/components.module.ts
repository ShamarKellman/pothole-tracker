import { NgModule } from '@angular/core';
import { AddPotholeModalComponent } from './add-pothole-modal/add-pothole-modal';
import { UpdatePotholeModalComponent } from './update-pothole-modal/update-pothole-modal';

@NgModule({
	declarations: [
		AddPotholeModalComponent,
		UpdatePotholeModalComponent
	],
	imports: [],
	exports: [
		AddPotholeModalComponent,
		UpdatePotholeModalComponent
	]
})
export class ComponentsModule {}
