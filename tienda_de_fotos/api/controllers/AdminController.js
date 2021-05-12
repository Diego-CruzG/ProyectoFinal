/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path')
// la libreria fs permite trabajar con el sistema de archivos
const fs = require('fs')

module.exports = {
  
    inicioSesion: async (peticion, respuesta) => {

        respuesta.view('./pages/admin/inicio_sesion')
    },

    procesarInicioSesion: async (peticion, respuesta) => {

        let admin = await Admin.findOne({ email: peticion.body.email, contrasena: peticion.body.contrasena })
        
        if (admin && admin.activo) {

            //si un cliente inicia sesion como admin, la sesion admin sobreescribe la sesion cliente
            peticion.session.admin = admin
            peticion.session.cliente = undefined
            peticion.addFlash('mensaje', 'Sesión admin iniciada')
            return respuesta.redirect('/admin/principal')
        } else if (admin && !admin.activo){

            peticion.addFlash('mensaje', 'Usuario Desactivado. Consulte con el Administrador del sitio')
            return respuesta.redirect('/admin/inicio-sesion')
        } else {
            peticion.addFlash('mensaje', 'Email o contraseña invalidos')
            return respuesta.redirect('/admin/inicio-sesion')
        }
    },

    principal: async (peticion, respuesta) => {

        if (!peticion.session || !peticion.session.admin) {

            peticion.addFlash('mensaje', 'Sesión Inválida')
            return respuesta.redirect('/admin/inicio-sesion')
        }

        let fotos = await Foto.find()
        respuesta.view('./pages/admin/principal', {fotos})
    },

    cerrarSesion: async (peticion, respuesta) => {

        peticion.session.admin = undefined
        peticion.session.clienteId = undefined
        peticion.addFlash('mensaje', 'Sesión Finalizada')
        return respuesta.redirect('/')
    },

    agregarFoto: async (peticion, respuesta) => {

        if (!peticion.session || !peticion.session.admin) {

            peticion.addFlash('mensaje', 'Sesión Inválida')
            return respuesta.redirect('/admin/inicio-sesion')
        }

        respuesta.view('./pages/admin/agregar_foto')
    },

    procesarAgregarFoto: async (peticion, respuesta) => {

        let foto = await Foto.create({
            titulo: peticion.body.titulo,
            activa: false
        }).fetch()

        //DE peticion.file retorne todas las entradas tipo file que en este caso es tipo 'foto'
        //upload permite subir archivos desde el navegador 
        // EN el primer argumento se pueden especificar un maximo de archivos
        //El segundo argumento es una funcion que se llama cuando se suba el archivo
        peticion.file('foto').upload({}, async (error, archivos) => {
            
            if (archivos && archivos[0]) {

                //archivos[0] contiene el archivo que se cargo .fd (file descriptor) significa donde se subio el archivo ya que sails guarda
                //los archivos en una carpeta temporal
                let upload_path = archivos[0].fd
                //se toma la extension del archivo con la libreria path la cuar se debe importar se coloca en la parte superior
                let ext = path.extname(upload_path)

                //se copia desde la ruta original que lee el flujo de bytes y escribe este flujo en la ruta que se le indica
                //la ruta empieza a partir del directorio donde esta sails que es assets/images/fotos/
                await fs.createReadStream(upload_path).pipe(fs.createWriteStream(path.resolve(sails.config.appPath, `assets/images/fotos/img${foto.id}${ext}`)))

                await Foto.update({ id: foto.id }, { contenido: `img${foto.id}${ext}`, activa: true })
                
                peticion.addFlash('mensaje', 'Foto agregada')
                return respuesta.redirect('/admin/principal')
            }

            peticion.addFlash('mensaje', 'No hay foto seleccionada')
            return respuesta.redirect('/admin/agregar-foto')
        })
    },

    desactivarFoto: async (peticion, respuesta) => {
        await Foto.update({id: peticion.params.fotoId}, {activa: false})
        peticion.addFlash('mensaje', 'Foto desactivada')
        return respuesta.redirect("/admin/principal")
    },

    activarFoto: async (peticion, respuesta) => {
        await Foto.update({id: peticion.params.fotoId}, {activa: true})
        peticion.addFlash('mensaje', 'Foto activada')
        return respuesta.redirect("/admin/principal")
    },

    cliente: async (peticion, respuesta) => {

         if (!peticion.session || !peticion.session.admin) {

            peticion.addFlash('mensaje', 'Sesión Inválida')
            return respuesta.redirect('/admin/inicio-sesion')
         }
        
        let clientes = await Cliente.find()
        respuesta.view('./pages/admin/cliente', { clientes })
    },

    ordenesCliente: async (peticion, respuesta) => {

        if (!peticion.session || !peticion.session.admin) {

            peticion.addFlash('mensaje', 'Sesión Inválida')
            return respuesta.redirect('/admin/inicio-sesion')
         }    
        
        peticion.session.clienteId = peticion.params.clienteId
        let ordenes = await Orden.find({ cliente: peticion.params.clienteId }).sort('id desc')
        
        respuesta.view('pages/mis_ordenes', { ordenes })
    },

    detalleOrden: async (peticion, respuesta) => {

        if (!peticion.session || !peticion.session.admin) {

            peticion.addFlash('mensaje', 'Sesión Inválida')

            return respuesta.redirect('/admin/inicio-sesion')
        }
        
        let orden = await Orden.findOne({ cliente: peticion.session.clienteId, id: peticion.params.ordenId }).populate('detalles')
        
        if (!orden) {

            return respuesta.redirect('/admin/cliente')
        }

        if (orden && orden.detalles == 0) {
            
            return respuesta.view('pages/orden', { orden })
        }

        orden.detalles = await OrdenDetalle.find({ orden: orden.id }).populate('foto')
        return respuesta.view('pages/orden', { orden })
    },

    desactivarCliente: async (peticion, respuesta) => {
        await Cliente.update({id: peticion.params.clienteId}, {activo: false})
        peticion.addFlash('mensaje', 'Cliente desactivado')
        return respuesta.redirect("/admin/cliente")
    },

    activarCliente: async (peticion, respuesta) => {
        await Cliente.update({id: peticion.params.clienteId}, {activo: true})
        peticion.addFlash('mensaje', 'Cliente activado')
        return respuesta.redirect("/admin/cliente")
    },

    administrador: async (peticion, respuesta) => {

        if (!peticion.session || !peticion.session.admin) {

            peticion.addFlash('mensaje', 'Sesión Inválida')
            return respuesta.redirect('/admin/inicio-sesion')
         }
        
        let administradores = await Admin.find()
        respuesta.view('./pages/admin/admin', { administradores })
    },

    desactivarAdmin: async (peticion, respuesta) => {
        await Admin.update({id: peticion.params.adminId}, {activo: false})
        peticion.addFlash('mensaje', 'Administrador desactivado')
        return respuesta.redirect("/admin/administrador")
    },

    activarAdmin: async (peticion, respuesta) => {
        await Admin.update({id: peticion.params.adminId}, {activo: true})
        peticion.addFlash('mensaje', 'Administrador activado')
        return respuesta.redirect("/admin/administrador")
    },

    dashboard: async (peticion, respuesta) => {

        if (!peticion.session || !peticion.session.admin) {

            peticion.addFlash('mensaje', 'Sesión Inválida')
            return respuesta.redirect('/admin/inicio-sesion')
         }

        let clientes = await Cliente.find()
        let fotos = await Foto.find()
        let ordenes = await Orden.find()
        let administradores = await Admin.find()

         let dashboard = {
            cliente: clientes.length,
            foto: fotos.length,
            orden: ordenes.length,
            admin: administradores.length
        }

        respuesta.view('./pages/admin/dashboard', { dashboard })
    }

};

