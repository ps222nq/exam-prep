'use strict';

let Question = function(obj, id){
    return {
        questionText: obj.questionText,
        questionId: id,
        alternatives: obj.answerAlternatives,
        rightAnswer: obj.rightAnswer
    };
}

module.exports = Question;