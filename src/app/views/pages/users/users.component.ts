import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CoursesService } from './../../../core/e-commerce/_services/courses.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LayoutUtilsService, MessageType } from './../../../core/_base/crud';

@Component({
  selector: 'kt-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  	subscription: Subscription;
	dataSource: any[] = [];
	loading = false;
	displayedColumns = ['id', 'name', 'email', 'mobile', 'country', 'gender', 'status', 'actions' ];
	dataSource1: MatTableDataSource<any>;

	@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private courseservice: CoursesService, private ref: ChangeDetectorRef, private layoutUtilsService: LayoutUtilsService) {
	setInterval(() => {
		this.ref.markForCheck();
	  }, 1000);
  }

  ngOnInit() {
	  this.getUsersList();
  }

  getUsersList() {
	this.loading = true;
	this.subscription = this.courseservice.getUsersList().subscribe(data => {
		var loadData:any = data.data;
		console.log(loadData);
		this.dataSource = loadData;
		this.dataSource1 = new MatTableDataSource(this.dataSource);
		this.dataSource1.sort = this.sort;
		this.loading = false;
	})
  }

  disableUser(user, action: string) {
	const _title: string = action === 'disable' ? 'Disable user' : 'Enable user';
	const _description: string = action === 'disable' ? 'Are you sure to disable this user?' : 'Are you sure to enable this user?';
	const _waitDesciption: string = action === 'disable' ? 'Disabling' : 'Enabling';
	const _deleteTitle = action === 'disable' ? 'Disable' : 'Enable';
	const _successMessage = action === 'disable' ? 'Disabled user' : 'Enabled user';

	const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption, _deleteTitle);
	dialogRef.afterClosed().subscribe(res => {
		if (!res) {
			return;
		}
		const data = JSON.stringify(user);
		const datamodified = JSON.parse(data);
		datamodified.active = !datamodified.active;
		const datatosend = {
			"user" : datamodified
		}
		const userdiablesub = this.courseservice.updateUser(datatosend).subscribe(data => {
			this.layoutUtilsService.showActionNotification(_successMessage, MessageType.Delete);
			this.getUsersList();
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
