#!./node_modules/traceur/traceur
import IW from './IW.js';
import Sign from './Sign.js';
import Skill from './Skill.js';
import {Idol,Card} from './Idol.js';
import Materials from './Materials.js';
import Position from './Position.js';
import Player from './Player.js';
import Team from './Team.js';

IW.battleLog = true;
IW.battleRound = 1;

let test_idols = [
  {guild: "AOA",       name: "Choaya",         birth: "1990-03-06", skills:{health:10, power:10, speed:10}},
  {guild: "AOA",       name: "Jiminel",        birth: "1991-01-08", skills:{health:10, power:10, speed:10}},
  {guild: "AOA",       name: "Yunaria",        birth: "1992-12-30", skills:{health:10, power:10, speed:10}},
  {guild: "AOA",       name: "Y",              birth: "1993-03-15", skills:{health:10, power:10, speed:10}},
  {guild: "AOA",       name: "Hyejeong.Linus", birth: "1993-08-10", skills:{health:10, power:10, speed:10}},
  {guild: "AOA",       name: "Minaring",       birth: "1993-09-21", skills:{health:10, power:10, speed:10}},
  {guild: "AOA",       name: "Seolhyunari",    birth: "1995-01-03", skills:{health:10, power:10, speed:10}},
  {guild: "AOA",       name: "Chanmi T.T",     birth: "1996-06-19", skills:{health:10, power:10, speed:10}},
  {guild: "Crayonpop", name: "Geummi",         birth: "1988-06-18", skills:{health:10, power:10, speed:10}},
  {guild: "Crayonpop", name: "Ellin",          birth: "1990-04-02", skills:{health:10, power:10, speed:10}},
  {guild: "Crayonpop", name: "Way",            birth: "1990-07-12", skills:{health:10, power:10, speed:10}},
  {guild: "Crayonpop", name: "Choa",           birth: "1990-07-12", skills:{health:10, power:10, speed:10}},
  {guild: "Crayonpop", name: "Soyul",          birth: "1991-05-15", skills:{health:10, power:10, speed:10}},
];

let cards = [];
for (let record of test_idols) {
  let skills = [];
  for (let key in record.skills) {
    skills.push(new Skill(key,record.skills[key]));
  }

  let idol = new Idol(
        record.guild,
        record.name,
        new Sign(new Date(record.birth)),
        skills);

  let testScore = 1000;
  if (record.guild == "AOA") testScore /= 8.0;
  else testScore /= 4.9;

  if (record.guild == "AOA")
    cards.push(new Card(idol, new Materials(testScore,testScore,testScore,testScore)));
  else
    cards.push(new Card(idol, new Materials(testScore,testScore,testScore,testScore)));
}

cards.sort(function(a,b){ return a.idol.guild > b.idol.guild });

let winning = {AOA:0, Crayonpop:0};
for (let round = 0; round < IW.battleRound; round++)
{


  let teamAOA = new Team("AOA", new Map([
        [new Position(0/8),cards[0]],
        [new Position(1/8),cards[1]],
        [new Position(2/8),cards[2]],
        [new Position(3/8),cards[3]],
        [new Position(4/8),cards[4]],
        [new Position(5/8),cards[5]],
        [new Position(6/8),cards[6]],
        [new Position(7/8),cards[7]]]));

  let teamCP = new Team("Crayonpop", new Map([
        [new Position(0/5),cards[8]] ,
        [new Position(1/5),cards[9]] ,
        [new Position(2/5),cards[10]],
        [new Position(3/5),cards[11]],
        [new Position(4/5),cards[12]]]));

  winning[teamAOA.battle(teamCP).name]++;
}
console.log(winning);
