using System.Web;
using System.Web.Mvc;

namespace PETCENTER.MANTENIMIENTO.LOCALES
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}