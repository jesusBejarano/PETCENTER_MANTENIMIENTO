using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class ConsultarEstadoSolicitudResponseDTO
    {
        public ConsultarEstadoSolicitudResponseDTO()
        {
            this.Result = new Result();
            this.EstadoSilicitudList = new List<EstadoSolicitudDTO>();
        }
        public Result Result { get; set; }
        public List<EstadoSolicitudDTO> EstadoSilicitudList { get; set; }
    }
}