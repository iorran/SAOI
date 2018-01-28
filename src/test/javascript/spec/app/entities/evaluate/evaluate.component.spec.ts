/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SaoiTestModule } from '../../../test.module';
import { EvaluateComponent } from '../../../../../../main/webapp/app/entities/evaluate/evaluate.component';
import { EvaluateService } from '../../../../../../main/webapp/app/entities/evaluate/evaluate.service';
import { Evaluate } from '../../../../../../main/webapp/app/entities/evaluate/evaluate.model';

describe('Component Tests', () => {

    describe('Evaluate Management Component', () => {
        let comp: EvaluateComponent;
        let fixture: ComponentFixture<EvaluateComponent>;
        let service: EvaluateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [EvaluateComponent],
                providers: [
                    EvaluateService
                ]
            })
            .overrideTemplate(EvaluateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Evaluate(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.evaluates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
