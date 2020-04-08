import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';
import { MatSnackBar } from '@angular/material';
import { ActionNotificationComponent } from './../../../partials/content/crud';
import { ActivatedRoute } from '@angular/router';


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
	isEdit: boolean;
	batchId: number;

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService,
			 public snackBar: MatSnackBar, private route: ActivatedRoute) {
				const datasub = this.route.data.subscribe(v => {const loadData: any = v; this.isEdit = loadData.isEdit; });
			  }

  ngOnInit() {
	  this.getCoursesList();
	  this.getCoachingCenterList();
	  this.createForm();
	  if (this.isEdit) {
		this.batchId = +this.route.snapshot.paramMap.get('id');
		this.getBatchData();
	}
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

  getBatchData() {
	const getBatchsubscription = this.courseservice.getBatchById(this.batchId).subscribe(data => {
		const loadData: any = data.data;
		console.log(loadData);
		this.batchForm.setValue(loadData);
		this.batchForm.controls.course.setValue(loadData.course.id);
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
	if (this.isEdit) {
			this.batchForm.removeControl('course_id');
			this.batchForm.addControl('id', new FormControl(''));
			this.batchForm.addControl('active', new FormControl(''));
			this.batchForm.addControl('coaching_center_name', new FormControl(''));
			this.batchForm.addControl('created_by', new FormControl(''));
			this.batchForm.addControl('created_by_user', new FormControl(''));
			this.batchForm.addControl('batch_users', new FormControl(''));
			this.batchForm.addControl('course', new FormControl(null, Validators.required));
		}
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
		this.hasFormErrors = false;
		const controls = this.batchForm.controls;
		/** check form */
		if (this.batchForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const bodydata = {
			'batch' : this.batchForm.value
		}
		console.log(bodydata);

		if (this.isEdit) {
			const createbatchSubscriptions =  this.courseservice.updateBatch(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.openSnackBar('Batch Updated Successfully');
			});
			this.componentSubscriptions.push(createbatchSubscriptions);
		} else {
			const createbatchSubscriptions =  this.courseservice.createBatch(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.batchForm.reset();
				this.openSnackBar('Batch Saved Successfully');
			});
			this.componentSubscriptions.push(createbatchSubscriptions);
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
