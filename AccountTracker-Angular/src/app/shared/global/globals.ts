import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Globals {
  role: number = 4;
  employeeId: string = sessionStorage.getItem('username');
  apiServerIP: string = environment.production ? '192.168.0.45' : '127.0.0.1';
  basicDetailsLoaded: boolean = false;

  updateBasicDetails(): void {
      this.basicDetailsLoaded = true;
  }
}
