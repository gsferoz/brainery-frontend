import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionNotificationComponent } from './../../partials/content/crud';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'kt-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

	resetForm: FormGroup;
	hasFormErrors = false;

  constructor(public snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit() {
  }

  createForm() {
	this.resetForm = this.fb.group({
		current_password: ['', Validators.required],
		new_password: ['', Validators.required],
		password_confirmation: [ '', Validators.required],
		});
	}

	onSubmit() {

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
