import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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
	qualificationForm =  new FormArray([]);
	hasFormErrors = false;
	viewLoading = false;
	rolesList: any = [];
	isEdit: boolean;
	isView: boolean;
	userID: number;
	panelOpenState: boolean = false;

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService,
			           public snackBar: MatSnackBar, private route: ActivatedRoute) {
				const datasub = this.route.data.subscribe(v => {
					const loadData: any = v;
					this.isEdit = loadData.isEdit;
					this.isView = loadData.isView;
					console.log(this.isView)
				 });
			   }

  ngOnInit() {
	this.getRoleList();
	this.createForm();
	if (this.isEdit) {
		this.userID = +this.route.snapshot.paramMap.get('id');
		this.showUserData();
	  }
  }

  createForm() {
	this.userForm = this.fb.group({
		email: ['', Validators.compose([Validators.required, Validators.email])],
		password: ['', Validators.required],
		first_name: [ '', Validators.required],
		middle_name: [''],
		last_name: ['', Validators.compose([Validators.required])],
		registration_number: ['', Validators.compose([Validators.required])],
		mobile_number: ['', Validators.compose([Validators.required])],
		aadhar_number: [''],
		role_id: [null, Validators.compose([Validators.required])],
		gender: ['Male', Validators.required],
		country: ['', Validators.compose([Validators.required])],
		address1: [''],
		address2: [''],
		city: [''],
		state: [''],
		zip_code: [''],
		emergency_contact_no: [''],
		nationality: [''],
		});

	if (this.isEdit) {
		this.userForm.removeControl('password');
		this.userForm.removeControl('role_id');
		this.userForm.addControl('full_name', new FormControl(''));
		this.userForm.addControl('id', new FormControl(''));
		this.userForm.addControl('active', new FormControl(''));
		this.userForm.addControl('user_qualifications', new FormControl(''));
		this.userForm.addControl('roles', new FormControl(null));
		}

	if (this.isView) {
		this.userForm.disable();
	}

	}

	createQualificationForm() {
		const group = new FormGroup({
			id: new FormControl(null),
			name: new FormControl('', Validators.required),
			institute: new FormControl(''),
			address: new FormControl(''),
			city: new FormControl(''),
			state: new FormControl(''),
			country: new FormControl(''),
			zip_postal_code: new FormControl(''),
			start_year: new FormControl(''),
			end_year: new FormControl(''),
			specialization: new FormControl(''),
			current: new FormControl(''),
			user_id: new FormControl('')
			});

		this.qualificationForm.push(group);

		if (this.isView) {
			 this.qualificationForm.disable();
		 }
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
			this.userForm.controls.roles.setValue(loadData.roles[0].id);
			this.createQualificationForm();
			if (loadData.user_qualifications.length > 0) {
				for (let i = 0; i < loadData.user_qualifications.length - 1; i++) {
						this.createQualificationForm();
				}
				this.qualificationForm.setValue(loadData.user_qualifications);
			}
		});
	  }

	  onDeleteQualification(index) {
		  this.qualificationForm.removeAt(index);
	  }


	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		console.log(this.userForm)
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

	onQualificationSubmit() {
		this.hasFormErrors = false;
		const controls = this.qualificationForm.controls;

		controls.forEach(element => {
			if (element.invalid) {
				const c  = element['controls'];
				Object.keys(c).forEach(controlName =>
					c[controlName].markAsTouched()
				);
			}
		});

		const bodydata = {
			'qualifications' : this.qualificationForm.value
		}
		console.log(bodydata);

		const createqualificationSubscriptions =  this.courseservice.createQualification(bodydata, this.userForm.controls.id.value).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.openSnackBar('Qualification Added Successfully');
			});
		this.componentSubscriptions.push(createqualificationSubscriptions);


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
