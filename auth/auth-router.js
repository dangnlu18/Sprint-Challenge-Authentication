const router = require('express').Router();
const bcrypt = require('bcryptjs')
const authModel = require('./auth-model')

router.post('/register', async (req, res, next) => {
  // implement registration
  try{
    const user = req.body
    res.status(201).json(await authModel.add(user))
  }
  catch(err){
    next(err)
  }

});

router.post('/login', async (req, res, next) => {
  // implement login
  try{
    const { username, password } = req.body
    const user = await authModel.findBy(username).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if(user && passwordValid){
      req.session.user = user
      res.status(200).json({message:`welcome, ${user.username}`})
    } else{
      res.status(401).json({message:'you may not pass'})
    }

  }
  catch(err){
    next(err)
  }
});

module.exports = router;
