import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../interfaces/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.usersService.getUsers().subscribe(
      (res: any) => {
        this.loading = false;
        this.users = res;
      },
      err => {
        this.loading = false;
        console.log(err)
      }
    )
  }

  addUser() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '50%',
      data: { id: '', title: 'Create', type: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const user = { ...result };
        this.users.unshift(user);
      }
    });

  }

  editUser(user: User, index: number) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '50%',
      data: { id: '', title: 'Edit', type: 'edit', user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const user = { ...result };
        this.users[index] = user;
      }
    })
  }

  deleteUser(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        details: 'details',
        action: 'Delete',
        module: 'User',
        name: 'name'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users.splice(index, 1);
      }
    });

  }

}
