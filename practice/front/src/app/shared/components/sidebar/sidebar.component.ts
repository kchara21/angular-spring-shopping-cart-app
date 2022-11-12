import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { UserResponse } from '../../models/user.interface';
import { UtilsService } from '../../service/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private _authSvc: AuthService, private utilsSvc: UtilsService) {}

  isAdmin: any = null;
  isLogged = false;

  private _destroy$ = new Subject<any>();

  ngOnDestroy(): void {
    this._destroy$.next({});
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this._authSvc.user$.pipe(takeUntil(this._destroy$)).subscribe({
      next: (user: UserResponse) => {
        this.isAdmin = user?.token;
      },
    });
  }

  onExit(): void {
    this._authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }
}
