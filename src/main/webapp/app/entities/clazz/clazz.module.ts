import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaoiSharedModule } from '../../shared';
import { SaoiAdminModule } from '../../admin/admin.module';
import {
    ClazzService,
    ClazzPopupService,
    ClazzComponent,
    ClazzDetailComponent,
    ClazzDialogComponent,
    ClazzPopupComponent,
    ClazzDeletePopupComponent,
    ClazzDeleteDialogComponent,
    clazzRoute,
    clazzPopupRoute,
} from './';

const ENTITY_STATES = [
    ...clazzRoute,
    ...clazzPopupRoute,
];

@NgModule({
    imports: [
        SaoiSharedModule,
        SaoiAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClazzComponent,
        ClazzDetailComponent,
        ClazzDialogComponent,
        ClazzDeleteDialogComponent,
        ClazzPopupComponent,
        ClazzDeletePopupComponent,
    ],
    entryComponents: [
        ClazzComponent,
        ClazzDialogComponent,
        ClazzPopupComponent,
        ClazzDeleteDialogComponent,
        ClazzDeletePopupComponent,
    ],
    providers: [
        ClazzService,
        ClazzPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaoiClazzModule {}
