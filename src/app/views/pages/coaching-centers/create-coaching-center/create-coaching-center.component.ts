import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActionNotificationComponent } from './../../../partials/content/crud';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-create-coaching-center',
  templateUrl: './create-coaching-center.component.html',
  styleUrls: ['./create-coaching-center.component.scss']
})
export class CreateCoachingCenterComponent implements OnInit {

	// coachingCenter: CoachingCentreModel;
	centerForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	locationList: any[] = [];
	courseList: any[] = [];
	isView: boolean;
	isEdit: boolean;
	centerId: number;

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService,
			  public snackBar: MatSnackBar, private route: ActivatedRoute) {
	const datasub = this.route.data.subscribe(v => {
		const loadData: any = v;
		this.isEdit = loadData.isEdit;
		this.isView = loadData.isView;
	});
   }

  ngOnInit() {
	this.getLocationsList();
	this.getCoursesList();
	this.createForm();
	if (this.isEdit) {
		this.centerId = +this.route.snapshot.paramMap.get('id');
		this.getCoachingCentre();
	}
  }

  getLocationsList() {
	const getLocationSubscription = this.courseservice.getLocationsList().subscribe(data => {
		const loadData: any = data.data;
		this.locationList = loadData;
	});
  }

  getCoursesList() {
	const getCoursesubscription = this.courseservice.getCourseList().subscribe(data => {
		const loadData: any = data.data;
		this.courseList = loadData;
	});
  }

  getCoachingCentre() {
	const getCoursesubscription = this.courseservice.getCoachingCenterById(this.centerId).subscribe(data => {
		const loadData: any = data.data;
		console.log(loadData);
		this.centerForm.setValue(loadData);
		this.centerForm.controls.location.setValue(loadData.location.id);
		this.centerForm.controls.courses.setValue(loadData.courses.map(x => x.id));
	});
  }

  createForm() {
	this.centerForm = this.fb.group({
		name: ['', Validators.required],
		center_code: ['', Validators.required],
		registration_number: [ '', Validators.required],
		address1: ['', Validators.compose([Validators.required])],
		address2: ['', Validators.compose([Validators.required])],
		city: ['', Validators.compose([Validators.required])],
		country: ['', Validators.compose([Validators.required])],
		state: [''],
		zip_code: ['', Validators.compose([Validators.required])],
		contact_number: ['', Validators.compose([Validators.required])],
		land_line_number: ['', Validators.compose([Validators.required])],
		location_id: [null, Validators.compose([Validators.required])],
		courses: [[], Validators.compose([Validators.required])],
	});

	if (this.isEdit) {
		this.centerForm.addControl('id', new FormControl(''));
		this.centerForm.addControl('address', new FormControl(''));
		this.centerForm.addControl('total_batches', new FormControl(''));
		this.centerForm.removeControl('location_id');
		this.centerForm.addControl('location', new FormControl(null));
		this.centerForm.addControl('active', new FormControl(''));
		// this.centerForm.addControl('state', new FormControl('', Validators.required));
	}

	if (this.isView) {
		this.centerForm.disable();
	}

}


/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.centerForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.centerForm.controls;
		/** check form */
		if (this.centerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}
		const bodydata = {
			'coaching_center' : this.centerForm.value
		}
		console.log(bodydata);
		if (this.isEdit) {
			const createCenterSubscriptions =  this.courseservice.updateCoachingCenter(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.openSnackBar('Center Updated Successfully');
			})
			this.componentSubscriptions.push(createCenterSubscriptions);
		} else {
			const createCenterSubscriptions =  this.courseservice.createCoachingCenter(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.centerForm.reset();
				this.openSnackBar('Center Saved Successfully');
			})
			this.componentSubscriptions.push(createCenterSubscriptions);
		}


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


