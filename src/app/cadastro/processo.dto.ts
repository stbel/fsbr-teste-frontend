export class ProcessoResponseDTO {
  id!: number;

  npu!: string;

  ibgeMunicipioId!: number;

  ibgeUfId!: number;

  dataCadastro!: Date;

  dataVisualizacao!: Date;
}

export class ProcessoCreateDTO {
  npu!: string;

  ibgeMunicipioId!: number;

  ibgeUfId!: number;
}

export class ProcessoChangeDTO {
  id!: number;
  
  npu!: string;

  ibgeMunicipioId!: number;

  ibgeUfId!: number;
}
