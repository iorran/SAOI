/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SaoiTestModule } from '../../../test.module';
import { EvaluateTemplateDetailComponent } from '../../../../../../main/webapp/app/entities/evaluate-template/evaluate-template-detail.component';
import { EvaluateTemplateService } from '../../../../../../main/webapp/app/entities/evaluate-template/evaluate-template.service';
import { EvaluateTemplate } from '../../../../../../main/webapp/app/entities/evaluate-template/evaluate-template.model';

describe('Component Tests', () => {

    describe('EvaluateTemplate Management Detail Component', () => {
        let comp: EvaluateTemplateDetailComponent;
        let fixture: ComponentFixture<EvaluateTemplateDetailComponent>;
        let service: EvaluateTemplateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [EvaluateTemplateDetailComponent],
                providers: [
                    EvaluateTemplateService
                ]
            })
            .overrideTemplate(EvaluateTemplateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluateTemplateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluateTemplateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EvaluateTemplate(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.evaluateTemplate).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
