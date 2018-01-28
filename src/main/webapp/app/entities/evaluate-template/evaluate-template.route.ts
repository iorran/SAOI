import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EvaluateTemplateComponent } from './evaluate-template.component';
import { EvaluateTemplateDetailComponent } from './evaluate-template-detail.component';
import { EvaluateTemplatePopupComponent } from './evaluate-template-dialog.component';
import { EvaluateTemplateDeletePopupComponent } from './evaluate-template-delete-dialog.component';

export const evaluateTemplateRoute: Routes = [
    {
        path: 'evaluate-template',
        component: EvaluateTemplateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluateTemplates'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evaluate-template/:id',
        component: EvaluateTemplateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluateTemplates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evaluateTemplatePopupRoute: Routes = [
    {
        path: 'evaluate-template-new',
        component: EvaluateTemplatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluateTemplates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluate-template/:id/edit',
        component: EvaluateTemplatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluateTemplates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluate-template/:id/delete',
        component: EvaluateTemplateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluateTemplates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
