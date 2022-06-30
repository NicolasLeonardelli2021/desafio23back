const Koa = require('koa');
const koaBody = require('koa-body');
//var views = require('koa-views');
const path = require('path');
const render = require('koa-ejs');

const app = new Koa();

app.use(koaBody());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false 
})


let login = require('./router/routerLogin');
let productos = require('./router/routerProductos.js');
app.use(login.routes());
app.use(productos.routes());

const PORT = 8080
const server = app.listen(PORT,()=>{
    console.log(`Servidor Koa escuchando en el puerto http://localhost:${server.address().port}/auth`)
})
server.on('error',error => console.log('Error en Servidor Koa:',error))