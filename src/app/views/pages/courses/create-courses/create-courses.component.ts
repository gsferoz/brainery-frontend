import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';
import { ActionNotificationComponent } from './../../../partials/content/crud';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.scss']
})
export class CreateCoursesComponent implements OnInit {

	courseForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	subjectList: any[] = [];
	isEdit: boolean;
	isView: boolean;
	courseId: number;

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
	  this.getSubjectList();
	  this.createForm();
	  if (this.isEdit) {
		this.courseId = +this.route.snapshot.paramMap.get('id');
		this.getCourseData();
	}
  }

  getSubjectList() {
	const getsubjectsubscription = this.courseservice.getSubjectsList().subscribe(data => {
		const loadData: any = data.data;
		this.subjectList = loadData;
	});
  }

  createForm() {
	this.courseForm = this.fb.group({
		name: ['', Validators.required],
		course_code: ['', Validators.required],
		description: [ '', Validators.required],
		prefix: ['', Validators.compose([Validators.required])],
		course_tag_line: ['', Validators.compose([Validators.required])],
		subjects: [[], Validators.compose([Validators.required])],
		});
	if (this.isEdit) {
		this.courseForm.addControl('id', new FormControl(''));
		this.courseForm.addControl('active', new FormControl(''));
		this.courseForm.addControl('course_name', new FormControl(''));
	}
	if (this.isView) {
		this.courseForm.disable();
	}
	}

	getCourseData() {
		const getBatchsubscription = this.courseservice.getCourseById(this.courseId).subscribe(data => {
			const loadData: any = data.data;
			console.log(loadData);
			this.courseForm.setValue(loadData);
			this.courseForm.controls.subjects.setValue(loadData.subjects.map(x => x.id));
		});
	  }

	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.courseForm.controls;
		/** check form */
		if (this.courseForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}
		const bodydata = {
			'course' : this.courseForm.value
		}
		console.log(bodydata);
		if (this.isEdit) {
			const createcourseSubscriptions =  this.courseservice.updateCourse(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.openSnackBar('Course Updated Successfully');
			});
			this.componentSubscriptions.push(createcourseSubscriptions);
		} else {
			const createcourseSubscriptions =  this.courseservice.createCourse(bodydata).subscribe(data => {
				const loadData: any = data;
				console.log(loadData);
				this.courseForm.reset();
				this.openSnackBar('Course Saved Successfully');
			});
			this.componentSubscriptions.push(createcourseSubscriptions);
		}

	}

  /**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.courseForm.controls[controlName];
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
