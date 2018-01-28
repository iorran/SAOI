import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Clazz } from './clazz.model';
import { ClazzPopupService } from './clazz-popup.service';
import { ClazzService } from './clazz.service';

@Component({
    selector: 'jhi-clazz-delete-dialog',
    templateUrl: './clazz-delete-dialog.component.html'
})
export class ClazzDeleteDialogComponent {

    clazz: Clazz;

    constructor(
        private clazzService: ClazzService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clazzService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clazzListModification',
                content: 'Deleted an clazz'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-clazz-delete-popup',
    template: ''
})
export class ClazzDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clazzPopupService: ClazzPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clazzPopupService
                .open(ClazzDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
