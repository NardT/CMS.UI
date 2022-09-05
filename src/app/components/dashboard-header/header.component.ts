import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isExpanded = true;
  constructor(private router: Router) { }

  ngOnInit(): void {}

  Logout() {
    this.router.navigate(['/login']);
  }

}