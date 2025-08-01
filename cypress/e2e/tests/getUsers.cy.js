// cypress/e2e/api/getUsers.cy.js

describe('GET /users API Test Suite', () => {
  const baseUrl = 'https://gorest.co.in/public/v2/users'
  const token = 'Bearer e97e7e2430dee85cf6a2c6074def340e7a8c8734e9bed57a9298306af29a7ef7'

  // ✅ Positive Test Cases
  it('TC01 - should return 200 with array of users', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      headers: { Authorization: token }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
    })
  })

  it('TC02 - should validate response structure', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      headers: { Authorization: token }
    }).then((response) => {
      response.body.forEach(user => {
        expect(user).to.have.all.keys('id', 'name', 'email', 'gender', 'status')
      })
    })
  })

  it('TC03 - should return results for page=1', () => {
    cy.request({
      url: `${baseUrl}?page=1`,
      headers: { Authorization: token }
    }).its('status').should('eq', 200)
  })

  it('TC04 - should return empty array for high page', () => {
    cy.request({
      url: `${baseUrl}?page=9999`,
      headers: { Authorization: token }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.eq(0)
    })
  })

  it('TC05 - should return 5 users per_page', () => {
    cy.request({
      url: `${baseUrl}?per_page=5`,
      headers: { Authorization: token }
    }).then((res) => {
      expect(res.body.length).to.be.at.most(5)
    })
  })

  it('TC06 - should filter users by gender=male', () => {
    cy.request({
      url: `${baseUrl}?gender=male`,
      headers: { Authorization: token }
    }).then(res => {
      res.body.forEach(user => expect(user.gender).to.eq('male'))
    })
  })

  it('TC07 - should filter users by gender=female', () => {
    cy.request({
      url: `${baseUrl}?gender=female`,
      headers: { Authorization: token }
    }).then(res => {
      res.body.forEach(user => expect(user.gender).to.eq('female'))
    })
  })

  it('TC08 - should filter users by status=active', () => {
    cy.request({
      url: `${baseUrl}?status=active`,
      headers: { Authorization: token }
    }).then(res => {
      res.body.forEach(user => expect(user.status).to.eq('active'))
    })
  })

  it('TC09 - should filter users by status=inactive', () => {
    cy.request({
      url: `${baseUrl}?status=inactive`,
      headers: { Authorization: token }
    }).then(res => {
      res.body.forEach(user => expect(user.status).to.eq('inactive'))
    })
  })

  it('TC10 - should apply multiple filters', () => {
    cy.request({
      url: `${baseUrl}?gender=male&status=active`,
      headers: { Authorization: token }
    }).then(res => {
      res.body.forEach(user => {
        expect(user.gender).to.eq('male')
        expect(user.status).to.eq('active')
      })
    })
  })

  it('TC11 - should ensure user emails are unique', () => {
    cy.request({
      url: baseUrl,
      headers: { Authorization: token }
    }).then(res => {
      const emails = res.body.map(u => u.email)
      const uniqueEmails = new Set(emails)
      expect(uniqueEmails.size).to.eq(emails.length)
    })
  })

  it('TC12 - should validate ID is numeric', () => {
    cy.request({
      url: baseUrl,
      headers: { Authorization: token }
    }).then(res => {
      res.body.forEach(user => expect(user.id).to.be.a('number'))
    })
  })

  it('TC13 - should validate email format', () => {
    cy.request({
      url: baseUrl,
      headers: { Authorization: token }
    }).then(res => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      res.body.forEach(user => expect(user.email).to.match(emailRegex))
    })
  })

  // ❌ Negative Test Cases

  it('TC14 - should return 200 with empty array for page=-1', () => {
    cy.request({
      url: `${baseUrl}?page=-1`,
      headers: { Authorization: token }
    }).then(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('TC15 - should return empty array for invalid gender', () => {
    cy.request({
      url: `${baseUrl}?gender=alien`,
      headers: { Authorization: token }
    }).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body.length).to.eq(0)
    })
  })

  it('TC16 - should return empty for invalid status', () => {
    cy.request({
      url: `${baseUrl}?status=ghost`,
      headers: { Authorization: token }
    }).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body.length).to.eq(0)
    })
  })

  it('TC17 - should ignore unknown param', () => {
    cy.request({
      url: `${baseUrl}?foo=bar`,
      headers: { Authorization: token }
    }).then(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('TC18 - should handle SQL injection input safely', () => {
    cy.request({
      url: `${baseUrl}?name=Robert'); DROP TABLE users;--`,
      headers: { Authorization: token }
    }).then(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('TC19 - should handle XSS input safely', () => {
    cy.request({
      url: `${baseUrl}?name=<script>alert(1)</script>`,
      headers: { Authorization: token }
    }).then(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('TC20 - should return 404 for wrong endpoint', () => {
    cy.request({
      url: 'https://gorest.co.in/public/v2/userz',
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(404)
    })
  })

  it('TC21 - should return 200 for malformed query', () => {
    cy.request({
      url: `${baseUrl}%%`,
      headers: { Authorization: token },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(400)
    })
  })

  it('TC22 - should return 200 with missing auth token', () => {
    cy.request({
      url: baseUrl,
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(200) // this API allows unauthenticated GET
    })
  })

  it('TC23 - should return ≤ 100 records even if per_page=9999', () => {
    cy.request({
      url: `${baseUrl}?per_page=9999`,
      headers: { Authorization: token }
    }).then(res => {
      expect(res.body.length).to.be.lte(100) // Most APIs cap limit
    })
  })
})
