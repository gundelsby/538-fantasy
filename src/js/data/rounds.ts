import { Match } from './match.js';

export interface Round {
  start: Date;
  matches?: Match[];
}

export const rounds: Round[] = [
  { start: new Date('2020-06-17T17:00') },
  { start: new Date('2020-06-20T17:00') },
  { start: new Date('2020-06-24T17:00') },
  { start: new Date('2020-06-27T17:00') },
  { start: new Date('2020-07-01T17:00') },
  { start: new Date('2020-07-04T17:00') },
  { start: new Date('2020-07-11T17:00') },
  { start: new Date('2020-07-15T17:00') },
  { start: new Date('2020-07-18T17:00') },
  { start: new Date('2020-07-25T17:00') },
  { start: new Date('2020-07-29T17:00') },
  { start: new Date('2020-08-01T17:00') },
  { start: new Date('2020-08-08T17:00') },
  { start: new Date('2020-08-15T17:00') },
  { start: new Date('2020-08-22T17:00') },
  { start: new Date('2020-08-29T17:00') },
  { start: new Date('2020-09-04T17:00') },
  { start: new Date('2020-09-07T17:00') },
  { start: new Date('2020-09-09T17:00') },
  { start: new Date('2020-09-13T17:00') },
  { start: new Date('2020-09-16T17:00') },
  { start: new Date('2020-09-20T17:00') },
  { start: new Date('2020-09-23T17:00') },
  { start: new Date('2020-09-27T17:00') },
  { start: new Date('2020-10-04T17:00') },
  { start: new Date('2020-10-18T17:00') },
  { start: new Date('2020-11-01T17:00') },
  { start: new Date('2020-11-08T17:00') },
  { start: new Date('2020-11-22T17:00') },
  { start: new Date('2020-11-29T17:00') }
];
