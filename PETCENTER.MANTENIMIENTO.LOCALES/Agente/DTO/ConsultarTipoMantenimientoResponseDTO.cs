using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class ConsultarTipoMantenimientoResponseDTO
    {
        public ConsultarTipoMantenimientoResponseDTO()
        {
            this.Result = new Result();
            this.TipoMantenimientoList = new List<TipoMantenimientoDTO>();
        }

        public Result Result { get; set; }
        public List<TipoMantenimientoDTO> TipoMantenimientoList { get; set; }
    }
}