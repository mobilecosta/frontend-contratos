import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entity-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entity-crud.component.html',
  styleUrl: './entity-crud.component.css'
})
export class EntityCrud implements OnInit {
  @Input() title: string = 'Entity';
  @Input() items: any[] = [];
  @Input() columns: string[] = [];
  @Output() create = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  showForm = false;
  isEditing = false;
  formData: any = {};

  ngOnInit() {
    this.resetForm();
  }

  openForm() {
    this.showForm = true;
    this.isEditing = false;
    this.resetForm();
  }

  closeForm() {
    this.showForm = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = {};
    this.columns.forEach(col => this.formData[col] = '');
  }

  submitForm() {
    if (this.isEditing) {
      this.edit.emit(this.formData);
    } else {
      this.create.emit(this.formData);
    }
    this.closeForm();
  }

  editItem(item: any) {
    this.isEditing = true;
    this.formData = { ...item };
    this.showForm = true;
  }

  deleteItem(item: any) {
    if (confirm('Tem certeza que deseja deletar este item?')) {
      this.delete.emit(item);
    }
  }
}
