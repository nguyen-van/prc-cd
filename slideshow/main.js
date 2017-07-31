// JavaScript Document

function main() {

  var $window = $(window);




  //hamburger menu
  function menuTrigger() {
    $('#js-menu_trigger').click(function (event) {
      event.preventDefault();
      $(this).toggleClass('active');
      $('#js-menu_wrap').slideToggle(600);
    });
  }
  menuTrigger();


  //fix header
  function fixHeader() {
    var nav = $('#js-header'),
      offset = nav.offset();

    $window.on('scroll', $.throttle(1000 / 15, function () {
      if ($window.scrollTop() > offset.top) {
        nav.addClass('fixed');
      } else {
        nav.removeClass('fixed');
      }
    }));
  }
  fixHeader();

  //loader
  function loader() {
    imagesLoaded('#wrap', function () {
      setTimeout(
        function () {
          bgSlide();
          $('#js-loader').fadeOut(450);
          $('#wrap').fadeIn(1000);

          //loaded active
          $('.js-late').addClass('active');
          photoChange($('#js-photoBox'));
        }, 600);
    });

  }
  loader();


  //page scroll
  function pageScroll() {
    $('a.js-page-scroll').click(function () {
      var speed = 400;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({
        scrollTop: position
      }, speed, 'swing');
      return false;
    });
  }
  pageScroll();


  function imagelightboxstart() {
    // ACTIVITY INDICATOR
    var activityIndicatorOn = function () {
        $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
      },
      activityIndicatorOff = function () {
        $('#imagelightbox-loading').remove();
      },

      // OVERLAY
      overlayOn = function () {
        $('<div id="imagelightbox-overlay"></div>').appendTo('body');
      },
      overlayOff = function () {
        $('#imagelightbox-overlay').remove();
      },

      // CLOSE BUTTON
      closeButtonOn = function (instance) {
        $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () {
          $(this).remove();
          instance.quitImageLightbox();
          return false;
        });
      },
      closeButtonOff = function () {
        $('#imagelightbox-close').remove();
      },

      // CAPTION
      captionOn = function () {
        var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
        if (description.length > 0)
          $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
      },
      captionOff = function () {
        $('#imagelightbox-caption').remove();
      },

      // NAVIGATION
      navigationOn = function (instance, selector) {
        var images = $(selector);
        if (images.length) {
          var nav = $('<div id="imagelightbox-nav"></div>');
          for (var i = 0; i < images.length; i++)
            nav.append('<button type="button"></button>');
          nav.appendTo('body');
          nav.on('click touchend', function () {
            return false;
          });
          var navItems = nav.find('button');
          navItems.on('click touchend', function () {
              var $this = $(this);
              if (images.eq($this.index()).attr('href') != $('#imagelightbox').attr('src'))
                instance.switchImageLightbox($this.index());
              navItems.removeClass('active');
              navItems.eq($this.index()).addClass('active');
              return false;
            })
            .on('touchend', function () {
              return false;
            });
        }
      },
      navigationUpdate = function (selector) {
        var items = $('#imagelightbox-nav button');
        items.removeClass('active');
        items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
      },
      navigationOff = function () {
        $('#imagelightbox-nav').remove();
      },

      // ARROWS
      arrowsOn = function (instance, selector) {
        var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');

        $arrows.appendTo('body');

        $arrows.on('click touchend', function (e) {
          e.preventDefault();

          var $this = $(this),
            $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
            index = $target.index(selector);

          if ($this.hasClass('imagelightbox-arrow-left')) {
            index = index - 1;
            if (!$(selector).eq(index).length)
              index = $(selector).length;
          } else {
            index = index + 1;
            if (!$(selector).eq(index).length)
              index = 0;
          }
          instance.switchImageLightbox(index);
          return false;
        });
      },
      arrowsOff = function () {
        $('.imagelightbox-arrow').remove();
      };

    //  ALL COMBINED
    var selectorF = 'a[data-imagelightbox="f"]';
    var instanceF = $(selectorF).imageLightbox({
      onStart: function () {
        overlayOn();
        closeButtonOn(instanceF);
        arrowsOn(instanceF, selectorF);
      },
      onEnd: function () {
        overlayOff();
        captionOff();
        closeButtonOff();
        arrowsOff();
        activityIndicatorOff();
      },
      onLoadStart: function () {
        captionOff();
        activityIndicatorOn();
      },
      onLoadEnd: function () {
        captionOn();
        activityIndicatorOff();
        $('.imagelightbox-arrow').css('display', 'block');
      }
    });
  }
  imagelightboxstart();


  //photoList
  function bgSlide() {
    $('#js-bg-slide').backstretch(
    ["cherry.jpg",
     "japanese-cherry.jpg",
     "blossom.jpg",
     "beeflower.jpg"
     ], {
        duration: 3000,
        fade: 1250
      });
  }

  //navi text fade animetion
  function navifade() {
    $window.on('load', function () {
      $('.js-pc-menu_item i').children().andSelf().contents().each(function () {
        if (this.nodeType == 3) {
          $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
        }
      });

      $('.js-pc-menu_item a').mouseenter(function () {
        var $naviItem = $(this).find('i');

        setTimeout(function () {
          for (var i = 0; i <= $naviItem.children().size(); i++) {
            $naviItem.children('span:eq(' + i + ')').css({
              'opacity': 0
            }).delay(50 * i).addClass('active').animate({
              'opacity': 1
            }, 50);
          }
        }, 150);
      });
    });
  }
  navifade();



  //tabpanel
  function singlePanel() {

    var $panelbtn = $('#js-tab-trigger');
    var $panelitem = $('#js-tab');
    var $anchor = $panelbtn.find('a');
    var $panel = $panelitem.find('.js-tab-item');
    var lastAnchor;
    var lastPanel;

    $anchor.show();

    lastAnchor = $anchor.filter('.on');
    lastPanel = $(lastAnchor.attr('href'));

    $panel.hide();
    lastPanel.show();

    $anchor.on('click', function (event) {
      event.preventDefault;

      var currentAnchor = $(this);
      var currentPanel = $(currentAnchor.attr('href'));

      if (currentAnchor.get(0) === lastAnchor.get(0)) {
        return;
      }

      lastPanel.fadeOut(800, function () {
        lastAnchor.removeClass('on');
        currentAnchor.addClass('on');
        currentPanel.fadeIn(800);

        lastAnchor = currentAnchor;
        lastPanel = currentPanel;
      });


    });

  }
  singlePanel();


  function photoChange(target) {

    var photoList = target.find('#js-photolist li');
    var tnList = [];
    var current = 0;
    var prevBtn = $('#js-prev a');
    var nextBtn = $('#js-next a');
    var timeId;
    var isOver = false;

    //画像のフェードイン
    function open() {
      stopAuto();
      checkControl();
      $('#js-control a').off('click');
      tnList[current].addClass('active').attr('src', 'images/thumb_hero' + current + '.jpg');
      $(photoList[current]).stop().fadeIn(1200, complete);

      var currentH = $(photoList[current]).find('img').height();
      $('#js-photolist').height(currentH);

    }

    function close() {
      tnList[current].removeClass('active').attr('src', 'images/thumb_hero' + current + '.jpg');
      $(photoList[current]).stop().fadeOut(1200);
    }

    function complete() {
      checkControl();
      if (!isOver) startAuto();
    }

    function startAuto() {
      timeId = setTimeout(change, 3000);
    }

    function stopAuto() {
      clearTimeout(timeId);
    }

    function change() {
      close();
      current = ++current % photoList.length;
      open();
    }

    function clickTn(num) {
      if (current != num) {
        close();
        current = num;
        open();
      }
    }

    function clickControl(type) {
      close();
      switch (type) {
      case 'prev':
        current--;
        break;
      case 'next':
        current++;
        break;
      }
      open();
    }

    function checkControl() {
      switch (current) {
      case 0:
        hideControl(prevBtn);
        showControl(nextBtn);
        break;
      case photoList.length - 1:
        showControl(prevBtn);
        hideControl(nextBtn);
        break;
      default:
        showControl(prevBtn);
        showControl(nextBtn);
        break;
      }
    }

    function hideControl(btn) {
      btn.stop().fadeOut(600);
      btn.off('click');
    }

    function showControl(btn) {
      btn.stop().fadeIn(600);
      btn.off('click').off('mouseenter').off('mouseleave').on({
        'click': function () {
          clickControl($(this).parent().attr('id'));
        },
        'mouseenter': function () {
          isOver = true;
          stopAuto();
        },
        'mouseleave': function () {
          isOver = false;
          startAuto();
        }
      });
    }
    //initialize
    function init() {
      target.find('#js-tnlist li').each(function (index) {
        tnList[index] = $($(this).find('img'));
        $($(this).find('a')).on({
          'click': function () {
            clickTn(index);
          },
          'mouseenter': function () {
            isOver = true;
            stopAuto();
          },
          'mouseleave': function () {
            isOver = false;
            startAuto();
          }
        });
      });
    }
    init();
    checkControl();
    open();
  }


} //main
main();