import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCrud } from '../../components/entity-crud/entity-crud.component';
import { ApiService } from '../../services/api.service';
import { Cliente } from '../../models/types';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  imports: [CommonModule, EntityCrud],
  templateUrl: './clientes-page.component.html',
  styleUrl: './clientes-page.component.css'
})
export class ClientesPage implements OnInit {
  clientes: Cliente[] = [];
  columns = ['nome', 'email', 'telefone'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.apiService.get<Cliente[]>('/clientes').subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        // Mock data para demonstração
        this.clientes = [
          { id: '1', nome: 'Cliente 1', email: 'cliente1@email.com', telefone: '123456789' }
        ];
      }
    });
  }

  onCreate(cliente: Cliente) {
    this.apiService.post<Cliente>('/clientes', cliente).subscribe({
      next: () => {
        this.loadClientes();
      },
      error: (err) => {
        console.error('Erro ao criar cliente:', err);
        this.clientes.push(cliente);
      }
    });
  }

  onEdit(cliente: Cliente) {
    this.apiService.put<Cliente>(`/clientes/${cliente.id}`, cliente).subscribe({
      next: () => {
        this.loadClientes();
      },
      error: (err) => {
        console.error('Erro ao editar cliente:', err);
      }
    });
  }

  onDelete(cliente: Cliente) {
    this.apiService.delete(`/clientes/${cliente.id}`).subscribe({
      next: () => {
        this.loadClientes();
      },
      error: (err) => {
        console.error('Erro ao deletar cliente:', err);
      }
    });
  }
}
