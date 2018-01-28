import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Clazz } from './clazz.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClazzService {

    private resourceUrl =  SERVER_API_URL + 'api/clazzes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(clazz: Clazz): Observable<Clazz> {
        const copy = this.convert(clazz);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(clazz: Clazz): Observable<Clazz> {
        const copy = this.convert(clazz);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Clazz> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Clazz.
     */
    private convertItemFromServer(json: any): Clazz {
        const entity: Clazz = Object.assign(new Clazz(), json);
        entity.start = this.dateUtils
            .convertLocalDateFromServer(json.start);
        entity.end = this.dateUtils
            .convertLocalDateFromServer(json.end);
        return entity;
    }

    /**
     * Convert a Clazz to a JSON which can be sent to the server.
     */
    private convert(clazz: Clazz): Clazz {
        const copy: Clazz = Object.assign({}, clazz);
        copy.start = this.dateUtils
            .convertLocalDateToServer(clazz.start);
        copy.end = this.dateUtils
            .convertLocalDateToServer(clazz.end);
        return copy;
    }
}
