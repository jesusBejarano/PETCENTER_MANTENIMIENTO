using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Proxy
{
    public class MaestrosProxyrest : ProxyBaseRest
    {
        public ConsultarTipoMantenimientoResponseDTO ConsultarTipoMantenimiento()
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarTipoMantenimiento"];
            var response = DeserializarJSON<string, ConsultarTipoMantenimientoResponseDTO>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ConsultarEstadoSolicitudResponseDTO ConsultarEstadoSolicitud()
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarEstadoSolicitud"];
            var response = DeserializarJSON<string, ConsultarEstadoSolicitudResponseDTO>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ConsultarSedeResponseDTO ConsultarSede()
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarSede"];
            var response = DeserializarJSON<string, ConsultarSedeResponseDTO>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
        public ConsultarAreaResponseDTO ConsultarArea()
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarArea"];
            var response = DeserializarJSON<string, ConsultarAreaResponseDTO>("", url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }
    }
}