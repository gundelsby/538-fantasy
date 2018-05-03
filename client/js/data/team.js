/*
  {
    "code": "BODO",
    "current_losses": 4.0,
    "current_ties": 2.0,
    "current_wins": 1.0,
    "d_rating": 1.4357,
    "global_d": 1.8224,
    "global_o": 0.66938,
    "global_rating": 20.47956,
    "goal_diff": -14.46175,
    "goals_against": 42.2513,
    "goals_scored": 27.78955,
    "id": 2980,
    "losses": 14.6662,
    "make_champs": 0.0001,
    "make_europa": 0.0,
    "make_playoffs": 0.0,
    "name": "Bodo/Glimt",
    "o_rating": 1.05608,
    "position_1": 0.0001,
    "promoted": 0.0,
    "relegated": 0.3374,
    "sdr_id": 74292,
    "ties": 7.855,
    "win_league": 0.0001,
    "wins": 7.4788
  }
*/

function getRealName (json) {
  if (json.id === 2791) {
    return 'søpla'
  } else if (json.id === 438) {
    return 'bartepakket'
  } else {
    return json.name
  }
}

function parse (json) {
  return {
    code: json.code,
    id: json.id,
    name: getRealName(json)
  }
}

export default parse