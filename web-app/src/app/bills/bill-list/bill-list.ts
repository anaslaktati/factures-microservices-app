import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/bill';
import { Bill } from '../../models/bill';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bill-list.html'
})
export class BillListComponent implements OnInit {

  bills: Bill[] = [];

  constructor(
  private billService: BillService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billService.getBills().subscribe({
      next: data => {
        this.bills = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  deleteBill(id: number): void {
    this.billService.deleteBill(id).subscribe(() => {
      this.loadBills();
    });
  }
}