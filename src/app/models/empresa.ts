import { EmpresaAplicacao } from './empresaAplicacao';
export class Empresa{
    id:String;
    nome:String;
    bloqueada:boolean;
    empresaAplicacoes:EmpresaAplicacao[];
}