import { Component, OnInit } from '@angular/core';
import { FormsArray } from '../../models/header.models';
import { NavigationEnd, Router } from '@angular/router';
import { AuthModalService } from '../../../auth/services/auth-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selectedValue!: string;

  selectedCurrencyValue!: string;

  activeRout!: string | boolean;

  elColor!: boolean;

  dates: FormsArray[] = [
    { value: 'MM/DD/YYYY', viewValue: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', viewValue: 'DD/MM/YYYY' },
    { value: 'YYYY/DD/MM', viewValue: 'YYYY/DD/MM' },
    { value: 'YYYY/MM/DD', viewValue: 'YYYY/MM/DD' },
  ];

  currencies: FormsArray[] = [
    { value: 'EUR', viewValue: 'EUR' },
    { value: 'USA', viewValue: 'USA' },
    { value: 'RUB', viewValue: 'RUB' },
    { value: 'PLN', viewValue: 'PLN' },
  ];

  constructor(
    private router: Router,
    private authModalService: AuthModalService
  ) {}

  ngOnInit() {
    this.activeRout = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.activeRout = false;
          return;
        }
        this.activeRout = event.url;
      }
    });
  }

  openAuthDialog() {
    this.authModalService.openDialog();
  }
}
