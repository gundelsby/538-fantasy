/*
{
id: 401007237,
league_id: 1859,
datetime: "2018-03-11T17:00:00Z",
status: "post",
leg: null,
team1: "Odd BK",
team2: "Haugesund",
team1_id: 602,
team2_id: 3327,
team1_code: "ODDS",
team2_code: "HAU",
prob1: 0.4481,
prob2: 0.2821,
probtie: 0.2698,
round: null,
score1: 1,
score2: 2,
adj_score1: null,
adj_score2: null,
chances1: null,
chances2: null,
moves1: null,
moves2: null,
aggregate_winner: null,
shootout_winner: null
}
*/

function parse (json) {
  return {
    id: json.id,
    datetime: new Date(json.datetime),
    team1_id: json.team1_id,
    team2_id: json.team2_id,
    prob1: json.prob1,
    prob2: json.prob2,
    probtie: json.probtie,
    score1: json.score1,
    score2: json.score2
  };
}

export default parse;
