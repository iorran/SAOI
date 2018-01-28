import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EvaluateComponent } from './evaluate.component';
import { EvaluateDetailComponent } from './evaluate-detail.component';
import { EvaluatePopupComponent } from './evaluate-dialog.component';
import { EvaluateDeletePopupComponent } from './evaluate-delete-dialog.component';

export const evaluateRoute: Routes = [
    {
        path: 'evaluate',
        component: EvaluateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluates'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evaluate/:id',
        component: EvaluateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evaluatePopupRoute: Routes = [
    {
        path: 'evaluate-new',
        component: EvaluatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluate/:id/edit',
        component: EvaluatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluate/:id/delete',
        component: EvaluateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
