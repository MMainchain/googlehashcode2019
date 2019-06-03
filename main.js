var _ = require('lodash');
var Genetic = require('genetic-js')

helpers = require('./helpers.js')

const USERNAME = "JE_CHANGE_MON_NOM";

var problems = {
    problem0: {
        problem_id: 'problem0',
        slides: helpers.parseFile('problem0.txt')
    },
    problem1: {
        problem_id: 'problem1',
        slides: helpers.parseFile('problem1.txt')
    },
    problem2: {
        problem_id: 'problem2',
        slides: helpers.parseFile('problem2.txt')
    },
    problem3: {
        problem_id: 'problem3',
        slides: helpers.parseFile('problem3.txt')
    },
    problem4: {
        problem_id: 'problem4',
        slides: helpers.parseFile('problem4.txt')
    }
};

/**
 * EXEMPLE PAYLOAD SOLUTION
 *  {
        problem_id: 'problem0',
        username: 'François',
        slides: ['0', '3', '1 2']
    }
 */

var solveDumb = function (problem) {
    var solution = {
        problem_id: problem.problem_id,
        username: USERNAME,
        slides: []
    };

    var slidesH = _.filter(problem.slides, function (slide) {
        return slide.type === 'H';
    });

    _.each(slidesH, function (slide, key) {
        solution.slides.push(slide.id);
    })
    return solution;
};

var solution = solveDumb(problems.problem3);

var score = helpers.evaluateSolution(problems.problem3, solution);
console.log("SCORE : " + score);
helpers.send_solution(solution);
