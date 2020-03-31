import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from '../../../core/e-commerce/_services/courses.service';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'kt-coaching-centers',
  templateUrl: './coaching-centers.component.html',
  styleUrls: ['./coaching-centers.component.scss']
})
export class CoachingCentersComponent implements OnInit {

// Subscriptions
private subscriptions: Subscription[] = [];
dataSource: any[] = [];
loading = false;
displayedColumns = ['id', 'name', 'centre_code', 'city', 'country', 'contact', 'status', 'actions' ];
dataSource1: MatTableDataSource<any>;

@ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor( private coursesservice: CoursesService, private ref: ChangeDetectorRef) {
		setInterval(() => {
			this.ref.markForCheck();
		  }, 1000);
	}

  ngOnInit() {
	this.getCoachingCentres();
  }

  getCoachingCentres() {
	this.loading = true;
	const coachingcentersubscripition = this.coursesservice.getAllCoachingcentres().subscribe(data => {
	const vardata: any = data.data;
	this.dataSource = vardata;
	this.dataSource1 = new MatTableDataSource(this.dataSource);
	this.dataSource1.sort = this.sort;
	this.loading = false;
	});
	this.subscriptions.push(coachingcentersubscripition);
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
