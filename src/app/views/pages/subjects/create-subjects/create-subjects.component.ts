import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';
import { ActionNotificationComponent } from './../../../partials/content/crud';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-create-subjects',
  templateUrl: './create-subjects.component.html',
  styleUrls: ['./create-subjects.component.scss']
})
export class CreateSubjectsComponent implements OnInit {

	subjectForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	isEdit: boolean;
	subjectId: number;

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService,
			  public snackBar: MatSnackBar, private route: ActivatedRoute) {
				const datasub = this.route.data.subscribe(v => {const loadData: any = v; this.isEdit = loadData.isEdit; });
			   }

  ngOnInit() {
	this.createForm();
	if (this.isEdit) {
		this.subjectId = +this.route.snapshot.paramMap.get('id');
		this.getSubjectData();
	}
  }

  createForm() {
	this.subjectForm = this.fb.group({
		name: ['', Validators.required],
		subject_code: ['', Validators.required],
		description: [ '', Validators.required],
		prefix: ['', Validators.compose([Validators.required])],
		subject_tag_line: ['', Validators.compose([Validators.required])],
		});
	this.subjectForm.addControl('id', new FormControl(''));
	this.subjectForm.addControl('subject_name', new FormControl(''));
	this.subjectForm.addControl('active', new FormControl(''));
	}

	getSubjectData() {
		const getBatchsubscription = this.courseservice.getSubjectById(this.subjectId).subscribe(data => {
			const loadData: any = data.data;
			console.log(loadData);
			this.subjectForm.setValue(loadData);
		});
	  }


	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.subjectForm.controls;
		/** check form */
		if (this.subjectForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}
		const bodydata = {
			'subject' : this.subjectForm.value
		}
		console.log(bodydata);
		if (this.isEdit) {
			const createsubjectSubscriptions =  this.courseservice.updateSubject(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.openSnackBar('Subject Updated Successfully');
			});
			this.componentSubscriptions.push(createsubjectSubscriptions);
		} else {
			const createsubjectSubscriptions =  this.courseservice.createSubjects(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.subjectForm.reset();
				this.openSnackBar('Subject Saved Successfully');
			});
			this.componentSubscriptions.push(createsubjectSubscriptions);
		}

	}


	 /**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.subjectForm.controls[controlName];
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
