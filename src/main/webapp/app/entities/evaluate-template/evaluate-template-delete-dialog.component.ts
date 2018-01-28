import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EvaluateTemplate } from './evaluate-template.model';
import { EvaluateTemplatePopupService } from './evaluate-template-popup.service';
import { EvaluateTemplateService } from './evaluate-template.service';

@Component({
    selector: 'jhi-evaluate-template-delete-dialog',
    templateUrl: './evaluate-template-delete-dialog.component.html'
})
export class EvaluateTemplateDeleteDialogComponent {

    evaluateTemplate: EvaluateTemplate;

    constructor(
        private evaluateTemplateService: EvaluateTemplateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.evaluateTemplateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'evaluateTemplateListModification',
                content: 'Deleted an evaluateTemplate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-evaluate-template-delete-popup',
    template: ''
})
export class EvaluateTemplateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluateTemplatePopupService: EvaluateTemplatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.evaluateTemplatePopupService
                .open(EvaluateTemplateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
