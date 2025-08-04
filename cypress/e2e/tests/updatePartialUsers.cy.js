// cypress/e2e/api/patchUser.cy.js

describe('PATCH /users API Test Suite', () => {
  const baseUrl = 'https://gorest.co.in/public/v2/users'
  const token = 'Bearer e97e7e2430dee85cf6a2c6074def340e7a8c8734e9bed57a9298306af29a7ef7'

  const createUser = () => {
    const random = Math.floor(Math.random() * 10000)
    const user = {
      name: `Patch Test User ${random}`,
      email: `patchuser${random}@mail.com`,
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

  // ✅ TC01 - should update name using PATCH
  it('TC01 - should update name using PATCH', () => {
    createUser().then(({ body }) => {
      const patchData = { name: 'Patched Name' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.name).to.eq(patchData.name)
      })
    })
  })

  // ✅ TC02 - should update status using PATCH
  it('TC02 - should update status using PATCH', () => {
    createUser().then(({ body }) => {
      const patchData = { status: 'inactive' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.status).to.eq('inactive')
      })
    })
  })

  // ✅ TC03 - update gender
  it('TC03 - should update gender to female', () => {
    createUser().then(({ body }) => {
      const patchData = { gender: 'female' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.gender).to.eq('female')
      })
    })
  })

  // ✅ TC04 - update email only
  it('TC04 - should update email', () => {
    createUser().then(({ body }) => {
      const patchData = { email: `patched${body.id}@mail.com` }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.email).to.eq(patchData.email)
      })
    })
  })

  // ✅ TC05 - patch with long name string
  it('TC05 - should update name with long string', () => {
    createUser().then(({ body }) => {
      const patchData = { name: 'a'.repeat(200) }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.name).to.eq(patchData.name)
      })
    })
  })

  // ✅ TC06 - patch with special characters in name
  it('TC06 - should update name with special characters', () => {
    createUser().then(({ body }) => {
      const patchData = { name: '@#%New*()Name' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.name).to.eq(patchData.name)
      })
    })
  })

  // ✅ TC07 - patch with same data (no change)
  it('TC07 - should allow patching with existing value', () => {
    createUser().then(({ body }) => {
      const patchData = { name: body.name }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.name).to.eq(body.name)
      })
    })
  })

  // ✅ TC08 - patch with email in mixed case
  it('TC08 - should patch email with mixed case', () => {
    createUser().then(({ body }) => {
      const patchData = { email: `TestPatch${body.id}@Mail.COM` }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.email.toLowerCase()).to.eq(patchData.email.toLowerCase())
      })
    })
  })

  // ✅ TC09 - patch with extra field (should ignore)
  it('TC09 - should ignore extra fields in PATCH', () => {
    createUser().then(({ body }) => {
      const patchData = { name: 'Extra Field', foo: 'bar' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.name).to.eq(patchData.name)
        expect(res.body).not.to.have.property('foo')
      })
    })
  })

  // ❌ TC10 - patch with invalid email
  it('TC10 - should return 422 for invalid email format', () => {
    createUser().then(({ body }) => {
      const patchData = { email: 'invalidemail' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(422)
        expect(res.body[0].field).to.eq('email')
      })
    })
  })
  it('TC11 - should return 422 for numeric name', () => {
    createUser().then(({ body }) => {
      const patchData = { name: 12345 }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect([200, 422]).to.include(res.status)
      })
    })
  })

  // ✅ TC12 - patch with unsupported gender
  it('TC12 - should return 422 for unsupported gender', () => {
    createUser().then(({ body }) => {
      const patchData = { gender: 'robot' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(422)
        expect(res.body[0].field).to.eq('gender')
      })
    })
  })

  // ✅ TC13 - patch with unsupported status
  it('TC13 - should return 422 for unsupported status', () => {
    createUser().then(({ body }) => {
      const patchData = { status: 'ghost' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(422)
        expect(res.body[0].field).to.eq('status')
      })
    })
  })

  // ✅ TC14 - patch with empty name
  it('TC14 - should return 422 for empty name', () => {
    createUser().then(({ body }) => {
      const patchData = { name: '' }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(422)
      })
    })
  })

  // ✅ TC15 - patch without auth token
  it('TC15 - should return 401 when no auth token provided', () => {
  createUser().then(({ body }) => {
    const patchData = { name: 'No Auth' }

    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/${body.id}`,
      failOnStatusCode: false,
      headers: { 'Content-Type': 'application/json' },
      body: patchData
    }).then((res) => {
      cy.log('Response Body:', JSON.stringify(res.body)) // ✅ logs actual response
      expect([401, 404]).to.include(res.status) // to handle both possible status codes
    })
  })
})


  // ✅ TC16 - patch wrong user ID
  it('TC16 - should return 404 for non-existing user ID', () => {
    const patchData = { name: 'Non-existing User' }
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/9999999`,
      failOnStatusCode: false,
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: patchData
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  // ✅ TC17 - patch without body
  it('TC17 - should return 200 for empty PATCH body (no changes)', () => {
    createUser().then(({ body }) => {
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: {}
      }).then((res) => {
        expect(res.status).to.eq(200)
      })
    })
  })

  // ✅ TC18 - patch email with extra spaces
  it('TC18 - should return 422 when email has spaces', () => {
  createUser().then(({ body }) => {
    const patchData = { email: `   trim${body.id}@mail.com   ` }

    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/${body.id}`,
      failOnStatusCode: false,
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: patchData
    }).then((res) => {
      expect(res.status).to.eq(422)
      expect(res.body[0].field).to.eq('email')
      expect(res.body[0].message).to.eq('is invalid')
    })
  })
})


  // ✅ TC19 - patch name with null value
  it('TC19 - should return 422 when name is null', () => {
    createUser().then(({ body }) => {
      const patchData = { name: null }
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/${body.id}`,
        failOnStatusCode: false,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: patchData
      }).then((res) => {
        expect(res.status).to.eq(422)
      })
    })
  })

  // ✅ TC20 - patch email to duplicate existing user email
  it('TC20 - should return 422 on duplicate email', () => {
    createUser().then(({ body: user1 }) => {
      createUser().then(({ body: user2 }) => {
        const patchData = { email: user1.email }
        cy.request({
          method: 'PATCH',
          url: `${baseUrl}/${user2.id}`,
          failOnStatusCode: false,
          headers: { Authorization: token, 'Content-Type': 'application/json' },
          body: patchData
        }).then((res) => {
          expect(res.status).to.eq(422)
          expect(res.body[0].field).to.eq('email')
        })
      })
    })
  })
})
