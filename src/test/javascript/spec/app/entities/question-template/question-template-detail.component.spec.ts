/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SaoiTestModule } from '../../../test.module';
import { QuestionTemplateDetailComponent } from '../../../../../../main/webapp/app/entities/question-template/question-template-detail.component';
import { QuestionTemplateService } from '../../../../../../main/webapp/app/entities/question-template/question-template.service';
import { QuestionTemplate } from '../../../../../../main/webapp/app/entities/question-template/question-template.model';

describe('Component Tests', () => {

    describe('QuestionTemplate Management Detail Component', () => {
        let comp: QuestionTemplateDetailComponent;
        let fixture: ComponentFixture<QuestionTemplateDetailComponent>;
        let service: QuestionTemplateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [QuestionTemplateDetailComponent],
                providers: [
                    QuestionTemplateService
                ]
            })
            .overrideTemplate(QuestionTemplateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionTemplateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionTemplateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new QuestionTemplate(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.questionTemplate).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
