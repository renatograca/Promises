# Entendendo as Promises

- #####  O que vamos aprender?

  A momentos em que para uma função fazer sua funcionalidade, precisamos esperar um retorno de outra função (Nossas queridas Callbacks), mas este retorno pode acabar demorando um pouco, então surgiu as Promises, que são promessas de uma resposta, assim podemos trabalhar melhor de forma assíncrona os nossos códigos.

  

- ##### Você será capaz de:

  - Fazer Promises e como utilizar seus retornos.
  -  Fazer encadeamento de Promises com then e catch.

- ##### Porque isso é importante?

  Promises se tornaram um padrão de desenvolvimento de funções assíncronas, precisamos usar funções assíncronas por um simples motivo, imagine que você tenha uma função que leva alguns segundos para concluir, se ela não for uma função assíncrona irá travar o resto do seu código até ele ser concluído, por exemplo, quando vamos fazer uma requisição para uma API, ou até mesmo quando precisamos de retornos de funções diferentes para assim conseguirmos executar outra função, de início parece confuso, mas bora pro conteúdo que eu te explico. Conteúdos

  - Promises

    As promises são uma promessa, elas definem uma ação que vai ser executada no futuro, e te garante um retorno(uma resposta), se ela cumprir a promessa(resolve) ou não cumprir(error), sendo assim, enquanto esperamos por esta resposta o javascript pode executar outra função, isso nos permite executarmos duas ou mais funções em simultâneo, vamos começar entendendo os retornos `resolve` e `reject`

    

    ```javascript
    const areYouStudent = () => {
        let student = true;
        if(student === true){
            resolvePromise()
        } else {
            errorPromise()
        }
    }
    function resolvePromise(){
        console.log('Sim! Você é um estudante o/')
    }
    function errorPromise(){
        console.log('Hum..., você não é um estudante, desculpe')
    }
    
    areYouStudent();
    // Altere a variavel student para false e veja o retorno
    // let student = false;
    
    ```

    

    Vamos olhar esta função mais de perto.

    Criamos uma função que se chama `areYouStudent` ela verifica se você é um estudante, se for `true` , a função vai te trazer  `resolvePromise`, com uma resposta: `Sim! Você é um estudante o/` se o `student` for `false` então a função `errorPromise` ira te trazer a mensagem `Hum..., você não é um estudante, desculpe` e assim são as promises, nos fazemos requisições a promises pedindo algo, e ela nos da retorno se deu certo(resolve) ou errado(reject).

     Agora veremos com uma Promise, para você ver como funciona.

    

    ```javascript
    const areYouStudent = new Promise((resolve, reject) =>{
        let student = true;
        if(student === true){
            resolve('Sim! você é um aluno o/')
        } else {
            reject('Hum..., você não é um aluno, desculpe')
        }
    })
    
    areYouStudent.then(aluno => console.log(aluno))
    .catch(aluno => console.error(aluno))
    // Altere a variavel student para false e veja o retorno
    // let student = false;
    ```

    

    Agora que definimos nossa função `areYouStudent` como uma promise, atribuindo-lhe `new Promise`  que recebe como valor uma callback que tem dois parametros `resolve` e `reject`  caso a requisição a sua promise seja bem sucedida retorna `resolve` caso falhe `reject`.

    Você deve ter reparado que agora ao chamarmos a função `areYouStudent` colocamos um `.then` ao final, isso porque a  `areYouStudent` retorna uma promessa e o `.then` (resolved) ele espera o retorno desta promessa para então executar, o `.catch`(error) será executado caso tenha algum problema ou falha na sua promise, caso não esteja entendendo, não se preocupe veremos mais explicações ao decorrer do conteúdo.

    Estados de uma promise

    - Pending: O estado inicial da Promise, ela foi iniciada, mas ainda não foi realizada nem rejeitada.
    - Resolved: Sucesso da operação, é o que chamamos de uma Promise realizada.
    - Rejected: Falha da operação, é o que chamamos de uma Promise rejeitada.

    exercicío de fixação:

    1. Crie uma promise com chances de sucesso e falha, faça uma variável que faça um número aleatório de 0 a 10.

    2. Se o número da variável for maior que 5, então sua promise traz o resolve se não o reject.

       - Gabarito

         ```javascript
         const chanceDeSucesso = new Promise((resolve, reject) =>{
           const numeroAleatorio = Math.floor(Math.random() * 10);
           if(numeroAleatorio > 5){
             resolve('Promise resolvida')
           } else {
             reject('Promise nao resolvida')
           }
         });
         
         chanceDeSucesso.then((resolve) => console.log(resolve))
         .catch((reject) => console.error(reject))
         ```

         

  - then e catch

    Vamos entender o encadeamento de uma Promise com then e catch, é muito importante para entendermos o que está acontecendo, cada forma que encadeamos nossas requisições, vamos ter resultados diferentes.

    ```javascript
  // Ambos os callbacks estão ligados a areYouStudent
    const youAreStudent = new Promise((resolve, reject) =>{
    let student = true;
      if(student === true){
          resolve('Sim! você é um aluno o/')
      } else {
          reject('Hum..., você não é um aluno, desculpe')
    }
    })
    youAreStudent.then((res) => console.log(res), (rej) => console.error(rej))
    
    // Isto aqui é a mesma coisa
    new Promise((resolve, reject) => { 
      let student = false;
      if(student === true){
          resolve('Sim! você é um aluno o/')
      } else {
          reject('Hum..., você não é um aluno, desculpe')
      }}).then((res) => console.log(res), (rej) => console.error(rej))
    ```
    
    
    
    Quando fazemos isto, estamos ligando tanto o bloco `then` quanto o `catch` na mesma Promise `areYouStudent` , perceba que estamos passando dois parâmetros para a função `then`,  ou então diretamente na Promise criada no segundo caso, não há diferenças. Vamos ter este gráfico
    
    ![thenCatch (1)](/home/mequi/summerJob/imagensPromises/thenCatch (1).png)

  Porem caso ocorra um erro no `.then`, o `.catch` não vai conseguir capturar por não estar ligado ao `.then` , vamos ver este exemplo para entender.

  ```javascript
  const media = 6;
  
  const primeiraProva = (media) => {
    return new Promise((resolve, reject) => {
      if(media >= 7){
        resolve(() => { 
        console.log('Parabéns! Passou na primeira')
        return {media,}
        })
      } else {
        reject('Não passou na Primeira')
      }
    });
  }
  
  const passou = new Promise((resolve, reject) =>{
    const student = true;
      if (student){
      resolve('O aluno fez a prova')
    }else {
        reject('O aluno não fez a prova');
      }
    })
  
  passou.then((resolve) => {
    console.log(resolve);
    console.log('Primeira prova');
    return primeiraProva(media)
  })
  passou.catch((reject) => console.error(reject))
  ```

  Desta forma ao executarmos o código, veremos um erro no `terminal` **triggerUncaughtException(err, true /* fromPromise */);** , este erro acontece, porque o `.catch` não está ligado ao `.then`, e o mesmo da erro, por isso colocamos o `.catch` sempre ao final. 

  ![thenSeparado](/home/mequi/summerJob/imagensPromises/thenSeparado.png)

   Vamos ultilizar o `.catch` ao final do `.then` 

  ```javascript
  const media = 6;
  
  const primeiraProva = (media) => {
    return new Promise((resolve, reject) => {
      if(media >= 7){
        resolve(() => { 
        console.log('Parabéns! Passou na primeira')
        return {media,}
        })
      } else {
        reject('Não passou na Primeira')
      }
    });
  }
  
  const passou = new Promise((resolve, reject) =>{
    const student = true;
      if (student){
      resolve('O aluno fez a prova')
    }else {
        reject('O aluno não fez a prova');
      }
    })
  
  passou.then((resolve) => {
    console.log(resolve);
    console.log('Primeira prova');
    return primeiraProva(media)
  }).catch((reject) => console.error(reject))
  ```

  Agora não temos mais erro, isso porque o `.catch` está tratando o erro da Promise `passou` e do `.then`. 

  

  ![catch](/home/mequi/summerJob/imagensPromises/catch.png)

  No exemplo abaixo vamos encadear 2 `.then` a nossa Promise e vamos colocar o `.catch` ao final

  ```javascript
  const media = 6;
  const primeiraProva = (media) => {
    return new Promise((resolve, reject) => {
      if(media >= 7){
        resolve(() => { 
        console.log('Parabéns! Passou na primeira')
        return {media,}
        })
      } else {
        reject('Não passou na Primeira')
      }
    });
  }
  const segundaProva = (media) => {
    return new Promise((resolve, reject) => {
      if(media >= 6){
        resolve(()=> console.log('Parabéns! Passou na segunda'))
      } else {
        reject('Não passou na segunda')
      }
    })
  }
  
  const passou = new Promise((resolve, reject) =>{
    const student = true;
      if (student){
      resolve('O aluno fez a prova')
    }else {
        reject('O aluno não fez a prova');
      }
    })
  
  passou
  .then(() => {
    console.log('Primeira prova');
    return primeiraProva(media)
  })
  .then(() => {
    console.log('Segunda prova');
    return segundaProva(media)
  })
  .catch((reject) => console.error(reject))
  ```

  Veja que, ao não passar na `PrimeiraProva`,  nosso `.catch` já capturou o erro e parou a execução da nossa  `segundaProva`, ou seja, ele verifica se todas as promises estão passando, caso a primeiraProva passasse, mas a segundaProva não, ele também conseguiria pegar este erro.

  

  ![dolble](/home/mequi/summerJob/imagensPromises/dolble.png)

  Podemos também tratar o erro para cada requisição que fizermos.

  ```javascript
  const media = 6;
  const primeiraProva = (media) => {
    return new Promise((resolve, reject) => {
      if(media >= 7){
        resolve(() => { 
        console.log('Parabéns! Passou na primeira')
        return {media,}
        })
      } else {
        reject('Não passou na Primeira')
      }
    });
  }
  const segundaProva = (media) => {
    return new Promise((resolve, reject) => {
      if(media >= 6){
        resolve(()=> console.log('Parabéns! Passou na segunda'))
      } else {
        reject('Não passou na segunda')
      }
    })
  }
  
  const passou = new Promise((resolve, reject) =>{
    const student = true;
      if (student){
      resolve('O aluno fez a prova')
    }else {
        reject('O aluno não fez a prova');
      }
    })
  
  passou
  .then(() => {
    console.log('Primeira prova');
    return primeiraProva(media)
  })
  .catch((reject) => console.error(reject))
  .then(() => {
    console.log('Segunda prova');
    return segundaProva(media)
  })
  .then((resolveSecond) => resolveSecond())
  .catch((reject) => console.error(reject))
  ```

  Veja que, mesmo após não passar na `primeiraProva`, continuou sendo executado, podemos usar este método quando precisamos que mesmo após a primeira requisição falhar ela continue seguindo para as próximas requisições.

  ![thenentaocatch](/home/mequi/summerJob/imagensPromises/thenentaocatch.png)

  Podemos ficar falando sobre Promises um ano inteiro, mas para entendermos mesmo como elas funcionam precisamos por a mão na massa, bora pros exercícios?!

