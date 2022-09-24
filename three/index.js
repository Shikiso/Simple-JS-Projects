/*
An app that creates and artificial VALORANT match
*/

var map = "Haven";
const GAME_MODE = "competitive";
const AGENTS_DATA = require('./Data.json');

function create_agent(Number){
    var agent = AGENTS_DATA.agents[Number]
    agent.Abilities.Basic1 = AGENTS_DATA.abilities[agent.Abilities.Basic1]
    agent.Abilities.Basic2 = AGENTS_DATA.abilities[agent.Abilities.Basic2]
    agent.Abilities.Signiture = AGENTS_DATA.abilities[agent.Abilities.Signiture]
    agent.Abilities.Ultimate = AGENTS_DATA.abilities[agent.Abilities.Ultimate]

    if (agent.Abilities.Passive != null){
        agent.Abilities.Passive = AGENTS_DATA.abilities[agent.Abilities.Passive]
    }

    return agent;
}

function create_player(Name, Agent){
    var player = {
        Name: Name,
        Agent: create_agent(Agent)
    };

    return player;
}

function create_team(Name){
    var Players = []
    for (var i=0; i < 5; i++){
        Players.push(create_player("P" + i, i))
    }

    var team = {
        Name: Name,
        Players: Players
    };

    return team;
}

function create_all_teams(){
    attack = true;
    var Teams = [];
    var T;
    for (var i=1; i < 17; i++){
        if (attack){
            T = create_team("Team" + i);
            attack = false
        } else {
            T = create_team("Team" + i);
            attack = true
        }

        Teams.push(T);
    }

    return Teams;
}

function create_bracket(Teams){
    if (Teams.length == 0){
        return [];
    }

    var Bracket = [];
    var versing = [];

    for (var i=0; i<Teams.length; i++){
        var team = Teams[i]

        if (versing.length <= 1){
            versing.push(team)
        }
        if (versing.length >= 2){
            Bracket.push(versing);
            versing = [];
        }
    }

    return Bracket;
}

function tournament(Bracket){
    var Winners = [];

    for (var i=0; i<Bracket.length; i++){
        Team1 = Bracket[i][0];
        Team2 = Bracket[i][1];
        
        if (Math.floor(Math.random() * 10) >= 5){
            Winners.push(Team1);
        } else {
            Winners.push(Team2);
        }
    }

    if (Winners.length >= 2){
        var Bracket = create_bracket(Winners);
        Winners = tournament(Bracket);
    }

    return Winners;
}

var Teams = create_all_teams();
var Bracket = create_bracket(Teams);
var Winners = tournament(Bracket)[0];

console.log("MAP: " + map);
console.log("Winners: " + Winners.Name);
console.log("");
for (var i=0; i<Winners.Players.length; i++){
    console.log("Player:     " + Winners.Players[i].Name);
    console.log("Agent:      " + Winners.Players[i].Agent.Name);
    console.log("Agent Type: " + Winners.Players[i].Agent.Type);
    console.log("");
}
