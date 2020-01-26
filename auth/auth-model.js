const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

function findBy(username){
    return db('users').where({ username }).select('id', 'username', 'password')
}


function getUserById(id){
    return db('users').where({ id }).first()
}

async function add(user){
    user.password = await bcrypt.hash(user.password, 14)
    const [id] = await db('users').insert(user)
    return getUserById(id).select('id', 'username')
}


module.exports = {
    getUserById,
    add,
    findBy,
}