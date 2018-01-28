import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Module } from './module.model';
import { ModuleService } from './module.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-module',
    templateUrl: './module.component.html'
})
export class ModuleComponent implements OnInit, OnDestroy {
modules: Module[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private moduleService: ModuleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.moduleService.query().subscribe(
            (res: ResponseWrapper) => {
                this.modules = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInModules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Module) {
        return item.id;
    }
    registerChangeInModules() {
        this.eventSubscriber = this.eventManager.subscribe('moduleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
