import chai from 'chai';
import chaiHttp from 'chai-http';
import { userOne, artOne, orderOne, databaseReq } from './fixtures/db.js';
import app from '../app.js';
import { should } from 'chai';
should();

chai.use(chaiHttp);

beforeEach(databaseReq);

describe('Add new Artwork', () => {
  it('Should add a new artwork', (done) => {
    chai
      .request(app)
      .post('/api/artwork/new')
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({
        price: '50000',
        description: 'epic',
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

describe('get Artworks', () => {
  it('it should get all the Artworks', (done) => {
    chai
      .request(app)
      .get('/api/artwork/get')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data[0].should.have.property('price');
        res.body.data[0].should.have.property('description');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
});

describe('Update the artwork', () => {
  it('should update the given artwork', (done) => {
    chai
      .request(app)
      .put('/api/artwork/update/' + artOne._id)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({
        price: '1',
      })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.data.should.have.property('price').eql(1);
        done();
      });
  });
});

describe('delete an artwork', () => {
  it('should delete the created artwork', (done) => {
    chai
      .request(app)
      .delete('/api/artwork/delete/' + artOne._id)
      .set('Authorization', `Bearer ${userOne.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
});
