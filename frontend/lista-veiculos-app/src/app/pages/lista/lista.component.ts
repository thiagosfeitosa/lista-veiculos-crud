import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, NgbPaginationModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  veiculos: any[] = [];
  modelos: string[] = [];
  marcas: string[] = [];
  filteredVeiculos: any[] = [];
  filter = new FormControl('');
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  veiculoForm: FormGroup;
  modalRef: NgbModalRef | undefined;
  isEditMode = false;
  currentVeiculoId: string | null = null;

  @ViewChild('veiculoModal') veiculoModal!: TemplateRef<any>;

  constructor(private veiculoService: VeiculoService, private fb: FormBuilder, private modalService: NgbModal) {
    this.veiculoForm = this.fb.group({
      id: [''], // Campo id não obrigatório
      placa: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  ngOnInit(): void {
    this.veiculoService.getVeiculos().subscribe(data => {
      this.veiculos = data;
      this.collectionSize = this.veiculos.length;
      this.refreshVeiculos();
      this.loadModelosMarcas();
    });

    this.filter.valueChanges.subscribe(() => this.refreshVeiculos());

    this.veiculoForm.get('modelo')?.valueChanges.subscribe(modelo => {
      if (modelo) {
        const marca = this.veiculos.find(v => v.modelo === modelo)?.marca;
        this.veiculoForm.get('marca')?.setValue(marca);
      }
    });

    this.veiculoForm.get('marca')?.valueChanges.subscribe(marca => {
      if (marca) {
        this.modelos = this.veiculos
          .filter(v => v.marca === marca)
          .map(v => v.modelo);
      }
    });
  }

  loadModelosMarcas(): void {
    this.modelos = [...new Set(this.veiculos.map(v => v.modelo))];
    this.marcas = [...new Set(this.veiculos.map(v => v.marca))];
  }

  refreshVeiculos(): void {
    const searchTerm = this.filter.value ? this.filter.value.toLowerCase() : '';
    this.filteredVeiculos = this.veiculos
      .filter(veiculo => 
        veiculo.placa.toLowerCase().includes(searchTerm) ||
        veiculo.chassi.toLowerCase().includes(searchTerm) ||
        veiculo.renavam.toLowerCase().includes(searchTerm) ||
        veiculo.modelo.toLowerCase().includes(searchTerm) ||
        veiculo.marca.toLowerCase().includes(searchTerm) ||
        veiculo.ano.toString().includes(searchTerm)
      )
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openModal(isEditMode: boolean, veiculo?: any): void {
    this.isEditMode = isEditMode;
    if (isEditMode && veiculo) {
      this.currentVeiculoId = veiculo.id;
      this.veiculoForm.patchValue(veiculo);
    } else {
      this.currentVeiculoId = null;
      this.veiculoForm.reset();
    }
    this.modalRef = this.modalService.open(this.veiculoModal);
  }

  closeModal(): void {
    this.modalRef?.close();
  }

  onSubmit(): void {
    if (this.veiculoForm.valid) {
      const veiculoData = { ...this.veiculoForm.value };
      if (!this.isEditMode) {
        delete veiculoData.id; // Remover o campo id ao criar um novo veículo
      }
      console.log('Dados do formulário:', veiculoData); // Adicionar console log
      if (this.isEditMode && this.currentVeiculoId) {
        this.veiculoService.updateVeiculo(this.currentVeiculoId, veiculoData).subscribe(() => {
          alert('Veículo atualizado com sucesso!');
          this.modalRef?.close();
          this.veiculoForm.reset();
          this.ngOnInit(); // Recarregar a lista de veículos
        });
      } else {
        this.veiculoService.createVeiculo(veiculoData).subscribe((novoVeiculo) => {
          alert('Veículo adicionado com sucesso!');
          console.log('Veículo criado:', novoVeiculo); // Adicionar console log para verificar o veículo criado
          this.modalRef?.close();
          this.veiculoForm.reset();
          this.ngOnInit(); // Recarregar a lista de veículos
        });
      }
    } else {
      this.veiculoForm.markAllAsTouched();
    }
  }

  deletarVeiculo(id: string): void {
    if (confirm('Tem certeza que deseja deletar este veículo?')) {
      this.veiculoService.deleteVeiculo(id).subscribe(() => {
        alert('Veículo deletado com sucesso!');
        this.ngOnInit(); // Recarregar a lista de veículos
      });
    }
  }
}
