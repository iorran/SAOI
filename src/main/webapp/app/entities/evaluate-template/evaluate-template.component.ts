import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EvaluateTemplate } from './evaluate-template.model';
import { EvaluateTemplateService } from './evaluate-template.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evaluate-template',
    templateUrl: './evaluate-template.component.html'
})
export class EvaluateTemplateComponent implements OnInit, OnDestroy {
evaluateTemplates: EvaluateTemplate[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private evaluateTemplateService: EvaluateTemplateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.evaluateTemplateService.query().subscribe(
            (res: ResponseWrapper) => {
                this.evaluateTemplates = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEvaluateTemplates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EvaluateTemplate) {
        return item.id;
    }
    registerChangeInEvaluateTemplates() {
        this.eventSubscriber = this.eventManager.subscribe('evaluateTemplateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
