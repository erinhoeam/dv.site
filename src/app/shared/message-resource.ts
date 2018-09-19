export class MessageResource{
    public messages: { [key: string]: { [key: string]: string } };
    public routes: { [key: string]: { [key: string]: string } };
    public titles: { [key: string]: { [key: string]: string } };
    
    constructor(){

        this.messages = { 
            SHARED: {
                MSG_SAVE_SUCCESS: 'Salvo com sucesso!' ,
                MSG_FAIL_OPERATION: 'Falha ao realizar operação!',
                MSG_SAVING: 'Salvando...',
                MSG_LOADING: 'Carregando...',
                MSG_LISTING: 'Listando...',
                MSG_SENDING: 'Enviando...',
                MSG_CONFIRMING: 'Confirmando...',
                LOGIN: 'Efetuando Login...',
                MSG_DELETE: 'Excluindo...', 
            },
            APLICACAO: {
                NOME_REQUIRED: 'Nome requerido.',
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.',
                CLASSE_REQUIRED: 'Classe requerida.',
                CLASSE_MIN_LENGTH: 'A classe precisa ter no mínimo 2 caracteres.',
                CLASSE_MAX_LENGTH: 'A classe precisa ter no máximo 50 caracteres.'
            },
            EMPRESA: {
                NOME_REQUIRED: 'Nome requerido.',
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.'
            },
            RECUPERAR_SENHA: {
                EMAIL_REQUIRED: 'Informe o e-mail.',
                EMAIL_INVALID: 'Email inválido.'
            },
            ALTERAR_SENHA: {
                SENHA_ATUAL_REQUIRED: 'Informe a senha atual.',
                SENHA_ATUAL_MIN_LENGTH: 'A senha atual deve possuir no mínimo 6 caracteres.',
                SENHA_NOVA_REQUIRED: 'Informe a senha.',
                SENHA_NOVA_MIN_LENGTH: 'A senha deve possuir no mínimo 6 caracteres.',
                SENHA_CONFIRME_REQUIRED: 'Informe a senha novamente.',
                SENHA_CONFIRME_MIN_LENGTH: 'A senha deve possuir no mínimo 6 caracteres.',
                SENHA_CONFIRME_EQUAL_TO: 'As senhas não conferem.'
            },
            CONFIRM_EMAIL: {
                EMAIL_CONFIRMED_SUCCESS: 'E-mail confirmado com sucesso.'
            },
            USUARIO: {
                NOME_REQUIRED: 'Nome requerido.' ,
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.',
                CPF_CNPJ_REQUIRED: 'CPF/CNPJ requerido.',
                CPF_INVALID: 'CPF inválido.',
                CNPJ_INVALID: 'CNPJ inválido.',
                TIPO_USUARIO_REQUIRED: 'Tipo usuário requerido.',
                TIPO_PESSOA_REQUIRED: 'Tipo pessoa requerido.',
                EMAIL_REQUIRED: 'Informe o e-mail.',
                EMAIL_INVALID: 'Email invalido.' 
            }
        };

        this.routes = { 
            APLICACAO: {
                LISTAR: '/aplicacao/listar' },
            LOGIN: {
                ENTRAR: '/login/entrar' 
            },
            HOME: {
                INICIAL: '/home/inicial'
            }
        };

        this.titles = {
            SISTEMA: {
                TITLE: 'Cadastro Professores'
            }, 
            APLICACAO: {
                TITLE_UPDATE: 'Atualizar Aplicação',
                TITLE_NEW: 'Nova Aplicação',
                TITLE_LIST: 'Aplicações'
            },
            EMPRESA: {
                TITLE_UPDATE: 'Atualizar Empresa',
                TITLE_NEW: 'Nova Empresa',
                TITLE_LIST: 'Empresas'
            },
            ALTERAR_SENHA: {
                TITLE: 'Alterar Senha'
            },
            USUARIO: {
                TITLE: 'Cadastrar Usuário'
            },
            LOG: {
                TITLE: 'Log Sistema'
            },
            ICON:{
                NEW:'fa-plus-circle',
                EDIT: 'fa-edit'
            }
        };
    }
 }