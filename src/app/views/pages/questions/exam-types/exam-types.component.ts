import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud';
import { QuestionService } from './../../../../core/e-commerce/_services/questions.service';

@Component({
  selector: 'kt-exam-types',
  templateUrl: './exam-types.component.html',
  styleUrls: ['./exam-types.component.scss']
})
export class ExamTypesComponent implements OnInit {

  // Subscriptions
	private subscriptions: Subscription[] = [];
	dataSource: any[] = [];
	loading = false;
	displayedColumns = ['id', 'name', 'status'];
	dataSource1: MatTableDataSource<any>;

	@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private questionservice: QuestionService, private ref: ChangeDetectorRef, private layoutUtilsService: LayoutUtilsService) {
	setInterval(() => {
		this.ref.markForCheck();
	  }, 1000);
   }

  ngOnInit() {
	  this.getTypes();
  }

  getTypes() {
	this.loading = true;
	const chaptersub = this.questionservice.getAllExamTypes().subscribe(data => {
	const vardata: any = data.data;
	this.dataSource = vardata;
	this.dataSource1 = new MatTableDataSource(this.dataSource);
	this.dataSource1.sort = this.sort;
	console.log(vardata);
	this.loading = false;
	});
	this.subscriptions.push(chaptersub);
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
