import { HttpClient } from '@angular/common/http';
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

  find(): Observable<PageResponseDTO<ProcessoResponseDTO>> {
    return this.http.get<PageResponseDTO<ProcessoResponseDTO>>('');
  }

  create(
    dto: ProcessoCreateDTO
  ): Observable<PageResponseDTO<ProcessoResponseDTO>> {
    return this.http.post<PageResponseDTO<ProcessoResponseDTO>>('', {});
  }

  change(
    dto: ProcessoChangeDTO
  ): Observable<PageResponseDTO<ProcessoResponseDTO>> {
    return this.http.put<PageResponseDTO<ProcessoResponseDTO>>('', {});
  }

  remove(): Observable<String> {
    return this.http.delete<String>('');
  }
}
