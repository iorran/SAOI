/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SaoiTestModule } from '../../../test.module';
import { AnswerDetailComponent } from '../../../../../../main/webapp/app/entities/answer/answer-detail.component';
import { AnswerService } from '../../../../../../main/webapp/app/entities/answer/answer.service';
import { Answer } from '../../../../../../main/webapp/app/entities/answer/answer.model';

describe('Component Tests', () => {

    describe('Answer Management Detail Component', () => {
        let comp: AnswerDetailComponent;
        let fixture: ComponentFixture<AnswerDetailComponent>;
        let service: AnswerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [AnswerDetailComponent],
                providers: [
                    AnswerService
                ]
            })
            .overrideTemplate(AnswerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnswerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Answer(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.answer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
