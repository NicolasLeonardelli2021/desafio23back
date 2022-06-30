const Router =require('koa-router');
const crypto = require('crypto')

const router = new Router({
    prefix: '/productos'
});

let productos =[
    {
        id: 1, titulo: 'mouse', precio: '300', url: '/productos/mouse.jpg'
    },
    {
        id: 2, titulo: 'teclado', precio: '500', url: '/productos/teclado.jpg'
    }

];

router.get('/', async ctx =>{
   /*  ctx.body ={
        status: 'success',
        message: productos
    } */
   await ctx.render('index',{
    array: productos
   })
})

router.post('/entry', async ctx=>{
    if (
        !ctx.request.body.titulo ||
        !ctx.request.body.precio ||
        !ctx.request.body.ruta
        ) {
            console.log(ctx.request.body)
        ctx.response.status = 400
        ctx.body = {
        status: 'error',
        message: 'Por favor ingrese todos los datos',
        }
        } else {
            let ids= crypto.randomBytes(10).toString("hex");
        const newProducto = productos.push({
        id: ids,
        titulo: ctx.request.body.titulo,
        precio: ctx.request.body.precio,
        url: ctx.request.body.url
        })
        ctx.response.status = 201
        console.log('Producto ingresado: ', ids  )
        ctx.redirect("/productos");
        }
       
})
module.exports = router;
