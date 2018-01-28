import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Clazz } from './clazz.model';
import { ClazzPopupService } from './clazz-popup.service';
import { ClazzService } from './clazz.service';
import { Module, ModuleService } from '../module';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-clazz-dialog',
    templateUrl: './clazz-dialog.component.html'
})
export class ClazzDialogComponent implements OnInit {

    clazz: Clazz;
    isSaving: boolean;

    modules: Module[];

    users: User[];
    startDp: any;
    endDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clazzService: ClazzService,
        private moduleService: ModuleService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moduleService.query()
            .subscribe((res: ResponseWrapper) => { this.modules = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.clazz.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clazzService.update(this.clazz));
        } else {
            this.subscribeToSaveResponse(
                this.clazzService.create(this.clazz));
        }
    }

    private subscribeToSaveResponse(result: Observable<Clazz>) {
        result.subscribe((res: Clazz) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Clazz) {
        this.eventManager.broadcast({ name: 'clazzListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackModuleById(index: number, item: Module) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
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
    selector: 'jhi-clazz-popup',
    template: ''
})
export class ClazzPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clazzPopupService: ClazzPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clazzPopupService
                    .open(ClazzDialogComponent as Component, params['id']);
            } else {
                this.clazzPopupService
                    .open(ClazzDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
