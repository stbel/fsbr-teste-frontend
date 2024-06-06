import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IbgeMunicipioResponseDTO, IbgeUfResponseDTO } from './ibge.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IbgeLocalidadesService {
  private ibgeUfsUrl =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';
  private ibgeMunicipiosPorUfUrl =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios?orderBy=nome';

  constructor(private readonly http: HttpClient) {}

  listIbgeUfs(): Observable<IbgeUfResponseDTO[]> {
    const url = new URL(this.ibgeUfsUrl);

    return this.http.get<IbgeUfResponseDTO[]>(url.toString());
  }

  listIbgeMunicipiosPorUf(
    sigla: string
  ): Observable<IbgeMunicipioResponseDTO[]> {

    const url = new URL(this.ibgeMunicipiosPorUfUrl.replace(/{UF}/g, sigla));

    return this.http.get<IbgeMunicipioResponseDTO[]>(url.toString());
  }
}
