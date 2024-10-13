import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockVeiculoService {
  private veiculos = [
    { id: '1', placa: 'ABC1234', chassi: '9BWZZZ377VT004251', renavam: '12345678901', modelo: 'Gol', marca: 'Volkswagen', ano: 2020 },
    { id: '2', placa: 'DEF5678', chassi: '9BWZZZ377VT004252', renavam: '12345678902', modelo: 'Polo', marca: 'Volkswagen', ano: 2021 },
    { id: '3', placa: 'GHI9012', chassi: '9BWZZZ377VT004253', renavam: '12345678903', modelo: 'Civic', marca: 'Honda', ano: 2019 },
    { id: '4', placa: 'JKL3456', chassi: '9BWZZZ377VT004254', renavam: '12345678904', modelo: 'Corolla', marca: 'Toyota', ano: 2018 },
    { id: '5', placa: 'MNO7890', chassi: '9BWZZZ377VT004255', renavam: '12345678905', modelo: 'Fiesta', marca: 'Ford', ano: 2017 },
    { id: '6', placa: 'PQR1234', chassi: '9BWZZZ377VT004256', renavam: '12345678906', modelo: 'Focus', marca: 'Ford', ano: 2016 },
    { id: '7', placa: 'STU5678', chassi: '9BWZZZ377VT004257', renavam: '12345678907', modelo: 'Cruze', marca: 'Chevrolet', ano: 2015 },
    { id: '8', placa: 'VWX9012', chassi: '9BWZZZ377VT004258', renavam: '12345678908', modelo: 'Onix', marca: 'Chevrolet', ano: 2014 },
    { id: '9', placa: 'YZA3456', chassi: '9BWZZZ377VT004259', renavam: '12345678909', modelo: 'HB20', marca: 'Hyundai', ano: 2013 },
    { id: '10', placa: 'BCD7890', chassi: '9BWZZZ377VT004260', renavam: '12345678910', modelo: 'Kwid', marca: 'Renault', ano: 2022 },
    { id: '11', placa: 'EFG1234', chassi: '9BWZZZ377VT004261', renavam: '12345678911', modelo: 'Sandero', marca: 'Renault', ano: 2021 },
    { id: '12', placa: 'HIJ5678', chassi: '9BWZZZ377VT004262', renavam: '12345678912', modelo: 'Duster', marca: 'Renault', ano: 2020 },
    { id: '13', placa: 'KLM9012', chassi: '9BWZZZ377VT004263', renavam: '12345678913', modelo: 'Compass', marca: 'Jeep', ano: 2019 },
    { id: '14', placa: 'NOP3456', chassi: '9BWZZZ377VT004264', renavam: '12345678914', modelo: 'Renegade', marca: 'Jeep', ano: 2018 },
    { id: '15', placa: 'QRS7890', chassi: '9BWZZZ377VT004265', renavam: '12345678915', modelo: 'Tucson', marca: 'Hyundai', ano: 2017 }
  ];

  getVeiculos(): Observable<any[]> {
    return of(this.veiculos);
  }

  createVeiculo(veiculo: any): Observable<any> {
    veiculo.id = (this.veiculos.length + 1).toString();
    this.veiculos.push(veiculo);
    return of(veiculo);
  }

  updateVeiculo(id: string, veiculo: any): Observable<any> {
    const index = this.veiculos.findIndex(v => v.id === id);
    if (index !== -1) {
      this.veiculos[index] = { ...veiculo, id };
      return of(this.veiculos[index]);
    }
    return of(null);
  }

  deleteVeiculo(id: string): Observable<any> {
    const index = this.veiculos.findIndex(v => v.id === id);
    if (index !== -1) {
      this.veiculos.splice(index, 1);
      return of({ message: 'Veículo deletado com sucesso!' });
    }
    return of(null);
  }
}
