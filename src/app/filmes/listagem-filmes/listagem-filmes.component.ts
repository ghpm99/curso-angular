import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image"

  config : ConfigParams = {
    pagina : 0,
    limite : 8,
  }

  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges.pipe(debounceTime(400)).subscribe((val: string) => {
      this.config.pesquisa = val;
      
      this.resetarConsultar();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = { tipo: 'genero', valor: val};
      
      this.resetarConsultar();
    });

    this.generos = [
      "Ação", "Aventura", "Ficção Científica", "Romance", "Terror"
    ];

    this.listarFilmes();

  }

  open() {
  }

  onScroll() {
    this.listarFilmes();
  }

  private listarFilmes(): void {

    this.filmesService.listarTodos(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes))
    this.config.pagina++;
  }

private resetarConsultar() : void{
  this.config.pagina = 0;
  this.filmes = [];
  this.listarFilmes();
}

}
