using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class MantenimientoListDTO
    {
        public int CodigoMantenimiento { get; set; }
        public string Nombre { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        //public int CodigoSolicitud { get; set; }
        //[DataMember(Order = 6)]
        // public int CodigoTipoMantenimiento {get; set;}
        //[DataMember(Order = 7)]
        // public int CodigoArea {get; set;}
        public string UsuarioCreacion { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public string Accion { get; set; }
    }
}