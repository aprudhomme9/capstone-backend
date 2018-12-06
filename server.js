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

const originRoute = process.env.CLIENT_URL || 'http://localhost:3000';
console.log(process.env.CLIENT);
const PORT = process.env.PORT || 5000;


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








