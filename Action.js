import IW from './IW.js';
import Position from './Position.js';

export default class Action {
  constructor(avatar) {
    this.avatar = avatar;
  }

  setRandomTarget() {
    let enemies = this.avatar.team.opponent.survivals();

    if (enemies.length == 0) return;

    this.target = enemies[Math.floor(Math.random()*enemies.length)];
  }

  setNearestTarget() {
    let enemies = this.avatar.team.opponent.survivals();
    if (enemies.length == 0) return;

    this.target = enemies[0];
    let dist = Position.distance(this.target, this.avatar);

    for (let idx in enemies) {
      let newDist = Position.distance(enemies[idx],this.avatar);
      if (newDist < dist) {
        dist = newDist;
        this.target = enemies[idx];
      }
    }
  }

  get power() {
    let powerFactor = 0.175;

    this.computedPower = this.computedPower || this.avatar.power * (1.0 - powerFactor) + this.avatar.power * powerFactor * Math.random();

    return this.computedPower;
  }

  forward() {
    if (this.target) {
      this.target.team.receive(this);
    }
  }
}
