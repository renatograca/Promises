// const arrayDeEstudantes = [
//   {
//     nome: 'Jhon Wick',
//     email: 'jhonwick@email.com',
//     notas: [5, 7, 8, 7],
//     media:0,
//   },
//   {
//     nome: 'Thomas Anderson',
//     email: 'thomas-anderson@email.com',
//     notas: [3,7,9,2],
//     media:0,
//   },
//   {
//     nome: 'Keanu Reeves',
//     email: 'keanu@email.com',
//     notas: [4,5,6,7],
//     media:0,
//   },
//   {
//     nome: 'Trinity',
//     email: 'trinity@email.com',
//     notas: [9,8,7,9],
//     media:0,
//   },
//   {
//     nome: 'Oraculo',
//     email: 'oraculo@email.com',
//     notas: [5,6,6,5],
//     media:0,
//   },

// ];

// const promiseStudent = new Promise((resolve, reject) => {
//   if(arrayDeEstudantes){
//     resolve(arrayDeEstudantes)
//   } else {
//     reject('Array de estudantes está vazio')
//   }
// });

// const verificaMedia = (estudantes) => {
//   const novoArrayDeEstudante = [];
//   estudantes.map(estudante =>{ 
//     estudante.media = estudante.notas.reduce((acc, cur)=>{
//       acc += cur; 
//       return acc;
//     }) / 4,
//     novoArrayDeEstudante.push(estudante)
//   });
//   return novoArrayDeEstudante;
// }

// const AprovadoOuNao = (estudante) =>{
//   return new Promise((resolve, reject) =>{
//     if(estudante.media >= 6){
//       resolve(`Parabéns! ${estudante.nome} você está aprovado.`)
//     } else {
//       reject(`Você não foi aprovado ${estudante.nome}, precisa estudar mais!`)
//     }
//   });
// }


// promiseStudent.then((res) => verificaMedia(res))
// .then((aprovados) => aprovados.forEach((estudante) => (AprovadoOuNao(estudante)
// .then((res) =>console.log(res))
// .catch((rej) => console.error(rej)))))


const chanceDeSucesso = new Promise((resolve, reject) =>{
  const numeroAleatorio = Math.floor(Math.random() * 11);
  if(numeroAleatorio > 5){
    resolve('Promise resolvida')
  } else {
    reject('Promise nao resolvida')
  }
});

chanceDeSucesso.then((resolve) => console.log(resolve))
.catch((reject) => console.error(reject))