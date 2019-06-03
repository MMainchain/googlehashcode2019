var fs = require('fs');
var _ = require('lodash');
const request = require('request');

const API_HOST = 'http://api.formation.dataheroes.fr:8080/simulation';

exports.send_solution = function (solution) {
    var options = {
        uri: API_HOST,
        method: 'POST',
        json: solution
      };
    request(options, function (error, response, body) {
        if(body.ERROR) {
            console.log(body.ERROR);
        }
    });
}

exports.parseFile = function (file) {
    var COLUMN_SEP = ' '
    var LINE_SEP = '\n';
    var obj_lines = [];

    var file_content = fs.readFileSync(file, 'utf-8')

    var lines = file_content.split(LINE_SEP);
    for(var i = 1;i<lines.length;i++) {
        var line = lines[i].split(COLUMN_SEP);
        var obj_line = {};
        obj_line.id = i-1;
        obj_line.type = line[0];
        obj_line.tags = _.slice(line, 2);
        obj_lines.push(obj_line);
    }
    return obj_lines;
};

exports.evaluateSolution = function (problem, solution) {
    var slidesCleaned = processSlides(problem, solution)
    var score = 0;
    for(var i = 0;i<slidesCleaned.length-1;i++) {
        var slideA = slidesCleaned[i];
        var slideB = slidesCleaned[i+1];
        score += computeScore(slideA, slideB);
    }
    return score;
}

var processSlides = function (problem, solution) {
    var slides = [];
    _.each(solution.slides, function (slide, key) {
        slide = String(slide)
        if(slide.indexOf(' ') !== -1) {
            slide = slide.split(' ');
            slide[0] = parseInt(slide[0]);
            slide[1] = parseInt(slide[1]);
            slides.push(_.merge(problem.slides[slide[0]].tags, problem.slides[slide[1]].tags))
        }
        else if(problem.slides[parseInt(slide)]) {
            slides.push(problem.slides[parseInt(slide)].tags);
        }
    });
    return slides;
}
var computeScore = function (slideA, slideB) {
    var intersect = _.intersection(slideA, slideB).length;
    var slideATaille = _.difference(slideA, slideB);
    var slideBTaille = _.difference(slideB, slideA);
    return _.min([intersect, slideATaille.length, slideBTaille.length]);
}