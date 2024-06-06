export class PageResponseDTO<T> {
  public content!: T;

  public totalPages!: number;

  public totalElements!: number;

  public last!: number;

  public first!: number;

  public size!: number;

  public number!: number;

  public numberOfElements!: number;
}
