// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { ProductModel } from '../_models/product.model';
import { API_ENDPOINT_MAIN_DORMAIN } from './../../_config/index';
import { apiEnpoints } from '../_consts/constants';


const API_PRODUCTS_URL = 'api/products';
// Real REST API
@Injectable()
export class CoursesService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));

	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product to the server
	createProduct(product): Observable<ProductModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductModel>(API_PRODUCTS_URL, product, { headers: httpHeaders });
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

	getProductById(productId: number): Observable<ProductModel> {
		return this.http.get<ProductModel>(API_PRODUCTS_URL + `/${productId}`);
	}
}