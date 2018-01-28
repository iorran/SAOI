import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Clazz } from './clazz.model';
import { ClazzService } from './clazz.service';

@Component({
    selector: 'jhi-clazz-detail',
    templateUrl: './clazz-detail.component.html'
})
export class ClazzDetailComponent implements OnInit, OnDestroy {

    clazz: Clazz;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clazzService: ClazzService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClazzes();
    }

    load(id) {
        this.clazzService.find(id).subscribe((clazz) => {
            this.clazz = clazz;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClazzes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clazzListModification',
            (response) => this.load(this.clazz.id)
        );
    }
}