- ##### Exercícios

  - ### Os exercicios vão seguir uma ordem, onde para fazer o exercicio 2 você precisa fazer o exercicio 1.

    1. Crie uma promise que ao ser requisitada, traga uma lista com informações sobres as pessoas estudantes de um curso,  a lista já está pronto só copiar e colar no Editor de Código.

       ```javascript
       const arrayDeEstudantes = [
         {
           nome: 'Jhon Wick',
           email: 'jhonwick@email.com',
           notas: [5,7,8,7],
           media:0,
         },
         {
           nome: 'Thomas Anderson',
           email: 'thomas-anderson@email.com',
           notas: [3,7,9,2],
           media:0,
         },
         {
           nome: 'Keanu Reeves',
           email: 'keanu@email.com',
           notas: [4,5,6,7],
           media:0,
         },
         {
           nome: 'Trinity',
           email: 'trinity@email.com',
           notas: [9,8,7,9],
           media:0,
         },
         {
           nome: 'Oraculo',
           email: 'oraculo@email.com',
           notas: [5,6,6,5],
           media:0,
         },
       
       ];
       ```

       2. Crie uma função que tire a média das notas de um estudante e adicione este valor na média de cada estudante.
       3. Crie outra Promise que se a média do aluno e igual ou maior que 6, mostre uma mensagem "Parabéns! `estudante` você está aprovado(a).", se não "Você não foi aprovado(a) `estudante`, precisa estudar mais!", tem que retornar a mensagem de cada estudante.

