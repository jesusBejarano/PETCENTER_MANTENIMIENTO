using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using PETCENTER.MANTENIMIENTO.LOCALES.Agente.BL;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;
using PETCENTER.MANTENIMIENTO.LOCALES.Filters;
using PETCENTER.MANTENIMIENTO.LOCALES.Models;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Controllers
{

    public class SolicitudController : Controller
    {
        //
        // GET: /Solicitud/

        public ActionResult Index()
        {
            ActionResult actionResult = null;
            var busquedaSolicitud = new BusquedaSolicitudIndexViewModel();
            var agenteSolicitud = new SolicitudAgente();;
            try
            {

                busquedaSolicitud.TipoMantenimiento = agenteSolicitud.ObtenerTipoMantenimiento();
                busquedaSolicitud.Estado = agenteSolicitud.ObtenerEstados();
                busquedaSolicitud.Area = agenteSolicitud.ObtenerArea();
                busquedaSolicitud.Sede = agenteSolicitud.ObtenerSede();
                busquedaSolicitud.FechaInicio = string.Format("{0:dd/MM/yyyy}", DateTime.Now.AddDays(-30));
                busquedaSolicitud.FechaFin = string.Format("{0:dd/MM/yyyy}", DateTime.Now);

                actionResult = Content(JsonConvert.SerializeObject(busquedaSolicitud));
            }
            catch (Exception ex)
            {
                var msj = ex.Message;
            }
            return actionResult;
        }

        public ActionResult ObtenerSolicitudes(ConsultaSolicitudRequestViewModel request)
        {
            ActionResult actionResult = null;
          

            var responseViewModel = new ResponseBusquedaSolicitudViewModel();
            responseViewModel.ListaSolicitud = new SolicitudAgente().BusquedaReclamos(request);
            //var listaRespuesta = responseViewModel;
            //var totalPages = int.Parse("" + Math.Ceiling(Convert.ToDouble(listaRespuesta.TotalRegistros)/10));
            //var res = Grid.toJSONFormat2(listaRespuesta.ListaSolicitud, 1, listaRespuesta.TotalRegistros, totalPages,
            //    "Codigo");
            actionResult = Content(JsonConvert.SerializeObject(responseViewModel));
            return actionResult;
        }

        public ActionResult ObtenerDetalleSolicitud(int  codigoSolicitud)
        {
            ActionResult actionResult = null;
            var responseViewModel = new SolicitudAgente().ObtenerDetalleSolicitud(codigoSolicitud);
            actionResult = Content(JsonConvert.SerializeObject(responseViewModel));
            return actionResult;
        }
        public ActionResult RegistrarSolicitud(string request)
        {
            ActionResult actionResult = null;
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            var datos = jsonSerializer.Deserialize<RegistrarSolicitud>(request);
            var responseViewModel = new SolicitudAgente().RegistrarSolicitud(datos);
            actionResult = Content(JsonConvert.SerializeObject(responseViewModel));
            return actionResult;
        }
        public ActionResult DeshabilitarSolicitud(string request)
        {
            ActionResult actionResult = null;
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            var datos = jsonSerializer.Deserialize<RegistrarSolicitud>(request);
            var responseViewModel = new SolicitudAgente().DeshabilitarSolicitud(datos);
            actionResult = Content(JsonConvert.SerializeObject(responseViewModel));
            return actionResult;
        }
        public ActionResult ActualizarSolicitud(string request)
        {
            ActionResult actionResult = null;
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            var datos = jsonSerializer.Deserialize<RegistrarSolicitud>(request);
            var responseViewModel = new SolicitudAgente().ActualizarSolicitud(datos);
            actionResult = Content(JsonConvert.SerializeObject(responseViewModel));
            return actionResult;
        }

        public ActionResult ConsultaSolicitud()
        {
            ViewBag.Message = "Modifique esta plantilla para poner en marcha su aplicación ASP.NET MVC.";

            return View();
        }
        public ActionResult RegistroSolicitud()
        {
            ViewBag.Message = "Modifique esta plantilla para poner en marcha su aplicación ASP.NET MVC.";

            return View();
        }
        public ActionResult AgregarMantenimiento()
        {
            ViewBag.Message = "Modifique esta plantilla para poner en marcha su aplicación ASP.NET MVC.";

            return View();
        }
    }
}
