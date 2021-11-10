import chai from 'chai';
import chaiHttp from 'chai-http';
import { userOne, artOne, orderOne, databaseReq } from './fixtures/db.js';
import app from '../app.js';
import { should } from 'chai';
should();

chai.use(chaiHttp);

beforeEach(databaseReq);
describe('Place order', () => {
  it('should place an order for the user logged in', (done) => {
    chai
      .request(app)
      .post('/api/order/new')
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({
        orderedBy: userOne._id,
        artworks: [artOne._id],
        paymentMode: 'Cash',
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.data.should.have.property('orderedBy');
        res.body.data.should.have.property('paymentMode');
        res.body.data.should.have.property('artworks');
        done();
      });
  });
});

describe('list My Orders', () => {
  it('must list all the orders of logged in user', (done) => {
    chai
      .request(app)
      .get('/api/order/get')
      .set('Authorization', `Bearer ${userOne.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
});

describe('list My particular order', () => {
  it('must list all the orders of logged in user', (done) => {
    chai
      .request(app)
      .get('/api/order/get/' + artOne._id)
      .set('Authorization', `Bearer ${userOne.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
});
describe('update My Orders', () => {
  it('should update my order', (done) => {
    chai
      .request(app)
      .put('/api/order/update/' + orderOne._id)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({
        paymentMode: 'card+cash',
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.data.should.have.property('paymentMode').eql('card+cash');
        done();
      });
  });
});

describe('Delete my order', () => {
  it('should delete my placed order', (done) => {
    chai
      .request(app)
      .delete('/api/order/delete/' + orderOne._id)
      .set('Authorization', `Bearer ${userOne.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
});
