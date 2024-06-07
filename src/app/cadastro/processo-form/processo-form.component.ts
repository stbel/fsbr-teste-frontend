import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IbgeLocalidadesService } from 'src/app/dominio/ibge-localidades.service';
import {
  IbgeMunicipioResponseDTO,
  IbgeUfResponseDTO,
} from 'src/app/dominio/ibge.dto';
import { ProcessoService } from '../processo.service';
import { ProcessoResponseDTO } from '../processo.dto';

@Component({
  selector: 'app-processo-form',
  templateUrl: './processo-form.component.html',
  styleUrls: ['./processo-form.component.css'],
})
export class ProcessoFormComponent implements OnInit {
  processoId!: number;
  processo!: ProcessoResponseDTO;

  form!: FormGroup;
  arquivo!: File;

  pronto = false;

  ibgeUfs!: IbgeUfResponseDTO[];
  ibgeMunicipios!: IbgeMunicipioResponseDTO[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly ibgeService: IbgeLocalidadesService,
    private readonly service: ProcessoService
  ) {}

  ngOnInit(): void {
    this.processoId = +this.route.snapshot.params['processoId'];

    this.form = this.formBuilder.group({
      id: [this.processoId],
      npu: ['', Validators.required],
      ibgeUfId: [-1, Validators.min(1)],
      ibgeMunicipioId: [-1, Validators.min(1)],
      arquivoPdf: [''],
    });

    this.cargaDados();
  }

  cargaDados(): void {
    if (this.processoId === -1) {
      this.ibgeService.listIbgeUfs().subscribe((response) => {
        this.ibgeUfs = response;
        this.pronto = true;
      });
    } else {
      this.ibgeService.listIbgeUfs().subscribe((response) => {
        this.ibgeUfs = response;

        this.service.find(this.processoId).subscribe((response) => {
          {
            this.processo = response;
            this.ibgeService
              .listIbgeMunicipiosPorUf(this.processo.ibgeUfSigla)
              .subscribe((response) => {
                this.ibgeMunicipios = response;

                this.form.get('id')?.setValue(this.processo.id);
                this.form.get('npu')?.setValue(this.processo.npu);
                this.form.get('ibgeUfId')?.setValue(this.processo.ibgeUfId);
                this.form
                  .get('ibgeMunicipioId')
                  ?.setValue(this.processo.ibgeMunicipioId);

                this.pronto = true;
              });
          }
        });
      });
    }
  }

  cargaMunicipios() {
    const ufId = this.form.get('ibgeUfId')?.value;
    const ufSigla = this.ibgeUfs.find((e) => e.id === ufId)?.sigla || 'PE';

    this.ibgeService.listIbgeMunicipiosPorUf(ufSigla).subscribe({
      next: (response) => (this.ibgeMunicipios = response),
      complete: () => this.form.get('ibgeMunicipioId')?.setValue(-1),
    });
  }

  capturarArquivo(event: any): void {
    this.arquivo = event.target.files[0];
  }

  salvar(): void {
    const data = new FormData();

    data.append('id', this.form.get('id')?.value);
    data.append('npu', this.form.get('npu')?.value);
    data.append('ibgeUfId', this.form.get('ibgeUfId')?.value);
    data.append('ibgeMunicipioId', this.form.get('ibgeMunicipioId')?.value);
    this.arquivo && data.append('docPdf', this.arquivo);

    if (this.processoId > 0) {
      this.service.change(this.processo.id, data).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/processos']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.service.create(data).subscribe({
        next: (response) => {
          this.router.navigate(['/processos']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
