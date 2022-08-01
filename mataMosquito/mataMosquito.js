var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

let criarMosquitoTempo = 1500

//search: vai pegar a url e mais especificamente tudo aquilo que estiver a direita da ?, inclusive a ?, assim, sendo possível pegar a dificuldade enviada através do código da index.html
let nivel = window.location.search
nivel = nivel.replace('?','')
if(nivel === 'normal'){
    criarMosquitoTempo = 1500
}else if(nivel === 'dificil'){
    criarMosquitoTempo = 1000
}else if(nivel === 'chucknorris'){
    criarMosquitoTempo = 550
}

redimensionarTela = () =>{
    altura = window.innerHeight 
    largura = window.innerWidth
    
    //console.log(altura, largura)
}

var cronometro = setInterval(function(){
    tempo--
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criarMosca)
        window.location.href = 'vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML = `${tempo}`
    }
    
},
1000)

posicaoRandom = () =>{
//remover o mosquito anterior, caso exista
//se for encontrado o id 'mosquito', retorna true e executa o código
if(document.getElementById('mosquito')){
    document.getElementById('mosquito').remove()

    if(vidas > 3){
        window.location.href = 'gameOver.html'
    }else{
        document.getElementById('v'+vidas).src ="imagens/coracao_vazio.png"
        vidas++
    }
}
//com o método math.random() se obtém um valor aleatório entre  0-1, sendo multiplicado pelo valor de largura e altura, se obtém um valor entre  0 e 0 valor de altura ou largura.
//método math.floor(), vai arredondar os valores da posicaox e y para baixo
let posicaoX = Math.floor(Math.random() * largura) - 90
let posicaoY = Math.floor(Math.random() * altura) - 90

posicaoX = posicaoX < 0 ? 0 : posicaoX
posicaoY = posicaoY < 0 ? 0 : posicaoY

//cria um elemento html img
let mosquito = document.createElement('img')
//acessa o elemento html img, acessa o seu atributo 'src' e atribui a ele um determinado valor
mosquito.src = 'imagens/mosca.png'
mosquito.className = tamanhoAleatorio() + ' ' +ladoAleatorio()
//acessa o elemento html mosquito, acessa o seu estilo, mas especificamente o left, atribui a ele o valor de posicaoX e especifica q esse valor será em px
mosquito.style.left = posicaoX + 'px'
mosquito.style.top = posicaoY + 'px'
mosquito.style.position = 'absolute'
mosquito.id = 'mosquito'
mosquito.onclick = function(){
    //this = vai fazer referência ao próprio elemento html(mosquito) que executa a função
    this.remove()
}
//esse método adiciona um 'filho' para o body, devendo especificar oq será criado no html, nesse caso, está sendo atribuido a var mosquito
document.body.appendChild(mosquito)
console.log(ladoAleatorio())
}

tamanhoAleatorio = () =>{
    let classe = Math.floor(Math.random() * 3)
    if(classe == 0){
        return 'mosquito1'
    }
    if(classe == 1){
        return 'mosquito2'
    }else{
        return 'mosquito3'
    }
}

ladoAleatorio = () =>{
    let classe =  Math.floor(Math.random() * 2)
    if(classe == 0){
        return 'ladoA'
    }else{
        return 'ladoB'
    }
}



