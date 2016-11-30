using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class ObtenerSolicitudResponseDTO
    {
        public ObtenerSolicitudResponseDTO()
        {
            this.Result = new Result();
            this.ListaMantenimientos = new List<MantenimientoDTO>();
        }
        public int CodigoSolicitud { get; set; }
        public string DescripcionSolicitud { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public int CodigoEstadoSolicitud { get; set; }
        public string DescripcionEstadoSolicitud { get; set; }
        public int CodigoArea { get; set; }
        public string DescripcionAreaSolicitud { get; set; }
        public int CodigoTipoMantenimiento { get; set; }
        public int CodigoSede { get; set; }
        public string DescripcionTipoMantenimiento { get; set; }
        public int CodigoEmpleadoRegistra { get; set; }
        public string NombreEmpleadoRegistra { get; set; }
        public int CodigoEmpleadoAprueba { get; set; }
        public string NombreEmpleadoAprueba { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public string UsuarioActualizacion { get; set; }
        public DateTime FechaHoraActualizacion { get; set; }
        public List<MantenimientoDTO> ListaMantenimientos { get; set; }
        public Result Result { get; set; }
    }
}