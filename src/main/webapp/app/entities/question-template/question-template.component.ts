import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { QuestionTemplate } from './question-template.model';
import { QuestionTemplateService } from './question-template.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-question-template',
    templateUrl: './question-template.component.html'
})
export class QuestionTemplateComponent implements OnInit, OnDestroy {
questionTemplates: QuestionTemplate[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private questionTemplateService: QuestionTemplateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.questionTemplateService.query().subscribe(
            (res: ResponseWrapper) => {
                this.questionTemplates = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInQuestionTemplates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: QuestionTemplate) {
        return item.id;
    }
    registerChangeInQuestionTemplates() {
        this.eventSubscriber = this.eventManager.subscribe('questionTemplateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
