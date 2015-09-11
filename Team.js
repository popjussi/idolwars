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
        console.log("===Turn:",ri+1,"=============================================");
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
        console.log("--------------------------------------------------------");
      }

      if (sDefs.length == 0) return this;
      else if (sAggs.length == 0) return defender;

      performRound(avatars);
    }
  }

  receive(act) {

    let oldALife = act.avatar.life;
    let oldTLife = act.target.life;

    let powerFactor = 0.175;
    let power = act.power;
    act.target.life -= power;

    let barfunc = function (max,before,after) {
      if (after < 0) after = 0;
      let bsize = 10;
      let ra = Math.ceil(bsize*after/max);
      let rb = Math.ceil(bsize*before/max);
      return "◌".repeat(bsize-rb)+"×".repeat(rb-ra)+"◉".repeat(ra);
    }


    if (IW.battleLog) {

      let oft = (this.role == "defender" ? "" : "    ");

      console.log(oft,act.avatar.desc(), "attacks");
      console.log(oft,"├"+barfunc(act.avatar.maxLife,oldALife,act.avatar.life)+"┘",oldALife.toFixed(2),"-",power.toFixed(2),"=",act.target.life.toFixed(2));
      console.log(oft,"│  ", act.target.desc());
      console.log(oft,"└────"+barfunc(act.target.maxLife,oldTLife,act.target.life)+"┘",oldTLife.toFixed(2),"-",power.toFixed(2),"=",act.target.life.toFixed(2));
    }
  }
}
