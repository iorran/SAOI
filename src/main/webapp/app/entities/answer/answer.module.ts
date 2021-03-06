import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaoiSharedModule } from '../../shared';
import {
    AnswerService,
    AnswerPopupService,
    AnswerComponent,
    AnswerDetailComponent,
    AnswerDialogComponent,
    AnswerPopupComponent,
    AnswerDeletePopupComponent,
    AnswerDeleteDialogComponent,
    answerRoute,
    answerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...answerRoute,
    ...answerPopupRoute,
];

@NgModule({
    imports: [
        SaoiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AnswerComponent,
        AnswerDetailComponent,
        AnswerDialogComponent,
        AnswerDeleteDialogComponent,
        AnswerPopupComponent,
        AnswerDeletePopupComponent,
    ],
    entryComponents: [
        AnswerComponent,
        AnswerDialogComponent,
        AnswerPopupComponent,
        AnswerDeleteDialogComponent,
        AnswerDeletePopupComponent,
    ],
    providers: [
        AnswerService,
        AnswerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaoiAnswerModule {}
