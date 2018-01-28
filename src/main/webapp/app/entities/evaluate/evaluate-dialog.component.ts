import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Evaluate } from './evaluate.model';
import { EvaluatePopupService } from './evaluate-popup.service';
import { EvaluateService } from './evaluate.service';
import { User, UserService } from '../../shared';
import { EvaluateTemplate, EvaluateTemplateService } from '../evaluate-template';
import { Clazz, ClazzService } from '../clazz';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evaluate-dialog',
    templateUrl: './evaluate-dialog.component.html'
})
export class EvaluateDialogComponent implements OnInit {

    evaluate: Evaluate;
    isSaving: boolean;

    users: User[];

    evaluatetemplates: EvaluateTemplate[];

    clazzes: Clazz[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private evaluateService: EvaluateService,
        private userService: UserService,
        private evaluateTemplateService: EvaluateTemplateService,
        private clazzService: ClazzService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.evaluateTemplateService.query()
            .subscribe((res: ResponseWrapper) => { this.evaluatetemplates = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.clazzService.query()
            .subscribe((res: ResponseWrapper) => { this.clazzes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evaluate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.evaluateService.update(this.evaluate));
        } else {
            this.subscribeToSaveResponse(
                this.evaluateService.create(this.evaluate));
        }
    }

    private subscribeToSaveResponse(result: Observable<Evaluate>) {
        result.subscribe((res: Evaluate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Evaluate) {
        this.eventManager.broadcast({ name: 'evaluateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackEvaluateTemplateById(index: number, item: EvaluateTemplate) {
        return item.id;
    }

    trackClazzById(index: number, item: Clazz) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-evaluate-popup',
    template: ''
})
export class EvaluatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluatePopupService: EvaluatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.evaluatePopupService
                    .open(EvaluateDialogComponent as Component, params['id']);
            } else {
                this.evaluatePopupService
                    .open(EvaluateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
