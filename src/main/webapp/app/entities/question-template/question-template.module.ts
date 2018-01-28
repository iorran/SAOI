import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaoiSharedModule } from '../../shared';
import {
    QuestionTemplateService,
    QuestionTemplatePopupService,
    QuestionTemplateComponent,
    QuestionTemplateDetailComponent,
    QuestionTemplateDialogComponent,
    QuestionTemplatePopupComponent,
    QuestionTemplateDeletePopupComponent,
    QuestionTemplateDeleteDialogComponent,
    questionTemplateRoute,
    questionTemplatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...questionTemplateRoute,
    ...questionTemplatePopupRoute,
];

@NgModule({
    imports: [
        SaoiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuestionTemplateComponent,
        QuestionTemplateDetailComponent,
        QuestionTemplateDialogComponent,
        QuestionTemplateDeleteDialogComponent,
        QuestionTemplatePopupComponent,
        QuestionTemplateDeletePopupComponent,
    ],
    entryComponents: [
        QuestionTemplateComponent,
        QuestionTemplateDialogComponent,
        QuestionTemplatePopupComponent,
        QuestionTemplateDeleteDialogComponent,
        QuestionTemplateDeletePopupComponent,
    ],
    providers: [
        QuestionTemplateService,
        QuestionTemplatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaoiQuestionTemplateModule {}
