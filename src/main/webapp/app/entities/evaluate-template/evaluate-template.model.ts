import { BaseEntity } from './../../shared';

export class EvaluateTemplate implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public questions?: BaseEntity[],
    ) {
    }
}
