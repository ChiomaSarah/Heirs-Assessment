import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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

  constructor(
    private apiService: ApiService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    return this.apiService.getEmployees().subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  // updateEmployee(data: any) {
  //   const dialogRef = this._dialog.open(AddEmployeeDialogComponent, { data });
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.getEmployees();
  //       }
  //     },
  //   });
  // }

  deleteEmployee(id: number) {
    return this.apiService.deleteEmployee(id).subscribe({
      next: (response) => {
        // alert('Employee deleted!');
        this.coreService.openSnackBar('Employee deleted!', 'Done');
        return this.getEmployees();
      },
      error: console.log,
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
