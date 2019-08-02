import { Match } from './match.js';

export type Round = {
  start: Date;
  matches?: Match[];
};

export const rounds: Array<Round> = [
  { start: new Date('2019-03-30T14:30') },
  { start: new Date('2019-04-06T17:00') },
  { start: new Date('2019-04-12T18:00') },
  { start: new Date('2019-04-22T17:00') },
  { start: new Date('2019-04-27T17:00') },
  { start: new Date('2019-05-04T18:00') },
  { start: new Date('2019-05-11T17:00') },
  { start: new Date('2019-05-16T17:00') },
  { start: new Date('2019-05-19T17:00') },
  { start: new Date('2019-05-25T17:00') },
  { start: new Date('2019-06-15T17:00') },
  { start: new Date('2019-06-22T17:00') },
  { start: new Date('2019-06-29T17:00') },
  { start: new Date('2019-07-04T19:00') },
  { start: new Date('2019-07-13T14:30') },
  { start: new Date('2019-08-03T18:00') },
  { start: new Date('2019-08-10T17:00') },
  { start: new Date('2019-08-17T17:00') },
  { start: new Date('2019-08-24T17:00') },
  { start: new Date('2019-08-30T18:00') },
  { start: new Date('2019-09-14T18:00') },
  { start: new Date('2019-09-21T18:00') },
  { start: new Date('2019-09-28T18:00') },
  { start: new Date('2019-10-05T18:00') },
  { start: new Date('2019-10-19T18:00') },
  { start: new Date('2019-10-26T18:00') },
  { start: new Date('2019-11-02T18:00') },
  { start: new Date('2019-11-09T18:00') },
  { start: new Date('2019-11-24T18:00') },
  { start: new Date('2019-12-01T18:00') }
];
