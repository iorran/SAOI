import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EvaluateTemplate } from './evaluate-template.model';
import { EvaluateTemplateService } from './evaluate-template.service';

@Component({
    selector: 'jhi-evaluate-template-detail',
    templateUrl: './evaluate-template-detail.component.html'
})
export class EvaluateTemplateDetailComponent implements OnInit, OnDestroy {

    evaluateTemplate: EvaluateTemplate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private evaluateTemplateService: EvaluateTemplateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvaluateTemplates();
    }

    load(id) {
        this.evaluateTemplateService.find(id).subscribe((evaluateTemplate) => {
            this.evaluateTemplate = evaluateTemplate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvaluateTemplates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'evaluateTemplateListModification',
            (response) => this.load(this.evaluateTemplate.id)
        );
    }
}
