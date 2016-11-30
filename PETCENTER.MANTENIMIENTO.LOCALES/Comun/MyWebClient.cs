using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Comun
{
    public class MyWebClient : WebClient
    {

        protected override WebRequest GetWebRequest(Uri address)
        {
            const int MinutoEnSegundo = 60;
            const int SegundoEnMilisegundos = 1000;
            string strmin = "2";//System.Configuration.ConfigurationManager.AppSettings["TimeOutWcfMinutos"];
            int Minutos = 3;//default
            if (Convert.ToString("" + strmin).Length > 0)
                Minutos = Convert.ToInt32(strmin);
            int timeOutMilisegundos = Minutos * MinutoEnSegundo * SegundoEnMilisegundos;

            HttpWebRequest request = (HttpWebRequest)base.GetWebRequest(address);
            request.KeepAlive = false;
            request.SendChunked = false;
            request.ReadWriteTimeout = timeOutMilisegundos;
            //request.ContinueTimeout = timeOutMilisegundos;
            request.ProtocolVersion = HttpVersion.Version10;
            request.Timeout = timeOutMilisegundos;
            return request;
        }
    }
}