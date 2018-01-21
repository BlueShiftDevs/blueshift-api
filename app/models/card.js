var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  number: String,
  //setId: string // don't know how we are organizing the product releases yet
  devTags: [String],
  versions: [{
    timestamp: Date,
    userId: String, //mongoose.Schema.Types.ObjectId, // user that made this version
    name: String,
    type: { type: String, enum: 'CELSU'.split('') }, // o => o.match('/[CELSU]{1}/'), // C for CREW, E for EVENT, L for LOCATION, S for SHIP, U for UPGRADE
    traits: [String],
    cost: Number, //(match(type, '/[SCEU]{1}/')), // might allow X costs later to allow new designs
    icons: { type: String, match: /^[ACES*]*$/ }, //o => match(type, '/[CEU]{1}/') && o.match('/[ACEM*]+/'), // A for ACTIVATE, C for CONSTRUCT, E for EXPLOIT, M for MANEUVER, * for WILDCARD
    ctrlCap: Number, // (match(type, '/L/')),
    infCap: Number, // (match(type, '/L/')),
    scan: { type: String, enum: 'AMLS'.split('') }, // (match(type, '/L/') && o.match('/[AMLS]{1}/')),
    maxCopies: Number, //(match(type, '/[CEU]{1}/')),
    hull: Number, // (match(type, '/[SU]{1}/')), // might accomodate more types later to allow new designs
    crewCap: Number, // (match(type, '/[S]{1}/')), // might accomodate more types later to allow new designs
    crewSize: Number, // (match(type, '/[C]{1}/')), // might accomodate more types later to allow new designs
    upgdCap: Number, // (match(type, '/[S]{1}/')), // might accomodate more types later to allow new designs
    upgdSize: Number, // (match(type, '/[U]{1}/')), // might accomodate more types later to allow new designs
    pstgCap: Number, // (match(type, '/[C]{1}/')), // might accomodate more types later to allow new designs
    abilities: [String], // need to codify this schema later -- this will be a complicated process but will automate a lot of rules
    conditions: [String], // (match(type, '/[EU]{1}/')), // might accomodate more types later to allow new designs 
  }],
  notes: [{
    timestamp: Date,
    userId: String, // mongoose.Schema.Types.ObjectId, //we'll need to do a join or separate query to grab this data from its collection
    message: String //this will be sanitized on the API end, and possibly the UI, eventually ability to use markdown and card links 
  }]
});

schema.methods.current = function () {
  return this.versions[this.versions.length - 1];
}

module.exports = mongoose.model('Card', schema);