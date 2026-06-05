import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer';

declare var bootstrap: any;

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-list.html'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  customerForm!: FormGroup;

  isEditMode = false;
  selectedCustomer: any = null;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: data => {
        this.customers = data._embedded?.['customers'] ?? [];
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  openAdd(): void {
    this.isEditMode = false;
    this.selectedCustomer = null;
    this.customerForm.reset();

    new bootstrap.Modal(document.getElementById('addCustomerModal')).show();
  }

  openEdit(customer: any): void {
    this.isEditMode = true;
    this.selectedCustomer = customer;

    this.customerForm.patchValue({
      name: customer.name,
      email: customer.email
    });

    new bootstrap.Modal(document.getElementById('addCustomerModal')).show();
  }

  saveCustomer(): void {
    if (this.customerForm.invalid) return;

    const request = this.isEditMode
      ? this.customerService.updateCustomer(this.selectedCustomer.id, this.customerForm.value)
      : this.customerService.createCustomer(this.customerForm.value);

    request.subscribe({
      next: () => {
        this.loadCustomers();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  deleteCustomer(id: number): void {
    if (!confirm('Delete this customer?')) return;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => this.loadCustomers(),
      error: err => console.error(err)
    });
  }

  closeModal(): void {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('addCustomerModal')
    );
    modal?.hide();
  }
}