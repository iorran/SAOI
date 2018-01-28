import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClazzComponent } from './clazz.component';
import { ClazzDetailComponent } from './clazz-detail.component';
import { ClazzPopupComponent } from './clazz-dialog.component';
import { ClazzDeletePopupComponent } from './clazz-delete-dialog.component';

export const clazzRoute: Routes = [
    {
        path: 'clazz',
        component: ClazzComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clazzes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'clazz/:id',
        component: ClazzDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clazzes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clazzPopupRoute: Routes = [
    {
        path: 'clazz-new',
        component: ClazzPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clazzes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clazz/:id/edit',
        component: ClazzPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clazzes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clazz/:id/delete',
        component: ClazzDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clazzes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
