import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CoursesService } from '../../../core/e-commerce/_services/courses.service';
import { LayoutUtilsService, MessageType } from './../../../core/_base/crud';

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

  constructor(private coursesservice: CoursesService, private ref: ChangeDetectorRef,private layoutUtilsService: LayoutUtilsService) {
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

  disableSubject(subject, action: string) {
	const _title: string = action === 'disable' ? 'Disable subject' : 'Enable subject';
	const _description: string = action === 'disable' ? 'Are you sure to disable this subject?' : 'Are you sure to enable this subject?';
	const _waitDesciption: string = action === 'disable' ? 'Disabling' : 'Enabling';
	const _deleteTitle = action === 'disable' ? 'Disable' : 'Enable';
	const _successMessage = action === 'disable' ? 'Disabled subject' : 'Enabled subject';

	const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption, _deleteTitle);
	dialogRef.afterClosed().subscribe(res => {
		if (!res) {
			return;
		}
		const data = JSON.stringify(subject);
		const datamodified = JSON.parse(data);
		datamodified.active = !datamodified.active;
		const datatosend = {
			"subject" : datamodified
		}
		const userdiablesub = this.coursesservice.updateSubject(datatosend).subscribe(data => {
			this.layoutUtilsService.showActionNotification(_successMessage, MessageType.Delete);
			this.getSubjectsList();
		});
	});
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
