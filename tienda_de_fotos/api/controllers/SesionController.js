/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    registro: async (peticion, respuesta) => {
        respuesta.view('pages/registro')
    },
    
    procesarRegistro: async (peticion, respuesta) => {

        let cliente = await Cliente.findOne({ email: peticion.body.email })
        
        if (cliente) {

            peticion.addFlash('mensaje', 'Email duplicado')
            return respuesta.redirect('/registro')
        } else {

            let cliente = await Cliente.create({
                email: peticion.body.email,
                nombre: peticion.body.nombre,
                contrasena: peticion.body.contrasena,
                activo: true
            })

            peticion.session.cliente = cliente
            peticion.addFlash('mensaje', 'Cliente Registrado')
            return respuesta.redirect('/')
        }
    },

    inicioSesion: async (peticion, respuesta) => {
        respuesta.view('pages/inicio_sesion')
    },

    procesarInicioSesion: async (peticion, respuesta) => {

        let cliente = await Cliente.findOne({ email: peticion.body.email, contrasena: peticion.body.contrasena })
        
        if (cliente && cliente.activo) {

            peticion.session.cliente = cliente
            let carroCompra = await CarroCompra.find({ cliente: cliente.id })
            peticion.session.carroCompra = carroCompra

            //*//
            let listaDeseo = await ListaDeseo.find({ cliente: cliente.id })
            peticion.session.listaDeseo = listaDeseo
            
            peticion.addFlash('mensaje', 'Sesión Iniciada')
            return respuesta.redirect('/')

        } else if (cliente && !cliente.activo) {

            peticion.addFlash('mensaje', 'Cliente Desactivado. Consulte con el administrador del sitio')
            return respuesta.redirect('/inicio-sesion')
        } else {

            peticion.addFlash('mensaje', 'Email o contraseña invalidos')
            return respuesta.redirect('/inicio-sesion')
        }
        
    },

    cerrarSesion: async (peticion, respuesta) => {

        peticion.session.cliente = undefined
        peticion.addFlash('mensaje', 'Sesión Finalizada')
        return respuesta.redirect('/')
    }
};


