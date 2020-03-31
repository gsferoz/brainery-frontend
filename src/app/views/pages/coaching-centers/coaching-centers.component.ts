import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { CustomersPageRequested, CustomersDataSource, CustomerModel } from '../../../core/e-commerce';
import { Subscription } from 'rxjs';
import { skip, distinctUntilChanged } from 'rxjs/operators';
import { QueryParamsModel } from '../../../core/_base/crud';
import { CoursesService } from '../../../core/e-commerce/_services/courses.service';


@Component({
  selector: 'kt-coaching-centers',
  templateUrl: './coaching-centers.component.html',
  styleUrls: ['./coaching-centers.component.scss']
})
export class CoachingCentersComponent implements OnInit {

// Subscriptions
private subscriptions: Subscription[] = [];
dataSource: any[] = [];
customersResult: any[] = [];
loading = false;
displayedColumns = ['id', 'name', 'centre_code', 'city', 'country', 'contact', 'status', 'actions' ];


  constructor(private store: Store<AppState>, private coursesservice: CoursesService,
	private ref: ChangeDetectorRef) {
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
	console.log(vardata);
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
