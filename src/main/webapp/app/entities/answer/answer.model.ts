import { BaseEntity } from './../../shared';

export const enum AnswerType {
    'CT',
    'C',
    'NCND',
    'D',
    'DT',
    'NA'
}

export class Answer implements BaseEntity {
    constructor(
        public id?: number,
        public answer?: AnswerType,
        public question?: BaseEntity,
    ) {
    }
}
