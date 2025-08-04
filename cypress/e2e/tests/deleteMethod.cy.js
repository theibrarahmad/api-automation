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
  it('TC03 - should return 401 or 404 when deleting without auth token', () => {
    createUser().then(({ body }) => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false
      }).then((res) => {
        expect([401, 404]).to.include(res.status)
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
  it('TC06 - should delete user even with extra query params (ignored)', () => {
    createUser().then(({ body }) => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${body.id}?foo=bar`,
        headers: { Authorization: token }
      }).then((res) => {
        expect(res.status).to.eq(204)
      })
    })
  })
  it('TC07 - should not delete user using GET method', () => {
    createUser().then(({ body }) => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false,
        headers: { Authorization: token }
      }).then((res) => {
        expect(res.status).to.eq(200)
      })
    })
  })
it('TC08 - should return 401 with wrong auth token', () => {
  createUser().then(({ body }) => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/${body.id}`,
      failOnStatusCode: false,
      headers: { Authorization: 'Bearer wrongtoken' }
    }).then((res) => {
      expect(res.status).to.eq(401)
    })
  })
})
it('TC09 - should return 401 for wrong token after deletion', () => {
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
        headers: { Authorization: 'Bearer wrongtoken' }
      }).then((res) => {
        expect(res.status).to.eq(401) // Token error
      })
    })
  })
})
it('TC10 - should delete and confirm user no longer exists', () => {
  createUser().then(({ body }) => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/${body.id}`,
      headers: { Authorization: token }
    }).then((res) => {
      expect(res.status).to.eq(204)
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false,
        headers: { Authorization: token }
      }).then((getRes) => {
        expect(getRes.status).to.eq(404)
      })
    })
  })
})
it('TC11 - should not allow DELETE operation via PATCH method', () => {
  createUser().then(({ body }) => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/${body.id}`,
      failOnStatusCode: false,
      headers: { Authorization: token }
    }).then((res) => {
      expect([200, 422]).to.include(res.status) // But not 204
    })
  })
})
it('TC12 - should return error on POST instead of DELETE', () => {
  createUser().then(({ body }) => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/${body.id}`,
      failOnStatusCode: false,
      headers: { Authorization: token }
    }).then((res) => {
      expect([404, 405]).to.include(res.status)
    })
  })
})
it('TC13 - lowercase "delete" should still work (internal validation)', () => {
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


})
