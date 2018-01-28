import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionTemplate } from './question-template.model';
import { QuestionTemplatePopupService } from './question-template-popup.service';
import { QuestionTemplateService } from './question-template.service';

@Component({
    selector: 'jhi-question-template-dialog',
    templateUrl: './question-template-dialog.component.html'
})
export class QuestionTemplateDialogComponent implements OnInit {

    questionTemplate: QuestionTemplate;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private questionTemplateService: QuestionTemplateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.questionTemplate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.questionTemplateService.update(this.questionTemplate));
        } else {
            this.subscribeToSaveResponse(
                this.questionTemplateService.create(this.questionTemplate));
        }
    }

    private subscribeToSaveResponse(result: Observable<QuestionTemplate>) {
        result.subscribe((res: QuestionTemplate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: QuestionTemplate) {
        this.eventManager.broadcast({ name: 'questionTemplateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-question-template-popup',
    template: ''
})
export class QuestionTemplatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private questionTemplatePopupService: QuestionTemplatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.questionTemplatePopupService
                    .open(QuestionTemplateDialogComponent as Component, params['id']);
            } else {
                this.questionTemplatePopupService
                    .open(QuestionTemplateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
