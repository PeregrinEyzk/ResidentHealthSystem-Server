// var moment = require('moment')
// for (var i = 0; i < 20; i++) {
//     var time = new Date(ConsoleRandomDate());
//     console.log( time)
// }

// function ConsoleRandomDate() {
//     var maxdaterandom = new Date().getTime();
//     var mindaterandom = new Date(2010, 0, 1, 8).getTime();
//     var randomdate = getRandom(mindaterandom, maxdaterandom);
//     var datestr = moment(randomdate).format("YYYY-MM-DD");
//     return datestr;
// }


// function getRandom(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }


var arr=[];
for(var i=0;i<20;i++){
    arr.push(i);
}
console.log(arr)