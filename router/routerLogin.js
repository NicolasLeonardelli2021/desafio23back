const Router =require('koa-router');
let usuarios = require("../DB/usuarios")
//let {mongo_db} = require("../config");




const router = new Router({
    prefix: '/auth'
});

router.get('/', async ctx =>{
   await ctx.render('login')
})

router.get('/registro', async ctx =>{
    console.log('entro a registro')
    await ctx.render('registro')
 })

 router.get('/olvidar', async ctx =>{
    await ctx.render('logout')
 });



router.post('/login',async ctx => {
    let name = ctx.request.body.name;
        let password =ctx.request.body.password;

        
        if(name != "" && password !=""){
            let usuario = await usuarios.find({name:name,password:password})
            console.log(usuario)
            if(usuario==""){
                ctx.response.status = 404
                ctx.body = {
                status: 'error!',
                message: 'Usuario no encontrado'
                }
            }else{
            ctx.redirect("/productos");
            } 
        }else{
            ctx.response.status = 404
            ctx.body = {
            status: 'error!',
            message: 'Un Campo esta vacio'
        }
    }
    })

    router.post('/registro', async ctx=>{
        if (
            !ctx.request.body.name ||
            !ctx.request.body.password ||
            !ctx.request.body.email ||
            !ctx.request.body.imagen 
            ) {
            ctx.response.status = 400
            ctx.body = {
            status: 'error',
            message: 'Por favor ingrese todos los datos',
            }
            } else {
                const usuarioSave =new usuarios(ctx.request.body);
            usuarioSave.save();
            
            ctx.response.status = 201
            ctx.redirect("/auth ");
            }
           
    })

module.exports = router;
