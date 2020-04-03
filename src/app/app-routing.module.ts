// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';
import { UsersComponent } from './views/pages/users/users.component';
import { CoachingCentersComponent } from './views/pages/coaching-centers/coaching-centers.component';
import { BatchesComponent } from './views/pages/batches/batches.component';
import { BatchStudentsComponent } from './views/pages/batch-students/batch-students.component';
import { LocationsComponent } from './views/pages/locations/locations.component';
import { CoursesComponent } from './views/pages/courses/courses.component';
import { SubjectsComponent } from './views/pages/subjects/subjects.component';

const routes: Routes = [
	{path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule)},

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'coaching_center',
				loadChildren: () => import('app/views/pages/coaching-centers/coaching-centre.module').then(m => m.CoachingCenterModule)
			},
			{
				path: 'batches',
				loadChildren: () => import('app/views/pages/batches/batches.module').then(m => m.BatchesModule)
			},
			{
				path: 'courses',
				loadChildren: () => import('app/views/pages/courses/courses.module').then(m => m.CoursesModule)
			},
			{
				path: 'users',
				component: UsersComponent
			},
			{
				path: 'batch_students',
				component: BatchStudentsComponent
			},
			{
				path: 'locations',
				component: LocationsComponent
			},
			{
				path: 'subjects',
				component: SubjectsComponent
			},
			// {
			// 	path: 'mail',
			// 	loadChildren: () => import('app/views/pages/apps/mail/mail.module').then(m => m.MailModule)
			// },
			// {
			// 	path: 'ecommerce',
			// 	loadChildren: () => import('app/views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
			// },
			{
				path: 'ngbootstrap',
				loadChildren: () => import('app/views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule)
			},
			{
				path: 'material',
				loadChildren: () => import('app/views/pages/material/material.module').then(m => m.MaterialModule)
			},
			// {
			// 	path: 'user-management',
			// 	loadChildren: () => import('app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
			// },
			{
				path: 'wizard',
				loadChildren: () => import('app/views/pages/wizard/wizard.module').then(m => m.WizardModule)
			},
			{
				path: 'builder',
				loadChildren: () => import('app/views/theme/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
