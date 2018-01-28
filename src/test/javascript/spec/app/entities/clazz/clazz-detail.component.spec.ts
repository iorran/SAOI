/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SaoiTestModule } from '../../../test.module';
import { ClazzDetailComponent } from '../../../../../../main/webapp/app/entities/clazz/clazz-detail.component';
import { ClazzService } from '../../../../../../main/webapp/app/entities/clazz/clazz.service';
import { Clazz } from '../../../../../../main/webapp/app/entities/clazz/clazz.model';

describe('Component Tests', () => {

    describe('Clazz Management Detail Component', () => {
        let comp: ClazzDetailComponent;
        let fixture: ComponentFixture<ClazzDetailComponent>;
        let service: ClazzService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SaoiTestModule],
                declarations: [ClazzDetailComponent],
                providers: [
                    ClazzService
                ]
            })
            .overrideTemplate(ClazzDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClazzDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClazzService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Clazz(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clazz).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
