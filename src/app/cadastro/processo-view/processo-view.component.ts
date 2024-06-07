import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessoService } from '../processo.service';
import { ProcessoResponseDTO } from '../processo.dto';

@Component({
  selector: 'app-processo-view',
  templateUrl: './processo-view.component.html',
  styleUrls: ['./processo-view.component.css'],
})
export class ProcessoViewComponent implements OnInit {
  processoId!: number;
  processo!: ProcessoResponseDTO;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: ProcessoService
  ) {}

  ngOnInit(): void {
    this.processoId = this.route.snapshot.params['processoId'];

    this.service.find(this.processoId).subscribe(response => {
      this.processo = response;
    });
  }

  urlArquivo():string {
    return `http://localhost:8080/processos/arquivo/${this.processo.npu}`;
  }
}
