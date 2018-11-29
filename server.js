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

const originRoute = 'http://localhost:3000';
const PORT = 5000;
require('dotenv').config();


require('./db/db')
app.use(session({
	secret: 'paddington bear 2',
	resave: false,
	saveUninitialized: false
}))

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const corsOptions = {
	origin: originRoute,
	credentials: true,
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


// Controllers

const userController = require('./controllers/userController')
const movieController = require('./controllers/movieController')
const showController = require('./controllers/showController')
const groupController = require('./controllers/groupController')
const commentController = require('./controllers/commentController')
const recommendationController = require('./controllers/recommendationController')
const authController = require('./controllers/authController')

app.use('/api/users', userController);
app.use('/api/movies', movieController);
app.use('/api/shows', showController);
app.use('/api/groups', groupController);
app.use('/api/comments', commentController);
// app.use('/api/recommendations', recommendationController);
app.use('/auth', authController);

app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})








