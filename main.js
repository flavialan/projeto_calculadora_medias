const form = document.getElementById('form-atividade');
//Fazer com que as linhas sejam adicionadas
let linhas = ''; //recebe uma string vazia. Deve ser global para nao ser resetada toda vez que o evento inicia
//Adicionar os emojis  - cria-se constantes globais
const imgAprovado = '<img src="./aprovado.png" alt="Emoji celebrando"/>'; 
const imgReprovado = '<img src="./reprovado.png" alt="Emoji decepcionado"/>'; 
//Criando arrays para receber as atividades e os valores inseridos pelo usuario
const atividades = []; //Array vazio
const notas = []; //Array vazio
//Adicionar o span customizado de aprovado e reprovado
const spanAprovado = '<span class = "resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class = "resultado reprovado">Reprovado</span>'
//Parametrizar a nota minima
const notaMinima = parseFloat(prompt("Digite a nota minima:")); //Ira receber a nota minima pelo usuario e transformar a string em numero

//Criar o evento submit
form.addEventListener('submit', function(e){
    e.preventDefault();

    //Chamada da funcao que insere os elementos no corpo da tabela
    adicionaLinha();

    //Chamada da funcao que atualiza a tabela
    atualizaTabela();

    //Chamada da funcao que calcula a media
    atualizaMediaFinal();

})

//Funcao criada para inserir os elementos no corpo da tabela
function adicionaLinha(){
    //Captura os campos da pagina
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    //Corrigir bug que permite que atividades com o mesmo nome sejam inseridas
    if (atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} ja foi inserida`);
    } else{
        //Faz um push dos valores recebidos pelo usuario para os arrays 
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value)); //transforma uma string em um valor numerico

        //Adicionar as informacoes atividade, nota e aprovacao no corpo da tabela como uma linha
        let linha = '<tr>'; //ira receber o codigo html como uma string
        linha += `<td>${inputNomeAtividade.value}</td>`; //cria a coluna na linha com o nome da atividade
        linha += `<td>${inputNotaAtividade.value}</td>`; //cria a segunda coluna na linha com a nota
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; //cria a terceira coluna na linha com o resultado
        linha += '</tr>'; //fecha a linha

        linhas += linha; //Adicioana a linha criada a linha existente
    }

    inputNomeAtividade.value = ''; //Limpa o campo apos submeter o valor
    inputNotaAtividade.value = '';
}

//Funcao criada para atualizar a tabela
function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody'); //recupera o corpo da tabela
    corpoTabela.innerHTML = linhas; //insere o conteudo da linha na tabela
}

//Funcao para atualizar a media final a partir dos valores inseridos pelo usuario
function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

} 

 //Funcao para calcular media
function calculaMediaFinal(){
    //Laco para calcular a media
     let somaDasNotas = 0; //a variavel foi inicializada com 0

    for (let i = 0; i < notas.length; i++){ //enquanto i for menor que a quantidade de notas inseridas pelo usuario
         somaDasNotas += notas[i];
      }
     //cria uma variavel media
     return somaDasNotas / notas.length;
  }