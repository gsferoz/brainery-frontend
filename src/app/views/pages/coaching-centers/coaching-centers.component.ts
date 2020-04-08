import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from '../../../core/e-commerce/_services/courses.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LayoutUtilsService, MessageType } from './../../../core/_base/crud';

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


  constructor( private coursesservice: CoursesService, private ref: ChangeDetectorRef, private layoutUtilsService: LayoutUtilsService) {
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

  disableCenter(center, action: string) {
	const _title: string = action === 'disable' ? 'Disable center' : 'Enable center';
	const _description: string = action === 'disable' ? 'Are you sure to disable this center?' : 'Are you sure to enable this center?';
	const _waitDesciption: string = action === 'disable' ? 'Disabling' : 'Enabling';
	const _deleteTitle = action === 'disable' ? 'Disable' : 'Enable';
	const _successMessage = action === 'disable' ? 'Disabled center' : 'Enabled center';

	const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption, _deleteTitle);
	dialogRef.afterClosed().subscribe(res => {
		if (!res) {
			return;
		}
		const data = JSON.stringify(center);
		const datamodified = JSON.parse(data);
		datamodified.active = !datamodified.active;
		const datatosend = {
			"coaching_center" : datamodified
		}
		const userdiablesub = this.coursesservice.updateCoachingCenter(datatosend).subscribe(data => {
			this.layoutUtilsService.showActionNotification(_successMessage, MessageType.Delete);
			this.getCoachingCentres();
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
