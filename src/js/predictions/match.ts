import { Team } from '../data/team.js';
import { Match } from '../data/match.js';

const teamCache: Map<Team['id'], Team> = new Map();

function fillTeamCache(teams: Array<Team>): void {
  teams.forEach((team) => {
    teamCache.set(team.id, team);
  });
}

function calcAdversityFactor(match: Match, isHomeGame: boolean): number {
  const winProbability = isHomeGame ? match.prob1 : match.prob2;
  return 1.0 - (winProbability + match.probtie / 2);
}
/*
  goalsFor: 0,
  goalsForHome: 0,
  goalsForAway: 0,
  goalsAgainst: 0,
  goalsAgainstHome: 0,
  goalsAgainstAway: 0,
  matchesPlayed: 0,
  matchesPlayedHome: 0,
  matchesPlayedAway: 0
*/

function calcLowestLikelyScore(score1: number, score2: number) {
  return Math.min(score1, score2);
}

function getAverage(total: number = 0, divider: number = 0): number {
  if (total === 0 || divider === 0) {
    return 0;
  }

  return total / divider;
}

interface StringArray {
  [index: string]: number;
}

function calcGoalProbability(match: Match): StringArray | undefined {
  const homeTeam = teamCache.get(match.team1_id);
  const awayTeam = teamCache.get(match.team2_id);

  if (!homeTeam || !awayTeam) {
    return;
  }

  const avgHomeGoalsFor = getAverage(homeTeam.goalsForHome, homeTeam.matchesPlayedHome);
  const avgHomeGoalsAgainst = getAverage(homeTeam.goalsAgainstHome, homeTeam.matchesPlayedHome);
  const avgAwayGoalsFor = getAverage(awayTeam.goalsForAway, awayTeam.matchesPlayedAway);
  const avgAwayGoalsAgainst = getAverage(awayTeam.goalsAgainstAway, awayTeam.matchesPlayedAway);

  const stuff: any = {};
  stuff[`${homeTeam.name}`] = calcLowestLikelyScore(avgHomeGoalsFor, avgAwayGoalsAgainst);
  stuff[`${awayTeam.name}`] = calcLowestLikelyScore(avgAwayGoalsFor, avgHomeGoalsAgainst);
  stuff[`${homeTeam.name} (pred)`] = (homeTeam.o_rating + awayTeam.d_rating) / 2;
  stuff[`${awayTeam.name} (pred)`] = (awayTeam.o_rating + homeTeam.d_rating) / 2;

  return stuff;
}

export interface MatchPredictor {
  calcAdversityFactor: (match: Match, isHomeGame: boolean) => number;
  calcGoalProbability: (match: Match) => StringArray | undefined;
}

export function createMatchPredictor(teams: Array<Team>): MatchPredictor {
  fillTeamCache(teams);

  return {
    calcAdversityFactor,
    calcGoalProbability
  };
}
