import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaoiSharedModule } from '../../shared';
import {
    ModuleService,
    ModulePopupService,
    ModuleComponent,
    ModuleDetailComponent,
    ModuleDialogComponent,
    ModulePopupComponent,
    ModuleDeletePopupComponent,
    ModuleDeleteDialogComponent,
    moduleRoute,
    modulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...moduleRoute,
    ...modulePopupRoute,
];

@NgModule({
    imports: [
        SaoiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ModuleComponent,
        ModuleDetailComponent,
        ModuleDialogComponent,
        ModuleDeleteDialogComponent,
        ModulePopupComponent,
        ModuleDeletePopupComponent,
    ],
    entryComponents: [
        ModuleComponent,
        ModuleDialogComponent,
        ModulePopupComponent,
        ModuleDeleteDialogComponent,
        ModuleDeletePopupComponent,
    ],
    providers: [
        ModuleService,
        ModulePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaoiModuleModule {}
