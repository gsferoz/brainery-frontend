import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';
import { ActionNotificationComponent } from './../../../partials/content/crud';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

	userForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	rolesList: any = [];
	isEdit: boolean;
	userID: number;

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService,
			  public snackBar: MatSnackBar, private route: ActivatedRoute) {
				const datasub = this.route.data.subscribe(v => {const loadData: any = v; this.isEdit = loadData.isEdit; });
			   }

  ngOnInit() {
	this.getRoleList();
	if (this.isEdit) {
		this.userID = +this.route.snapshot.paramMap.get('id');
		this.createEditForm();
		this.showUserData();
	  } else {
		this.createForm();
	  }
  }

  createForm() {
	this.userForm = this.fb.group({
		email: ['', Validators.compose([Validators.required, Validators.email])],
		password: ['', Validators.required],
		first_name: [ '', Validators.required],
		last_name: ['', Validators.compose([Validators.required])],
		registration_number: ['', Validators.compose([Validators.required])],
		mobile_number: ['', Validators.compose([Validators.required])],
		aadhar_number: ['', Validators.compose([Validators.required])],
		role_id: [null, Validators.compose([Validators.required])],
		});

	}

	createEditForm() {
		this.userForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			id: [null, Validators.required],
			gender: ['', Validators.required],
			first_name: [ '', Validators.required],
			last_name: ['', Validators.compose([Validators.required])],
			registration_number: ['', Validators.compose([Validators.required])],
			mobile_number: ['', Validators.compose([Validators.required])],
			full_name: ['', Validators.compose([Validators.required])],
			roles: [[], Validators.compose([Validators.required])],
			country: ['', Validators.compose([Validators.required])],
			aadhar_number: ['', Validators.compose([Validators.required])],
			active: ['', Validators.compose([Validators.required])],
			user_qualifications: [[], Validators.compose([Validators.required])],
			});

		}

	getRoleList() {
		const getrolesubscription = this.courseservice.getRolesList().subscribe(data => {
			const loadData: any = data.data;
			this.rolesList = loadData;
		});
	  }

	  showUserData() {
		const showusersub = this.courseservice.getUserById(this.userID).subscribe(data => {
			const loadData: any = data.data;
			console.log(loadData);
			this.userForm.setValue(loadData);
		});
	  }


	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}
		const bodydata = {
			'user' : this.userForm.value
		}
		console.log(bodydata);
		if (this.isEdit) {
			const createuserSubscriptions =  this.courseservice.updateUser(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.openSnackBar('User Updated Successfully');
			});
			this.componentSubscriptions.push(createuserSubscriptions);
		} else {
			const createuserSubscriptions =  this.courseservice.createUser(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.userForm.reset();
				this.openSnackBar('User Saved Successfully');
			});
			this.componentSubscriptions.push(createuserSubscriptions);
		}

	}


	 /**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.userForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	openSnackBar(message: string) {
		this.snackBar.openFromComponent( ActionNotificationComponent , {
		  data: {message, showUndoButton: false, showCloseButton: true, snackBar: this.snackBar }
		});
	  }

}
