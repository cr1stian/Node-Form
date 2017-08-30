//declaring all packages
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());


app.get('/', function(request, response){

  response.render('index',{

  })

})

//about to post values
app.post("/results", function(request, response){
//storing values in variables
  const name = request.body.name;
  const email = request.body.email;
  const birth = request.body.birth;

//checking if values were input by user
   request.checkBody("name", "You must enter your name!").notEmpty();
   request.checkBody("email", "You must enter your email!").isEmail();
   request.checkBody("birth", "You must enter your Year of Birth!").notEmpty();

   var errors = request.validationErrors();



//if statement to show content depending on values
if(errors){
//if no values were input, render would show errors
response.render('index', {
  pageTitle: "Welcome!",
  errors: errors,
  name: name,
  email: email,
  birth: birth

})
}
//if value were input, it would display such values in results page
else{
  response.render('results', {
  pageTitle: "Welcome!",
  name: name,
  email: email,
  birth: birth
})
}




});





//makes app live in locahost port 3000
app.listen(3000, function(){
  console.log('Live From the Gutter');
});
