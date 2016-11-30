var PORTAL = {};
var numfilas=15;

(function ($) {


	
    PORTAL = { 
      		
               init: function () {
              
                          $this = this;
              
                          $this.slick();
                          if($this.tabControls!==undefined)
                          {
                          	$this.tabControls();
                          }
                 		 // $(window).on("resize", $.proxy(this.resize, this)).trigger('resize');
                      }
      		,
            slick: function () {
                if ($('.autoplay').length > 0) {
                    $('.autoplay').slick({
                        centerMode: true,
                          centerPadding: '150px',
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          /*variableWidth: true,*/
                          autoplay: true,
                          autoplaySpeed: 8000,
                          focusOnSelect: true,
                          dots: true,
                          responsive: [
                            {
                                breakpoint: 768,
                                settings: {
                                   centerPadding: '20px',
                                    arrows: false,
                                    centerMode: true,
                                    slidesToShow: 1,slidesToShow: 1,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                   centerPadding: '2px',
                                    arrows: false,
                                    centerMode: true,
                                    slidesToShow: 1,slidesToShow: 1,
                                }
                            }
                          ]
    
    
    
                        //    slidesToShow: 3,
                        //slidesToScroll: 3,
                        //autoplay: true,
                        //autoplaySpeed: 2000,
                        ////cssEase: 'linear',
                        //dots: true,
                        ////infinite: true,
                        ////fade: true,
                        ////slidesToShow: 1,
                        //centerMode: true,
                        //variableWidth: true,
                        ////cssEase: 'linear',
    
                        //adaptiveHeight: true,
                        //responsive: [
                        //{
                        //    breakpoint: 768,
                        //    settings: {
                        //        arrows: false,
                        //        centerMode: true,
                        //        centerPadding: '40px',
                        //        slidesToShow: 3
                        //    }
                        //},
                        //{
                        //    breakpoint: 480,
                        //    settings: {
                        //        arrows: false,
                        //        centerMode: true,
                        //        centerPadding: '40px',
                        //        slidesToShow: 1
                        //    }
                        //}
                        //]
                    });
                }
    
            }
            ,
          
            resize: function () {

            var ww = $(window).width();
            var wh = $(window).height();


            var highlights = $(".highlights-container");
            var centro = $("#centroPagina");
            var header = $("#header");
            var footer = $("#footer");
            var menu = $(".menu");
            var anchoSlide = $(".anchoSlide");
            var anchoFrm = $(".anchoFrm");
            var frm = $("#idfrm");
            var centradoprincipalTitulo = $(".centradoprincipalTitulo");
            var centradoprincipal = $(".centradoprincipal");
            //Centro
            if (centro.length > 0) {

                var h_header = header.height() + 2;
                var h_menu = menu.height() + 2;
                var fh = footer.height() + 35;


                var nsh = wh - (h_header + h_menu + fh);

                ////////////////////////////////////////

                var min_h = 320;
                if (wh == 480) {
                    min_h = 480;
                } else if (wh == 320) {
                    min_h = 320;
                }

                if (nsh < min_h) {
                    nsh = min_h;
                }

                centro.css({
                    height: nsh
                });
            }

          
            if (ww < 670) {
                anchoSlide.css("display", "none");
                anchoFrm.removeClass("right");
                anchoFrm.removeClass("derecho");
                frm.addClass("centradoprincipal");
                anchoFrm.css("width", "400px");
                frm.css("width", "400px");
            }
            else {
                anchoSlide.css("display", "block");
                anchoFrm.addClass("right");
                anchoFrm.addClass("derecho");
                frm.removeClass("centradoprincipal");
                anchoFrm.css("width", "28%");
                anchoSlide.css("width", "70%");
               
            }
        }
      
    };




    $(function () {

       // PORTAL.init();

    })

})(jQuery);