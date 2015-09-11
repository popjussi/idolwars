import IW from './IW.js';

/*
 * materials |speed|power|life|skill
 * ----------|-----|-----|----|-----
 * colors    |1.0  |0.5  |    |0.5  
 * savories  |0.5  |1.0  |0.5 |     
 * tenders   |     |0.5  |1.0 |0.5  
 * melodies  |0.5  |     |0.5 |1.0  
 */

export default class Materials extends IW {
  constructor(colors, melodies, savories, tenders) {
    super();
    this.colors = colors;
    this.melodies = melodies;
    this.savories = savories;
    this.tenders = tenders;
    this.total = this.colors + this.melodies + this.savories + this.tenders;
  }

  speed() {
    return (this.colors + 0.5*this.savories + 0.5*this.melodies) / this.total;
  }

  power() {
    return (this.savories + 0.5*this.colors + 0.5*this.tenders);
  }

  life() {
    return (this.tenders + 0.5*this.savories + 0.5*this.melodies) * 5;
  }

  skill() {
    return (this.melodies + 0.5*this.colors + 0.5*this.tenders) / this.total;
  }
}
