const handleSignin= (req,res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(404).json('incorrect form submission')
    }
    // if(req.body.email === database.users[0].email && 
    //     req.body.password === database.users[0].password){
    //         return  res.json(database.users[0]);//we are returning a real user from mock database
    //     } else {
    //         return  res.status(400).json('error logging in');
    //     }
    // res.json('signin') //we use json instead of send to get a string
db.select('email','hash').from('login')
.where('email','=', email)
.then(data=> {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    // console.log(isValid);
    if(isValid){
        return db.select('*').from('users')
        .where('email','=', email)
        .then(user=> {
            // console.log(user);
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('unable to get user'))
    } else{
    res.status(400).json('wrong crendentials') }
})
.catch(err => res.status(400).json('wrong credentials'))

}

module.exports = {
    handleSignin: handleSignin
};