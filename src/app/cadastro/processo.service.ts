import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProcessoChangeDTO,
  ProcessoCreateDTO,
  ProcessoResponseDTO,
} from './processo.dto';
import { PageResponseDTO } from '../shared/dto/page-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ProcessoService {
  constructor(private readonly http: HttpClient) {}

  list(
    pageIndex: number,
    pageSize: number
  ): Observable<PageResponseDTO<ProcessoResponseDTO[]>> {
    return this.http.get<PageResponseDTO<ProcessoResponseDTO[]>>(
      `http://localhost:8080/processos?page=${pageIndex}&size=${pageSize}`
    );
  }

  find(id: number): Observable<ProcessoResponseDTO> {
    return this.http.get<ProcessoResponseDTO>(
      `http://localhost:8080/processos/${id}`
    );
  }

  create(data: FormData): Observable<ProcessoResponseDTO> {
    return this.http.post<ProcessoResponseDTO>(
      'http://localhost:8080/processos',
      data
    );
  }

  change(id: number, data: FormData): Observable<ProcessoResponseDTO> {
    return this.http.put<ProcessoResponseDTO>(
      `http://localhost:8080/processos`,
      data
    );
  }
}
