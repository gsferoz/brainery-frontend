// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
// import { MailModule } from './apps/mail/mail.module';
// import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
// import { UserManagementModule } from './user-management/user-management.module';
import { MyPageComponent } from './my-page/my-page.component';
import { UsersComponent } from './users/users.component';
import { CoachingCentersComponent } from './coaching-centers/coaching-centers.component';
import { BatchesComponent } from './batches/batches.component';
import { BatchStudentsComponent } from './batch-students/batch-students.component';
import { LocationsComponent } from './locations/locations.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
	declarations: [MyPageComponent, UsersComponent, CoachingCentersComponent, BatchesComponent, BatchStudentsComponent, LocationsComponent, CoursesComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule
		// MailModule,
		// ECommerceModule,
		// UserManagementModule,
	],
	providers: []
})
export class PagesModule {
}
