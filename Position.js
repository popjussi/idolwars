import IW from './IW.js';

export default class Position extends IW {
  constructor(dir, distance) {
    super();
    distance = distance || 1.0;
    const rad = dir * 2 * Math.PI;
    this.x = Math.cos(rad) * distance;
    this.y = Math.sin(rad) * distance;
  }

  desc() {
    return "{x:"+this.x.toFixed(2)+" y:"+this.y.toFixed(2)+"}";
  }

  static distance(avt1,avt2) {
    if (avt1.team == avt2.team) {
      const dx = avt1.origin.x - avt2.origin.x;
      const dy = avt1.origin.y - avt2.origin.y;
      return Math.sqrt(dx*dx + dy*dy);
    }

    const dx = avt1.origin.x + avt1.team.origin.x + avt2.origin.x + avt2.team.origin.x;
    const dy = avt1.origin.y + avt1.team.origin.y + avt2.origin.y + avt2.team.origin.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}
