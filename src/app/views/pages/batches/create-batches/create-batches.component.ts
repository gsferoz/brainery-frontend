import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';


@Component({
  selector: 'kt-create-batches',
  templateUrl: './create-batches.component.html',
  styleUrls: ['./create-batches.component.scss']
})
export class CreateBatchesComponent implements OnInit {

	// coachingCenter: CoachingCentreModel;
	batchForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	courseList: any[] = [];
	coachingCenterList: any[] = [];

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService) { }

  ngOnInit() {
	  this.getCoursesList();
	  this.getCoachingCenterList();
	  this.createForm();
  }

  getCoursesList() {
	const getCoursesubscription = this.courseservice.getCourseList().subscribe(data => {
		const loadData: any = data.data;
		this.courseList = loadData;
	});
  }

  getCoachingCenterList() {
	const getCoachingsubscription = this.courseservice.getAllCoachingcentres().subscribe(data => {
		const loadData: any = data.data;
		this.coachingCenterList = loadData;
	});
  }

  createForm() {
	this.batchForm = this.fb.group({
		name: ['', Validators.required],
		batch_code: ['', Validators.required],
		coaching_center_id: [ null, Validators.required],
		course_id: [null, Validators.compose([Validators.required])],
		start_date: ['', Validators.compose([Validators.required])],
		end_date: ['', Validators.compose([Validators.required])],
		});

	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.batchForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	onSubmit() {
		const bodydata = {
			'batch' : this.batchForm.value
		}
		console.log(bodydata);
		const createbatchSubscriptions =  this.courseservice.createBatch(bodydata).subscribe(data => {
			const loadData: any = data;
			console.log(loadData);
		});
		this.componentSubscriptions.push(createbatchSubscriptions);
	}

		/** Alect Close event */
		onAlertClose($event) {
			this.hasFormErrors = false;
		}

}
