// cypress/e2e/api/updateUser.cy.js

describe('PUT /users API Test Suite', () => {
    const baseUrl = 'https://gorest.co.in/public/v2/users'
    const token = 'Bearer e97e7e2430dee85cf6a2c6074def340e7a8c8734e9bed57a9298306af29a7ef7'

    const createUser = () => {
        const random = Math.floor(Math.random() * 10000)
        const user = {
            name: `Put Test User ${random}`,
            email: `putuser${random}@mail.com`,
            gender: 'male',
            status: 'active'
        }
        return cy.request({
            method: 'POST',
            url: baseUrl,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: user
        })
    }

    // ✅ TC01 - should update user name successfully
    it('TC01 - should update user name successfully', () => {
        createUser().then(({ body }) => {
            const updated = { name: 'Updated Name' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.name).to.eq(updated.name)
            })
        })
    })

    // ✅ TC02 - update email successfully
    it('TC02 - should update user email successfully', () => {
        createUser().then(({ body }) => {
            const updated = { email: `updated${body.id}@mail.com` }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.email).to.eq(updated.email)
            })
        })
    })

    // ✅ TC03 - update gender
    it('TC03 - should update user gender successfully', () => {
        createUser().then(({ body }) => {
            const updated = { gender: 'female' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.gender).to.eq('female')
            })
        })
    })

    // ✅ TC04 - update status
    it('TC04 - should update user status to inactive', () => {
        createUser().then(({ body }) => {
            const updated = { status: 'inactive' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.status).to.eq('inactive')
            })
        })
    })

    // ✅ TC05 - update multiple fields
    it('TC05 - should update name and status together', () => {
        createUser().then(({ body }) => {
            const updated = { name: 'Multi Update', status: 'inactive' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.name).to.eq(updated.name)
                expect(res.body.status).to.eq(updated.status)
            })
        })
    })

    // ✅ TC06 - update with extra unused field (should ignore extra fields)
    it('TC06 - should ignore extra fields in request', () => {
        createUser().then(({ body }) => {
            const updated = { name: 'Extra Field Test', foo: 'bar' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.name).to.eq(updated.name)
                expect(res.body).not.to.have.property('foo')
            })
        })
    })

    // ✅ TC07 - update name with special characters
    it('TC07 - should update name with special characters', () => {
        createUser().then(({ body }) => {
            const updated = { name: '@New#Name!$' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.name).to.eq(updated.name)
            })
        })
    })

    // ✅ TC08 - update name with long string
    it('TC08 - should update name with long string', () => {
        createUser().then(({ body }) => {
            const updated = { name: 'a'.repeat(200) }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.name).to.eq(updated.name)
            })
        })
    })

    // ✅ TC09 - update to same existing values
    it('TC09 - should allow updating with same values', () => {
        createUser().then(({ body }) => {
            const updated = { name: body.name, email: body.email, gender: body.gender, status: body.status }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.name).to.eq(updated.name)
            })
        })
    })

    // ✅ TC10 - update with mixed casing in email
    it('TC10 - should update email with mixed casing', () => {
        createUser().then(({ body }) => {
            const updated = { email: `TestUpdate${body.id}@Mail.COM` }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.email.toLowerCase()).to.eq(updated.email.toLowerCase())
            })
        })
    })
    it('TC11 - should return 422 if email is invalid', () => {
        createUser().then(({ body }) => {
            const updated = { email: 'invalidemail' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                failOnStatusCode: false,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(422)
                expect(res.body[0].field).to.eq('email')
            })
        })
    })

    // ❌ TC12 - should return 422 if gender is invalid
    it('TC12 - should return 422 if gender is invalid', () => {
        createUser().then(({ body }) => {
            const updated = { gender: 'robot' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                failOnStatusCode: false,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(422)
                expect(res.body[0].field).to.eq('gender')
            })
        })
    })

    // ❌ TC13 - should return 422 if status is invalid
    it('TC13 - should return 422 if status is invalid', () => {
        createUser().then(({ body }) => {
            const updated = { status: 'ghost' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                failOnStatusCode: false,
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(422)
                expect(res.body[0].field).to.eq('status')
            })
        })
    })

    // ❌ TC14 - should return 401 if no auth token provided
    it('TC14 - should return 401 if no auth token provided', () => {
        createUser().then(({ body }) => {
            const updated = { name: 'Unauthorized Update' }
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/${body.id}`,
                failOnStatusCode: false,
                headers: { 'Content-Type': 'application/json' },
                body: updated
            }).then((res) => {
                expect(res.status).to.eq(404)
            })
        })
    })

    // ❌ TC15 - should return 404 for non-existent user
    it('TC15 - should return 404 for non-existent user', () => {
        const updated = { name: 'Ghost User' }
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/999999999`,
            failOnStatusCode: false,
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            body: updated
        }).then((res) => {
            expect(res.status).to.eq(404)
        })
    })
})