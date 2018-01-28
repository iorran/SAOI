import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Clazz } from './clazz.model';
import { ClazzService } from './clazz.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-clazz',
    templateUrl: './clazz.component.html'
})
export class ClazzComponent implements OnInit, OnDestroy {
clazzes: Clazz[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clazzService: ClazzService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.clazzService.query().subscribe(
            (res: ResponseWrapper) => {
                this.clazzes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClazzes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Clazz) {
        return item.id;
    }
    registerChangeInClazzes() {
        this.eventSubscriber = this.eventManager.subscribe('clazzListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
