import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { QuestionTemplateComponent } from './question-template.component';
import { QuestionTemplateDetailComponent } from './question-template-detail.component';
import { QuestionTemplatePopupComponent } from './question-template-dialog.component';
import { QuestionTemplateDeletePopupComponent } from './question-template-delete-dialog.component';

export const questionTemplateRoute: Routes = [
    {
        path: 'question-template',
        component: QuestionTemplateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionTemplates'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'question-template/:id',
        component: QuestionTemplateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionTemplates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const questionTemplatePopupRoute: Routes = [
    {
        path: 'question-template-new',
        component: QuestionTemplatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionTemplates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'question-template/:id/edit',
        component: QuestionTemplatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionTemplates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'question-template/:id/delete',
        component: QuestionTemplateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionTemplates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
