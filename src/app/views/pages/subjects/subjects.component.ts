import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CoursesService } from '../../../core/e-commerce/_services/courses.service';

@Component({
  selector: 'kt-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

	private subscriptions: Subscription[] = [];
	dataSource: any[] = [];
	loading = false;
	displayedColumns = ['id', 'name', 'subject_name', 'subject_code', 'description', 'prefix', 'subject_tag_line', 'status', 'actions' ];
	dataSource1: MatTableDataSource<any>;

	@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private coursesservice: CoursesService, private ref: ChangeDetectorRef) {
	setInterval(() => {
		this.ref.markForCheck();
	  }, 1000);
   }

  ngOnInit() {
	  this.getSubjectsList();
  }

  getSubjectsList() {
	this.loading = true;
	const coursesubscripition = this.coursesservice.getSubjectsList().subscribe(data => {
	const vardata: any = data.data;
	this.dataSource = vardata;
	this.dataSource1 = new MatTableDataSource(this.dataSource);
	this.dataSource1.sort = this.sort;
	this.loading = false;
	});
	this.subscriptions.push(coursesubscripition);
  }


  /**
	 * Returns item status
	 *
	 * @param status: number
	 */
	getItemStatusString(status: boolean): string {
		switch (status) {
			case true:
				return 'Active';
			case false:
				return 'Inactive';
		}
		return '';
	}

	/**
	 * Returens item CSS Class Name by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(status: boolean): string {
		switch (status) {
			case true:
				return 'success';
			case false:
				return 'danger';
		}
		return '';
	}

}
