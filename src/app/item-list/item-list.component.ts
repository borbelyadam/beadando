import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  all_item!: Item[];
  items!: Item[];

  pattern: string = '';
  pattern_type: string = 'TITLE';

  constructor(
    private itemService: ItemService
  ) { }

  async ngOnInit(): Promise<void> {
    this.all_item = await this.itemService.loadAll('');
    this.items = this.all_item;
  }

  getDelay(rent_from: Date | null | undefined): number {
  if (!rent_from) return 0;

  const days = Number(this.pattern); // pl. hány nap után számít késésnek
  const rentDate = new Date(rent_from).getTime();

  const expectedDate = new Date();
  expectedDate.setDate(new Date().getDate() - days);

  const oneDay = 1000 * 60 * 60 * 24;

  const delay = Math.floor((expectedDate.getTime() - rentDate) / oneDay);

  return delay > 0 ? delay : 0;
}

  async search() {
    if(this.pattern_type == 'DELAY') {
      this.items = this.all_item.filter(item => {
        if(!item.rent_from) return 0;
    const days = Number(this.pattern);
    const rent_date = new Date(item.rent_from).getTime();
    const expectedDate = new Date();
    expectedDate.setDate(new Date().getDate() - days);

    var oneDay = 1000 * 60 * 60 * 24;

    const delay = Math.floor(new Date(expectedDate.getTime() - rent_date).getTime() / oneDay);
    if (delay>=0) return true;

        return false;
      })

      return;
    }

    if(this.pattern == '') {
      this.items = this.all_item;
      return;
    }

    this.items = this.all_item.filter(item => {
      let ret = this.pattern_type == 'TITLE' && item.title.indexOf(this.pattern) !== -1
      ret ||= this.pattern_type == 'AUTHOR' && item.author.indexOf(this.pattern) !== -1

      if(this.pattern_type == 'DELAY') {
        if(!item.member) return false;
      }

      return ret;
    })
  }

  back(item: Item) {
    item.status = "Szabad";
    item.member = null;
    item.rent_from = null;
    this.itemService.updateItem(item);
  }
}
