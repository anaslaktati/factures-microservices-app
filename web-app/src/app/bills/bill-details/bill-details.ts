import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BillService } from '../../services/bill';
import { Bill } from '../../models/bill';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bill-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bill-details.html'
})
export class BillDetailsComponent implements OnInit {

  bill!: Bill;

  constructor(
    private route: ActivatedRoute,
    private billService: BillService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.billService.getBill(id).subscribe({
      next: data => {
        this.bill = data;
        console.log(this.bill);
        this.cdr.detectChanges();
      },
      error: err => console.error(err)

    });

  }

}