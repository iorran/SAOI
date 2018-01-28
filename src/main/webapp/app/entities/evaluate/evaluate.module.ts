import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaoiSharedModule } from '../../shared';
import { SaoiAdminModule } from '../../admin/admin.module';
import {
    EvaluateService,
    EvaluatePopupService,
    EvaluateComponent,
    EvaluateDetailComponent,
    EvaluateDialogComponent,
    EvaluatePopupComponent,
    EvaluateDeletePopupComponent,
    EvaluateDeleteDialogComponent,
    evaluateRoute,
    evaluatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...evaluateRoute,
    ...evaluatePopupRoute,
];

@NgModule({
    imports: [
        SaoiSharedModule,
        SaoiAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EvaluateComponent,
        EvaluateDetailComponent,
        EvaluateDialogComponent,
        EvaluateDeleteDialogComponent,
        EvaluatePopupComponent,
        EvaluateDeletePopupComponent,
    ],
    entryComponents: [
        EvaluateComponent,
        EvaluateDialogComponent,
        EvaluatePopupComponent,
        EvaluateDeleteDialogComponent,
        EvaluateDeletePopupComponent,
    ],
    providers: [
        EvaluateService,
        EvaluatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaoiEvaluateModule {}
