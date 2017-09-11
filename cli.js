// require basic flashcard module
var BasicFlashcard = require('./BasicCard.js');
// require cloze flashcard module
var ClozeFlashcard = require('./ClozeCard.js');
// require inquirer for getting user input at command line
var inquirer = require('inquirer');
// require fs
var fs = require('fs');

var whatsNext = function() {
    // get user input
    inquirer.prompt([{
    name: 'command',
    message: 'What would you like to do?',
    type: 'list',
    choices: [{
        name: 'add basic card'
    }, {
        name: 'add cloze card'
    },  {
        name: 'take the quiz'
    },{
        name: 'quit'
    }]
}]).then(function(answer) {
    if (answer.command === 'add basic card') {
        addBasicCard();
    } else if (answer.command === 'add cloze card'){
        addClozeCard();
    } else if (answer.command === 'take the quiz') {
        showCards();
    } else if (answer.command === 'quit'){
        console.log('Thanks for playing!');
    }
});
};


var addBasicCard = function(answer) {
    inquirer.prompt([{
        name: 'front',
        message: 'What is the question?',
        validate: function(input) {
            if (input === '') {
                console.log('Please provide a question');
                return false;
            } else {
                return true;
            }
        }
    }, {
        name: 'back',
        message: 'What is the answer?',
        validate: function(input) {
            if (input === '') {
                console.log('Please provide an answer');
                return false;
            } else {
                return true;
            }
        }
    }]).then(function(answer) {
        var newBasic = new BasicFlashcard(answer.front, answer.back);
        newBasic.create();
        whatsNext();
    });
} 

 var addClozeCard = function(answer) {
    inquirer.prompt([{
        name: 'text',
        message: 'What is the full text?',
        validate: function(input) {
            if (input === '') {
                console.log('Please provide the full text');
                return false;
            } else {
                return true;
            }
        }
    }, {
        name: 'cloze',
        message: 'What is the cloze portion?',
        validate: function(input) {
            if (input === '') {
                console.log('Please provide the cloze portion');
                return false;
            } else {
                return true;
            }
        }
    }]).then(function(answer) {
        var text = answer.text;
        var cloze = answer.cloze;
        if (text.includes(cloze)) {
            var newCloze = new ClozeFlashcard(text, cloze);
            newCloze.create();
            whatsNext();
        } else {
            console.log('The cloze portion you provided is not found in the full text. Please try again.');
            addCard();
        }
    });
}


var showCards = function() {
    // read the log.txt file
    fs.readFile('./log.txt', 'utf8', function(error, data) {
        //if there is an error, log it
        if (error) {
            console.log('Error occurred: ' + error);
        }
        var questions = data.split(';');
        var notBlank = function(value) {
            return value;
        };
        questions = questions.filter(notBlank);
        var count = 0;
        showQuestion(questions, count);
    });
};

var showQuestion = function(array, index) {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctReponse;
    if (parsedQuestion.type === 'basic') {
        questionText = parsedQuestion.front;
        correctReponse = parsedQuestion.back;
    } else if (parsedQuestion.type === 'cloze') {
        questionText = parsedQuestion.clozeDeleted;
        correctReponse = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: 'response',
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctReponse) {
            console.log('Correct!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        } else {
            console.log('Wrong!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        }
    });
};

whatsNext();