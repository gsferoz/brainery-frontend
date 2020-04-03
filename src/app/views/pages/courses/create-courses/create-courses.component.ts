import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';

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

	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private courseservice: CoursesService) { }

  ngOnInit() {
	  this.getSubjectList();
	  this.createForm();
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

	}

	onSubmit() {
		const bodydata = {
			'course' : this.courseForm.value
		}
		console.log(bodydata);
		const createcourseSubscriptions =  this.courseservice.createCourse(bodydata).subscribe(data => {
			const loadData: any = data;
			console.log(loadData);
		});
		this.componentSubscriptions.push(createcourseSubscriptions);
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
}
