var $wrappers = $('.wrapper')
var $header = $('.main-header')
function Item (i) {
  this.$dom = $('.wrapper-' + (i + 1))
}
Item.prototype = {
  constructor: Item,
  show: function () {
    $wrappers.css('display', 'none')
    this.$dom.css('display', 'block')
  },
  load: function () {
    console.log(233)
  }
}

function Page () {
  this.count = $wrappers.length
  this.itemList = []
  this.scrollTimer = 0
  this.pageCounter = 0
  this.lastScroll = 0
  this.scrolling = false
  this._init()
}
Page.prototype = {
  constructor: Page,
  _init: function () {
    $(document.body).css('height', this.count * 100 + '%')
    for (var i = 0; i < this.count; i++) {
      this.itemList.push(new Item(i))
    }
    var self = this
    this.lastScroll = $(document).scrollTop()
    window.addEventListener('scroll', function (e) {
      if (self.scrolling) {
        return;
      }
      clearTimeout(self.scrollTimer)
      self.scrollTimer = setTimeout(function () { self.dealScroll() }, 60);
    })
    this.pageChange()
    this.bindEvent()
    // 视频大小自适应
    var videoWidth = 2560
    var videoHeight = 1080
    var $videoBg = $('#bgVideo')
    var $video = $videoBg.find('.video')
    var timer = 0
    function resize () {
      var fixedWidth, fixedHeight
      if (window.innerWidth / window.innerHeight >= videoWidth / videoHeight) {
        fixedWidth = window.innerWidth
        fixedHeight = window.innerWidth / (videoWidth / videoHeight)
      } else {
        fixedHeight = window.innerHeight
        fixedWidth = window.innerHeight * (videoWidth / videoHeight)
      }
      $video.attr('src', mediaURLData[5613]).attr('width', fixedWidth).attr('height', fixedHeight)
      $videoBg.css('width', fixedWidth + 'px').css('height', fixedHeight + 'px')
    }
    resize()
    $(window).on('resize', function () {
      clearTimeout(timer)
      timer = setTimeout(resize, 300)
    })

    // 视频背景切换
    var $wrapper1 = $('.wrapper-1')
    $wrapper1.addClass('wrapper-video')
    $wrapper1.find('.dash-bar').on('click', '.dash', function () {
      if ($(this).attr('data-to') == 'video') {
        $wrapper1.addClass('wrapper-video')
      } else {
        $wrapper1.removeClass('wrapper-video')
      }
    })
    var $videoPop = $('#videoPop')
    $('#iconPlay').on('click', function () {
      $videoPop.show()
      var player = new Txplayer({
        containerId: 'video',
        vid: $(this).attr('data-vid'),
        width: '100%',
        height: '100%',
        autoplay: true
      });
    })

    $('#close').on('click', function () {
      $videoPop.hide()
      $videoPop.find('.video').html('')
    })
  },
  dealScroll: function () {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true
    var top = $(document).scrollTop()
    var to = top - this.lastScroll
    if (to > 0 && this.pageCounter < this.count) {
      this.pageCounter++
    }
    if (to < 0 && this.pageCounter > 0) {
      this.pageCounter--
    }
    this.pageChange()
    
  },
  pageChange: function () {
    this.itemList[this.pageCounter].show()
    $(document.body)[0].className = 'active-' + (this.pageCounter + 1)
    $(document).scrollTop(this.pageCounter * window.innerHeight)
    this.lastScroll = this.pageCounter * window.innerHeight
    var self = this
    setTimeout(function () {
      self.scrolling = false
    }, 100);
  },
  bindEvent: function () {
    var self = this
    $header.find('.menu-icon').on('click', function () {
      $header.toggleClass('menu-slide')
    })

    $('.dot-bar').on('click','.dot', function () {
      self.pageCounter = $(this).index()
      self.pageChange()
    })
  }
}
new Page()

