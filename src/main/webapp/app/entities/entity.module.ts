import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SaoiQuestionTemplateModule } from './question-template/question-template.module';
import { SaoiEvaluateTemplateModule } from './evaluate-template/evaluate-template.module';
import { SaoiEvaluateModule } from './evaluate/evaluate.module';
import { SaoiAnswerModule } from './answer/answer.module';
import { SaoiClazzModule } from './clazz/clazz.module';
import { SaoiCourseModule } from './course/course.module';
import { SaoiModuleModule } from './module/module.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SaoiQuestionTemplateModule,
        SaoiEvaluateTemplateModule,
        SaoiEvaluateModule,
        SaoiAnswerModule,
        SaoiClazzModule,
        SaoiCourseModule,
        SaoiModuleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaoiEntityModule {}
