import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCrud } from '../../components/entity-crud/entity-crud.component';
import { ApiService } from '../../services/api.service';
import { Contrato } from '../../models/types';

@Component({
  selector: 'app-contratos-page',
  standalone: true,
  imports: [CommonModule, EntityCrud],
  templateUrl: './contratos-page.component.html',
  styleUrl: './contratos-page.component.css'
})
export class ContratosPage implements OnInit {
  contratos: Contrato[] = [];
  columns = ['numero', 'dataInicio', 'dataFim', 'status'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadContratos();
  }

  loadContratos() {
    this.apiService.get<Contrato[]>('/contratos').subscribe({
      next: (data) => {
        this.contratos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar contratos:', err);
        // Mock data para demonstração
        this.contratos = [
          {
            id: '1',
            numero: 'CTR-001',
            cliente: { id: '1', nome: 'Cliente 1', email: 'cliente@email.com', telefone: '123456789' },
            produto: { id: '1', nome: 'Produto', descricao: 'Desc', preco: 99.99 },
            dataInicio: new Date(),
            dataFim: new Date(),
            status: 'Ativo'
          }
        ];
      }
    });
  }

  onCreate(contrato: Contrato) {
    this.apiService.post<Contrato>('/contratos', contrato).subscribe({
      next: () => {
        this.loadContratos();
      },
      error: (err) => {
        console.error('Erro ao criar contrato:', err);
        this.contratos.push(contrato);
      }
    });
  }

  onEdit(contrato: Contrato) {
    this.apiService.put<Contrato>(`/contratos/${contrato.id}`, contrato).subscribe({
      next: () => {
        this.loadContratos();
      },
      error: (err) => {
        console.error('Erro ao editar contrato:', err);
      }
    });
  }

  onDelete(contrato: Contrato) {
    this.apiService.delete(`/contratos/${contrato.id}`).subscribe({
      next: () => {
        this.loadContratos();
      },
      error: (err) => {
        console.error('Erro ao deletar contrato:', err);
      }
    });
  }
}
