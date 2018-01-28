import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EvaluateTemplate } from './evaluate-template.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EvaluateTemplateService {

    private resourceUrl =  SERVER_API_URL + 'api/evaluate-templates';

    constructor(private http: Http) { }

    create(evaluateTemplate: EvaluateTemplate): Observable<EvaluateTemplate> {
        const copy = this.convert(evaluateTemplate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(evaluateTemplate: EvaluateTemplate): Observable<EvaluateTemplate> {
        const copy = this.convert(evaluateTemplate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EvaluateTemplate> {
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
     * Convert a returned JSON object to EvaluateTemplate.
     */
    private convertItemFromServer(json: any): EvaluateTemplate {
        const entity: EvaluateTemplate = Object.assign(new EvaluateTemplate(), json);
        return entity;
    }

    /**
     * Convert a EvaluateTemplate to a JSON which can be sent to the server.
     */
    private convert(evaluateTemplate: EvaluateTemplate): EvaluateTemplate {
        const copy: EvaluateTemplate = Object.assign({}, evaluateTemplate);
        return copy;
    }
}
