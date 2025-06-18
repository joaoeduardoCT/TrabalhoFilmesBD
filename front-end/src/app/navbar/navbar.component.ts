import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAdm = false;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.isAdm = user.isAdm === true;
  }
}
