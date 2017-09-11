 // * This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.:
 //    `module.exports = ClozeCard;`
 //  * The constructor should accept two arguments: `text` and `cloze`.
 //  * The constructed object should have a `cloze` property that contains _only_ the cloze-deleted portion of the text.
 //  * The constructed object should have a `partial` property that contains _only_ the partial text.
 //  * The constructed object should have a `fullText` property that contains _only_ the full text.
 //  * The constructor should throw or log an error when the cloze deletion does _not_ appear in the input text.
 //  * Use prototypes to attach these methods, wherever possible.

"use strict";
 // require fs
var fs = require("fs");

module.exports = ClozeFlashcard;

// constructor for ClozeFlashcard
function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, ' ... ');

}

    ClozeFlashcard.prototype.create = function() {
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDeleted: this.clozeDeleted,
            type: "cloze"
        };
        // add card to log.txt
        fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(error) {
            // if there is an error, log the error
            if (error) {
                console.log(error);
            }
        });
    };




