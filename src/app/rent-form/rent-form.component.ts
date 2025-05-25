import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';
import { Member } from '../models/member';
import { ItemService } from '../services/item.service';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit {
  rentForm: FormGroup = this.formBuilder.group({
    id: [],
    items: this.formBuilder.array([])
  })

  itemsFormArray = this.rentForm.get("items") as FormArray;

  member!: Member;
  items!: Item[];

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.queryParams['id'];

    if(id == undefined) {
      this.router.navigateByUrl(``);
    }

    this.member = await this.memberService.loadOne(id);
    this.rentForm.patchValue({
      id: this.member._id
    });

    for(let i = 0; i < 6 - this.member.items.length; i++) {
      this.itemsFormArray.push(this.formBuilder.group({
        id: [],
        status: ['Kikölcsönzött'],
        rent_from: [new Date().toISOString()]
      }))
    }

    this.items = await this.itemService.loadFree();
  }

  toGroup(item: AbstractControl) {
    return item as FormGroup;
  }

  async rent() {
    const data = this.rentForm.value;
    const tmp_data: Item[] = [];
    for(let item of data.items) {
      if(item.id == '-1' || item.id == null) continue;
      if(tmp_data.filter(i => i._id == item.id).length > 0) continue;
      tmp_data.push(item);
    }
    //tmp_data.forEach(item => item._id = Number(item._id))
    data.items = tmp_data;

    this.member = await this.memberService.updateMember(data);
    this.items = await this.itemService.loadFree();

    for(let tmp in tmp_data) {
      this.itemsFormArray.removeAt(0);
    }
  }
}
