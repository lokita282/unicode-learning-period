import chai from 'chai';
import chaiHttp from 'chai-http';
import { userOne, artOne, orderOne, databaseReq } from './fixtures/db.js';
import app from '../app.js';
import { should } from 'chai';
should();

chai.use(chaiHttp);

beforeEach(databaseReq);

describe('signup user', () => {
  it('should sign up a new user', (done) => {
    let user = {
      name: 'Anish22',
      email: 'anishjaiswal2222@gmail.com',
      password: 'Anish222',
      contact: 2222222222,
    };
    chai
      .request(app)
      .post('/api/user/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        res.body.should.have.property('success').eql(true);
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('password');
        res.body.data.should.have.property('contact');
        done();
      });
  });
});

describe('userLogin', () => {
  it('should log the user back in', (done) => {
    chai
      .request(app)
      .post('/api/user/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('get the user profile', () => {
  it('should get the profile of the user demanding it', (done) => {
    chai
      .request(app)
      .get('/api/user/me')
      .set('Authorization', `Bearer ${userOne.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('update User', () => {
  it('Should update an existing user', (done) => {
    chai
      .request(app)
      .put('/api/user/update')
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({
        name: 'Manish Jaiswal',
        password: 'manish000',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('password');
        done();
      });
  });
});

describe('Delete profile', () => {
  it('should delete profile on demand for the user', (done) => {
    chai
      .request(app)
      .delete('/api/user/delete')
      .set('Authorization', `Bearer ${userOne.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
});

describe('get all users', () => {
  it('should get all the users', (done) => {
    chai
      .request(app)
      .get('/api/user/get')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
});

describe('Logging Out', () => {
  it('must log the user out', (done) => {
    chai
      .request(app)
      .post('/api/user/logout')
      .set('Authorization', `Bearer ${userOne.token}`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
});
