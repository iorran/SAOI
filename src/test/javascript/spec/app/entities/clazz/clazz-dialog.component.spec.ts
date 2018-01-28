/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SaoiTestModule } from '../../../test.module';
import { ClazzDialogComponent } from '../../../../../../main/webapp/app/entities/clazz/clazz-dialog.component';
import { ClazzService } from '../../../../../../main/webapp/app/entities/clazz/clazz.service';
import { Clazz } from '../../../../../../main/webapp/app/entities/clazz/clazz.model';
import { ModuleService } from '../../../../../../main/webapp/app/entities/module';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('Clazz Management Dialog Component', () => {
        let comp: ClazzDialogComponent;
        let fixture: ComponentFixture<ClazzDialogComponent>;
        let service: ClazzService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [ClazzDialogComponent],
                providers: [
                    ModuleService,
                    UserService,
                    ClazzService
                ]
            })
            .overrideTemplate(ClazzDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClazzDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClazzService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Clazz(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.clazz = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clazzListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Clazz();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.clazz = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clazzListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
