import { BaseEntity } from './../../shared';

export class QuestionTemplate implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
    ) {
    }
}
