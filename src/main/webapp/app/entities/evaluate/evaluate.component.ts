import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Evaluate } from './evaluate.model';
import { EvaluateService } from './evaluate.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evaluate',
    templateUrl: './evaluate.component.html'
})
export class EvaluateComponent implements OnInit, OnDestroy {
evaluates: Evaluate[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private evaluateService: EvaluateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.evaluateService.query().subscribe(
            (res: ResponseWrapper) => {
                this.evaluates = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEvaluates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Evaluate) {
        return item.id;
    }
    registerChangeInEvaluates() {
        this.eventSubscriber = this.eventManager.subscribe('evaluateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
