import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCrud } from '../../components/entity-crud/entity-crud.component';
import { ApiService } from '../../services/api.service';
import { Produto } from '../../models/types';

@Component({
  selector: 'app-produtos-page',
  standalone: true,
  imports: [CommonModule, EntityCrud],
  templateUrl: './produtos-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdutosPage implements OnInit {
  produtos: Produto[] = [];
  columns = ['nome', 'descricao', 'preco'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadProdutos();
  }

  loadProdutos() {
    this.apiService.get<Produto[]>('/produtos').subscribe({
      next: (data) => {
        this.produtos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        // Mock data para demonstração
        this.produtos = [
          { id: '1', nome: 'Produto 1', descricao: 'Descrição', preco: 99.99 }
        ];
      }
    });
  }

  onCreate(produto: Produto) {
    this.apiService.post<Produto>('/produtos', produto).subscribe({
      next: () => {
        this.loadProdutos();
      },
      error: (err) => {
        console.error('Erro ao criar produto:', err);
        this.produtos.push(produto);
      }
    });
  }

  onEdit(produto: Produto) {
    this.apiService.put<Produto>(`/produtos/${produto.id}`, produto).subscribe({
      next: () => {
        this.loadProdutos();
      },
      error: (err) => {
        console.error('Erro ao editar produto:', err);
      }
    });
  }

  onDelete(produto: Produto) {
    this.apiService.delete(`/produtos/${produto.id}`).subscribe({
      next: () => {
        this.loadProdutos();
      },
      error: (err) => {
        console.error('Erro ao deletar produto:', err);
      }
    });
  }
}
