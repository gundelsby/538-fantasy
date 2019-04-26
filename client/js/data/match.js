export function parse(json) {
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
