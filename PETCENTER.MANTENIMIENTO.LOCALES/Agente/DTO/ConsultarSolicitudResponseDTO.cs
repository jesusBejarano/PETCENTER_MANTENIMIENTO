using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class ConsultarSolicitudResponseDTO : ResponsePaginacionBaseDTO
    {
        public ConsultarSolicitudResponseDTO()
        {
            this.Result = new Result();
            this.SolicitudList = new List<SolicitudDTO>();
        }
        public List<SolicitudDTO> SolicitudList { get; set; }
    }
}