- ##### Recursos Adicionais

  [Exercício fácil: Usando Promises](https://www.mundojs.com.br/2020/03/06/exercicio-facil-usando-promises/)

  [Promise developer](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)

  [Trabalhando Com Promises Em Javascript](https://blog.matheuscastiglioni.com.br/trabalhando-com-promises-em-javascript/)

  ### Gabaritos

  1. Gabarito exercício 1

     

     ```javascript
     const promiseDeEstudantes = new Promise((resolve, reject) => {
       if(arrayDeEstudantes) {
         resolve(arrayDeEstudantes)
       } else {
         reject('Array de estudantes não existe')
       }
     });
     promiseDeEstudantes.then((resolve) => console.log(resolve))
     .catch((reject) => console.error(reject))
     ```

  2. Gabarito exercício 2

     ```javascript
     const promiseDeEstudantes = new Promise((resolve, reject) => {
       if(arrayDeEstudantes) {
         resolve(arrayDeEstudantes)
       } else {
         reject('Array de estudantes não existe')
       }
     });
     const verificaMedia = (estudantes) => {
       const novoArrayDeEstudante = [];
       estudantes.map(estudante =>{ 
         estudante.media = estudante.notas.reduce((acc, cur)=>{
           acc += cur; 
           return acc;
         }) / 4,
         novoArrayDeEstudante.push(estudante)
       });
       return novoArrayDeEstudante;
     };
     promiseDeEstudantes.then((resolve) => console.log(verificaMedia(resolve)))
     .catch((reject) => console.error(reject))
     ```

     No vídeo eu falei que o `forEach` não funcionava por não ter retorno, mas falei errado, não foi esse o motivo de não ter funcionado, acabou que eu escrevi foreach e não `forEach`.

  3. Gabarito exercício 3

     ```javascript
     const promiseDeEstudantes = new Promise((resolve, reject) => {
       if(arrayDeEstudantes) {
         resolve(arrayDeEstudantes)
       } else {
         reject('Array de estudantes não existe')
       }
     });
     
     const verificaMedia = (estudantes) => {
       const novoArrayDeEstudantes = [];
       estudantes.map((estudante) => {
         estudante.media = estudante.notas.reduce((acc, cur) => {
           acc += cur
           return acc
         }) / 4
         novoArrayDeEstudantes.push(estudante)
       });
       return novoArrayDeEstudantes;
     }
     
     const aprovadoOuNao = (estudante) => {
       return new Promise((resolve, reject) => {
         if (estudante.media >= 6){
           resolve(`Parabéns ${estudante.nome} você está aprovado.`)
         } else {
           reject (`Você não foi arpovado ${estudante.nome}, precisa estudar mais!`)
         }
       });
     }
     
     
     
     promiseDeEstudantes.then((resolve) => verificaMedia(resolve))
     .then((resolve) => resolve.forEach((estudante) => aprovadoOuNao(estudante)
     .then((resolve) => console.log(resolve))
     .catch((reject) => console.error(reject))))
     .catch((reject) => console.error(reject))
     ```

     