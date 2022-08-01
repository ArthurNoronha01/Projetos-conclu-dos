class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo 
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        //this faz referência a 'despesa'
        //this[x], vai acessar o dado do objeto  é como se fosse    = this.ano (obtem o valor do dao ano), this.mes...
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd{
    constructor(){
            let id = localStorage.getItem('id')

            if(id === null){
                localStorage.setItem('id', 0)
            }
        }
    getProximoId(){
        //getItem(): vai servir para recuperar um determinado dado
        //se não houver o dado definido, vai retornar 'null'
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar = (d) =>{
        //setItem('exige dois parametros 1º a descrição do dado' e '2º é o dado, devendo ser convertido EM JSON'); setItem() vai servir para enviar um dado para o storage.
        //se a descricao do dado for a mesma, ele vai sobrepor a informação já registrada.
        // O JSON possibilita uma comunicação de dados com algo fora da aplicação(do código JS), por exemplo: para os dados do site "orçamento pessoal" possa ser dirigido para o armazenamento local storage se usa o JSON.
        //localStorage.setItem('Despesa', JSON.stringify(d))
        let id = this.getProximoId()
        //pega o valor retornado pela função próximo id e a adiciona no local storage com a descição Id e seu devido número
        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id )

        
    }

    remover(id){
        localStorage.removeItem(id)
    }

//função vai acessar o localStorage e recuperar todos os itens lá já cadastrados.
    recuperarTodosRegistros(){
        let despesas = []

        //varaivel id vai acessar os valores de 'id' de local storage(1, 2, 3 ...)
        let id = localStorage.getItem('id')
        //vai recuperar todos os dados do localStorage
        for(let i = 1; i <= id; i++){
            //vai recuperar os dados de acordo com seu posicionamento, 1, 2, 3, 4...
            //JSON.parse(): transforma o dado que anteriomente era um string JSON e se torna um objeto.
            let despesa = JSON.parse(localStorage.getItem(i))
            
            //selecione o array despesas e acrescenta os objetos.

            //antes do push, deve-se verificar se houve indíces (do local storage) que foi removido, ou seja, retornando null
             if(despesa == null){
            //     // o continue: vai 'pular' para a próxima interação do laço
                 continue
             }
             //cria um atributo novo 'id' e atribui a ele o valor de 'i'
                despesa.id = i
                despesas.push(despesa)
        }
            return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = []
        
        despesasFiltradas = this.recuperarTodosRegistros()
       
        //aplicação dos filtros a partir dos valores recuperados do array despesas
        //vai acessar o array despesasFiltradas e acessar o valor 'ano' e vai comparar com os dados do objeto 'despesa' que foi passado como parametro de outra função onde é evocado.

        //despesa.x vai representar os valores das caixas do consulta
        console.log(despesasFiltradas)
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.ano == despesa.ano)  
        }
        
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.mes == despesa.mes)  
        }

        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.dia == despesa.dia)  
        }

        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.tipo == despesa.tipo)  
        }
        
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.descricao == despesa.descricao)  
        }

        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.valor == despesa.valor)  
        }

        return despesasFiltradas
        }
       
}
        

let bd = new Bd()


cadastrarDespesas = () =>{
//seleção dos elmentos
    let inAno = document.getElementById('ano')
    let inMes = document.getElementById('mes')
    let inDia = document.getElementById('dia')

    let inTipo = document.getElementById('tipo')
    let inDescricao = document.getElementById('descricao')
    let inValor = document.getElementById('valor')

//seleção dos valores dos elementos.
    let ano = inAno.value 
    let mes = inMes.value 
    let dia = inDia.value 

    let tipo = inTipo.value 
    let descricao = inDescricao.value 
    let valor = inValor.value 

    let despesa = new Despesa(
        ano, mes, dia, tipo ,descricao, valor
    )
    //chama a classe 'bd' e aciona a funcção gravar()
    //se validarDados() retornar 'true', executa o gravar()
    if(despesa.validarDados()){
        bd.gravar(despesa)

        inAno.value = ''
        inMes.value = ''
        inDia.value = ''
        inTipo.value = ''
        inDescricao.value = ''
        inValor.value = ''
       alert('Registrado com sucesso.')
    }else{
        alert('Dados inválidos')
    }
    
}


carregaListaDespesas = (despesas = Array()) =>{
   if(despesas.length == 0){
    //vai apresentar todos os registros
    despesas = bd.recuperarTodosRegistros()
   }
    //vai receber o array de despesas; ou seja, os objetos já cadastrados, que foram recuperados do local storage

    //despesas, o array dessa função, recebe o outro array todos os objetos recuperados.
    //bd.recuperarTodosRegistros(): retorna um array com objetos
    
    //selecione o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    //percorrer o array despesas e listar/recuperar os seus valores
    despesas.forEach(function(d){
       
        //cria linhas baseadas na quantidade de elementos da função. cria Tr
        let linha = listaDespesas.insertRow()

        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break 
            case '3': d.tipo = 'Lazer'
                break 
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        if(d.mes < 10){
            d.mes = `0${d.mes}`
        }

        //cria uma coluna baseada na linha, devendo passar um parametro que se refere a posição da coluna. cria TD
        //através do 'innerHTML' será acrescido os valores do array
        //agora deve-se inserir valores nas linhas já criadas.
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$ ${d.valor}`
        //em cada linha haverá 4 colunas

        //alterar a exibição do tipo, trocar os 'números' pela nomeclatura 

        //criação do botão de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        //remete aos botões um valor correspondente as chaves/keys do local storage.
        btn.id = `${d.id}`
        btn.onclick = function() {
            //retorna o valor do 'id'

            let id = this.id
            bd.remover(id)

            window.location.reload()
            }
        linha.insertCell(4).append(btn)
        
        console.log(d)
    })
}

pesquisarDespesa = () =>{
    let ano = document.getElementById('ano').value 
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value 
    let descricao = document.getElementById('descricao').value 
    let valor = document.getElementById('valor').value

    //transofmar essas infos em objetos e cria o objeto despesa.
    let despesa = new Despesa(ano, mes,dia ,tipo ,descricao ,valor)
    
    let despesas = bd.pesquisar(despesa)

    this.carregaListaDespesas(despesas)
}
