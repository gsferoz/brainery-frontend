// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
// import { MailModule } from './apps/mail/mail.module';
// import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
// import { UserManagementModule } from './user-management/user-management.module';
import { MyPageComponent } from './my-page/my-page.component';
import { BatchStudentsComponent } from './batch-students/batch-students.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatInputModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
	declarations: [MyPageComponent, BatchStudentsComponent, ResetPasswordComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		PartialsModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule,
		MatTooltipModule,
		MatInputModule,
		MatSelectModule,
		MatDatepickerModule,
		// MailModule,
		// ECommerceModule,
		// UserManagementModule,
	],
	providers: []
})
export class PagesModule {
}
