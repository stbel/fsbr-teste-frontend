export class ProcessoResponseDTO {
  id!: number;

  npu!: string;

  ibgeMunicipioId!: number;

  ibgeMunicipioNome!: string;

  ibgeUfId!: number;

  ibgeUfNome!: string;

  ibgeUfSigla!: string;

  dataCadastro!: Date;

  dataVisualizacao!: Date;
}

export class ProcessoCreateDTO {
  npu!: string;

  ibgeMunicipioId!: number;

  ibgeUfId!: number;

  docPdf!: File;
}

export class ProcessoChangeDTO {
  id!: number;
  
  npu!: string;

  ibgeMunicipioId!: number;

  ibgeUfId!: number;

  docPdf!: File;
}
