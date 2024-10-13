const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Veiculo = require('../models/veiculo');
const should = chai.should();

chai.use(chaiHttp);

describe('Veículos', () => {
  beforeEach(async () => {
    await Veiculo.deleteMany({});
  });

  describe('/POST veiculo', () => {
    it('deve criar um novo veículo', (done) => {
      const veiculo = {
        placa: 'ABC1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Gol',
        marca: 'Volkswagen',
        ano: 2020
      };
      chai.request(server)
        .post('/veiculos')
        .send(veiculo)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('placa').eql('ABC1234');
          done();
        });
    });
  });

  describe('/GET veiculos', () => {
    it('deve obter todos os veículos', (done) => {
      chai.request(server)
        .get('/veiculos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/PUT/:id veiculo', () => {
    it('deve atualizar um veículo dado o id', (done) => {
      const veiculo = new Veiculo({
        id: '1234567890abcdef',
        placa: 'ABC1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Gol',
        marca: 'Volkswagen',
        ano: 2020
      });
      veiculo.save().then((veiculo) => {
        chai.request(server)
          .put('/veiculos/' + veiculo.id)
          .send({ modelo: 'Golf' })
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('modelo').eql('Golf');
            done();
          });
      }).catch((err) => done(err));
    });
  });

  describe('/DELETE/:id veiculo', () => {
    it('deve deletar um veículo dado o id', (done) => {
      const veiculo = new Veiculo({
        id: '1234567890abcdef',
        placa: 'ABC1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Gol',
        marca: 'Volkswagen',
        ano: 2020
      });
      veiculo.save().then((veiculo) => {
        chai.request(server)
          .delete('/veiculos/' + veiculo.id)
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      }).catch((err) => done(err));
    });
  });
});
