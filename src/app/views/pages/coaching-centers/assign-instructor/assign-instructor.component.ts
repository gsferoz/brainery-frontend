import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from './../../../../core/e-commerce/_services/courses.service';
import { Subscription } from 'rxjs';
import { ActionNotificationComponent } from './../../../partials/content/crud';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'kt-assign-instructor',
  templateUrl: './assign-instructor.component.html',
  styleUrls: ['./assign-instructor.component.scss']
})
export class AssignInstructorComponent implements OnInit {

	assignForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	coachingCentresList: any[] = [];
	instructorList: any[] = [];
	batchList: any[] = [];
	subjectList: any[] = [];
	selectedBatchList: any[] = [];
	selectedSubjectsList: any[] = [];
	selectedUserId: number;
	private componentSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private coursesservice: CoursesService, public snackBar: MatSnackBar) { }

  ngOnInit() {
	  this.getCoachingCentres();
	  this.getBatchesList();
	  this.getUsersList();
	  this.createForm();
  }

  createForm() {
	this.assignForm = this.fb.group({
		id: [null, Validators.required],
		coaching_center_id: [null, Validators.required],
		batch_id: [ null, Validators.required],
		user_id: [null, Validators.compose([Validators.required])],
		subject_id: [null, Validators.compose([Validators.required])]
		});
	}

	getCoachingCentres() {
		const coachingcentersubscripition = this.coursesservice.getAllCoachingcentres().subscribe(data => {
		const vardata: any = data.data;
		this.coachingCentresList = vardata;
		});
		this.componentSubscriptions.push(coachingcentersubscripition);
	  }

	  onCenterChange(event) {
		this.selectedBatchList = this.batchList.filter(x => x.coaching_center_id === event.value);
		console.log(this.selectedBatchList);
	  }

	  onBatchChange(event) {
		const selectedBatch = this.selectedBatchList.find(x => x.id === event.value);
		this.selectedSubjectsList = selectedBatch.course.subjects;
		console.log(this.selectedSubjectsList);
	}

	onInstructorChange(event) {
		this.assignForm.controls.user_id.setValue(this.instructorList.find(x => x.id === event.value).user.id);
	}

	  getBatchesList() {
		const batchessubscripition = this.coursesservice.getBatchesList().subscribe(data => {
		const vardata: any = data.data;
		this.batchList = vardata;
		});
		this.componentSubscriptions.push(batchessubscripition);
	  }

	  getUsersList() {
		const usersubscription = this.coursesservice.getInstructorsList().subscribe(data => {
			var loadData:any = data.data;
			this.instructorList = loadData;
		});
		this.componentSubscriptions.push(usersubscription);
	  }

	  onSubmit() {
		  console.log(this.assignForm);
		  const assigninstrcutorsub = this.coursesservice.assignInstructor(this.assignForm.value).subscribe( data => {
			  const loadData: any = data;
			  console.log(data);
			  this.assignForm.reset();
			  this.openSnackBar('Instrcutor Assigned Successfully');
		  });
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
