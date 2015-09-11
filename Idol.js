import IW from './IW.js';
import Action from './Action.js'

export class Idol extends IW {
  constructor(guild,name,sign,skills,image) {
    super();
    this.guild = guild;
    this.name = name;
    this.image = image;
    this.sign = sign;
    this.skills = skills;
  }
}

export class Card extends IW {
  constructor(idol,materials) {
    super();
    this.materials = materials;
    this.idol = idol;
  }

  speed() {
    return this.materials.speed();
  }

  life() {
    return this.materials.life();
  }

  power() {
    return this.materials.power();
  }

}

export class Avatar {
  constructor(card,team,position) {
    this.card = card;
    this.team = team;
    this.origin = position;
    this.maxLife = card.materials.life();
    this.life = this.maxLife;
    this.maxPower = card.materials.power();
    this.power = this.maxPower;
  }

  action() {
    let act = new Action(this);
    act.setNearestTarget();
    act.forward();
  }

  desc() {
    return this.card.idol.name+"("+this.card.idol.guild+") {p:" +this.power.toFixed(0)+"/"+this.maxPower.toFixed(0)+" l:"+this.life.toFixed(0)+"/"+this.maxLife.toFixed(0)+" "+this.origin.desc()+"}";
  }
}

