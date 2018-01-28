import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionTemplate } from './question-template.model';
import { QuestionTemplateService } from './question-template.service';

@Component({
    selector: 'jhi-question-template-detail',
    templateUrl: './question-template-detail.component.html'
})
export class QuestionTemplateDetailComponent implements OnInit, OnDestroy {

    questionTemplate: QuestionTemplate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private questionTemplateService: QuestionTemplateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInQuestionTemplates();
    }

    load(id) {
        this.questionTemplateService.find(id).subscribe((questionTemplate) => {
            this.questionTemplate = questionTemplate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQuestionTemplates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'questionTemplateListModification',
            (response) => this.load(this.questionTemplate.id)
        );
    }
}
