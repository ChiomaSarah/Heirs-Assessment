import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/user-service.service';
import { CoreService } from 'src/app/core/core.service';

export interface UserData {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  social_insurance_number: string;
  plan: string;
  status: Date;
  country: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'avatar',
    'firstname',
    'lastname',
    'email',
    'social_insurance_number',
    'plan',
    'status',
    'country',
  ];

  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading: boolean = true;
  constructor(
    private apiService: ApiService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    return this.apiService.getUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error(error: any) {
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
