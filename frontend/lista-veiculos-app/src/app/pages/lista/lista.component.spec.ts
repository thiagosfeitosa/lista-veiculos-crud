import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaComponent } from './lista.component';
import { VeiculoService } from '../../services/veiculo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;
  let veiculoService: VeiculoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbPaginationModule,
        ListaComponent // Importar o componente standalone
      ],
      providers: [VeiculoService, NgbModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    veiculoService = TestBed.inject(VeiculoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch vehicles on init', () => {
    const veiculos = [
      { id: '1', placa: 'ABC1234', chassi: '9BWZZZ377VT004251', renavam: '12345678901', modelo: 'Gol', marca: 'Volkswagen', ano: 2020 }
    ];
    spyOn(veiculoService, 'getVeiculos').and.returnValue(of(veiculos));
    component.ngOnInit();
    expect(component.veiculos.length).toBe(1);
    expect(component.veiculos).toEqual(veiculos);
  });

  it('should open modal to add vehicle', () => {
    const modalService = TestBed.inject(NgbModal);
    spyOn(modalService, 'open').and.callThrough();
    component.openModal(false);
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should open modal to edit vehicle', () => {
    const modalService = TestBed.inject(NgbModal);
    spyOn(modalService, 'open').and.callThrough();
    const veiculo = { id: '1', placa: 'ABC1234', chassi: '9BWZZZ377VT004251', renavam: '12345678901', modelo: 'Gol', marca: 'Volkswagen', ano: 2020 };
    component.openModal(true, veiculo);
    expect(modalService.open).toHaveBeenCalled();
    expect(component.veiculoForm.value).toEqual(veiculo);
  });

  it('should add a vehicle', () => {
    const veiculo = { placa: 'DEF5678', chassi: '9BWZZZ377VT004252', renavam: '12345678902', modelo: 'Polo', marca: 'Volkswagen', ano: 2021 };
    const veiculoComId = { id: '2', ...veiculo };
    spyOn(veiculoService, 'createVeiculo').and.returnValue(of(veiculoComId));
    
    // Ajustar o formulário para incluir o campo 'id' como opcional
    component.veiculoForm.setValue({
      id: '', // Campo id opcional
      placa: veiculo.placa,
      chassi: veiculo.chassi,
      renavam: veiculo.renavam,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      ano: veiculo.ano
    });
    
    component.onSubmit();
    
    // Verificar que o serviço foi chamado com os dados corretos, sem o campo 'id'
    expect(veiculoService.createVeiculo).toHaveBeenCalledWith({
      placa: veiculo.placa,
      chassi: veiculo.chassi,
      renavam: veiculo.renavam,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      ano: veiculo.ano
    });
  });
  
  

  it('should update a vehicle', () => {
    const veiculo = { id: '1', placa: 'ABC1234', chassi: '9BWZZZ377VT004251', renavam: '12345678901', modelo: 'Golf', marca: 'Volkswagen', ano: 2020 };
    spyOn(veiculoService, 'updateVeiculo').and.returnValue(of(veiculo));
    component.currentVeiculoId = veiculo.id;
    component.isEditMode = true;
    component.veiculoForm.setValue(veiculo);
    component.onSubmit();
    expect(veiculoService.updateVeiculo).toHaveBeenCalledWith(veiculo.id, veiculo);
  });

  it('should delete a vehicle', () => {
    const veiculoId = '1';
    spyOn(veiculoService, 'deleteVeiculo').and.returnValue(of({}));
    spyOn(window, 'confirm').and.returnValue(true); // Simula a confirmação do usuário
    component.deletarVeiculo(veiculoId);
    expect(veiculoService.deleteVeiculo).toHaveBeenCalledWith(veiculoId);
  });
});
