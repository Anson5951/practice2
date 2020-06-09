import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MemberService } from "../../service/member.service";
import { Member } from 'src/app/class/member';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap, take } from 'rxjs/operators';
import { Observable, of, forkJoin } from "rxjs";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { EditType } from 'src/app/enum/edit-type.enum';
import { Constants } from 'src/app/class/constants';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.sass']
})
export class MemberDetailComponent implements OnInit {

  member$: Observable<Member>;
  memberForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email])
  });
  editType: string;
  buttonValue: string;

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getType();
    if (this.editType === EditType.Modify) {
      this.getMember();
    }
  }

  getMember() {
    let members: Member[];
    let sessionMemberList = sessionStorage.getItem(Constants.MemberListStorageKey);
    if (sessionMemberList) {
      console.log('member-detail get list from sessionStorage')
      members = <Member[]>(JSON.parse(sessionMemberList))
      this.route.paramMap.subscribe(
        params => {
          if (+params.get('id')) {
            let member = members.find(member => member.id === +params.get('id'))
            this.memberForm = new FormGroup({
              id: new FormControl(member.id),
              name: new FormControl(member.name, Validators.required),
              department: new FormControl(member.department, Validators.required), 
              phone: new FormControl(member.phone, Validators.required ),
              mail: new FormControl(member.mail, [Validators.email, Validators.required])
            })
          }
        }
      )
    }
  }

  getType() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.editType = param.get('type');
      if (param.get('type') === EditType.Modify) {
        console.log('In datail, get type : Modify');
        this.buttonValue = '修改';
      }
      else if (param.get('type') === EditType.Create) {
        console.log('In datail, get type : Create');
        this.buttonValue = '新增';
      }
    });
  }

  goBack() {
    this.router.navigate(['/member']);
  }

  confirm() {
    const formData = this.memberForm.getRawValue();
    console.log('form status : ' + this.memberForm.status)
    if (this.memberForm.status === 'VALID') {
      console.log("the values of formData : " + JSON.stringify(formData));
      this.router.navigate(['/member', { type: this.editType, ...formData }]);
    }
    if (this.memberForm.status === 'INVALID') {
      console.log('test 1 : ' + (this.memberForm.get('name').status === 'INVALID'))
      if (this.memberForm.get('name').status === 'INVALID') {
        console.log('name status : ' + this.memberForm.status)
        alert('Name is invalid, please check!')
      }
      console.log('test 2 : ' + (this.memberForm.get('mail').status === 'INVALID'))
      if (this.memberForm.get('mail').status === 'INVALID') {
        console.log('mail status : ' + this.memberForm.status)
        alert('Mail is invalid, please check!')
      }
    }
  }
}
