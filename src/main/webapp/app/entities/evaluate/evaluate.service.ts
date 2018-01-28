import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Evaluate } from './evaluate.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EvaluateService {

    private resourceUrl =  SERVER_API_URL + 'api/evaluates';

    constructor(private http: Http) { }

    create(evaluate: Evaluate): Observable<Evaluate> {
        const copy = this.convert(evaluate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(evaluate: Evaluate): Observable<Evaluate> {
        const copy = this.convert(evaluate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Evaluate> {
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
     * Convert a returned JSON object to Evaluate.
     */
    private convertItemFromServer(json: any): Evaluate {
        const entity: Evaluate = Object.assign(new Evaluate(), json);
        return entity;
    }

    /**
     * Convert a Evaluate to a JSON which can be sent to the server.
     */
    private convert(evaluate: Evaluate): Evaluate {
        const copy: Evaluate = Object.assign({}, evaluate);
        return copy;
    }
}
