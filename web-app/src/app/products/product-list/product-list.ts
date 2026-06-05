import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

declare var bootstrap: any;

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  productForm!: FormGroup;

  isEditMode = false;
  selectedProduct: any = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required]
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data._embedded?.['products'] ?? [];
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  openAdd(): void {
    this.isEditMode = false;
    this.selectedProduct = null;
    this.productForm.reset();

    new bootstrap.Modal(document.getElementById('addProductModal')).show();
  }

  openEdit(product: any): void {
    this.isEditMode = true;
    this.selectedProduct = product;

    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });

    new bootstrap.Modal(document.getElementById('addProductModal')).show();
  }

  saveProduct(): void {
    if (this.productForm.invalid) return;

    const request = this.isEditMode
      ? this.productService.updateProduct(this.selectedProduct.id, this.productForm.value)
      : this.productService.createProduct(this.productForm.value);

    request.subscribe({
      next: () => {
        this.loadProducts();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  deleteProduct(id: string): void {
    if (!confirm('Delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: err => console.error(err)
    });
  }

  closeModal(): void {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('addProductModal')
    );
    modal?.hide();
  }
}