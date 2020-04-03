import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';

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

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService) { }

  ngOnInit() {
	this.getLocationsList();
	this.getCoursesList();
	this.createForm();
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

  createForm() {
	this.centerForm = this.fb.group({
		name: ['', Validators.required],
		center_code: ['', Validators.required],
		registration_number: [ '', Validators.required],
		address1: ['', Validators.compose([Validators.required])],
		address2: ['', Validators.compose([Validators.required])],
		city: ['', Validators.compose([Validators.required])],
		country: ['', Validators.compose([Validators.required])],
		zip_code: ['', Validators.compose([Validators.required])],
		contact_number: ['', Validators.compose([Validators.required])],
		land_line_number: ['', Validators.compose([Validators.required])],
		location_id: [null, Validators.compose([Validators.required])],
		courses: [[], Validators.compose([Validators.required])],
	});


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
		const bodydata = {
			'coaching_center' : this.centerForm.value
		}
		console.log(bodydata);
		const createCenterSubscriptions =  this.courseservice.createCoachingCenter(bodydata).subscribe(data => {
			const loadData: any = data;
			console.log(loadData);
		})
		this.componentSubscriptions.push(createCenterSubscriptions);
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

}


