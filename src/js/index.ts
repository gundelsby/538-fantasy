import matchTable from './ui/matchtable.js';
import stats from './statistics/teams.js';
import store from './data/store.js';

interface StringArray {
  [index: string]: number;
}

async function init() {
  console.log('initializing...');
  const matches = await store.getMatches();
  const teams = await store.getTeams();
  console.log(`Found ${matches.length} matches and ${teams.length} teams`);

  const teamStats = stats.getTeamStats(matches);
  teams.forEach((team) => {
    const scores: any = teamStats.get(team.id);

    for (let key of Object.keys(scores)) {
      if (scores[key]) {
        Object.defineProperty(team, String(key), { value: scores[key] });
      }
    }
  });

  matchTable(teams, matches);
}

console.log('538 Fantasy');
init();
