import { BaseEntity, User } from './../../shared';

export class Clazz implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public start?: any,
        public end?: any,
        public modulo?: BaseEntity,
        public students?: User[],
    ) {
    }
}
