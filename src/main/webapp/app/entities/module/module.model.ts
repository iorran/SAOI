import { BaseEntity } from './../../shared';

export class Module implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public course?: BaseEntity,
    ) {
    }
}
