function createTeamDetailsDataRow(name, value) {
    const row = document.createElement('tr');
    const header = document.createElement('th');
    header.textContent = name;
    row.appendChild(header);
    const data = document.createElement('td');
    const numericValue = Number(value);
    data.textContent = `${Number.isNaN(numericValue) ? value : numericValue.toFixed(2)}`;
    row.appendChild(data);
    return row;
}
function getAverage(total = 0, divider = 0) {
    if (total === 0 || divider === 0) {
        return 0;
    }
    return total / divider;
}
function createTeamDetails(team) {
    const container = document.createElement('div');
    container.classList.add('team--details', 'overlay');
    const dataTable = document.createElement('table');
    dataTable.classList.add('team--details__data');
    dataTable.appendChild(createTeamDetailsDataRow('Mål scoret', team.goalsFor));
    dataTable.appendChild(createTeamDetailsDataRow(' -> Gjennomsnitt', getAverage(team.goalsFor, team.matchesPlayed)));
    dataTable.appendChild(createTeamDetailsDataRow('-> Gjennomsnitt hjemme', getAverage(team.goalsForHome, team.matchesPlayedHome)));
    dataTable.appendChild(createTeamDetailsDataRow('-> Gjennomsnitt borte', getAverage(team.goalsForAway, team.matchesPlayedAway)));
    dataTable.appendChild(createTeamDetailsDataRow('Mål sluppet inn', team.goalsAgainst));
    dataTable.appendChild(createTeamDetailsDataRow('-> Gjennomsnitt', getAverage(team.goalsAgainst, team.matchesPlayed)));
    dataTable.appendChild(createTeamDetailsDataRow('-> Gjennomsnitt hjemme', getAverage(team.goalsAgainstHome, team.matchesPlayedHome)));
    dataTable.appendChild(createTeamDetailsDataRow('-> Gjennomsnitt borte', getAverage(team.goalsAgainstAway, team.matchesPlayedAway)));
    dataTable.appendChild(createTeamDetailsDataRow('Off rating', team.o_rating));
    dataTable.appendChild(createTeamDetailsDataRow('Def rating', team.d_rating));
    container.appendChild(dataTable);
    return container;
}
function createTeamHeader(name) {
    const th = document.createElement('th');
    th.classList.add('team', 'overlay--container');
    const content = document.createElement('div');
    content.classList.add('matchtable--content');
    content.textContent = name;
    th.appendChild(content);
    return th;
}
function createTeamInfo(team) {
    const teamHeader = createTeamHeader(team.name);
    teamHeader.appendChild(createTeamDetails(team));
    return teamHeader;
}
export { createTeamInfo, createTeamHeader };
