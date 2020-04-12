// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { debug } from 'util';
import { environment } from './../../../../../environments/environment';
import { Router } from '@angular/router';


/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(private router: Router) {}
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// tslint:disable-next-line:no-debugger
		// modify request
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${localStorage.getItem(environment.authTokenKey)}`
			}
		});

		return next.handle(request).pipe(
			tap(
				event => {
					 if (event instanceof HttpResponse) {
						// console.log('all looks good');
						// http response status code
						// console.log(event);
					}
				},
				error => {
					// http response status code
					// console.log('----response----');
					// console.error('status code:');
					// tslint:disable-next-line:no-debugger
					console.error(error.status);
					if (error.status === 401) {
						alert(error.message);
						this.router.navigate(['/auth']);
					} else if (error.status === 0) {
						alert('Server Down');
					}
					console.error(error.message);
					// console.log('--- end of response---');
				}
			)
		);
	}
}
