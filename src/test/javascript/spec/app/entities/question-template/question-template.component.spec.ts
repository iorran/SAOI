/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SaoiTestModule } from '../../../test.module';
import { QuestionTemplateComponent } from '../../../../../../main/webapp/app/entities/question-template/question-template.component';
import { QuestionTemplateService } from '../../../../../../main/webapp/app/entities/question-template/question-template.service';
import { QuestionTemplate } from '../../../../../../main/webapp/app/entities/question-template/question-template.model';

describe('Component Tests', () => {

    describe('QuestionTemplate Management Component', () => {
        let comp: QuestionTemplateComponent;
        let fixture: ComponentFixture<QuestionTemplateComponent>;
        let service: QuestionTemplateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [QuestionTemplateComponent],
                providers: [
                    QuestionTemplateService
                ]
            })
            .overrideTemplate(QuestionTemplateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionTemplateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionTemplateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new QuestionTemplate(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.questionTemplates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
