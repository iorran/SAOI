import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EvaluateTemplate } from './evaluate-template.model';
import { EvaluateTemplatePopupService } from './evaluate-template-popup.service';
import { EvaluateTemplateService } from './evaluate-template.service';
import { QuestionTemplate, QuestionTemplateService } from '../question-template';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evaluate-template-dialog',
    templateUrl: './evaluate-template-dialog.component.html'
})
export class EvaluateTemplateDialogComponent implements OnInit {

    evaluateTemplate: EvaluateTemplate;
    isSaving: boolean;

    questiontemplates: QuestionTemplate[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private evaluateTemplateService: EvaluateTemplateService,
        private questionTemplateService: QuestionTemplateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.questionTemplateService.query()
            .subscribe((res: ResponseWrapper) => { this.questiontemplates = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evaluateTemplate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.evaluateTemplateService.update(this.evaluateTemplate));
        } else {
            this.subscribeToSaveResponse(
                this.evaluateTemplateService.create(this.evaluateTemplate));
        }
    }

    private subscribeToSaveResponse(result: Observable<EvaluateTemplate>) {
        result.subscribe((res: EvaluateTemplate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EvaluateTemplate) {
        this.eventManager.broadcast({ name: 'evaluateTemplateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackQuestionTemplateById(index: number, item: QuestionTemplate) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-evaluate-template-popup',
    template: ''
})
export class EvaluateTemplatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluateTemplatePopupService: EvaluateTemplatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.evaluateTemplatePopupService
                    .open(EvaluateTemplateDialogComponent as Component, params['id']);
            } else {
                this.evaluateTemplatePopupService
                    .open(EvaluateTemplateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
