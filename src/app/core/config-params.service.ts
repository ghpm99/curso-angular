import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {
    let httpParams = new HttpParams();    
    
    httpParams = httpParams.set('page', config.pagina.toString());
    httpParams = httpParams.set('limit', config.limite.toString());

    if (config.pesquisa) {
      httpParams = httpParams.set('text', config.pesquisa);
    }
    if (config.campo) {
      httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString());
    }
    httpParams = httpParams.set('sort', 'id');
    httpParams = httpParams.set('order', 'asc');
    return httpParams;
  }
}