import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud';
import { QuestionService } from './../../../../core/e-commerce/_services/questions.service';

@Component({
  selector: 'kt-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit {

	// Subscriptions
	private subscriptions: Subscription[] = [];
	dataSource: any[] = [];
	loading = false;
	displayedColumns = ['id', 'name', 'status', 'actions' ];
	dataSource1: MatTableDataSource<any>;

	@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private questionservice: QuestionService, private ref: ChangeDetectorRef, private layoutUtilsService: LayoutUtilsService) {
	setInterval(() => {
		this.ref.markForCheck();
	  }, 1000);
   }

  ngOnInit() {
	  this.getChapters();
  }

  getChapters() {
	this.loading = true;
	const chaptersub = this.questionservice.getAllChapters().subscribe(data => {
	const vardata: any = data.data;
	this.dataSource = vardata;
	this.dataSource1 = new MatTableDataSource(this.dataSource);
	this.dataSource1.sort = this.sort;
	console.log(vardata);
	this.loading = false;
	});
	this.subscriptions.push(chaptersub);
  }

  disableChapter(chapter, action: string) {
	const _title: string = action === 'disable' ? 'Disable chapter' : 'Enable chapter';
	const _description: string = action === 'disable' ? 'Are you sure to disable this chapter?' : 'Are you sure to enable this chapter?';
	const _waitDesciption: string = action === 'disable' ? 'Disabling' : 'Enabling';
	const _deleteTitle = action === 'disable' ? 'Disable' : 'Enable';
	const _successMessage = action === 'disable' ? 'Disabled chapter' : 'Enabled chapter';

	const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption, _deleteTitle);
	dialogRef.afterClosed().subscribe(res => {
		if (!res) {
			return;
		}
		const data = JSON.stringify(chapter);
		const datamodified = JSON.parse(data);
		datamodified.active = !datamodified.active;
		const datatosend = {
			"chapter" : datamodified
		}
		const userdiablesub = this.questionservice.updateChapter(datatosend).subscribe(data => {
			this.layoutUtilsService.showActionNotification(_successMessage, MessageType.Delete);
			this.getChapters();
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
