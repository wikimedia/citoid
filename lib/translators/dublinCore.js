'use strict';


var makeTranslator = require('./util/index.js').makeTranslator;
var makeCreatorsTranslator = require('./util/index.js').makeCreatorsTranslator;
var eg = require('./util/index.js').extendGeneral;
var fixDate = require('../Exporter.js').fixDate;
var fixLang = require('../Exporter.js').fixLang;

/**
 * Dublin core type values : Zotero type field values
 * @type {Object}
 */
exports.types = {
    Collection: 'webpage',
    Dataset: 'webpage',
    Event: 'webpage',
    Image: 'artwork',
    InteractiveResource: 'webpage',
    MovingImage: 'videoRecording',
    PhysicalObject: 'webpage',
    Service: 'webpage',
    Software: 'computerProgram',
    Sound: 'audioRecording',
    StillImage: 'artwork',
    Text: 'webpage',
};

/**
 * Object with fields common to all but a few types
 * @type {Object}
 */
exports.general = {
    title: makeTranslator('title'),
    date: makeTranslator('date', fixDate),
    language: makeTranslator('language', fixLang),
    abstract: makeTranslator('abstractNote')
};

// Shortcut for extendGeneral utility
function extendGeneral(creatorName){
    return eg(exports.general, creatorName);
}

// Create frequently used general types once.
exports.generalWithAuthor = extendGeneral('author');
exports.generalWithAuthorAndPublisher = Object.assign({}, exports.generalWithAuthor, {
    publisher: makeTranslator('publisher')
});

/* Complete list of Zotero types with field translators in the Object */
exports.artwork = extendGeneral('artist');
exports.attachment = {
    title: makeTranslator('title')
};
exports.audioRecording = Object.assign({}, extendGeneral('performer'), {
    publisher: makeTranslator('label')
});
exports.bill = extendGeneral('sponser');
exports.blogPost = exports.generalWithAuthor;
exports.book = exports.generalWithAuthorAndPublisher;
exports.bookSection = exports.generalWithAuthorAndPublisher;
exports['case'] = exports.generalWithAuthor;
exports.computerProgram = { // No language field
    abstract: makeTranslator('abstractNote'),
    title: makeTranslator('title'),
    date: makeTranslator('date', fixDate),
    creator: makeCreatorsTranslator('programmer'),
    publisher: makeTranslator('company')
};
exports.conferencePaper = exports.generalWithAuthorAndPublisher;
exports.dictionaryEntry = exports.generalWithAuthorAndPublisher;
exports.document = exports.generalWithAuthorAndPublisher;
exports.email = exports.generalWithAuthor;
exports.encyclopediaArticle = exports.generalWithAuthorAndPublisher;
exports.film = Object.assign({}, extendGeneral('director'), {
    publisher: makeTranslator('distributor')
});
exports.forumPost = exports.generalWithAuthor;
exports.hearing = Object.assign({}, extendGeneral('contributor'), {
    publisher: makeTranslator('publisher')
});
exports.instantMessage = exports.generalWithAuthor;
exports.interview = extendGeneral('interviewee');
exports.journalArticle = exports.generalWithAuthor;
exports.letter = exports.generalWithAuthor;
exports.magazineArticle = exports.generalWithAuthor;
exports.manuscript = exports.generalWithAuthor;
exports.map = Object.assign({}, extendGeneral('cartographer'),{
    publisher: makeTranslator('publisher')
});
exports.newspaperArticle = exports.generalWithAuthor;
exports.note = {}; // Has no fields
exports.patent = extendGeneral('inventor');
exports.podcast = extendGeneral('podcaster');
exports.presentation = extendGeneral('presenter');
exports.radioBroadcast = Object.assign({}, extendGeneral('director'),{
    publisher: makeTranslator('network')
});
exports.report = Object.assign({}, exports.generalWithAuthor, {
    publisher: makeTranslator('institution')
});
exports.statute = exports.generalWithAuthor;
exports.thesis = Object.assign({}, exports.generalWithAuthor, {
    publisher: makeTranslator('university')
});
exports.tvBroadcast = Object.assign({}, extendGeneral('director'), {
    publisher: makeTranslator('network')
});
exports.videoRecording = Object.assign({}, extendGeneral('director'), {
    publisher: makeTranslator('studio')
});
exports.webpage = exports.generalWithAuthor;