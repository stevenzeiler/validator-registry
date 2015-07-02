import 'sails-test-helper'

describe('ValidationsController', () => {
  const validationPublicKey = 'n9LigbVAi4UeTtKGHHTXNcpBXwBPdVKVTjbSkLmgJvTn6qKB8Mqz'
  const domain = 'ripple.com'

  beforeEach(function(done) {
    database.Validators.sync({force: true})
    .then(() => {
      database.Validators.create({
        validation_public_key: validationPublicKey,
        domain: domain
      })
    })
    .then(() => {
      database.Validators.create({
        validation_public_key: 'n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj',
        domain: domain
      })
    })
    .then(() => done());

  });

  describe('GET /validators', () => {

    it('should return a list of validators', done => {
      request
        .get('/validators')
        .end((err, resp) => {
          expect(resp.body.validators).to.be.instanceof(Array)
          expect(resp.body.validators).to.have.length(2)
          done()
        })
    })
  })

  describe('GET /validators/:validation_public_key', () => {

    it('should return a single validator', done => {

      let url = `/validators/${validationPublicKey}`
      request
        .get(url)
        .end((err, resp) => {
          expect(resp.body.validator.validation_public_key).to.equal(validationPublicKey)
          expect(resp.body.validator.domain).to.equal(domain)
          done()
        })
    })
 })
})

