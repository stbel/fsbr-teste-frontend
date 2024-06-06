import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IbgeLocalidadesService } from 'src/app/dominio/ibge-localidades.service';
import {
  IbgeMunicipioResponseDTO,
  IbgeUfResponseDTO,
} from 'src/app/dominio/ibge.dto';

@Component({
  selector: 'app-processo-form',
  templateUrl: './processo-form.component.html',
  styleUrls: ['./processo-form.component.css'],
})
export class ProcessoFormComponent implements OnInit {
  form!: FormGroup;

  ibgeUfs!: IbgeUfResponseDTO[];
  ibgeMunicipios!: IbgeMunicipioResponseDTO[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ibgeService: IbgeLocalidadesService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [-1],
      npu: ['', Validators.required],
      ibgeUfId: [-1, Validators.min(1)],
      ibgeMunicipioId: [-1, Validators.min(1)],
    });

    this.buscarUfs();
  }

  buscarUfs(): void {
    this.ibgeService
      .listIbgeUfs()
      .subscribe((response) => (this.ibgeUfs = response));
  }
  buscarMunicipios(): void {
    const ufId = this.form.get('ibgeUfId')?.value;
    const ufSigla = this.ibgeUfs.find((e) => e.id === ufId)?.sigla || 'PE';

    this.ibgeService
      .listIbgeMunicipiosPorUf(ufSigla)
      .subscribe({
        next: (response) => (this.ibgeMunicipios = response),
        complete: () => this.form.get('ibgeMunicipioId')?.setValue(-1),
      });
  }

  salvar(): void {
    console.table(this.form.controls);
  }
}
