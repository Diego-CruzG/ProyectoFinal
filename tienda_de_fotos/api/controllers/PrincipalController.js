/**
 * PrincipalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    inicio: async (peticion, respuesta) => {

        let fotos = await Foto.find({activa: true})
        respuesta.view('pages/inicio', {fotos})
    },

    topVendidas: async (peticion, respuesta) => {

        //sails no soporta la ejecucion de queryes agrupados por lo cual
        //se envia un query directo al manejador de la base de datos
        let consulta = `
            SELECT
                titulo,
                contenido,
                COUNT ( * ) AS cantidad
            FROM
                orden_detalle
                INNER JOIN foto ON orden_detalle.foto_id = foto.ID
            GROUP BY
                titulo, contenido, foto_id
            ORDER BY
            COUNT ( * ) DESC
            LIMIT 10
            `
        
        // "[]" este espacio esta reservado para los parametros si hubiera dichos para sustituir
        await OrdenDetalle.getDatastore().sendNativeQuery(consulta, [], (errores, resultado) => {
            
            let fotos = resultado.rows
            respuesta.view ('pages/top_vendidas', {fotos})
        })
    }
};

