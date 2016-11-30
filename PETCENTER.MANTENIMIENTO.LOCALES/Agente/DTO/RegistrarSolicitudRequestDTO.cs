using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class RegistrarSolicitudRequestDTO
    {
        public RegistrarSolicitudRequestDTO()
        {
            this.MantenimientoList = new List<MantenimientoListDTO>();
        }
        public int CodigoSolicitud { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public int Estado { get; set; }
        public int CodigoArea { get; set; }
        public int CodigoTipoMantenimiento { get; set; }
        public int CodigoSede { get; set; }
        public int CodigoEmpleado1 { get; set; }
        public string UsuarioRegistro { get; set; }
        public DateTime FechaHoraRegistro { get; set; }
        public string Accion { get; set; }

        public List<MantenimientoListDTO> MantenimientoList { get; set; }
    }
}