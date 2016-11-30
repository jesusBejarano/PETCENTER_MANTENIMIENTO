using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Proxy
{
    public class SolicitudProxyrest : ProxyBaseRest
    {
        public ConsultarSolicitudResponseDTO ConsultarSolicitud(ConsultarSolicitudRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlConsultarSolicitud"];
            var response = DeserializarJSON<ConsultarSolicitudRequestDTO, ConsultarSolicitudResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public RegistrarSolicitudResponseDTO RegistrarSolicitud(RegistrarSolicitudRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlRegistrarSolicitud"];
            var response = DeserializarJSON<RegistrarSolicitudRequestDTO, RegistrarSolicitudResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

        public ObtenerSolicitudResponseDTO ObtenerSolicitud(ObtenerSolicitudRequestDTO request)
        {
            var url = ConfigurationManager.AppSettings["UrlObtenerSolicitud"];
            var response = DeserializarJSON<ObtenerSolicitudRequestDTO, ObtenerSolicitudResponseDTO>(request, url);
            if (response == null)
                throw new Exception(string.Format("Problemas con el servicio: {0}", url));

            return response;
        }

    }
}