import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemModel } from './item-model';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  public itemAddedSource = new Subject<void>();
  public itemDeletedSource = new Subject<void>();
  itemDeleted$ = this.itemDeletedSource.asObservable();
  itemAdded$ = this.itemAddedSource.asObservable();

  constructor(private http: HttpClient) { }
  private readonly apiUrl = 'https://localhost:7149/api/ItemList';

  addItem(item: any): Observable<any> {
    return this.http.post<any>('https://localhost:7149/additem', item).pipe(
      tap(() => {
        this.announceItemAdded();
      })
    );
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7149/api/ItemList`);
  }

  announceItemAdded(): void {
    this.itemAddedSource.next();
  }

  anounceItemDeleted(): void {
    this.itemDeletedSource.next();
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(response => {
        this.itemAddedSource.next();
        this.itemDeletedSource.next();
      })
    );
  }

  updateItem(items: ItemModel): Observable<void> {
    console.log('Updating item:', items); 
    return this.http.put<void>(`${this.apiUrl}/${items.id}`, items);
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7149/api/Login/list`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7149/api/Login/${id}`).pipe(
      tap(response => {
        console.log('Employee deleted successfully!', response);
        this.itemAddedSource.next();
        this.itemDeletedSource.next();
      })
    );
  }
  


}
