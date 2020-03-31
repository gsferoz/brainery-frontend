import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from './../../../core/e-commerce/_services/courses.service';
import { Subscription } from 'rxjs';

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

  constructor(private courseservice: CoursesService, private ref: ChangeDetectorRef) {
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
		this.loading = false;
	})
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
