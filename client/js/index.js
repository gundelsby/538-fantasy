import teamParse from './data/team.js'

// window.fetch('https://projects.fivethirtyeight.com/soccer-predictions/forecasts/2018_eliteserien_matches.json')
//   .then(response => {
//     return response.json()
//   })
//   .then(json => {
//     console.log(json)
//   })

window.fetch('https://projects.fivethirtyeight.com/soccer-predictions/forecasts/2018_eliteserien_forecast.json')
  .then(response => {
    return response.json()
  })
  .then(json => {
    json.forecasts[0].teams.forEach((team) => {
      console.log(teamParse(team))
    })
  })
