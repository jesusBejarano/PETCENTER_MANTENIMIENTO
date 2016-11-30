using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PETCENTER.MANTENIMIENTO.LOCALES.Agente.DTO;
using PETCENTER.MANTENIMIENTO.LOCALES.Comun;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Models
{
    public class ConsultaSolicitudModel
    {
        public int Codigo { get; set; }
        public string Estado { get; set; }
        public string FechaHoraCreacion { get; set; }
        public string TipoMantenimiento { get; set; }
        public string Sede { get; set; }
        public string Area { get; set; }
    }

    public class RequestBusquedaSolicitudViewModel
    {
        public ConsultaSolicitudRequestViewModel filtro { get; set; }
        public PaginacionDTO paginacionDTO { get; set; }

        public RequestBusquedaSolicitudViewModel()
        {
            filtro = new ConsultaSolicitudRequestViewModel();
            paginacionDTO = new PaginacionDTO();
        }
    }

    public class ConsultaSolicitudRequestViewModel
    {
        public int CodigoSolicitud { get; set; }
        public int CodigoTipoMantenimiento { get; set; }
        public DateTime FechaInicioFinal { get; set; }
        public DateTime FechaFinFinal { get; set; }
        public int Estado { get; set; }
        public int CodigoSede { get; set; }
        public int CodigoArea { get; set; }
        public string Descripcion { get; set; }
        //public string OrdenCampo { get; set; }
        //public string OrdenOrientacion { get; set; }
        //public int PaginaActual { get; set; }
        //public int NroRegistrosPorPagina { get; set; }
        //public int TotalRegistros { get; set; }
        //public int CantidadPaginas { get; set; }
    }
    public class ResponseBusquedaSolicitudViewModel
    {
        public List<ConsultaSolicitudModel> ListaSolicitud { get; set; }
        public int TotalRegistros { get; set; }
        public int CantidadPaginas { get; set; }
        public int NroPagina { get; set; }
        public Result Result { get; set; }

        public ResponseBusquedaSolicitudViewModel()
        {
            ListaSolicitud = new List<ConsultaSolicitudModel>();
            this.Result = new Result();
        }
    }

    public class BusquedaSolicitudIndexViewModel
    {
        public List<TipoMantenimiento> TipoMantenimiento { get; set; }
        public List<Estado> Estado { get; set; }
        public List<Sede> Sede { get; set; }
        public List<Area> Area { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public Result Result { get; set; }

       
    }
    public class TipoMantenimiento
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
    }
    public class Estado
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
    }
    public class Sede
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
    }
    public class Area
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
    }

    public class MantenimientoViewModel
    {
        public string id { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string FechaMantenimiento { get; set; }
        public string Descripcion { get; set; }
    }

    public class DetalleSolicitud
    {
        public int NumeroSolicitud { get; set; }
        public string FechaSolicitud { get; set; }
        public string CodigoTipoMantenimiento { get; set; }
        public string CodigoSede { get; set; }
        public string CodigoArea { get; set; }
        public string Descripcion { get; set; }
        public DetalleSolicitud()
        {
            ListaMantenimiento = new List<MantenimientoViewModel>();
            this.Result = new Result();
        }
        public List<MantenimientoViewModel> ListaMantenimiento { get; set; } 
        public Result Result { get; set; }
        
    }

    public class RegistrarSolicitud
    {
        public int NumeroSolicitud { get; set; }
        public string FechaSolicitud { get; set; }
        public string CodigoTipoMantenimiento { get; set; }
        public string CodigoSede { get; set; }
        public string CodigoArea { get; set; }
        public string Descripcion { get; set; }
        public RegistrarSolicitud()
        {
            ListaMantenimiento = new List<MantenimientoViewModel>();
            this.Result = new Result();
        }
        public List<MantenimientoViewModel> ListaMantenimiento { get; set; }
        public Result Result { get; set; }
    }
    public class RegistrarSolicitudResponseViewModel
    {
        public RegistrarSolicitudResponseViewModel()
        {
            this.Result = new Result();
        }
        public Result Result { get; set; }
    }
}