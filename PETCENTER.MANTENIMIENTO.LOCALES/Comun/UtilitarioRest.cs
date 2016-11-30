using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Comun
{
    public class UtilitarioRest
    {
        //public static string DownloadRemoteImageFile(string uri, string fileName)
        //{
        //    DownloadImage di = DownloadRemoteImageFile_Aux(uri, fileName);
        //    return di.FileName;
        //}
        //public static DownloadImage DownloadRemoteImageFile_Aux(string uri, string fileName)
        //{
        //    DownloadImage di = new DownloadImage(uri, fileName);
        //    di.Download();
        //    return di;
        //}
        //public static string DownloadRemoteImageFile(string uri, string fileName, out string Imagen64Bits)
        //{
        //    DownloadImage di = DownloadRemoteImageFile_Aux(uri, fileName);
        //    Imagen64Bits = di.Get64Bits();
        //    return di.FileName;
        //}

        public Y DeserializarJSON<T, Y>(T request, string url, string GuidProceso = null, string GuidEvento = null, string soapAction = "", bool consultaSap = false)
        {
            object vnull = null;
            Y resultServicio = (Y)(vnull);

            //ManejadorLogEventos manejadorLogEventosMAPA = new ManejadorLogEventos();
            //ManejadorLogEventos manejadorLogEventosLOGERRORES = new ManejadorLogEventos();
            String Request = "";
            String Response = "";
            var flagTrazasServicioWCF = ConfigurationManager.AppSettings["FlagTrazasServicioWCF"];
            var flagTrazasServicioBrocker = ConfigurationManager.AppSettings["FlagTrazasServicioBrocker"];

            try
            {
                var RESTProxy = new MyWebClient();
                if (!string.IsNullOrEmpty(soapAction))
                {
                    RESTProxy.Headers["SOAPAction"] = soapAction;
                }
                RESTProxy.Headers["Content-type"] = "application/json";

                MemoryStream ms = new MemoryStream();
                Stream stream = ms;
                bool SeEjecutadeWeb = true;
                bool conrequest = true;
                if (request.ToString() == string.Empty)
                {
                    /*
                    try
                    {
                        stream = RESTProxy.OpenRead(url);
                        SeEjecutadeWeb = true;
                    }
                    catch
                    {
                        SeEjecutadeWeb = false;
                        ms = new MemoryStream(new UTF8Encoding().GetBytes(""));
                    }
                    conrequest = false;
                     */
                }
                else
                {

                    if (consultaSap)
                    {
                        Request = JsonConvert.SerializeObject(request, Formatting.None, new IsoDateTimeConverter() { DateTimeFormat = "dd.MM.yyyy" });// HH:mm:ss

                        ms = new MemoryStream(new UTF8Encoding().GetBytes(Request));
                        ms.Position = 0;
                    }
                    else
                    {
                        var serializerToUpload = new DataContractJsonSerializer(typeof(T));
                        serializerToUpload.WriteObject(ms, request);
                        ms.Position = 0;

                        Request = Encoding.UTF8.GetString(ms.ToArray());
                    }

                    if (consultaSap && flagTrazasServicioWCF == "S")
                    {
                        //manejadorLogEventosLOGERRORES.GuardarTrama2(manejadorLogEventosLOGERRORES.inicio, "REQUEST", url, Helper.LocalIPAddress(), Environment.UserName, Request);
                    }
                }

                if (SeEjecutadeWeb == false || conrequest == true)
                {
                    System.Net.ServicePointManager.Expect100Continue = false;
                    var dc = System.Text.Encoding.UTF8.GetString(RESTProxy.UploadData(url, "POST", ms.ToArray())).ToCharArray();
                    var data = System.Text.Encoding.UTF8.GetBytes(dc);

                    Stream stream_response;
                    stream_response = new MemoryStream(data);
                    stream_response.Position = 0;
                    var sr_response = new StreamReader(stream_response);
                    sr_response.ReadToEnd();

                    Response = Encoding.UTF8.GetString(data.ToArray());
                    if (consultaSap && flagTrazasServicioBrocker == "S")
                    {
                        //manejadorLogEventosLOGERRORES.Break();
                        //manejadorLogEventosLOGERRORES.GuardarTrama2(manejadorLogEventosLOGERRORES.fin, "RESPONSE", url, Helper.LocalIPAddress(), Environment.UserName, Response);

                    }
                    stream = new MemoryStream(data);
                }


                if (consultaSap)
                {
                    StreamReader sReader = new StreamReader(stream);
                    Response = sReader.ReadToEnd();

                    resultServicio = (Y)JsonConvert.DeserializeObject(Response, typeof(Y), new JsonSerializerSettings() { NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore });

                    //manejadorLogEventosMAPA.Break();
                    //if (flagTrazasServicioBrocker == "S")
                    //    manejadorLogEventosMAPA.GrabarLogMapaBD(manejadorLogEventosMAPA.inicio, manejadorLogEventosMAPA.fin, manejadorLogEventosMAPA.GetDuracion(), (manejadorLogEventosMAPA.GetDuracion() / 1000), Helper.LocalIPAddress(), "", "BROKER", url, Request, Response, "LOG_MAPA_BROKER", null, GuidProceso, null, GuidEvento);
                }
                else
                {
                    var obj = new DataContractJsonSerializer(typeof(Y));
                    resultServicio = (Y)obj.ReadObject(stream);

                    //manejadorLogEventosMAPA.Break();
                    //if (flagTrazasServicioWCF == "S")
                    //    manejadorLogEventosMAPA.GrabarLogMapaBD(manejadorLogEventosMAPA.inicio, manejadorLogEventosMAPA.fin, manejadorLogEventosMAPA.GetDuracion(), (manejadorLogEventosMAPA.GetDuracion() / 1000), Helper.LocalIPAddress(), "", "PROXY", url, Request, Response, "LOG_MAPA_WCF", null, GuidProceso, null, GuidEvento);
                }

            }
            catch (Exception ex)
            {
                //ManejadorExcepciones.PublicarExcepcion(ex, PoliticaExcepcion.Framework);

                //if (flagTrazasServicioBrocker == "S")
                //{
                //    manejadorLogEventosMAPA.Break();
                //    manejadorLogEventosMAPA.GrabarLogMapaBD(manejadorLogEventosMAPA.inicio, manejadorLogEventosMAPA.fin, manejadorLogEventosMAPA.GetDuracion(), (manejadorLogEventosMAPA.GetDuracion() / 1000), Helper.LocalIPAddress(), "", "PROXY", url, Request, ex.Message, "LOG_MAPA_WCF", null, GuidProceso, null, GuidEvento);
                //}
            }
            return resultServicio;
        }

        public static string LlamadaServiceWeb(string url, string soapAction = "")
        {

            //String Request = "";
            String Response = "";

            try
            {
                var RESTProxy = new MyWebClient();
                if (!string.IsNullOrEmpty(soapAction))
                {
                    RESTProxy.Headers["SOAPAction"] = soapAction;
                }
                RESTProxy.Headers["Content-type"] = "application/json";

                MemoryStream ms = new MemoryStream();
                //Stream stream = ms;
                //bool SeEjecutadeWeb = true;
                //bool conrequest = true;

                //try
                //{
                //    stream = RESTProxy.OpenRead(url);
                //    SeEjecutadeWeb = true;
                //}
                //catch
                //{
                //    SeEjecutadeWeb = false;
                //    ms = new MemoryStream(new UTF8Encoding().GetBytes(""));
                //}
                //conrequest = false;
                ms = new MemoryStream(new UTF8Encoding().GetBytes(""));

                //if (SeEjecutadeWeb == false || conrequest == true)
                //{
                RESTProxy.Headers[HttpRequestHeader.ContentType] = "application/xml; charset=iso-8859-1";
                Response = System.Text.Encoding.Default.GetString(RESTProxy.UploadData(url, "POST", ms.ToArray()));


                //}

                //StreamReader sReader = new StreamReader(stream);
                //Response = sReader.ReadToEnd();

            }
            catch (Exception ex)
            {
                //HelperEnviarCorreo.CrearLog("ERRO EN LA LLAMADA DEL SERIVICIO:" + ex.Message);
            }
            return Response;
        }


    }
}