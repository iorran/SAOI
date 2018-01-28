/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SaoiTestModule } from '../../../test.module';
import { ClazzComponent } from '../../../../../../main/webapp/app/entities/clazz/clazz.component';
import { ClazzService } from '../../../../../../main/webapp/app/entities/clazz/clazz.service';
import { Clazz } from '../../../../../../main/webapp/app/entities/clazz/clazz.model';

describe('Component Tests', () => {

    describe('Clazz Management Component', () => {
        let comp: ClazzComponent;
        let fixture: ComponentFixture<ClazzComponent>;
        let service: ClazzService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [ClazzComponent],
                providers: [
                    ClazzService
                ]
            })
            .overrideTemplate(ClazzComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClazzComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClazzService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Clazz(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clazzes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
