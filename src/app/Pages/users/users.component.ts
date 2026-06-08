import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
  status: string;
  country: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
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

  dataSource = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;
  filterValue = '';

  constructor(
    private apiService: ApiService,
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator as any;
  }

  getUsers(): void {
    this.isLoading = true;

    this.apiService.getUsers().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        const users = response.results.map((user: any) => ({
          id: user.login.uuid.substring(0, 8),
          avatar: user.picture.medium,
          firstname: user.name.first,
          lastname: user.name.last,
          email: user.email,
          social_insurance_number: user.id?.value || 'N/A',
          plan: this.getRandomPlan(),
          status: this.getRandomStatus(),
          country: user.location.country,
        }));

        this.dataSource.data = users;
        this.isLoading = false;

        this.coreService.openSnackBar(
          'Users loaded successfully!',
          'OK'
        );
      },
      error: (error: any) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      },
    });
  }

  private getRandomPlan(): string {
    const plans = [
      'Essential',
      'Premium',
      'Elite',
      'Platinum',
      'Family',
    ];
    return plans[Math.floor(Math.random() * plans.length)];
  }

  private getRandomStatus(): string {
    const statuses = ['Active', 'Inactive', 'Pending', 'Suspended'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}