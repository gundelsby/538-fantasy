import store from './data/store.js'
import matchTable from './ui/matchtable.js'

async function init () {
  const matches = await store.getMatches()
  const teams = await store.getTeams()
  console.log(`Found ${matches.length} matches and ${teams.length} teams`)

  matchTable(teams, matches)
}

init()
