import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import { Subscription } from 'rxjs';
import { ItemModel } from '../item-model';  
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  itemName: string = '';
  itemCode: string = '';
  itemBrand: string = '';
  itemPrice: number = 0.0;
  items: any[] = [];
  selectedItem: any; 
  itemAddedSubscription: Subscription = new Subscription();
  itemDeletedSubscription: Subscription = new Subscription();
  searchTerm: string = '';
  itemsSearch: ItemModel[] = [];

  constructor(private itemService: ItemService, private toastr: ToastrService) { }

  onSubmit(): void {
    const newItem = {
      productName: this.itemName,
      Code: this.itemCode,
      Brand: this.itemBrand,
      UnitPrice: this.itemPrice
    };

    this.itemService.addItem(newItem).subscribe({
      next: response => {
        console.log('Item added successfully!', response.message);
        this.toastr.success('Item added successfully!', 'Success');
        this.resetForm();
      },
      error: err => {
        console.error('Error adding item:', err);
        console.error('Error adding item:', newItem);
      }
    });
  }



  resetForm(): void {
    this.itemName = '';
    this.itemCode = '';
    this.itemBrand = '';
    this.itemPrice = 0;
  }

  isValidForm(): boolean {
    return !!this.itemName && !!this.itemCode && !!this.itemBrand && this.itemPrice > 0;
  }


  ngOnInit(): void {
    this.loadItems();
    this.itemAddedSubscription = this.itemService.itemAdded$.subscribe(() => {
      this.loadItems();
    });
    this.itemDeletedSubscription = this.itemService.itemDeleted$.subscribe(() => {
      this.loadItems();
    });
  }

  ngOnDestroy(): void {
    this.itemAddedSubscription.unsubscribe();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: items => {
        this.items = items;
      },
      error: err => {
        console.error('Error loading items:', err);
      }
    });
  }

  deleteItem(id: number): void {
    if (id) {
      this.itemService.deleteItem(id).subscribe({
        next: response => {
          console.log('Item deleted successfully!', response);
          this.toastr.success('Item deleted successfully!', 'Success');

        },
        error: err => {
          console.error('Error deleting item:', err);
        }
      });
    } else {
      console.error('Invalid item ID:', id);
    }
  }

  editItem(item: any): void { 
    this.selectedItem = { ...item }; 
  }

  updateItem(): void {
    this.itemService.updateItem(this.selectedItem).subscribe(
      () => {
        this.toastr.success('Item updated successfully', 'Success');
        this.loadItems();
        this.selectedItem = null;
      },
      error => console.error('Error updating item', error)
    );
  }

  cancelEdit(): void {
    this.selectedItem = null; 
  }


  filteredItems(): ItemModel[] {
    if (!this.searchTerm) {
      return this.items;
    }
    return this.items.filter(item =>
      item.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.unitPrice.toString().includes(this.searchTerm)
    );
  }

  }



