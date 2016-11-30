using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class ConsultarAreaResponseDTO
    {
        public ConsultarAreaResponseDTO()
        {
            this.Result = new Result();
            this.AreaList = new List<AreaDTO>();
        }

        public Result Result { get; set; } 
        public List<AreaDTO> AreaList { get; set; }
    }
}