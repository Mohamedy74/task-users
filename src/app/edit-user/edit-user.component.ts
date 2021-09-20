import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../interfaces/user';

export interface DialogData {
  id: string,
  title: string,
  type: string,
  user: User
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userFormGroup: FormGroup = new FormGroup({});
  editMode = false;
  user: User = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  };

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  ngOnInit(): void {
    if (this.data.type === 'edit') {
      this.editMode = true;
      this.user = this.data.user;
    }
    this.initForms();
  }

  initForms() {
    this.userFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required])
    });
    if (this.editMode) {
      this.userFormGroup.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.user.name = this.userFormGroup.get('name')?.value;
    this.user.email = this.userFormGroup.get('email')?.value;
    this.user.phone = this.userFormGroup.get('phone')?.value;

    this.dialogRef.close(this.user);
  }

}
