import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit, OnDestroy {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchEmployee: string = '';
  employeeDeletedSubscription: Subscription = new Subscription();

  constructor(private itemService: ItemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadItems();
    this.employeeDeletedSubscription = this.itemService.itemDeleted$.subscribe(() => {
      this.loadItems();
    });
  }

  ngOnDestroy(): void {
    this.employeeDeletedSubscription.unsubscribe();
  }

  loadItems(): void {
    this.itemService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
        this.filteredEmployees = employees;
      },
      error: err => {
        console.error('Error loading items:', err);
      }
    });
  }

  deleteEmployee(id: number): void {
    if (id) {
      this.itemService.deleteEmployee(id).subscribe({
        next: response => {
          console.log('Employee deleted successfully!', response);
          this.toastr.success('Employee deleted successfully!', 'Success');

          this.loadItems(); 
        },
        error: err => {
          console.error('Error deleting employee:', err);
        }
      });
    } else {
      console.error('Invalid employee ID:', id);
    }
  }

  searchEmployees(): void {
    const searchTerm = this.searchEmployee.toLowerCase();
    const searchTerms = searchTerm.split(' ');

    this.filteredEmployees = this.employees.filter(employee => {
      const fullName = `${employee.firstName.toLowerCase()} ${employee.lastName.toLowerCase()}`;
      return searchTerms.every(term =>
        employee.firstName.toLowerCase().includes(term) ||
        employee.lastName.toLowerCase().includes(term) ||
        fullName.includes(term) ||
        employee.userName.toLowerCase().includes(term)
      );
    });
  }
}
