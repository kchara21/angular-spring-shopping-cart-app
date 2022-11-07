import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from './shared/service/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  opened = false;
  private _destroy$ = new Subject<any>();
  title = 'front';

  // Inyeccion de Dependencias.
  constructor(private utilsSvc: UtilsService) {}

  ngOnDestroy(): void {
    this._destroy$.next({});
    this._destroy$.complete();
  }

  // Me suscribo a un servicio, para ESCUCHAR cuando debe o no abrirse el SLIDEBAR
  ngOnInit(): void {
    this.utilsSvc.sidebarOpened$
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        this.opened = res;
      });
  }
}
