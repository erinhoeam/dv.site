import { Aplicacao } from './aplicacao';
import { Empresa } from "app/models/empresa";
export class EmpresaAplicacao {
    constructor(){
        this.aplicacao = new Aplicacao();
        this.empresa = new Empresa();
    }
    aplicacaoId:String;
    empresaId:String;
    dataValidade:Date;
    disponivel:boolean;
    aplicacao:Aplicacao;
    empresa:Empresa;
}