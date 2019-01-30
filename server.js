const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const User = require('./models/user')
const Movie = require('./models/movie')
const Show = require('./models/show')
const Group = require('./models/group')
const Comment = require('./models/comment')
const Recommendation = require('./models/recommendation')
const session = require('express-session')


const originRoute ='https://watch-with-friends-react.herokuapp.com'
 ;
// const originRoute = 'http://locahost:3000';

const PORT = 5000 || 'https://watch-with-friends-express.herokuapp.com/';
console.log(process.env, '<----process.env');


console.log(originRoute, '<---OG ROUTE');
require('./db/db')

var whitelist = ['http://locahost:3000', originRoute]
var corsOptions = {
  origin: originRoute
  }

console.log(corsOptions, '<----cors options');
console.log(cors(corsOptions));
// console.log(cors, "<---CORS");
app.use(cors(corsOptions));
// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })



app.use(session({
	secret: 'paddington bear 2',
	resave: false,
	saveUninitialized: false
}))

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())





// Controllers

const userController = require('./controllers/userController')
const movieController = require('./controllers/movieController')
const showController = require('./controllers/showController')
const groupController = require('./controllers/watchGroupController')
const commentController = require('./controllers/commentController')
const recController = require('./controllers/recController')
const authController = require('./controllers/authController')
const showRecController = require('./controllers/showRecController')

app.use('/api/users', userController);
app.use('/api/movies', movieController);
app.use('/api/shows', showController);
app.use('/api/groups', groupController);
app.use('/api/comments', commentController);
app.use('/api/recs', recController);
app.use('/api/showrecs', showRecController);
app.use('/auth', authController);

app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})








