// cypress/e2e/api/deleteUser.cy.js

describe('DELETE /users API Test Suite', () => {
  const baseUrl = 'https://gorest.co.in/public/v2/users'
  const token = 'Bearer e97e7e2430dee85cf6a2c6074def340e7a8c8734e9bed57a9298306af29a7ef7'

  const createUser = () => {
    const random = Math.floor(Math.random() * 10000)
    const user = {
      name: `Delete Test User ${random}`,
      email: `deleteuser${random}@mail.com`,
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

  // ✅ TC01 - delete user successfully
  it('TC01 - should delete user successfully', () => {
    createUser().then(({ body }) => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token }
      }).then((res) => {
        expect(res.status).to.eq(204)
      })
    })
  })

  // ✅ TC02 - deleting the same user again should return 404
  it('TC02 - should return 404 for deleting already deleted user', () => {
    createUser().then(({ body }) => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token }
      }).then(() => {
        cy.request({
          method: 'DELETE',
          url: `${baseUrl}/${body.id}`,
          failOnStatusCode: false,
          headers: { Authorization: token }
        }).then((res2) => {
          expect(res2.status).to.eq(404)
        })
      })
    })
  })

  // ✅ TC03 - delete user without auth token
  it('TC03 - should return 401 without auth token', () => {
    createUser().then(({ body }) => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(401)
      })
    })
  })

  // ✅ TC04 - delete user with wrong ID
  it('TC04 - should return 404 for non-existing user ID', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/999999`,
      failOnStatusCode: false,
      headers: { Authorization: token }
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  // ✅ TC05 - delete with invalid ID format
  it('TC05 - should return 404 for invalid ID format', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/invalid-id`,
      failOnStatusCode: false,
      headers: { Authorization: token }
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })
})
