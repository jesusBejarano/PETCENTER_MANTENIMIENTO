using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class RegistrarSolicitudResponseDTO
    {
        public RegistrarSolicitudResponseDTO()
        {
            this.Result = new Result();
        }
        public Result Result { get; set; }
    }
}