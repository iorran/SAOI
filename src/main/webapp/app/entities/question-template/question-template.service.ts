import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { QuestionTemplate } from './question-template.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class QuestionTemplateService {

    private resourceUrl =  SERVER_API_URL + 'api/question-templates';

    constructor(private http: Http) { }

    create(questionTemplate: QuestionTemplate): Observable<QuestionTemplate> {
        const copy = this.convert(questionTemplate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(questionTemplate: QuestionTemplate): Observable<QuestionTemplate> {
        const copy = this.convert(questionTemplate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<QuestionTemplate> {
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
     * Convert a returned JSON object to QuestionTemplate.
     */
    private convertItemFromServer(json: any): QuestionTemplate {
        const entity: QuestionTemplate = Object.assign(new QuestionTemplate(), json);
        return entity;
    }

    /**
     * Convert a QuestionTemplate to a JSON which can be sent to the server.
     */
    private convert(questionTemplate: QuestionTemplate): QuestionTemplate {
        const copy: QuestionTemplate = Object.assign({}, questionTemplate);
        return copy;
    }
}
