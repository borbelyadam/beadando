import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberListComponent } from './member-list/member-list.component';
import { RentFormComponent } from './rent-form/rent-form.component';

const routes: Routes = [
  {
    path: '',
    component: MemberListComponent
  },
  {
    path: 'member_form',
    component: MemberFormComponent
  },
  {
    path: 'rent_form',
    component: RentFormComponent
  },
  {
    path: 'item_list',
    component: ItemListComponent
  },
  {
    path: 'item_form',
    component: ItemFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
