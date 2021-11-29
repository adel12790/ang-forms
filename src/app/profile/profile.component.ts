import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IProfile, ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public title = 'profile';
  public profileData: IProfile = {
    firstName: '',
    lastName: '',
    username: '',
    age: 0,
    email: '',
};
  public loading = true;
  public saving = false;
  public error: string = '';

  constructor(private profile: ProfileService, private translate: TranslateService) {}

  isDisabled() {
    return this.loading || this.saving;
  }

  ngOnInit(): void {
    this.profile.getProfileUser().then((data: IProfile) => {
      console.log(data);
      this.profileData = data;
    }).catch(e => {
      this.error = e.error;
    }).finally(() => {
      this.loading = false;
    });
  }

  onSubmit(formValue: any) {
    this.saving = true;
    this.resetErrors();
    this.profile.setData(formValue.firstname, formValue.lastname, formValue.email).then((data: any) => {
      console.log('all data', data);
      this.profileData = data;
    }).catch(e => {
      console.log(e);
      this.error = e.error;
      this.onNamesUpdated();
    }).finally(()=> {
      this.saving = false;
    });
  }

  resetErrors() {
    this.error = '';
  }

  onNamesUpdated() {
    this.profileData.username = `${this.profileData.firstName.toLowerCase()}.${this.profileData.lastName.toLowerCase()}`;
    this.profileData.email = `${this.profileData.username}@blueface.com`
  }
}
