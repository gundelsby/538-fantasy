import store from './data/store.js'

const matches = store.getMatches()
const teams = store.getTeams()

console.log(`Found ${matches.length} matches and ${teams.length} teams`)
