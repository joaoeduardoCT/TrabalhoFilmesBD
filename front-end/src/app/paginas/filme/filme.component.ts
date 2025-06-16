import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from './filme.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrl: './filme.component.css'
})
export class FilmeComponent implements OnInit {
  filme: any;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.filmeService.getFilmePorId(id).subscribe((data) => {
      this.filme = data;
    });
  }
}

