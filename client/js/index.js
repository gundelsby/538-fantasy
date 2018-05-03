import store from './data/store.js'

async function init () {
  const matches = await store.getMatches()
  const teams = await store.getTeams()
  console.log(`Found ${matches.length} matches and ${teams.length} teams`)
}

init()
