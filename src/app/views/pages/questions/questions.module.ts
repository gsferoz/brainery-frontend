// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule,
		 MatSortModule, MatTooltipModule, MatInputModule, MatDatepickerModule, MatAutocompleteModule,
		 MatMenuModule, MatSelectModule, MatRadioModule, MatNativeDateModule, MatProgressBarModule,
		 MatCardModule, MatCheckboxModule, MatSnackBarModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionNotificationComponent, DeleteEntityDialogComponent } from '../../partials/content/crud';
import { LayoutUtilsService } from './../../../core/_base/crud';
import { ChaptersComponent } from './chapters/chapters.component';
import { TopicsComponent } from './topics/topics.component';
import { QuestionLevelsComponent } from './question-levels/question-levels.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionSourcesComponent } from './question-sources/question-sources.component';
import { ExamTypesComponent } from './exam-types/exam-types.component';
import { QuestionTypesComponent } from './question-types/question-types.component';

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
				path: 'chapters',
				component: ChaptersComponent
			},
			{
				path: 'topics',
				component: TopicsComponent,
			},
			{
				path: 'question_levels',
				component: QuestionLevelsComponent,
			},
			{
				path: 'questions_list',
				component: QuestionListComponent,
			},
			{
				path: 'question_source',
				component: QuestionSourcesComponent
			},
			{
				path: 'question_types',
				component: QuestionTypesComponent
			},
			{
				path: 'exam_types',
				component: ExamTypesComponent
			}
		]),
	],
	providers: [LayoutUtilsService],
	declarations: [
		ChaptersComponent,
		TopicsComponent,
		QuestionLevelsComponent,
		QuestionListComponent,
		QuestionSourcesComponent,
		ExamTypesComponent,
		QuestionTypesComponent
	],
	entryComponents: [ActionNotificationComponent, DeleteEntityDialogComponent]
})
export class QuestionsModule { }
