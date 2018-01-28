import { BaseEntity, User } from './../../shared';

export class Evaluate implements BaseEntity {
    constructor(
        public id?: number,
        public user?: User,
        public evaluateTemplate?: BaseEntity,
        public turma?: BaseEntity,
    ) {
    }
}
