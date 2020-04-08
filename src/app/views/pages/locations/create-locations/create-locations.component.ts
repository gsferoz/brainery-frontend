import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';
import { ActionNotificationComponent } from './../../../partials/content/crud';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-create-locations',
  templateUrl: './create-locations.component.html',
  styleUrls: ['./create-locations.component.scss']
})
export class CreateLocationsComponent implements OnInit {

	locationForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	isEdit: boolean;
	locationId: number;

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService,
			  public snackBar: MatSnackBar, private route: ActivatedRoute) {
				const datasub = this.route.data.subscribe(v => {const loadData: any = v; this.isEdit = loadData.isEdit; });
			  }

  ngOnInit() {
	this.createForm();
	if (this.isEdit) {
		this.locationId = +this.route.snapshot.paramMap.get('id');
		this.getLocationData();
	}
  }

  createForm() {
	this.locationForm = this.fb.group({
		name: ['', Validators.required],
		city: ['', Validators.required],
		district: [ '', Validators.required],
		state: ['', Validators.compose([Validators.required])],
		});
	this.locationForm.addControl('id', new FormControl(''));
	this.locationForm.addControl('active', new FormControl(''));
	}

	getLocationData() {
		const getBatchsubscription = this.courseservice.getLocationById(this.locationId).subscribe(data => {
			const loadData: any = data.data;
			console.log(loadData);
			this.locationForm.setValue(loadData);
		});
	  }

	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.locationForm.controls;
		/** check form */
		if (this.locationForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const bodydata = {
			'locations' : this.locationForm.value
		}
		console.log(bodydata);
		if (this.isEdit) {
			const createlocationSubscriptions =  this.courseservice.updateLocation(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.openSnackBar('Location Updated Successfully');
			});
			this.componentSubscriptions.push(createlocationSubscriptions);
		} else {
			const createlocationSubscriptions =  this.courseservice.createLocations(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.locationForm.reset();
				this.openSnackBar('Location Saved Successfully');
			});
			this.componentSubscriptions.push(createlocationSubscriptions);
		}

	}


	 /**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.locationForm.controls[controlName];
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
