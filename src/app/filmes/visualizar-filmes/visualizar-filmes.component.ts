import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  filme : Filme;
  readonly semFoto = "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image"

  constructor(private activatedRoute: ActivatedRoute,
    private filmesService : FilmesService) { }

  ngOnInit() {
   this.visualizar(this.activatedRoute.snapshot.params['id']);
  }

  private visualizar(id: number): void{
    this.filmesService.visualizar(id).subscribe((filme: Filme) => this.filme = filme);
  }

}
