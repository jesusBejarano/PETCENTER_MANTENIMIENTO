using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PETCENTER.MANTENIMIENTO.LOCALES.Comun
{
    public class ProxyBaseRest : IDisposable
    {
        public Y DeserializarJSON<T, Y>(T request, string url, string GuiProceso = null, string GuidEvento = null, bool consultaSap = false)
        {
            var utilitarioRest = new UtilitarioRest();
            return utilitarioRest.DeserializarJSON<T, Y>(request, url, GuiProceso, GuidEvento, consultaSap: consultaSap);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
        }
        ~ProxyBaseRest()
        {
            Dispose(false);
        }
    }
}