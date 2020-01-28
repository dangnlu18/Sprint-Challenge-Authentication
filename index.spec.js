const supertest = require('supertest')
const server = require('./index')
const authModel = require('./auth/auth-model')
const db = require('./database/dbConfig')


beforeEach(async ()=>{
    await db.seed.run()
})

describe('testing routes', ()=>{
    test('create a new user', async () =>{
        const res = await supertest(server)
            .post('/api/auth/register')
            .send({username: 'dang2', password: 'abc123'})
    expect(res.type).toBe('application/json')
    expect(res.status).toBe(201)
    expect(res.body).toEqual({id:2, username:'dang2'})
    })

    test('findByID username function to return object', async ()=>{
        const res = await authModel.getUserById(1)
        expect(res.username).toBe('dang')
    })

    test('login', async ()=>{
        const res = await supertest(server)
            .post('/api/auth/login')
            .send({ username:'dang', password:'abc123' })
        expect(res.type).toBe('application/json')
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        
    })

    test('check if session exists', async ()=>{
        const res = await db('sessions').select()
        expect(res).toBeTruthy()
    })


    test('testing jokes router', async ()=>{
        const userlogin = await supertest(server).post('/api/auth/login').send({ username:'dang', password:'abc123' })
        const res = await supertest(server)
            .get('/api/jokes')
            .set('Cookie', userlogin.header['set-cookie'][0])
        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
    })

    test('testing if cookie is being set for jokes router', async ()=>{
        const userlogin = await supertest(server).post('/api/auth/login').send({ username:'dang', password:'abc123' })
        const res = await supertest(server)
            .get('/api/jokes')
            .set('Cookie', userlogin.header['set-cookie'][0])
        expect(res.status).toBe(200)
        expect(res.req['_header']).toContain('Cookie')
        console.log(res.req['_header'])
    })

})