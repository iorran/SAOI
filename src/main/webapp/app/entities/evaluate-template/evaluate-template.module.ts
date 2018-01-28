import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaoiSharedModule } from '../../shared';
import {
    EvaluateTemplateService,
    EvaluateTemplatePopupService,
    EvaluateTemplateComponent,
    EvaluateTemplateDetailComponent,
    EvaluateTemplateDialogComponent,
    EvaluateTemplatePopupComponent,
    EvaluateTemplateDeletePopupComponent,
    EvaluateTemplateDeleteDialogComponent,
    evaluateTemplateRoute,
    evaluateTemplatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...evaluateTemplateRoute,
    ...evaluateTemplatePopupRoute,
];

@NgModule({
    imports: [
        SaoiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EvaluateTemplateComponent,
        EvaluateTemplateDetailComponent,
        EvaluateTemplateDialogComponent,
        EvaluateTemplateDeleteDialogComponent,
        EvaluateTemplatePopupComponent,
        EvaluateTemplateDeletePopupComponent,
    ],
    entryComponents: [
        EvaluateTemplateComponent,
        EvaluateTemplateDialogComponent,
        EvaluateTemplatePopupComponent,
        EvaluateTemplateDeleteDialogComponent,
        EvaluateTemplateDeletePopupComponent,
    ],
    providers: [
        EvaluateTemplateService,
        EvaluateTemplatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaoiEvaluateTemplateModule {}
