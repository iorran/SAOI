import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Clazz } from './clazz.model';
import { ClazzService } from './clazz.service';

@Injectable()
export class ClazzPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private clazzService: ClazzService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.clazzService.find(id).subscribe((clazz) => {
                    if (clazz.start) {
                        clazz.start = {
                            year: clazz.start.getFullYear(),
                            month: clazz.start.getMonth() + 1,
                            day: clazz.start.getDate()
                        };
                    }
                    if (clazz.end) {
                        clazz.end = {
                            year: clazz.end.getFullYear(),
                            month: clazz.end.getMonth() + 1,
                            day: clazz.end.getDate()
                        };
                    }
                    this.ngbModalRef = this.clazzModalRef(component, clazz);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.clazzModalRef(component, new Clazz());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    clazzModalRef(component: Component, clazz: Clazz): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.clazz = clazz;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
