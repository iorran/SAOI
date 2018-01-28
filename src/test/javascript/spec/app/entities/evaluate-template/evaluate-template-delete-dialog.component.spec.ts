/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SaoiTestModule } from '../../../test.module';
import { EvaluateTemplateDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/evaluate-template/evaluate-template-delete-dialog.component';
import { EvaluateTemplateService } from '../../../../../../main/webapp/app/entities/evaluate-template/evaluate-template.service';

describe('Component Tests', () => {

    describe('EvaluateTemplate Management Delete Component', () => {
        let comp: EvaluateTemplateDeleteDialogComponent;
        let fixture: ComponentFixture<EvaluateTemplateDeleteDialogComponent>;
        let service: EvaluateTemplateService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [EvaluateTemplateDeleteDialogComponent],
                providers: [
                    EvaluateTemplateService
                ]
            })
            .overrideTemplate(EvaluateTemplateDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluateTemplateDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluateTemplateService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
