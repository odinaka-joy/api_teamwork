const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);
const app = require('../../app');

describe('On Teamwork API', () => {
  describe('a POST request to "/auth/create-user"', () => {
    it('should ensure request is from an admin before creating a user', (done) => {
      const user = {
        isAdmin: false,
        firstName: 'test2',
        lastName: 'test2',
        email: 'test2@gmail.com',
        password: 'Test2@2019',
        gender: 'male',
        jobRole: 'procurement',
        department: 'sales',
        address: '5 eleki street, port harcourt'
      };
      chai.request(app)
        .post('/api/v1/auth/create-user')
        .set('Accept', 'application/json')
        .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3Mzc2MTkzNCwiZXhwIjoxNTczODQ4MzM0fQ.zgnqPudS-6snjPH_O1pnCns-SFtGYyM55bpOHDBQkHU' })
        .send(user)
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.include({
            message: 'User account successfully created'
          });
          expect(res.body.errors.length).to.be.equal(0);
        })
        .catch((err) => {
          console.log(err.message);
        });
      done();
    });
  });

  describe('a POST request to "/auth/signin"', () => {
    it('should login a user', (done) => {
      const userDetails = {
        email: 'test3@gmail.com',
        password: 'Test3@2019'
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userDetails)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.include({
            firstName: 'test3',
            lastName: 'test3'
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      done();
    });
  });
});
