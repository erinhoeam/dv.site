import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit, OnChanges {

  public static readonly TOTAL_PAGS_PADRAO: number = 20;
  public static readonly PAG_PADRAO: number = 1;
	public static readonly REG_PADRAO: number = 0;
  public static readonly ADJACENTES_PADRAO: number = 10;
  
  @Input() qtdPorPagina: number;
	@Input() totalRegistros: number;
  @Input() qtdAdjacentes: number;
  @Input() pagina: number;
  @Output() onPaginate: EventEmitter<number> = new EventEmitter<number>();
 
	paginas: Array<number>;
	exibirProximo: boolean;
	qtdPaginas: number;

  constructor() { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
    
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (propName == "totalRegistros") {
        this.totalRegistros = changedProp.currentValue as number;
      }
      else if(propName == "pagina"){
        this.pagina = changedProp.currentValue as number;
      }
    }
    this.atualizarValores(); 
  }
  ngOnInit() {
    this.atualizarValores();
  }
  atualizarValores(){
    this.qtdAdjacentes = this.qtdAdjacentes || PaginacaoComponent.ADJACENTES_PADRAO;
		this.qtdPorPagina = this.qtdPorPagina || PaginacaoComponent.TOTAL_PAGS_PADRAO;
		this.pagina = this.pagina || PaginacaoComponent.PAG_PADRAO;
    this.totalRegistros = this.totalRegistros || PaginacaoComponent.REG_PADRAO;
    this.qtdPaginas = Math.ceil(this.totalRegistros / this.qtdPorPagina);
    this.gerarLinks();
  }
  /**
	 * Gera os links de paginação.
	 */
	gerarLinks() {

		this.exibirProximo = this.qtdPaginas !== this.pagina;
		this.paginas = [];
		let iniAdjacente = (this.pagina - this.qtdAdjacentes <= 0) ? 1 : 
				(this.pagina - this.qtdAdjacentes);
		let fimAdjacente = (this.pagina + this.qtdAdjacentes >= this.qtdPaginas) ? 
				this.qtdPaginas : (this.pagina + this.qtdAdjacentes);
		for (let i=iniAdjacente; i<=fimAdjacente; i++) {
			this.paginas.push(i);
		}
  }
  /**
	 * Método responsável por chamar o Emitter de 
	 * paginação.
	 *
	 * @param number pagina
	 * @param any $event número da página a ser exibida.
	 */
	paginar(pagina: number, $event: any) {
		$event.preventDefault();
		this.pagina = pagina;
		this.gerarLinks();
		this.onPaginate.emit(pagina);
	}

}
