import store from './data/store.js'
import matchTable from './ui/matchtable.js'
import stats from './statistics/teams.js'

async function init () {
  console.log('initializing...')
  const matches = await store.getMatches()
  const teams = await store.getTeams()
  console.log(`Found ${matches.length} matches and ${teams.length} teams`)

  const teamScores = stats.getTeamScores(matches)
  teams.forEach(team => {
    const scores = teamScores[team.id]
    Object.keys(scores).forEach(key => {
      team[key] = scores[key]
    })
  })

  matchTable(teams, matches)
}

console.log('538 Fantasy')
init()
