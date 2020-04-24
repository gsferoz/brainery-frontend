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
export class QuestionService {

	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product to the server

	createChapter(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.CHAPTERS,
			data, { headers: httpHeaders });
	}

	createTopics(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.TOPICS,
			data, { headers: httpHeaders });
	}

	// READ
	getAllChapters(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.CHAPTERS);
	}

	getAllTopics(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.TOPICS);
	}

	getAllQuestionsTypes(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.MASTER +
			apiEnpoints.QUESTION_TYPES);
	}

	getAllExamTypes(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.MASTER +
			apiEnpoints.EXAM_TYPES);
	}

	getAllQuestionLevels(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.MASTER +
			apiEnpoints.QUESTION_LEVELS);
	}

	getAllQuestionSources(): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.MASTER +
			apiEnpoints.QUESTION_SOURCES);
	}

	// SHOW

	getChapterById(Id: number): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.CHAPTERS + `/${Id}`);
	}

	getTopicById(Id: number): Observable<any> {
		return this.http.get<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.TOPICS + `/${Id}`);
	}

	// Update

	updateChapter(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const Id = data.chapter.id;
		return this.http.put<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.CHAPTERS + `/${Id}`,
			data, { headers: httpHeaders });
	}

	updateTopics(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const Id = data.topic.id;
		return this.http.put<any>(API_ENDPOINT_MAIN_DORMAIN + apiEnpoints.API_VERSION_V1 + apiEnpoints.QUESTIONS + apiEnpoints.TOPICS + `/${Id}`,
			data, { headers: httpHeaders });
	}

}
