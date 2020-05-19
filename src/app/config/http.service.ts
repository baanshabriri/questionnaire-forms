import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
// import * as Raven from 'raven-js';

export type IRestTransform = (response: HttpResponse<any>) => any;

export interface IRestConfig {
	baseHeaders?: HttpHeaders;
	dynamicHeaders?: () => HttpHeaders;
	baseUrl?: string;
	path?: string;
}

export interface IRestQuery {
	[key: string]: any;
}

export interface IOption {

	headers?: HttpHeaders | {
		[header: string]: string | string[];
	};
	observe?: 'body';
	params?: HttpParams | {
		[param: string]: string | string[];
	};
	reportProgress?: boolean;
	responseType: 'json';
	withCredentials?: boolean;
}

export abstract class HttpService<T> {

	protected transform: IRestTransform;
	protected http: HttpClient;
	private readonly _path: string;
	private readonly _base: string = environment.url;
	private _baseHeaders: HttpHeaders;
	private _dynamicHeaders: () => HttpHeaders;

	protected constructor(http: HttpClient, config: IRestConfig) {
		this.http = http;
		this._base = config.baseUrl || this._base;
		this._path = config.path.replace(/^\//, '');
		this._baseHeaders = config.baseHeaders ? config.baseHeaders : new HttpHeaders();
		this._dynamicHeaders = config.dynamicHeaders ? config.dynamicHeaders : () => new HttpHeaders();
	}

	protected static buildRequestOptions(query?: any, responseType?: string): IOption {
		for (const i in query) {
			if (query.hasOwnProperty(i)) {
				if (query[i] === undefined || query[i] === null) {
					delete query[i];
				}
			}
		}
		return <IOption>{responseType: responseType ? responseType : 'json', params: query};
	}

	protected static catchError(error: any) {
		if (error.status !== 404 && error.status < 500) {
			const err = new Error();
			err.name = error.name;
			err.message = error.error;
			// Raven.captureException(err);
		}

		let title: string = null;
		let message: string = error.statusText;
		switch (error.status) {
			case 0:
				break;
			case 400:
				title = 'Bad Request';
				break;
			case 401:
				title = 'Unauthorized';
				break;
			case 403:
				title = 'Forbidden';
				break;
			case 404:
				title = null;
				break;
			case 429:
				const seconds = parseInt(error.headers.get('retry-after'), 10);
				message = seconds < 60 ? error.headers.get('retry-after') + ' seconds' : seconds / 60 + ' minutes';
				message = 'Request limit reached retry after ' + message;
				title = 'Network Limit';
				break;
			case 500:
				break;
			default:
				break;

		}
		if (title) {

		}
	}

	public query(query?: IRestQuery, url?: string, report?: boolean): Promise<T> {
		const request: Observable<any> = this.http.get(this.buildUrl(undefined, url, report), HttpService.buildRequestOptions(query));
		return new Promise((resolve, reject) => request.subscribe(res => {
			return resolve(res);
		}, (err) => {
			HttpService.catchError(err);
			return reject(err);
		}));
	}

	public downloadFile(query?: IRestQuery, url?: string, report?: boolean): Promise<Blob> {
		const request: Observable<any> = this.http.get(this.buildUrl(undefined, url, report),
			HttpService.buildRequestOptions(query, 'blob'));
		return new Promise((resolve, reject) => request.subscribe(res => {
			return resolve(res);
		}, (err) => {
			HttpService.catchError(err);
			return reject(err);
		}));
	}

	public get(id: string | number, query?: IRestQuery, url?: string): Promise<T> {
		const request: Observable<any> = this.http.get(this.buildUrl(id, url), HttpService.buildRequestOptions(query));
		return new Promise((resolve, reject) => request.subscribe(res => {
			return resolve(res);
		}, (err) => {
			HttpService.catchError(err);
			return reject(err);
		}));
	}

	public create(obj: T, query?: IRestQuery, url?: string): Promise<T> {
		const request: Observable<any> = this.http.post(this.buildUrl(undefined, url), obj,
			HttpService.buildRequestOptions(query));
		return new Promise((resolve, reject) => request.subscribe(res => {
			return resolve(res.data);
		}, (err) => {
			HttpService.catchError(err);
			return reject(err);
		}));
	}

	public update(id: string | number, obj: T, query?: IRestQuery, url?: string): Promise<T> {
		const request: Observable<any> = this.http.patch(this.buildUrl(id, url), obj, HttpService.buildRequestOptions(query));
		return new Promise((resolve, reject) => request.subscribe(res => {
			return resolve(res);
		}, (err) => {
			HttpService.catchError(err);
			return reject(err);
		}));
	}

	public put(obj: T, query?: IRestQuery, url?: string): Promise<T> {
		const request: Observable<any> = this.http.put(this.buildUrl(undefined, url), obj, HttpService.buildRequestOptions(query));
		return new Promise((resolve, reject) => request.subscribe(res => {
			return resolve(res.data);
		}, (err) => {
			HttpService.catchError(err);
			return reject(err);
		}));
	}

	public delete(id: string | number, query?: IRestQuery, url?: string): Promise<T> {
		const request: Observable<any> = this.http.delete(this.buildUrl(id, url), HttpService.buildRequestOptions(query));
		return new Promise((resolve, reject) => request.subscribe(res => {
			return resolve(res);
		}, (err) => {
			HttpService.catchError(err);
			return reject(err);
		}));
	}

	protected buildUrl(id?: string | number, newUrl?: string, report?: boolean): string {
		let url: string = newUrl ? newUrl : this._path;
		if (id) {
			url += `/${id}`;
		}
		url = `${this._base}${url}`;
		return url;
	}
}
