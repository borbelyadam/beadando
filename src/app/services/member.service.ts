import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Member } from 'src/app/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
    constructor(private http: HttpClient) { }

    async loadAll(pattern: string) {
      return firstValueFrom(this.http.get<Member[]>('/api/members', {
        params: {
            pattern: pattern
        }
      }));
    }

    async loadOne(id: string): Promise<Member> {
      return firstValueFrom(this.http.get<Member>(`/api/members/${id}`));
    }

    async addMember(member: any) {
      return firstValueFrom(this.http.post<Member>('/api/members', member))
    }

    async updateMember(member: any) {
      return firstValueFrom(this.http.put<Member>(`/api/members/${member._id}`, member));
    }
}