// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService } from '../../_base/crud';
// Models
import { API_ENDPOINT_MAIN_DORMAIN } from './../../_config/index';
import { apiEnpoints } from '../_consts/constants';


const API_PRODUCTS_URL = 'api/products';
// Real REST API
@Injectable()
export class CoursesService {

	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product to the server

	createCoachingCenter(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.COACHING_CENTERS,
			data, { headers: httpHeaders });
	}

	createBatch(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.BATCHES,
			data, { headers: httpHeaders });
	}

	createCourse(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.COURSES,
			data, { headers: httpHeaders });
	}

	createSubjects(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.SUBJECTS,
			data, { headers: httpHeaders });
	}

	createLocations(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.LOCATION,
			data, { headers: httpHeaders });
	}

	createUser(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.USERS,
			data, { headers: httpHeaders });
	}

	assignInstructor(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.ASSIGN,
			data, { headers: httpHeaders });
	}

	createQualification(data, id): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.QUALIFICATION + '?id=' + id,
			data, { headers: httpHeaders });
	}

	createBatchStudents(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.BATCH_STUDENTS,
			data, { headers: httpHeaders });
	}

	// READ
	getAllCoachingcentres(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.COACHING_CENTERS);
	}

	getDashboardData(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.DASHBOARD);
	}

	getUsersList(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.USERS);
	}

	getInstructorsList(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.INSTRUCTOR);
	}

	getBatchesList(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.BATCHES);
	}

	getLocationsList(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.LOCATION);
	}

	getCourseList(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.COURSES);
	}

	getSubjectsList(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.SUBJECTS);
	}

	getRolesList(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.ROLES);
	}

	// SHOW

	getUserById(Id: number): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.USERS + `/${Id}`);
	}

	getBatchById(Id: number): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.BATCHES + `/${Id}`);
	}

	getCourseById(Id: number): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.COURSES + `/${Id}`);
	}

	getCoachingCenterById(Id: number): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.COACHING_CENTERS + `/${Id}`);
	}

	getLocationById(Id: number): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.LOCATION + `/${Id}`);
	}

	getSubjectById(Id: number): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.SUBJECTS + `/${Id}`);
	}

	// Update

	updateCoachingCenter(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const Id = data.coaching_center.id;
		return this.http.put<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.COACHING_CENTERS + `/${Id}`,
			data, { headers: httpHeaders });
	}

	updateUser(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const Id = data.user.id;
		return this.http.put<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.USERS + `/${Id}`,
			data, { headers: httpHeaders });
	}

	updateCourse(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const Id = data.course.id;
		return this.http.put<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.COURSES + `/${Id}`,
			data, { headers: httpHeaders });
	}

	updateSubject(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const Id = data.subject.id;
		return this.http.put<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.SUBJECTS + `/${Id}`,
			data, { headers: httpHeaders });
	}

	updateBatch(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const Id = data.batch.id;
		return this.http.put<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.BATCHES + `/${Id}`,
			data, { headers: httpHeaders });
	}

	updateLocation(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const Id = data.locations.id;
		return this.http.put<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION + apiEnpoints.LOCATION + `/${Id}`,
			data, { headers: httpHeaders });
	}
}
