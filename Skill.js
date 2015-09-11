import IW from './IW.js';

export default class Skill extends IW {
  constructor(name,point) {
    super();
    /* FIXME cache max points/*
       Skill.maxSkillPoints = Skill.maxSkillPoints || {};
       Skill.maxSkillPoints[name] = Math.max(Skill.maxSkillPoints[name] || 0, point);
       */
    this.name = name;
    this.point = point;
  }
}
