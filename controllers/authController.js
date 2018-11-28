const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcrypt')
const User = require('../models/user');


router.get('/', async (req, res) => {
	try {
		const foundUser = await User.findById(req.session.ID);
		if(foundUser){
			res.json({
				status: 200,
				data: foundUser,
				message: 'is logged in'
			})
		} else {
			res.json({
				message: 'not found'
			})
		}
	} catch (err) {
		res.json({
			message: 'not found'
		})
	}
})


// LOGIN ROUTE
router.post('/', async (req, res) => {

	try {
		const user = await User.findOne({username: req.body.username})
		console.log(user, 'here is the user')

		req.session.logged = true;
		req.session.username = req.body.username;
		if(user){
		   if(bcrypt.compareSync(req.body.password, user.password)){
          		req.session.logged = true;
          		req.session.username = req.body.username;
          		req.session.password = req.body.password;
          		req.session.message = 'Success'
       		} else {
              req.session.message = 'Username or Password is Wrong';
      
        	}

		} else if(!user) {
			req.session.message = 'User does not exist'
		}
		req.session.username = user.username;
		req.session.ID = user._id;
		await user.save();
		await req.session.save();

		res.json({
			status: 200,
			data: user,
			message: req.session.message
		});

	} catch(err){
		res.json({
			message: 'Username incorrect'
		})
	}

});



router.post('/register', async (req, res) => {
  try {

  	const password = req.body.password
  	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    
    const userEntry = {};
    userEntry.username = req.body.username;
    userEntry.password = passwordHash;
    userEntry.fullName = req.body.fullName;

    const user = await User.create(userEntry)

    req.session.username = req.body.username;
    req.session.logged = true;
    req.session.message = 'ooh'
    req.session.ID = user._id;
    console.log(user._id, 'USER ID-----------------------')

   		await user.save();
		await req.session.save();

    res.json({
    	status: 200,
    	data: user
    })
    } catch(err){
        console.log(err)
    }
		    	




})
// THIS LOGS USER OUT
router.get('/logout', async (req, res) => {
	const foundUser = await User.findById(req.session.ID)

	req.session.destroy((err) => {
		if(err){
			console.log(err)
		} else {
			res.json({
				status: 200,
				data: foundUser

			})
		}
	})
})




module.exports = router;