import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { QuestionTemplate } from './question-template.model';
import { QuestionTemplatePopupService } from './question-template-popup.service';
import { QuestionTemplateService } from './question-template.service';

@Component({
    selector: 'jhi-question-template-delete-dialog',
    templateUrl: './question-template-delete-dialog.component.html'
})
export class QuestionTemplateDeleteDialogComponent {

    questionTemplate: QuestionTemplate;

    constructor(
        private questionTemplateService: QuestionTemplateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.questionTemplateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'questionTemplateListModification',
                content: 'Deleted an questionTemplate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-question-template-delete-popup',
    template: ''
})
export class QuestionTemplateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private questionTemplatePopupService: QuestionTemplatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.questionTemplatePopupService
                .open(QuestionTemplateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
