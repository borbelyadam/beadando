import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

  async loadAll(pattern?: string): Promise<Item[]> {
    return firstValueFrom(this.http.get<Item[]>('/api/items', {
      params: pattern ? { pattern } : {}
    }));
  }

  async loadFree(): Promise<Item[]> {
    return firstValueFrom(this.http.get<Item[]>('/api/items/free'));
  }

  async loadOne(id: string): Promise<Item> {
    return firstValueFrom(this.http.get<Item>('/api/items/' + id));
  }

  async addItem(item: Item): Promise<Item> {
    return firstValueFrom(this.http.post<Item>('/api/items', item));
  }

  async updateItem(item: Item): Promise<Item> {
    return firstValueFrom(this.http.put<Item>(`/api/items/${item._id}`, item)); 
  }

  async deleteItem(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`/api/items/${id}`));
  }
}