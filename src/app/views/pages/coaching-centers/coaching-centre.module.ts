// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { CoachingCentersComponent } from './coaching-centers.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatInputModule, MatDatepickerModule, MatAutocompleteModule, MatMenuModule, MatSelectModule, MatRadioModule, MatNativeDateModule, MatProgressBarModule, MatCardModule, MatCheckboxModule, MatSnackBarModule, MatTabsModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateCoachingCenterComponent } from './create-coaching-center/create-coaching-center.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionNotificationComponent, DeleteEntityDialogComponent } from '../../partials/content/crud';
import { LayoutUtilsService } from './../../../core/_base/crud';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		NgbProgressbarModule,
		RouterModule.forChild([
			{
				path: '',
				component: CoachingCentersComponent
			},
			{
				path: 'create',
				component: CreateCoachingCenterComponent,
				data: {isEdit: false, isView: false}
			},
			{
				path: 'edit/:id',
				component: CreateCoachingCenterComponent,
				data: {isEdit: true, isView: false}
			},
			{
				path: 'view/:id',
				component: CreateCoachingCenterComponent,
				data: {isEdit: true, isView: true}
			}
		]),
	],
	providers: [LayoutUtilsService],
	declarations: [
		CoachingCentersComponent,
		CreateCoachingCenterComponent,
	],
	entryComponents: [ActionNotificationComponent, DeleteEntityDialogComponent]
})
export class CoachingCenterModule {
}
