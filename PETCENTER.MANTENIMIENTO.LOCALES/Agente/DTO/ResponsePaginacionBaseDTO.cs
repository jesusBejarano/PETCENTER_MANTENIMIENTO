using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO
{
    public class ResponsePaginacionBaseDTO
    {
        public Result Result { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
    }
}