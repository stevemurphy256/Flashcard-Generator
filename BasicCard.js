// * Create a new file named `BasicCard.js`:
//   * This file should define a Node module that exports a constructor for creating basic flashcards, e.g.:
//     `module.exports = BasicCard;`
//   * The constructor should accept two arguments: `front` and `back`.
//   * The constructed object should have a `front` property that contains the text on the front of the card.
//   * The constructed object should have a `back` property that contains the text on the back of the card.


"use strict";
// require fs
var fs = require("fs");

module.exports = BasicFlashcard;

// constructor for BasicFlashcard
function BasicFlashcard(front, back) {
    this.front = front;
    this.back = back;
}   

BasicFlashcard.prototype.create = function() {
    // flashcard object to be appended to file
    var data = {
        front: this.front,
        back: this.back,
        type: "basic",
    };
    // add card to log.txt
    fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(error) {
        // if there is an error, log the error
        if (error) {
            console.log(error);
        }
    });
};
