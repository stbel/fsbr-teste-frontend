import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcessoResponseDTO } from '../processo.dto';
import { ProcessoService } from '../processo.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PageResponseDTO } from 'src/app/shared/dto/page-response.dto';

@Component({
  selector: 'app-processo-grid',
  templateUrl: './processo-grid.component.html',
  styleUrls: ['./processo-grid.component.css'],
})
export class ProcessoGridComponent implements OnInit {
  colunas = ['npu', 'dataCadastro', 'dataVisualizacao'];

  pagina!: PageResponseDTO<ProcessoResponseDTO[]>;

  processos!: ProcessoResponseDTO[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly service: ProcessoService) {}

  ngOnInit(): void {
    this.carregarProcessos(0, 1);
  }

  temp(event: PageEvent): void {
    this.carregarProcessos(event.pageIndex, event.pageSize);
  }

  carregarProcessos(pageIndex: number, pageSize: number): void {
    this.service.list(pageIndex, pageSize).subscribe((response) => {
      this.pagina = response;
      this.processos = this.pagina.content;
    });
  }
}
