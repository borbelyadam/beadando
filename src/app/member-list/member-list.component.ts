import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  all_member!: Member[];
  members!: Member[];

  pattern: string = '';
  pattern_type: string = 'ID';

  constructor(
    private memberService: MemberService
  ) { }

  async ngOnInit(): Promise<void> {
    this.all_member = await this.memberService.loadAll('');
    this.members = this.all_member;
  }

  async search() {
    if(this.pattern == '') {
      this.members = this.all_member;
      return;
    }

    this.members = this.all_member.filter(member => {
      let ret = this.pattern_type === 'ID' && member._id === this.pattern;
      ret ||= this.pattern_type == 'NAME' && member.name.indexOf(this.pattern) !== -1
      ret ||= this.pattern_type == 'PID' && member.pid.indexOf(this.pattern) !== -1

      return ret;
    })
  }
}