using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Comun
{
    public class Result
    {
        /// <summary>
        /// <br/><b>Tipo:</b> Result()
        /// </summary>
        public Result()
        {
            this.Satisfactorio = false;
            this.CodigoError = "";
            this.Mensaje = "";
            this.Mensajes = new List<Result>();
            this.IdError = new Guid();
        }

        public Object Data { get; set; }

        /// <summary>
        /// Describe si el resultado fue satisfactorio [Verdarero | Falso] 
        /// </summary>
        public bool Satisfactorio { get; set; }

        /// <summary>
        /// Describe el código de error de negocio
        /// </summary>
        public string CodigoError { get; set; }

        /// <summary>
        /// Describe el mensaje de error 
        /// </summary>
        public string Mensaje { get; set; }

        /// <summary>
        /// Describe el Identificador del error
        /// </summary>
        public Guid IdError { get; set; }

        /// <summary>
        /// Contiene una coleccion del tipo List que contiene descripcion de errores adicionales
        /// </summary>
        public List<Result> Mensajes { get; set; }
    }
}