import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup = this.formBuilder.group({
    _id: [],
    name: [],
    phone: [],
    pid: [],
    address: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      const member = await this.memberService.loadOne(id);
      this.memberForm.patchValue(member);
    }
  }

  async addMember() {
    const data = { ...this.memberForm.value };

    if (data._id) {
      await this.memberService.updateMember(data);
    } else {
      delete data._id;
      await this.memberService.addMember(data);
    }

    this.router.navigateByUrl('/member_list');
  }

  async deleteMember() {
    const data = { ...this.memberForm.value };
    data.deleted = true;
    await this.memberService.updateMember(data);
    this.router.navigateByUrl('/member_list');
  }
}