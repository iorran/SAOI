/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SaoiTestModule } from '../../../test.module';
import { EvaluateDialogComponent } from '../../../../../../main/webapp/app/entities/evaluate/evaluate-dialog.component';
import { EvaluateService } from '../../../../../../main/webapp/app/entities/evaluate/evaluate.service';
import { Evaluate } from '../../../../../../main/webapp/app/entities/evaluate/evaluate.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { EvaluateTemplateService } from '../../../../../../main/webapp/app/entities/evaluate-template';
import { ClazzService } from '../../../../../../main/webapp/app/entities/clazz';

describe('Component Tests', () => {

    describe('Evaluate Management Dialog Component', () => {
        let comp: EvaluateDialogComponent;
        let fixture: ComponentFixture<EvaluateDialogComponent>;
        let service: EvaluateService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [EvaluateDialogComponent],
                providers: [
                    UserService,
                    EvaluateTemplateService,
                    ClazzService,
                    EvaluateService
                ]
            })
            .overrideTemplate(EvaluateDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluateDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluateService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Evaluate(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.evaluate = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'evaluateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Evaluate();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.evaluate = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'evaluateListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
