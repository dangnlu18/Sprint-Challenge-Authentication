/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = () => {
//   return (req, res, next) =>{
    
//     if(!req.session || !req.session.user){
//       return res.status(401).json({
//         you: 'shall not pass!'
//       });
//     }
//     next()
//   }


module.exports = (req,res,next) => {
  try{
    if(!req.session || !req.session.user){
      return res.status(401).json({
        you: 'shall not pass!'
      });
    }
    next()
  }
  catch{
    console.log('error')
  }
}

