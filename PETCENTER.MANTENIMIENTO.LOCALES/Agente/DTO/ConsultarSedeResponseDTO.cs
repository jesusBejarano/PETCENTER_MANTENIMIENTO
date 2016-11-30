using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class ConsultarSedeResponseDTO
    {
        public ConsultarSedeResponseDTO()
        {
            this.Result = new Result();
            this.SedeList = new List<SedeDTO>();
        }
        public Result Result { get; set; }
        public List<SedeDTO> SedeList { get; set; }
    }
}