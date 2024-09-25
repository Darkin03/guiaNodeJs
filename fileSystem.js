//const fs= require ('node:fs'); utilizacion con callbacks

//file system sincronico
/*
console.log('Leyendo el primer archivo') 
const text = fs.readFileSync('hola.txt', 'utf-8');
console.log(text);

console.log('Haciendo algo más')

console.log('Leyendo el segundo archivo') 
const text2 = fs.readFileSync('hola.txt', 'utf-8');
console.log(text2);
*/


//leyendo un archivo asincronico con callback

// console.log('Leyendo el primer archivo') 
// fs.readFile('hola.txt', 'utf-8',(err,text)=>{
//     console.log(text);
// });

// console.log('Haciendo algo más')

// console.log('Leyendo el segundo archivo') 
// fs.readFile('hola.txt', 'utf-8',(err,text)=>{
//     console.log(text);
// });

//leyendo un archivo asincronico con fs promises

// const fs= require ('node:fs/promises'); //utilizacion con promesas
// console.log('Leyendo el primer archivo') 
// fs.readFile('dialogo.txt', 'utf-8')
// .then(text=>{
//     console.log(text);
// });

// console.log('Haciendo algo más')

// console.log('Leyendo el segundo archivo') 
// fs.readFile('hola.txt', 'utf-8')
// .then(text=>{
//     console.log(text);
// })

//leyendo un archivo con fs aync await
const fs= require ('node:fs/promises'); //utilizacion con promesas

//IIFE
(
    async ()=>{
        console.log('Leyendo el primer archivo')
        const text = await fs.readFile('dialogo.txt', 'utf-8');
        console.log(text);
    }
)()