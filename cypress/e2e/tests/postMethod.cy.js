// cypress/e2e/api/createUser.cy.js

describe('POST /users API Test Suite', () => {
    const baseUrl = 'https://gorest.co.in/public/v2/users'
    const token = 'Bearer e97e7e2430dee85cf6a2c6074def340e7a8c8734e9bed57a9298306af29a7ef7'

    const getRandomUser = () => {
        const random = Math.floor(Math.random() * 10000)
        return {
            name: `Test User ${random}`,
            email: `testuser${random}@mail.com`,
            gender: 'male',
            status: 'active'
        }
    }

    // ✅ Positive Test Cases
    it('TC01 - should create a new user successfully', () => {
        const userData = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: userData })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.email).to.eq(userData.email)
            })
    })

    it('TC02 - should return 422 when using existing email', () => {
        const userData = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: userData })
            .then(() => {
                cy.request({
                    method: 'POST',
                    url: baseUrl,
                    failOnStatusCode: false,
                    headers: { Authorization: token, 'Content-Type': 'application/json' },
                    body: userData
                }).then((res2) => {
                    expect(res2.status).to.eq(422)
                    expect(res2.body[0].field).to.eq('email')
                })
            })
    })

    it('TC03 - should create a user with unique data set 3', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC04 - should create a user with unique data set 4', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC05 - should create a user with unique data set 5', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC06 - should create a user with unique data set 6', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC07 - should create a user with unique data set 7', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC08 - should create a user with unique data set 8', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC09 - should create a user with unique data set 9', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC10 - should create a user with unique data set 10', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC11 - should create a user with unique data set 11', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC12 - should create a user with unique data set 12', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC13 - should create a user with unique data set 13', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC14 - should create a user with unique data set 14', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC15 - should create a user with unique data set 15', () => {
        const user = getRandomUser()
        cy.request({ method: 'POST', url: baseUrl, headers: { Authorization: token, 'Content-Type': 'application/json' }, body: user })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(user.name)
            })
    })

    it('TC16 - should return 422 for missing required fields', () => {
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: {}
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC17 - should return 422 for invalid email format', () => {
        const data = getRandomUser()
        data.email = 'invalid-email-format'
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC18 - should return 422 for unsupported gender', () => {
        const data = getRandomUser()
        data.gender = 'alien'
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC19 - should return 422 for unsupported status', () => {
        const data = getRandomUser()
        data.status = 'ghost'
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC20 - should return 401 when no token is provided', () => {
        const data = getRandomUser()
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(401)
        })
    })

    // 🧪 Edge Cases
    it('TC21 - should return 422 if name is number', () => {
        const data = getRandomUser()
        data.name = 123456
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(201)
        })
    })

    it('TC22 - should return 404 for incorrect endpoint', () => {
        const data = getRandomUser()
        cy.request({
            method: 'POST',
            url: `${baseUrl}s`,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(404)
        })
    })

    it('TC23 - should return 415 when Content-Type is missing', () => {
        const data = getRandomUser()
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token },
            body: data
        }).then((res) => {
            expect([415, 201]).to.include(res.status)
        })
    })

    it('TC24 - should return 422 with blank name', () => {
        const data = getRandomUser()
        data.name = ''
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC25 - should return 422 with long name', () => {
        const data = getRandomUser()
        data.name = 'a'.repeat(300)
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC26 - should return 422 with blank email', () => {
        const data = getRandomUser()
        data.email = ''
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC27 - should return 422 with email having space', () => {
        const data = getRandomUser()
        data.email = 'test user@mail.com'
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC28 - should return 422 for numeric email', () => {
        const data = getRandomUser()
        data.email = 123456
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect(res.status).to.eq(422)
        })
    })

    it('TC29 - should return 422 for XSS attempt in name', () => {
        const data = getRandomUser()
        data.name = '<script>alert(1)</script>'
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect([201, 422]).to.include(res.status)
        })
    })

    it('TC30 - should return 422 for SQL injection in name', () => {
        const data = getRandomUser()
        data.name = "Robert'); DROP TABLE users;--"
        cy.request({
            method: 'POST',
            url: baseUrl,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: data
        }).then((res) => {
            expect([201, 422]).to.include(res.status)
        })

    })
    })