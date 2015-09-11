import IW from './IW.js';
import {Avatar} from './Idol.js';
import Position from './Position.js';

export default class Team extends IW {
  constructor(name, positionMap) {
    super();
    this.origin = new Position(0,-2);
    this.name = name;
    this.avatars = [];
    for (let [pos,card] of positionMap) {
      this.avatars.push(new Avatar(card,this,pos));
    }
  }

  survivals() {
    return this.avatars.filter(function (avt) {return avt.life > 0;});
  }

  battle(defender) {

    this.role = "aggressor";
    defender.role = "defender";
    this.opponent = defender;
    defender.opponent = this;
    let avatars = this.avatars.concat(defender.avatars);

    let performRound = function (avatars) {

      if (avatars.length > 0)
        avatars = avatars.filter(function (avt) {
          let fieldFactor = 10;
          if (avt.life > 0) {
            avt.speed = avt.card.speed() * fieldFactor + Math.random();
            return true;
          }
          return false;
        });
      else return;

      if (avatars.length == 0)
        return;
      else if (avatars.length > 1)
        avatars.sort(function(a,b){ return b.speed - a.speed; });

      avatars[0].action();
      performRound(avatars.slice(1));
    }

    for (let ri = 0; ri < 50; ri++) {
      let sAggs = this.survivals();
      let sDefs = defender.survivals();

      if (IW.battleLog) {
        console.log("Turn:",ri+1);
        if (sAggs.length) {
          console.log("    Aggressors");
          for(let avt of sAggs) {
            console.log("      ",avt.desc());
          }
        }

        if (sDefs.length) {
          console.log("    Defenders");
          for(let avt of defender.survivals()) {
            console.log("      ",avt.desc());
          }
        }
      }

      if (sDefs.length == 0) return this;
      else if (sAggs.length == 0) return defender;

      performRound(avatars);
    }
  }

  receive(act) {

    let oldLife = act.target.life;
    let powerFactor = 0.175;
    let power = act.power;
    act.target.life -= power;

    let bar = Math.ceil(10*act.target.life/act.target.maxLife);
    if (act.target.life < 0) bar = "[..FALLEN..]";
    else bar = "["+".".repeat(10-bar)+"#".repeat(bar)+"]";

    if (IW.battleLog) {
      let oft = (this.role == "defender" ? "" : "\t");
      console.log(oft,act.avatar.desc(), "attacks");
      console.log(oft,"|  ", act.target.desc());
      console.log(oft,"|___"+bar,oldLife.toFixed(2),"-",power.toFixed(2),"=",act.target.life.toFixed(2));
    }
  }
}
