if ("undefined" == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
  "use strict";
  var e = t.fn.jquery.split(" ")[0].split(".");
  if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 2)
    throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery), + function(t) {
  "use strict";

  function e() {
    var t = document.createElement("bootstrap"),
      e = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
    for (var i in e)
      if (void 0 !== t.style[i])
        return {
          end: e[i]
        };
    return !1
  }
  t.fn.emulateTransitionEnd = function(e) {
      var i = !1,
        s = this;
      t(this).one("bsTransitionEnd", function() {
        i = !0
      });
      var a = function() {
        i || t(s).trigger(t.support.transition.end)
      };
      return setTimeout(a, e),
        this
    },
    t(function() {
      t.support.transition = e(),
        t.support.transition && (t.event.special.bsTransitionEnd = {
          bindType: t.support.transition.end,
          delegateType: t.support.transition.end,
          handle: function(e) {
            return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
          }
        })
    })
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    return this.each(function() {
      var i = t(this),
        a = i.data("bs.alert");
      a || i.data("bs.alert", a = new s(this)),
        "string" == typeof e && a[e].call(i)
    })
  }
  var i = '[data-dismiss="alert"]',
    s = function(e) {
      t(e).on("click", i, this.close)
    };
  s.VERSION = "3.3.6",
    s.TRANSITION_DURATION = 150,
    s.prototype.close = function(e) {
      function i() {
        o.detach().trigger("closed.bs.alert").remove()
      }
      var a = t(this),
        n = a.attr("data-target");
      n || (n = a.attr("href"),
        n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
      var o = t(n);
      e && e.preventDefault(),
        o.length || (o = a.closest(".alert")),
        o.trigger(e = t.Event("close.bs.alert")),
        e.isDefaultPrevented() || (o.removeClass("in"),
          t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", i).emulateTransitionEnd(s.TRANSITION_DURATION) : i())
    };
  var a = t.fn.alert;
  t.fn.alert = e,
    t.fn.alert.Constructor = s,
    t.fn.alert.noConflict = function() {
      return t.fn.alert = a,
        this
    },
    t(document).on("click.bs.alert.data-api", i, s.prototype.close)
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    return this.each(function() {
      var s = t(this),
        a = s.data("bs.button"),
        n = "object" == typeof e && e;
      a || s.data("bs.button", a = new i(this, n)),
        "toggle" == e ? a.toggle() : e && a.setState(e)
    })
  }
  var i = function(e, s) {
    this.$element = t(e),
      this.options = t.extend({}, i.DEFAULTS, s),
      this.isLoading = !1
  };
  i.VERSION = "3.3.6",
    i.DEFAULTS = {
      loadingText: "loading..."
    },
    i.prototype.setState = function(e) {
      var i = "disabled",
        s = this.$element,
        a = s.is("input") ? "val" : "html",
        n = s.data();
      e += "Text",
        null == n.resetText && s.data("resetText", s[a]()),
        setTimeout(t.proxy(function() {
          s[a](null == n[e] ? this.options[e] : n[e]),
            "loadingText" == e ? (this.isLoading = !0,
              s.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1,
              s.removeClass(i).removeAttr(i))
        }, this), 0)
    },
    i.prototype.toggle = function() {
      var t = !0,
        e = this.$element.closest('[data-toggle="buttons"]');
      if (e.length) {
        var i = this.$element.find("input");
        "radio" == i.prop("type") ? (i.prop("checked") && (t = !1),
            e.find(".active").removeClass("active"),
            this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1),
            this.$element.toggleClass("active")),
          i.prop("checked", this.$element.hasClass("active")),
          t && i.trigger("change")
      } else
        this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
        this.$element.toggleClass("active")
    };
  var s = t.fn.button;
  t.fn.button = e,
    t.fn.button.Constructor = i,
    t.fn.button.noConflict = function() {
      return t.fn.button = s,
        this
    },
    t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
      var s = t(i.target);
      s.hasClass("btn") || (s = s.closest(".btn")),
        e.call(s, "toggle"),
        t(i.target).is('input[type="radio"]') || t(i.target).is('input[type="checkbox"]') || i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
      t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    return this.each(function() {
      var s = t(this),
        a = s.data("bs.carousel"),
        n = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e),
        o = "string" == typeof e ? e : n.slide;
      a || s.data("bs.carousel", a = new i(this, n)),
        "number" == typeof e ? a.to(e) : o ? a[o]() : n.interval && a.pause().cycle()
    })
  }
  var i = function(e, i) {
    this.$element = t(e),
      this.$indicators = this.$element.find(".carousel-indicators"),
      this.options = i,
      this.paused = null,
      this.sliding = null,
      this.interval = null,
      this.$active = null,
      this.$items = null,
      this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)),
      "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
  };
  i.VERSION = "3.3.6",
    i.TRANSITION_DURATION = 600,
    i.DEFAULTS = {
      interval: 5e3,
      pause: "hover",
      wrap: !0,
      keyboard: !0
    },
    i.prototype.keydown = function(t) {
      if (!/input|textarea/i.test(t.target.tagName)) {
        switch (t.which) {
          case 37:
            this.prev();
            break;
          case 39:
            this.next();
            break;
          default:
            return
        }
        t.preventDefault()
      }
    },
    i.prototype.cycle = function(e) {
      return e || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)),
        this
    },
    i.prototype.getItemIndex = function(t) {
      return this.$items = t.parent().children(".item"),
        this.$items.index(t || this.$active)
    },
    i.prototype.getItemForDirection = function(t, e) {
      var i = this.getItemIndex(e),
        s = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
      if (s && !this.options.wrap)
        return e;
      var a = "prev" == t ? -1 : 1,
        n = (i + a) % this.$items.length;
      return this.$items.eq(n)
    },
    i.prototype.to = function(t) {
      var e = this,
        i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
      return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
        e.to(t)
      }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    },
    i.prototype.pause = function(e) {
      return e || (this.paused = !0),
        this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end),
          this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    },
    i.prototype.next = function() {
      return this.sliding ? void 0 : this.slide("next")
    },
    i.prototype.prev = function() {
      return this.sliding ? void 0 : this.slide("prev")
    },
    i.prototype.slide = function(e, s) {
      var a = this.$element.find(".item.active"),
        n = s || this.getItemForDirection(e, a),
        o = this.interval,
        r = "next" == e ? "left" : "right",
        l = this;
      if (n.hasClass("active"))
        return this.sliding = !1;
      var d = n[0],
        p = t.Event("slide.bs.carousel", {
          relatedTarget: d,
          direction: r
        });
      if (this.$element.trigger(p), !p.isDefaultPrevented()) {
        if (this.sliding = !0,
          o && this.pause(),
          this.$indicators.length) {
          this.$indicators.find(".active").removeClass("active");
          var h = t(this.$indicators.children()[this.getItemIndex(n)]);
          h && h.addClass("active")
        }
        var c = t.Event("slid.bs.carousel", {
          relatedTarget: d,
          direction: r
        });
        return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(e),
            n[0].offsetWidth,
            a.addClass(r),
            n.addClass(r),
            a.one("bsTransitionEnd", function() {
              n.removeClass([e, r].join(" ")).addClass("active"),
                a.removeClass(["active", r].join(" ")),
                l.sliding = !1,
                setTimeout(function() {
                  l.$element.trigger(c)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (a.removeClass("active"),
            n.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(c)),
          o && this.cycle(),
          this
      }
    };
  var s = t.fn.carousel;
  t.fn.carousel = e,
    t.fn.carousel.Constructor = i,
    t.fn.carousel.noConflict = function() {
      return t.fn.carousel = s,
        this
    };
  var a = function(i) {
    var s, a = t(this),
      n = t(a.attr("data-target") || (s = a.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
    if (n.hasClass("carousel")) {
      var o = t.extend({}, n.data(), a.data()),
        r = a.attr("data-slide-to");
      r && (o.interval = !1),
        e.call(n, o),
        r && n.data("bs.carousel").to(r),
        i.preventDefault()
    }
  };
  t(document).on("click.bs.carousel.data-api", "[data-slide]", a).on("click.bs.carousel.data-api", "[data-slide-to]", a),
    t(window).on("load", function() {
      t('[data-ride="carousel"]').each(function() {
        var i = t(this);
        e.call(i, i.data())
      })
    })
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    var i, s = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
    return t(s)
  }

  function i(e) {
    return this.each(function() {
      var i = t(this),
        a = i.data("bs.collapse"),
        n = t.extend({}, s.DEFAULTS, i.data(), "object" == typeof e && e);
      !a && n.toggle && /show|hide/.test(e) && (n.toggle = !1),
        a || i.data("bs.collapse", a = new s(this, n)),
        "string" == typeof e && a[e]()
    })
  }
  var s = function(e, i) {
    this.$element = t(e),
      this.options = t.extend({}, s.DEFAULTS, i),
      this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'),
      this.transitioning = null,
      this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
      this.options.toggle && this.toggle()
  };
  s.VERSION = "3.3.6",
    s.TRANSITION_DURATION = 350,
    s.DEFAULTS = {
      toggle: !0
    },
    s.prototype.dimension = function() {
      var t = this.$element.hasClass("width");
      return t ? "width" : "height"
    },
    s.prototype.show = function() {
      if (!this.transitioning && !this.$element.hasClass("in")) {
        var e, a = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
        if (!(a && a.length && (e = a.data("bs.collapse"),
            e && e.transitioning))) {
          var n = t.Event("show.bs.collapse");
          if (this.$element.trigger(n), !n.isDefaultPrevented()) {
            a && a.length && (i.call(a, "hide"),
              e || a.data("bs.collapse", null));
            var o = this.dimension();
            this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded", !0),
              this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
              this.transitioning = 1;
            var r = function() {
              this.$element.removeClass("collapsing").addClass("collapse in")[o](""),
                this.transitioning = 0,
                this.$element.trigger("shown.bs.collapse")
            };
            if (!t.support.transition)
              return r.call(this);
            var l = t.camelCase(["scroll", o].join("-"));
            this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[o](this.$element[0][l])
          }
        }
      }
    },
    s.prototype.hide = function() {
      if (!this.transitioning && this.$element.hasClass("in")) {
        var e = t.Event("hide.bs.collapse");
        if (this.$element.trigger(e), !e.isDefaultPrevented()) {
          var i = this.dimension();
          this.$element[i](this.$element[i]())[0].offsetHeight,
            this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
            this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
            this.transitioning = 1;
          var a = function() {
            this.transitioning = 0,
              this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
          };
          return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : a.call(this)
        }
      }
    },
    s.prototype.toggle = function() {
      this[this.$element.hasClass("in") ? "hide" : "show"]()
    },
    s.prototype.getParent = function() {
      return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, s) {
        var a = t(s);
        this.addAriaAndCollapsedClass(e(a), a)
      }, this)).end()
    },
    s.prototype.addAriaAndCollapsedClass = function(t, e) {
      var i = t.hasClass("in");
      t.attr("aria-expanded", i),
        e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
  var a = t.fn.collapse;
  t.fn.collapse = i,
    t.fn.collapse.Constructor = s,
    t.fn.collapse.noConflict = function() {
      return t.fn.collapse = a,
        this
    },
    t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
      var a = t(this);
      a.attr("data-target") || s.preventDefault();
      var n = e(a),
        o = n.data("bs.collapse"),
        r = o ? "toggle" : a.data();
      i.call(n, r)
    })
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    var i = e.attr("data-target");
    i || (i = e.attr("href"),
      i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
    var s = i && t(i);
    return s && s.length ? s : e.parent()
  }

  function i(i) {
    i && 3 === i.which || (t(a).remove(),
      t(n).each(function() {
        var s = t(this),
          a = e(s),
          n = {
            relatedTarget: this
          };
        a.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(a[0], i.target) || (a.trigger(i = t.Event("hide.bs.dropdown", n)),
          i.isDefaultPrevented() || (s.attr("aria-expanded", "false"),
            a.removeClass("open").trigger(t.Event("hidden.bs.dropdown", n)))))
      }))
  }

  function s(e) {
    return this.each(function() {
      var i = t(this),
        s = i.data("bs.dropdown");
      s || i.data("bs.dropdown", s = new o(this)),
        "string" == typeof e && s[e].call(i)
    })
  }
  var a = ".dropdown-backdrop",
    n = '[data-toggle="dropdown"]',
    o = function(e) {
      t(e).on("click.bs.dropdown", this.toggle)
    };
  o.VERSION = "3.3.6",
    o.prototype.toggle = function(s) {
      var a = t(this);
      if (!a.is(".disabled, :disabled")) {
        var n = e(a),
          o = n.hasClass("open");
        if (i(), !o) {
          "ontouchstart" in document.documentElement && !n.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
          var r = {
            relatedTarget: this
          };
          if (n.trigger(s = t.Event("show.bs.dropdown", r)),
            s.isDefaultPrevented())
            return;
          a.trigger("focus").attr("aria-expanded", "true"),
            n.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r))
        }
        return !1
      }
    },
    o.prototype.keydown = function(i) {
      if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
        var s = t(this);
        if (i.preventDefault(),
          i.stopPropagation(), !s.is(".disabled, :disabled")) {
          var a = e(s),
            o = a.hasClass("open");
          if (!o && 27 != i.which || o && 27 == i.which)
            return 27 == i.which && a.find(n).trigger("focus"),
              s.trigger("click");
          var r = " li:not(.disabled):visible a",
            l = a.find(".dropdown-menu" + r);
          if (l.length) {
            var d = l.index(i.target);
            38 == i.which && d > 0 && d--,
              40 == i.which && d < l.length - 1 && d++, ~d || (d = 0),
              l.eq(d).trigger("focus")
          }
        }
      }
    };
  var r = t.fn.dropdown;
  t.fn.dropdown = s,
    t.fn.dropdown.Constructor = o,
    t.fn.dropdown.noConflict = function() {
      return t.fn.dropdown = r,
        this
    },
    t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
      t.stopPropagation()
    }).on("click.bs.dropdown.data-api", n, o.prototype.toggle).on("keydown.bs.dropdown.data-api", n, o.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", o.prototype.keydown)
}(jQuery), + function(t) {
  "use strict";

  function e(e, s) {
    return this.each(function() {
      var a = t(this),
        n = a.data("bs.modal"),
        o = t.extend({}, i.DEFAULTS, a.data(), "object" == typeof e && e);
      n || a.data("bs.modal", n = new i(this, o)),
        "string" == typeof e ? n[e](s) : o.show && n.show(s)
    })
  }
  var i = function(e, i) {
    this.options = i,
      this.$body = t(document.body),
      this.$element = t(e),
      this.$dialog = this.$element.find(".modal-dialog"),
      this.$backdrop = null,
      this.isShown = null,
      this.originalBodyPad = null,
      this.scrollbarWidth = 0,
      this.ignoreBackdropClick = !1,
      this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
        this.$element.trigger("loaded.bs.modal")
      }, this))
  };
  i.VERSION = "3.3.6",
    i.TRANSITION_DURATION = 300,
    i.BACKDROP_TRANSITION_DURATION = 150,
    i.DEFAULTS = {
      backdrop: !0,
      keyboard: !0,
      show: !0
    },
    i.prototype.toggle = function(t) {
      return this.isShown ? this.hide() : this.show(t)
    },
    i.prototype.show = function(e) {
      var s = this,
        a = t.Event("show.bs.modal", {
          relatedTarget: e
        });
      this.$element.trigger(a),
        this.isShown || a.isDefaultPrevented() || (this.isShown = !0,
          this.checkScrollbar(),
          this.setScrollbar(),
          this.$body.addClass("modal-open"),
          this.escape(),
          this.resize(),
          this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)),
          this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            s.$element.one("mouseup.dismiss.bs.modal", function(e) {
              t(e.target).is(s.$element) && (s.ignoreBackdropClick = !0)
            })
          }),
          this.backdrop(function() {
            var a = t.support.transition && s.$element.hasClass("fade");
            s.$element.parent().length || s.$element.appendTo(s.$body),
              s.$element.show().scrollTop(0),
              s.adjustDialog(),
              a && s.$element[0].offsetWidth,
              s.$element.addClass("in"),
              s.enforceFocus();
            var n = t.Event("shown.bs.modal", {
              relatedTarget: e
            });
            a ? s.$dialog.one("bsTransitionEnd", function() {
              s.$element.trigger("focus").trigger(n)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(n)
          }))
    },
    i.prototype.hide = function(e) {
      e && e.preventDefault(),
        e = t.Event("hide.bs.modal"),
        this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
          this.escape(),
          this.resize(),
          t(document).off("focusin.bs.modal"),
          this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
          this.$dialog.off("mousedown.dismiss.bs.modal"),
          t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    },
    i.prototype.enforceFocus = function() {
      t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
        this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
      }, this))
    },
    i.prototype.escape = function() {
      this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
        27 == t.which && this.hide()
      }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    },
    i.prototype.resize = function() {
      this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    },
    i.prototype.hideModal = function() {
      var t = this;
      this.$element.hide(),
        this.backdrop(function() {
          t.$body.removeClass("modal-open"),
            t.resetAdjustments(),
            t.resetScrollbar(),
            t.$element.trigger("hidden.bs.modal")
        })
    },
    i.prototype.removeBackdrop = function() {
      this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    },
    i.prototype.backdrop = function(e) {
      var s = this,
        a = this.$element.hasClass("fade") ? "fade" : "";
      if (this.isShown && this.options.backdrop) {
        var n = t.support.transition && a;
        if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + a).appendTo(this.$body),
          this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
            return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
          }, this)),
          n && this.$backdrop[0].offsetWidth,
          this.$backdrop.addClass("in"), !e)
          return;
        n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
      } else if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass("in");
        var o = function() {
          s.removeBackdrop(),
            e && e()
        };
        t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", o).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : o()
      } else
        e && e()
    },
    i.prototype.handleUpdate = function() {
      this.adjustDialog()
    },
    i.prototype.adjustDialog = function() {
      var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
      this.$element.css({
        paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
        paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
      })
    },
    i.prototype.resetAdjustments = function() {
      this.$element.css({
        paddingLeft: "",
        paddingRight: ""
      })
    },
    i.prototype.checkScrollbar = function() {
      var t = window.innerWidth;
      if (!t) {
        var e = document.documentElement.getBoundingClientRect();
        t = e.right - Math.abs(e.left)
      }
      this.bodyIsOverflowing = document.body.clientWidth < t,
        this.scrollbarWidth = this.measureScrollbar()
    },
    i.prototype.setScrollbar = function() {
      var t = parseInt(this.$body.css("padding-right") || 0, 10);
      this.originalBodyPad = document.body.style.paddingRight || "",
        this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    },
    i.prototype.resetScrollbar = function() {
      this.$body.css("padding-right", this.originalBodyPad)
    },
    i.prototype.measureScrollbar = function() {
      var t = document.createElement("div");
      t.className = "modal-scrollbar-measure",
        this.$body.append(t);
      var e = t.offsetWidth - t.clientWidth;
      return this.$body[0].removeChild(t),
        e
    };
  var s = t.fn.modal;
  t.fn.modal = e,
    t.fn.modal.Constructor = i,
    t.fn.modal.noConflict = function() {
      return t.fn.modal = s,
        this
    },
    t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
      var s = t(this),
        a = s.attr("href"),
        n = t(s.attr("data-target") || a && a.replace(/.*(?=#[^\s]+$)/, "")),
        o = n.data("bs.modal") ? "toggle" : t.extend({
          remote: !/#/.test(a) && a
        }, n.data(), s.data());
      s.is("a") && i.preventDefault(),
        n.one("show.bs.modal", function(t) {
          t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
            s.is(":visible") && s.trigger("focus")
          })
        }),
        e.call(n, o, this)
    })
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    return this.each(function() {
      var s = t(this),
        a = s.data("bs.tooltip"),
        n = "object" == typeof e && e;
      (a || !/destroy|hide/.test(e)) && (a || s.data("bs.tooltip", a = new i(this, n)),
        "string" == typeof e && a[e]())
    })
  }
  var i = function(t, e) {
    this.type = null,
      this.options = null,
      this.enabled = null,
      this.timeout = null,
      this.hoverState = null,
      this.$element = null,
      this.inState = null,
      this.init("tooltip", t, e)
  };
  i.VERSION = "3.3.6",
    i.TRANSITION_DURATION = 150,
    i.DEFAULTS = {
      animation: !0,
      placement: "top",
      selector: !1,
      template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      container: !1,
      viewport: {
        selector: "body",
        padding: 0
      }
    },
    i.prototype.init = function(e, i, s) {
      if (this.enabled = !0,
        this.type = e,
        this.$element = t(i),
        this.options = this.getOptions(s),
        this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport),
        this.inState = {
          click: !1,
          hover: !1,
          focus: !1
        },
        this.$element[0] instanceof document.constructor && !this.options.selector)
        throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
      for (var a = this.options.trigger.split(" "), n = a.length; n--;) {
        var o = a[n];
        if ("click" == o)
          this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
        else if ("manual" != o) {
          var r = "hover" == o ? "mouseenter" : "focusin",
            l = "hover" == o ? "mouseleave" : "focusout";
          this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)),
            this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
        }
      }
      this.options.selector ? this._options = t.extend({}, this.options, {
        trigger: "manual",
        selector: ""
      }) : this.fixTitle()
    },
    i.prototype.getDefaults = function() {
      return i.DEFAULTS
    },
    i.prototype.getOptions = function(e) {
      return e = t.extend({}, this.getDefaults(), this.$element.data(), e),
        e.delay && "number" == typeof e.delay && (e.delay = {
          show: e.delay,
          hide: e.delay
        }),
        e
    },
    i.prototype.getDelegateOptions = function() {
      var e = {},
        i = this.getDefaults();
      return this._options && t.each(this._options, function(t, s) {
          i[t] != s && (e[t] = s)
        }),
        e
    },
    i.prototype.enter = function(e) {
      var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
      return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()),
          t(e.currentTarget).data("bs." + this.type, i)),
        e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0),
        i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout),
          i.hoverState = "in",
          i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
          }, i.options.delay.show)) : i.show())
    },
    i.prototype.isInStateTrue = function() {
      for (var t in this.inState)
        if (this.inState[t])
          return !0;
      return !1
    },
    i.prototype.leave = function(e) {
      var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
      return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()),
          t(e.currentTarget).data("bs." + this.type, i)),
        e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1),
        i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout),
          i.hoverState = "out",
          i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
          }, i.options.delay.hide)) : i.hide())
    },
    i.prototype.show = function() {
      var e = t.Event("show.bs." + this.type);
      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e);
        var s = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
        if (e.isDefaultPrevented() || !s)
          return;
        var a = this,
          n = this.tip(),
          o = this.getUID(this.type);
        this.setContent(),
          n.attr("id", o),
          this.$element.attr("aria-describedby", o),
          this.options.animation && n.addClass("fade");
        var r = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
          l = /\s?auto?\s?/i,
          d = l.test(r);
        d && (r = r.replace(l, "") || "top"),
          n.detach().css({
            top: 0,
            left: 0,
            display: "block"
          }).addClass(r).data("bs." + this.type, this),
          this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element),
          this.$element.trigger("inserted.bs." + this.type);
        var p = this.getPosition(),
          h = n[0].offsetWidth,
          c = n[0].offsetHeight;
        if (d) {
          var u = r,
            f = this.getPosition(this.$viewport);
          r = "bottom" == r && p.bottom + c > f.bottom ? "top" : "top" == r && p.top - c < f.top ? "bottom" : "right" == r && p.right + h > f.width ? "left" : "left" == r && p.left - h < f.left ? "right" : r,
            n.removeClass(u).addClass(r)
        }
        var m = this.getCalculatedOffset(r, p, h, c);
        this.applyPlacement(m, r);
        var g = function() {
          var t = a.hoverState;
          a.$element.trigger("shown.bs." + a.type),
            a.hoverState = null,
            "out" == t && a.leave(a)
        };
        t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", g).emulateTransitionEnd(i.TRANSITION_DURATION) : g()
      }
    },
    i.prototype.applyPlacement = function(e, i) {
      var s = this.tip(),
        a = s[0].offsetWidth,
        n = s[0].offsetHeight,
        o = parseInt(s.css("margin-top"), 10),
        r = parseInt(s.css("margin-left"), 10);
      isNaN(o) && (o = 0),
        isNaN(r) && (r = 0),
        e.top += o,
        e.left += r,
        t.offset.setOffset(s[0], t.extend({
          using: function(t) {
            s.css({
              top: Math.round(t.top),
              left: Math.round(t.left)
            })
          }
        }, e), 0),
        s.addClass("in");
      var l = s[0].offsetWidth,
        d = s[0].offsetHeight;
      "top" == i && d != n && (e.top = e.top + n - d);
      var p = this.getViewportAdjustedDelta(i, e, l, d);
      p.left ? e.left += p.left : e.top += p.top;
      var h = /top|bottom/.test(i),
        c = h ? 2 * p.left - a + l : 2 * p.top - n + d,
        u = h ? "offsetWidth" : "offsetHeight";
      s.offset(e),
        this.replaceArrow(c, s[0][u], h)
    },
    i.prototype.replaceArrow = function(t, e, i) {
      this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    },
    i.prototype.setContent = function() {
      var t = this.tip(),
        e = this.getTitle();
      t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
        t.removeClass("fade in top bottom left right")
    },
    i.prototype.hide = function(e) {
      function s() {
        "in" != a.hoverState && n.detach(),
          a.$element.removeAttr("aria-describedby").trigger("hidden.bs." + a.type),
          e && e()
      }
      var a = this,
        n = t(this.$tip),
        o = t.Event("hide.bs." + this.type);
      return this.$element.trigger(o),
        o.isDefaultPrevented() ? void 0 : (n.removeClass("in"),
          t.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(),
          this.hoverState = null,
          this)
    },
    i.prototype.fixTitle = function() {
      var t = this.$element;
      (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    },
    i.prototype.hasContent = function() {
      return this.getTitle()
    },
    i.prototype.getPosition = function(e) {
      e = e || this.$element;
      var i = e[0],
        s = "BODY" == i.tagName,
        a = i.getBoundingClientRect();
      null == a.width && (a = t.extend({}, a, {
        width: a.right - a.left,
        height: a.bottom - a.top
      }));
      var n = s ? {
          top: 0,
          left: 0
        } : e.offset(),
        o = {
          scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        },
        r = s ? {
          width: t(window).width(),
          height: t(window).height()
        } : null;
      return t.extend({}, a, o, r, n)
    },
    i.prototype.getCalculatedOffset = function(t, e, i, s) {
      return "bottom" == t ? {
        top: e.top + e.height,
        left: e.left + e.width / 2 - i / 2
      } : "top" == t ? {
        top: e.top - s,
        left: e.left + e.width / 2 - i / 2
      } : "left" == t ? {
        top: e.top + e.height / 2 - s / 2,
        left: e.left - i
      } : {
        top: e.top + e.height / 2 - s / 2,
        left: e.left + e.width
      }
    },
    i.prototype.getViewportAdjustedDelta = function(t, e, i, s) {
      var a = {
        top: 0,
        left: 0
      };
      if (!this.$viewport)
        return a;
      var n = this.options.viewport && this.options.viewport.padding || 0,
        o = this.getPosition(this.$viewport);
      if (/right|left/.test(t)) {
        var r = e.top - n - o.scroll,
          l = e.top + n - o.scroll + s;
        r < o.top ? a.top = o.top - r : l > o.top + o.height && (a.top = o.top + o.height - l)
      } else {
        var d = e.left - n,
          p = e.left + n + i;
        d < o.left ? a.left = o.left - d : p > o.right && (a.left = o.left + o.width - p)
      }
      return a
    },
    i.prototype.getTitle = function() {
      var t, e = this.$element,
        i = this.options;
      return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    },
    i.prototype.getUID = function(t) {
      do
        t += ~~(1e6 * Math.random());
      while (document.getElementById(t));
      return t
    },
    i.prototype.tip = function() {
      if (!this.$tip && (this.$tip = t(this.options.template),
          1 != this.$tip.length))
        throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
      return this.$tip
    },
    i.prototype.arrow = function() {
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    },
    i.prototype.enable = function() {
      this.enabled = !0
    },
    i.prototype.disable = function() {
      this.enabled = !1
    },
    i.prototype.toggleEnabled = function() {
      this.enabled = !this.enabled
    },
    i.prototype.toggle = function(e) {
      var i = this;
      e && (i = t(e.currentTarget).data("bs." + this.type),
          i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()),
            t(e.currentTarget).data("bs." + this.type, i))),
        e ? (i.inState.click = !i.inState.click,
          i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    },
    i.prototype.destroy = function() {
      var t = this;
      clearTimeout(this.timeout),
        this.hide(function() {
          t.$element.off("." + t.type).removeData("bs." + t.type),
            t.$tip && t.$tip.detach(),
            t.$tip = null,
            t.$arrow = null,
            t.$viewport = null
        })
    };
  var s = t.fn.tooltip;
  t.fn.tooltip = e,
    t.fn.tooltip.Constructor = i,
    t.fn.tooltip.noConflict = function() {
      return t.fn.tooltip = s,
        this
    }
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    return this.each(function() {
      var s = t(this),
        a = s.data("bs.popover"),
        n = "object" == typeof e && e;
      (a || !/destroy|hide/.test(e)) && (a || s.data("bs.popover", a = new i(this, n)),
        "string" == typeof e && a[e]())
    })
  }
  var i = function(t, e) {
    this.init("popover", t, e)
  };
  if (!t.fn.tooltip)
    throw new Error("Popover requires tooltip.js");
  i.VERSION = "3.3.6",
    i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
      placement: "right",
      trigger: "click",
      content: "",
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype),
    i.prototype.constructor = i,
    i.prototype.getDefaults = function() {
      return i.DEFAULTS
    },
    i.prototype.setContent = function() {
      var t = this.tip(),
        e = this.getTitle(),
        i = this.getContent();
      t.find(".popover-title")[this.options.html ? "html" : "text"](e),
        t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i),
        t.removeClass("fade top bottom left right in"),
        t.find(".popover-title").html() || t.find(".popover-title").hide()
    },
    i.prototype.hasContent = function() {
      return this.getTitle() || this.getContent()
    },
    i.prototype.getContent = function() {
      var t = this.$element,
        e = this.options;
      return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    },
    i.prototype.arrow = function() {
      return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
  var s = t.fn.popover;
  t.fn.popover = e,
    t.fn.popover.Constructor = i,
    t.fn.popover.noConflict = function() {
      return t.fn.popover = s,
        this
    }
}(jQuery), + function(t) {
  "use strict";

  function e(i, s) {
    this.$body = t(document.body),
      this.$scrollElement = t(t(i).is(document.body) ? window : i),
      this.options = t.extend({}, e.DEFAULTS, s),
      this.selector = (this.options.target || "") + " .nav li > a",
      this.offsets = [],
      this.targets = [],
      this.activeTarget = null,
      this.scrollHeight = 0,
      this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)),
      this.refresh(),
      this.process()
  }

  function i(i) {
    return this.each(function() {
      var s = t(this),
        a = s.data("bs.scrollspy"),
        n = "object" == typeof i && i;
      a || s.data("bs.scrollspy", a = new e(this, n)),
        "string" == typeof i && a[i]()
    })
  }
  e.VERSION = "3.3.6",
    e.DEFAULTS = {
      offset: 10
    },
    e.prototype.getScrollHeight = function() {
      return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    },
    e.prototype.refresh = function() {
      var e = this,
        i = "offset",
        s = 0;
      this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight(),
        t.isWindow(this.$scrollElement[0]) || (i = "position",
          s = this.$scrollElement.scrollTop()),
        this.$body.find(this.selector).map(function() {
          var e = t(this),
            a = e.data("target") || e.attr("href"),
            n = /^#./.test(a) && t(a);
          return n && n.length && n.is(":visible") && [
            [n[i]().top + s, a]
          ] || null
        }).sort(function(t, e) {
          return t[0] - e[0]
        }).each(function() {
          e.offsets.push(this[0]),
            e.targets.push(this[1])
        })
    },
    e.prototype.process = function() {
      var t, e = this.$scrollElement.scrollTop() + this.options.offset,
        i = this.getScrollHeight(),
        s = this.options.offset + i - this.$scrollElement.height(),
        a = this.offsets,
        n = this.targets,
        o = this.activeTarget;
      if (this.scrollHeight != i && this.refresh(),
        e >= s)
        return o != (t = n[n.length - 1]) && this.activate(t);
      if (o && e < a[0])
        return this.activeTarget = null,
          this.clear();
      for (t = a.length; t--;)
        o != n[t] && e >= a[t] && (void 0 === a[t + 1] || e < a[t + 1]) && this.activate(n[t])
    },
    e.prototype.activate = function(e) {
      this.activeTarget = e,
        this.clear();
      var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
        s = t(i).parents("li").addClass("active");
      s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")),
        s.trigger("activate.bs.scrollspy")
    },
    e.prototype.clear = function() {
      t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
  var s = t.fn.scrollspy;
  t.fn.scrollspy = i,
    t.fn.scrollspy.Constructor = e,
    t.fn.scrollspy.noConflict = function() {
      return t.fn.scrollspy = s,
        this
    },
    t(window).on("load.bs.scrollspy.data-api", function() {
      t('[data-spy="scroll"]').each(function() {
        var e = t(this);
        i.call(e, e.data())
      })
    })
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    return this.each(function() {
      var s = t(this),
        a = s.data("bs.tab");
      a || s.data("bs.tab", a = new i(this)),
        "string" == typeof e && a[e]()
    })
  }
  var i = function(e) {
    this.element = t(e)
  };
  i.VERSION = "3.3.6",
    i.TRANSITION_DURATION = 150,
    i.prototype.show = function() {
      var e = this.element,
        i = e.closest("ul:not(.dropdown-menu)"),
        s = e.data("target");
      if (s || (s = e.attr("href"),
          s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
        var a = i.find(".active:last a"),
          n = t.Event("hide.bs.tab", {
            relatedTarget: e[0]
          }),
          o = t.Event("show.bs.tab", {
            relatedTarget: a[0]
          });
        if (a.trigger(n),
          e.trigger(o), !o.isDefaultPrevented() && !n.isDefaultPrevented()) {
          var r = t(s);
          this.activate(e.closest("li"), i),
            this.activate(r, r.parent(), function() {
              a.trigger({
                  type: "hidden.bs.tab",
                  relatedTarget: e[0]
                }),
                e.trigger({
                  type: "shown.bs.tab",
                  relatedTarget: a[0]
                })
            })
        }
      }
    },
    i.prototype.activate = function(e, s, a) {
      function n() {
        o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
          e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
          r ? (e[0].offsetWidth,
            e.addClass("in")) : e.removeClass("fade"),
          e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
          a && a()
      }
      var o = s.find("> .active"),
        r = a && t.support.transition && (o.length && o.hasClass("fade") || !!s.find("> .fade").length);
      o.length && r ? o.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(),
        o.removeClass("in")
    };
  var s = t.fn.tab;
  t.fn.tab = e,
    t.fn.tab.Constructor = i,
    t.fn.tab.noConflict = function() {
      return t.fn.tab = s,
        this
    };
  var a = function(i) {
    i.preventDefault(),
      e.call(t(this), "show")
  };
  t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', a).on("click.bs.tab.data-api", '[data-toggle="pill"]', a)
}(jQuery), + function(t) {
  "use strict";

  function e(e) {
    return this.each(function() {
      var s = t(this),
        a = s.data("bs.affix"),
        n = "object" == typeof e && e;
      a || s.data("bs.affix", a = new i(this, n)),
        "string" == typeof e && a[e]()
    })
  }
  var i = function(e, s) {
    this.options = t.extend({}, i.DEFAULTS, s),
      this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)),
      this.$element = t(e),
      this.affixed = null,
      this.unpin = null,
      this.pinnedOffset = null,
      this.checkPosition()
  };
  i.VERSION = "3.3.6",
    i.RESET = "affix affix-top affix-bottom",
    i.DEFAULTS = {
      offset: 0,
      target: window
    },
    i.prototype.getState = function(t, e, i, s) {
      var a = this.$target.scrollTop(),
        n = this.$element.offset(),
        o = this.$target.height();
      if (null != i && "top" == this.affixed)
        return i > a ? "top" : !1;
      if ("bottom" == this.affixed)
        return null != i ? a + this.unpin <= n.top ? !1 : "bottom" : t - s >= a + o ? !1 : "bottom";
      var r = null == this.affixed,
        l = r ? a : n.top,
        d = r ? o : e;
      return null != i && i >= a ? "top" : null != s && l + d >= t - s ? "bottom" : !1
    },
    i.prototype.getPinnedOffset = function() {
      if (this.pinnedOffset)
        return this.pinnedOffset;
      this.$element.removeClass(i.RESET).addClass("affix");
      var t = this.$target.scrollTop(),
        e = this.$element.offset();
      return this.pinnedOffset = e.top - t
    },
    i.prototype.checkPositionWithEventLoop = function() {
      setTimeout(t.proxy(this.checkPosition, this), 1)
    },
    i.prototype.checkPosition = function() {
      if (this.$element.is(":visible")) {
        var e = this.$element.height(),
          s = this.options.offset,
          a = s.top,
          n = s.bottom,
          o = Math.max(t(document).height(), t(document.body).height());
        "object" != typeof s && (n = a = s),
          "function" == typeof a && (a = s.top(this.$element)),
          "function" == typeof n && (n = s.bottom(this.$element));
        var r = this.getState(o, e, a, n);
        if (this.affixed != r) {
          null != this.unpin && this.$element.css("top", "");
          var l = "affix" + (r ? "-" + r : ""),
            d = t.Event(l + ".bs.affix");
          if (this.$element.trigger(d),
            d.isDefaultPrevented())
            return;
          this.affixed = r,
            this.unpin = "bottom" == r ? this.getPinnedOffset() : null,
            this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
        }
        "bottom" == r && this.$element.offset({
          top: o - e - n
        })
      }
    };
  var s = t.fn.affix;
  t.fn.affix = e,
    t.fn.affix.Constructor = i,
    t.fn.affix.noConflict = function() {
      return t.fn.affix = s,
        this
    },
    t(window).on("load", function() {
      t('[data-spy="affix"]').each(function() {
        var i = t(this),
          s = i.data();
        s.offset = s.offset || {},
          null != s.offsetBottom && (s.offset.bottom = s.offsetBottom),
          null != s.offsetTop && (s.offset.top = s.offsetTop),
          e.call(i, s)
      })
    })
}(jQuery), ! function(t, e, i, s) {
  function a(e, i) {
    var n = this;
    "object" == typeof i && (delete i.refresh,
        delete i.render,
        t.extend(this, i)),
      this.$element = t(e), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
    var o = (this.position + "").toLowerCase().match(/\S+/g) || [];
    if (o.length < 1 && o.push("center"),
      1 == o.length && o.push(o[0]),
      ("top" == o[0] || "bottom" == o[0] || "left" == o[1] || "right" == o[1]) && (o = [o[1], o[0]]),
      this.positionX != s && (o[0] = this.positionX.toLowerCase()),
      this.positionY != s && (o[1] = this.positionY.toLowerCase()),
      n.positionX = o[0],
      n.positionY = o[1],
      "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)),
      "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)),
      this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"),
      navigator.userAgent.match(/(iPod|iPhone|iPad)/))
      return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({
          backgroundImage: "url(" + this.imageSrc + ")",
          backgroundSize: "cover",
          backgroundPosition: this.position
        }),
        this;
    if (navigator.userAgent.match(/(Android)/))
      return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({
          backgroundImage: "url(" + this.imageSrc + ")",
          backgroundSize: "cover",
          backgroundPosition: this.position
        }),
        this;
    this.$mirror = t("<div />").prependTo("body");
    var r = this.$element.find(">.parallax-slider"),
      l = !1;
    0 == r.length ? this.$slider = t("<img />").prependTo(this.$mirror) : (this.$slider = r.prependTo(this.$mirror),
        l = !0),
      this.$mirror.addClass("parallax-mirror").css({
        visibility: "hidden",
        zIndex: this.zIndex,
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden"
      }),
      this.$slider.addClass("parallax-slider").one("load", function() {
        n.naturalHeight && n.naturalWidth || (n.naturalHeight = this.naturalHeight || this.height || 1,
            n.naturalWidth = this.naturalWidth || this.width || 1),
          n.aspectRatio = n.naturalWidth / n.naturalHeight,
          a.isSetup || a.setup(),
          a.sliders.push(n),
          a.isFresh = !1,
          a.requestRender()
      }),
      l || (this.$slider[0].src = this.imageSrc),
      (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || r.length > 0) && this.$slider.trigger("load")
  }

  function n(s) {
    return this.each(function() {
      var n = t(this),
        o = "object" == typeof s && s;
      this == e || this == i || n.is("body") ? a.configure(o) : n.data("px.parallax") ? "object" == typeof s && t.extend(n.data("px.parallax"), o) : (o = t.extend({}, n.data(), o),
          n.data("px.parallax", new a(this, o))),
        "string" == typeof s && ("destroy" == s ? a.destroy(this) : a[s]())
    })
  }! function() {
    for (var t = 0, i = ["ms", "moz", "webkit", "o"], s = 0; s < i.length && !e.requestAnimationFrame; ++s)
      e.requestAnimationFrame = e[i[s] + "RequestAnimationFrame"],
      e.cancelAnimationFrame = e[i[s] + "CancelAnimationFrame"] || e[i[s] + "CancelRequestAnimationFrame"];
    e.requestAnimationFrame || (e.requestAnimationFrame = function(i) {
        var s = (new Date).getTime(),
          a = Math.max(0, 16 - (s - t)),
          n = e.setTimeout(function() {
            i(s + a)
          }, a);
        return t = s + a,
          n
      }),
      e.cancelAnimationFrame || (e.cancelAnimationFrame = function(t) {
        clearTimeout(t)
      })
  }(),
  t.extend(a.prototype, {
      speed: .2,
      bleed: 0,
      zIndex: -100,
      iosFix: !0,
      androidFix: !0,
      position: "center",
      overScrollFix: !1,
      refresh: function() {
        this.boxWidth = this.$element.outerWidth(),
          this.boxHeight = this.$element.outerHeight() + 2 * this.bleed,
          this.boxOffsetTop = this.$element.offset().top - this.bleed,
          this.boxOffsetLeft = this.$element.offset().left,
          this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
        var t = a.winHeight,
          e = a.docHeight,
          i = Math.min(this.boxOffsetTop, e - t),
          s = Math.max(this.boxOffsetTop + this.boxHeight - t, 0),
          n = this.boxHeight + (i - s) * (1 - this.speed) | 0,
          o = (this.boxOffsetTop - i) * (1 - this.speed) | 0;
        if (n * this.aspectRatio >= this.boxWidth) {
          this.imageWidth = n * this.aspectRatio | 0,
            this.imageHeight = n,
            this.offsetBaseTop = o;
          var r = this.imageWidth - this.boxWidth;
          this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -r : isNaN(this.positionX) ? -r / 2 | 0 : Math.max(this.positionX, -r)
        } else {
          this.imageWidth = this.boxWidth,
            this.imageHeight = this.boxWidth / this.aspectRatio | 0,
            this.offsetLeft = 0;
          var r = this.imageHeight - n;
          this.offsetBaseTop = "top" == this.positionY ? o : "bottom" == this.positionY ? o - r : isNaN(this.positionY) ? o - r / 2 | 0 : o + Math.max(this.positionY, -r)
        }
      },
      render: function() {
        var t = a.scrollTop,
          e = a.scrollLeft,
          i = this.overScrollFix ? a.overScroll : 0,
          s = t + a.winHeight;
        this.boxOffsetBottom > t && this.boxOffsetTop <= s ? (this.visibility = "visible",
            this.mirrorTop = this.boxOffsetTop - t,
            this.mirrorLeft = this.boxOffsetLeft - e,
            this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)) : this.visibility = "hidden",
          this.$mirror.css({
            transform: "translate3d(0px, 0px, 0px)",
            visibility: this.visibility,
            top: this.mirrorTop - i,
            left: this.mirrorLeft,
            height: this.boxHeight,
            width: this.boxWidth
          }),
          this.$slider.css({
            transform: "translate3d(0px, 0px, 0px)",
            position: "absolute",
            top: this.offsetTop,
            left: this.offsetLeft,
            height: this.imageHeight,
            width: this.imageWidth,
            maxWidth: "none"
          })
      }
    }),
    t.extend(a, {
      scrollTop: 0,
      scrollLeft: 0,
      winHeight: 0,
      winWidth: 0,
      docHeight: 1 << 30,
      docWidth: 1 << 30,
      sliders: [],
      isReady: !1,
      isFresh: !1,
      isBusy: !1,
      setup: function() {
        if (!this.isReady) {
          var s = t(i),
            n = t(e),
            o = function() {
              a.winHeight = n.height(),
                a.winWidth = n.width(),
                a.docHeight = s.height(),
                a.docWidth = s.width()
            },
            r = function() {
              var t = n.scrollTop(),
                e = a.docHeight - a.winHeight,
                i = a.docWidth - a.winWidth;
              a.scrollTop = Math.max(0, Math.min(e, t)),
                a.scrollLeft = Math.max(0, Math.min(i, n.scrollLeft())),
                a.overScroll = Math.max(t - e, Math.min(t, 0))
            };
          n.on("resize.px.parallax load.px.parallax", function() {
              o(),
                a.isFresh = !1,
                a.requestRender()
            }).on("scroll.px.parallax load.px.parallax", function() {
              r(),
                a.requestRender()
            }),
            o(),
            r(),
            this.isReady = !0
        }
      },
      configure: function(e) {
        "object" == typeof e && (delete e.refresh,
          delete e.render,
          t.extend(this.prototype, e))
      },
      refresh: function() {
        t.each(this.sliders, function() {
            this.refresh()
          }),
          this.isFresh = !0
      },
      render: function() {
        this.isFresh || this.refresh(),
          t.each(this.sliders, function() {
            this.render()
          })
      },
      requestRender: function() {
        var t = this;
        this.isBusy || (this.isBusy = !0,
          e.requestAnimationFrame(function() {
            t.render(),
              t.isBusy = !1
          }))
      },
      destroy: function(i) {
        var s, n = t(i).data("px.parallax");
        for (n.$mirror.remove(),
          s = 0; s < this.sliders.length; s += 1)
          this.sliders[s] == n && this.sliders.splice(s, 1);
        t(i).data("px.parallax", !1),
          0 === this.sliders.length && (t(e).off("scroll.px.parallax resize.px.parallax load.px.parallax"),
            this.isReady = !1,
            a.isSetup = !1)
      }
    });
  var o = t.fn.parallax;
  t.fn.parallax = n,
    t.fn.parallax.Constructor = a,
    t.fn.parallax.noConflict = function() {
      return t.fn.parallax = o,
        this
    },
    t(i).on("ready.px.parallax.data-api", function() {
      t('[data-parallax="scroll"]').parallax()
    })
}(jQuery, window, document), ! function() {
  "use strict";

  function t(s) {
    if (!s)
      throw new Error("No options passed to Waypoint constructor");
    if (!s.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!s.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    this.key = "waypoint-" + e,
      this.options = t.Adapter.extend({}, t.defaults, s),
      this.element = this.options.element,
      this.adapter = new t.Adapter(this.element),
      this.callback = s.handler,
      this.axis = this.options.horizontal ? "horizontal" : "vertical",
      this.enabled = this.options.enabled,
      this.triggerPoint = null,
      this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis
      }),
      this.context = t.Context.findOrCreateByElement(this.options.context),
      t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      i[this.key] = this,
      e += 1
  }
  var e = 0,
    i = {};
  t.prototype.queueTrigger = function(t) {
      this.group.queueTrigger(this, t)
    },
    t.prototype.trigger = function(t) {
      this.enabled && this.callback && this.callback.apply(this, t)
    },
    t.prototype.destroy = function() {
      this.context.remove(this),
        this.group.remove(this),
        delete i[this.key]
    },
    t.prototype.disable = function() {
      return this.enabled = !1,
        this
    },
    t.prototype.enable = function() {
      return this.context.refresh(),
        this.enabled = !0,
        this
    },
    t.prototype.next = function() {
      return this.group.next(this)
    },
    t.prototype.previous = function() {
      return this.group.previous(this)
    },
    t.invokeAll = function(t) {
      var e = [];
      for (var s in i)
        e.push(i[s]);
      for (var a = 0, n = e.length; n > a; a++)
        e[a][t]()
    },
    t.destroyAll = function() {
      t.invokeAll("destroy")
    },
    t.disableAll = function() {
      t.invokeAll("disable")
    },
    t.enableAll = function() {
      t.invokeAll("enable")
    },
    t.refreshAll = function() {
      t.Context.refreshAll()
    },
    t.viewportHeight = function() {
      return window.innerHeight || document.documentElement.clientHeight
    },
    t.viewportWidth = function() {
      return document.documentElement.clientWidth
    },
    t.adapters = [],
    t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0
    },
    t.offsetAliases = {
      "bottom-in-view": function() {
        return this.context.innerHeight() - this.adapter.outerHeight()
      },
      "right-in-view": function() {
        return this.context.innerWidth() - this.adapter.outerWidth()
      }
    },
    window.Waypoint = t
}(),
function() {
  "use strict";

  function t(t) {
    window.setTimeout(t, 1e3 / 60)
  }

  function e(t) {
    this.element = t,
      this.Adapter = a.Adapter,
      this.adapter = new this.Adapter(t),
      this.key = "waypoint-context-" + i,
      this.didScroll = !1,
      this.didResize = !1,
      this.oldScroll = {
        x: this.adapter.scrollLeft(),
        y: this.adapter.scrollTop()
      },
      this.waypoints = {
        vertical: {},
        horizontal: {}
      },
      t.waypointContextKey = this.key,
      s[t.waypointContextKey] = this,
      i += 1,
      this.createThrottledScrollHandler(),
      this.createThrottledResizeHandler()
  }
  var i = 0,
    s = {},
    a = window.Waypoint,
    n = window.onload;
  e.prototype.add = function(t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      this.waypoints[e][t.key] = t,
        this.refresh()
    },
    e.prototype.checkEmpty = function() {
      var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
        e = this.Adapter.isEmptyObject(this.waypoints.vertical);
      t && e && (this.adapter.off(".waypoints"),
        delete s[this.key])
    },
    e.prototype.createThrottledResizeHandler = function() {
      function t() {
        e.handleResize(),
          e.didResize = !1
      }
      var e = this;
      this.adapter.on("resize.waypoints", function() {
        e.didResize || (e.didResize = !0,
          a.requestAnimationFrame(t))
      })
    },
    e.prototype.createThrottledScrollHandler = function() {
      function t() {
        e.handleScroll(),
          e.didScroll = !1
      }
      var e = this;
      this.adapter.on("scroll.waypoints", function() {
        (!e.didScroll || a.isTouch) && (e.didScroll = !0,
          a.requestAnimationFrame(t))
      })
    },
    e.prototype.handleResize = function() {
      a.Context.refreshAll()
    },
    e.prototype.handleScroll = function() {
      var t = {},
        e = {
          horizontal: {
            newScroll: this.adapter.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left"
          },
          vertical: {
            newScroll: this.adapter.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up"
          }
        };
      for (var i in e) {
        var s = e[i],
          a = s.newScroll > s.oldScroll,
          n = a ? s.forward : s.backward;
        for (var o in this.waypoints[i]) {
          var r = this.waypoints[i][o],
            l = s.oldScroll < r.triggerPoint,
            d = s.newScroll >= r.triggerPoint,
            p = l && d,
            h = !l && !d;
          (p || h) && (r.queueTrigger(n),
            t[r.group.id] = r.group)
        }
      }
      for (var c in t)
        t[c].flushTriggers();
      this.oldScroll = {
        x: e.horizontal.newScroll,
        y: e.vertical.newScroll
      }
    },
    e.prototype.innerHeight = function() {
      return this.element == this.element.window ? a.viewportHeight() : this.adapter.innerHeight()
    },
    e.prototype.remove = function(t) {
      delete this.waypoints[t.axis][t.key],
        this.checkEmpty()
    },
    e.prototype.innerWidth = function() {
      return this.element == this.element.window ? a.viewportWidth() : this.adapter.innerWidth()
    },
    e.prototype.destroy = function() {
      var t = [];
      for (var e in this.waypoints)
        for (var i in this.waypoints[e])
          t.push(this.waypoints[e][i]);
      for (var s = 0, a = t.length; a > s; s++)
        t[s].destroy()
    },
    e.prototype.refresh = function() {
      var t, e = this.element == this.element.window,
        i = e ? void 0 : this.adapter.offset(),
        s = {};
      this.handleScroll(),
        t = {
          horizontal: {
            contextOffset: e ? 0 : i.left,
            contextScroll: e ? 0 : this.oldScroll.x,
            contextDimension: this.innerWidth(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left"
          },
          vertical: {
            contextOffset: e ? 0 : i.top,
            contextScroll: e ? 0 : this.oldScroll.y,
            contextDimension: this.innerHeight(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top"
          }
        };
      for (var n in t) {
        var o = t[n];
        for (var r in this.waypoints[n]) {
          var l, d, p, h, c, u = this.waypoints[n][r],
            f = u.options.offset,
            m = u.triggerPoint,
            g = 0,
            v = null == m;
          u.element !== u.element.window && (g = u.adapter.offset()[o.offsetProp]),
            "function" == typeof f ? f = f.apply(u) : "string" == typeof f && (f = parseFloat(f),
              u.options.offset.indexOf("%") > -1 && (f = Math.ceil(o.contextDimension * f / 100))),
            l = o.contextScroll - o.contextOffset,
            u.triggerPoint = g + l - f,
            d = m < o.oldScroll,
            p = u.triggerPoint >= o.oldScroll,
            h = d && p,
            c = !d && !p, !v && h ? (u.queueTrigger(o.backward),
              s[u.group.id] = u.group) : !v && c ? (u.queueTrigger(o.forward),
              s[u.group.id] = u.group) : v && o.oldScroll >= u.triggerPoint && (u.queueTrigger(o.forward),
              s[u.group.id] = u.group)
        }
      }
      return a.requestAnimationFrame(function() {
          for (var t in s)
            s[t].flushTriggers()
        }),
        this
    },
    e.findOrCreateByElement = function(t) {
      return e.findByElement(t) || new e(t)
    },
    e.refreshAll = function() {
      for (var t in s)
        s[t].refresh()
    },
    e.findByElement = function(t) {
      return s[t.waypointContextKey]
    },
    window.onload = function() {
      n && n(),
        e.refreshAll()
    },
    a.requestAnimationFrame = function(e) {
      var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
      i.call(window, e)
    },
    a.Context = e
}(),
function() {
  "use strict";

  function t(t, e) {
    return t.triggerPoint - e.triggerPoint
  }

  function e(t, e) {
    return e.triggerPoint - t.triggerPoint
  }

  function i(t) {
    this.name = t.name,
      this.axis = t.axis,
      this.id = this.name + "-" + this.axis,
      this.waypoints = [],
      this.clearTriggerQueues(),
      s[this.axis][this.name] = this
  }
  var s = {
      vertical: {},
      horizontal: {}
    },
    a = window.Waypoint;
  i.prototype.add = function(t) {
      this.waypoints.push(t)
    },
    i.prototype.clearTriggerQueues = function() {
      this.triggerQueues = {
        up: [],
        down: [],
        left: [],
        right: []
      }
    },
    i.prototype.flushTriggers = function() {
      for (var i in this.triggerQueues) {
        var s = this.triggerQueues[i],
          a = "up" === i || "left" === i;
        s.sort(a ? e : t);
        for (var n = 0, o = s.length; o > n; n += 1) {
          var r = s[n];
          (r.options.continuous || n === s.length - 1) && r.trigger([i])
        }
      }
      this.clearTriggerQueues()
    },
    i.prototype.next = function(e) {
      this.waypoints.sort(t);
      var i = a.Adapter.inArray(e, this.waypoints),
        s = i === this.waypoints.length - 1;
      return s ? null : this.waypoints[i + 1]
    },
    i.prototype.previous = function(e) {
      this.waypoints.sort(t);
      var i = a.Adapter.inArray(e, this.waypoints);
      return i ? this.waypoints[i - 1] : null
    },
    i.prototype.queueTrigger = function(t, e) {
      this.triggerQueues[e].push(t)
    },
    i.prototype.remove = function(t) {
      var e = a.Adapter.inArray(t, this.waypoints);
      e > -1 && this.waypoints.splice(e, 1)
    },
    i.prototype.first = function() {
      return this.waypoints[0]
    },
    i.prototype.last = function() {
      return this.waypoints[this.waypoints.length - 1]
    },
    i.findOrCreate = function(t) {
      return s[t.axis][t.name] || new i(t)
    },
    a.Group = i
}(),
function() {
  "use strict";

  function t(t) {
    this.$element = e(t)
  }
  var e = window.jQuery,
    i = window.Waypoint;
  e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
      t.prototype[i] = function() {
        var t = Array.prototype.slice.call(arguments);
        return this.$element[i].apply(this.$element, t)
      }
    }),
    e.each(["extend", "inArray", "isEmptyObject"], function(i, s) {
      t[s] = e[s]
    }),
    i.adapters.push({
      name: "jquery",
      Adapter: t
    }),
    i.Adapter = t
}(),
function() {
  "use strict";

  function t(t) {
    return function() {
      var i = [],
        s = arguments[0];
      return t.isFunction(arguments[0]) && (s = t.extend({}, arguments[1]),
          s.handler = arguments[0]),
        this.each(function() {
          var a = t.extend({}, s, {
            element: this
          });
          "string" == typeof a.context && (a.context = t(this).closest(a.context)[0]),
            i.push(new e(a))
        }),
        i
    }
  }
  var e = window.Waypoint;
  window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
    window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}(), ! function(t) {
  "use strict";
  t.fn.counterUp = function(e) {
    var i, s = t.extend({
      time: 400,
      delay: 10,
      formatter: !1,
      callback: function() {}
    }, e);
    return this.each(function() {
      var e = t(this),
        a = {
          time: t(this).data("counterup-time") || s.time,
          delay: t(this).data("counterup-delay") || s.delay
        },
        n = function() {
          var t = [],
            n = a.time / a.delay,
            o = e.text(),
            r = /[0-9]+,[0-9]+/.test(o);
          o = o.replace(/,/g, "");
          var l = (o.split(".")[1] || []).length,
            d = /[0-9]+:[0-9]+:[0-9]+/.test(o);
          if (d) {
            var p = o.split(":"),
              h = 1;
            for (i = 0; p.length > 0;)
              i += h * parseInt(p.pop(), 10),
              h *= 60
          }
          for (var c = n; c >= 1; c--) {
            var u = parseFloat(o / n * c).toFixed(l);
            if (d) {
              u = parseInt(i / n * c);
              var f = parseInt(u / 3600) % 24,
                m = parseInt(u / 60) % 60,
                g = parseInt(u % 60, 10);
              u = (10 > f ? "0" + f : f) + ":" + (10 > m ? "0" + m : m) + ":" + (10 > g ? "0" + g : g)
            }
            if (r)
              for (;
                /(\d+)(\d{3})/.test(u.toString());)
                u = u.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            s.formatter && (u = s.formatter.call(this, u)),
              t.unshift(u)
          }
          e.data("counterup-nums", t),
            e.text("0");
          var v = function() {
            e.html(e.data("counterup-nums").shift()),
              e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), a.delay) : (e.data("counterup-nums", null),
                e.data("counterup-func", null),
                s.callback.call(this))
          };
          e.data("counterup-func", v),
            setTimeout(e.data("counterup-func"), a.delay)
        };
      e.waypoint(function(t) {
        n(),
          this.destroy()
      }, {
        offset: "100%"
      })
    })
  }
}(jQuery), ! function(t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
  var e = -1,
    i = -1,
    s = function(t) {
      return parseFloat(t) || 0
    },
    a = function(e) {
      var i = 1,
        a = t(e),
        n = null,
        o = [];
      return a.each(function() {
          var e = t(this),
            a = e.offset().top - s(e.css("margin-top")),
            r = o.length > 0 ? o[o.length - 1] : null;
          null === r ? o.push(e) : Math.floor(Math.abs(n - a)) <= i ? o[o.length - 1] = r.add(e) : o.push(e),
            n = a
        }),
        o
    },
    n = function(e) {
      var i = {
        byRow: !0,
        property: "height",
        target: null,
        remove: !1
      };
      return "object" == typeof e ? t.extend(i, e) : ("boolean" == typeof e ? i.byRow = e : "remove" === e && (i.remove = !0),
        i)
    },
    o = t.fn.matchHeight = function(e) {
      var i = n(e);
      if (i.remove) {
        var s = this;
        return this.css(i.property, ""),
          t.each(o._groups, function(t, e) {
            e.elements = e.elements.not(s)
          }),
          this
      }
      return this.length <= 1 && !i.target ? this : (o._groups.push({
          elements: this,
          options: i
        }),
        o._apply(this, i),
        this)
    };
  o.version = "master",
    o._groups = [],
    o._throttle = 80,
    o._maintainScroll = !1,
    o._beforeUpdate = null,
    o._afterUpdate = null,
    o._rows = a,
    o._parse = s,
    o._parseOptions = n,
    o._apply = function(e, i) {
      var r = n(i),
        l = t(e),
        d = [l],
        p = t(window).scrollTop(),
        h = t("html").outerHeight(!0),
        c = l.parents().filter(":hidden");
      return c.each(function() {
          var e = t(this);
          e.data("style-cache", e.attr("style"))
        }),
        c.css("display", "block"),
        r.byRow && !r.target && (l.each(function() {
            var e = t(this),
              i = e.css("display");
            "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block"),
              e.data("style-cache", e.attr("style")),
              e.css({
                display: i,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
              })
          }),
          d = a(l),
          l.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "")
          })),
        t.each(d, function(e, i) {
          var a = t(i),
            n = 0;
          if (r.target)
            n = r.target.outerHeight(!1);
          else {
            if (r.byRow && a.length <= 1)
              return void a.css(r.property, "");
            a.each(function() {
              var e = t(this),
                i = e.attr("style"),
                s = e.css("display");
              "inline-block" !== s && "flex" !== s && "inline-flex" !== s && (s = "block");
              var a = {
                display: s
              };
              a[r.property] = "",
                e.css(a),
                e.outerHeight(!1) > n && (n = e.outerHeight(!1)),
                i ? e.attr("style", i) : e.css("display", "")
            })
          }
          a.each(function() {
            var e = t(this),
              i = 0;
            r.target && e.is(r.target) || ("border-box" !== e.css("box-sizing") && (i += s(e.css("border-top-width")) + s(e.css("border-bottom-width")),
                i += s(e.css("padding-top")) + s(e.css("padding-bottom"))),
              e.css(r.property, n - i + "px"))
          })
        }),
        c.each(function() {
          var e = t(this);
          e.attr("style", e.data("style-cache") || null)
        }),
        o._maintainScroll && t(window).scrollTop(p / h * t("html").outerHeight(!0)),
        this
    },
    o._applyDataApi = function() {
      var e = {};
      t("[data-match-height], [data-mh]").each(function() {
          var i = t(this),
            s = i.attr("data-mh") || i.attr("data-match-height");
          s in e ? e[s] = e[s].add(i) : e[s] = i
        }),
        t.each(e, function() {
          this.matchHeight(!0)
        })
    };
  var r = function(e) {
    o._beforeUpdate && o._beforeUpdate(e, o._groups),
      t.each(o._groups, function() {
        o._apply(this.elements, this.options)
      }),
      o._afterUpdate && o._afterUpdate(e, o._groups)
  };
  o._update = function(s, a) {
      if (a && "resize" === a.type) {
        var n = t(window).width();
        if (n === e)
          return;
        e = n
      }
      s ? -1 === i && (i = setTimeout(function() {
        r(a),
          i = -1
      }, o._throttle)) : r(a)
    },
    t(o._applyDataApi),
    t(window).bind("load", function(t) {
      o._update(!1, t)
    }),
    t(window).bind("resize orientationchange", function(t) {
      o._update(!0, t)
    })
}), ! function(t, e, i, s) {
  function a(e, i) {
    this.settings = null,
      this.options = t.extend({}, a.Defaults, i),
      this.$element = t(e),
      this.drag = t.extend({}, c),
      this.state = t.extend({}, u),
      this.e = t.extend({}, f),
      this._plugins = {},
      this._supress = {},
      this._current = null,
      this._speed = null,
      this._coordinates = [],
      this._breakpoint = null,
      this._width = null,
      this._items = [],
      this._clones = [],
      this._mergers = [],
      this._invalidated = {},
      this._pipe = [],
      t.each(a.Plugins, t.proxy(function(t, e) {
        this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
      }, this)),
      t.each(a.Pipe, t.proxy(function(e, i) {
        this._pipe.push({
          filter: i.filter,
          run: t.proxy(i.run, this)
        })
      }, this)),
      this.setup(),
      this.initialize()
  }

  function n(t) {
    if (t.touches !== s)
      return {
        x: t.touches[0].pageX,
        y: t.touches[0].pageY
      };
    if (t.touches === s) {
      if (t.pageX !== s)
        return {
          x: t.pageX,
          y: t.pageY
        };
      if (t.pageX === s)
        return {
          x: t.clientX,
          y: t.clientY
        }
    }
  }

  function o(t) {
    var e, s, a = i.createElement("div"),
      n = t;
    for (e in n)
      if (s = n[e],
        "undefined" != typeof a.style[s])
        return a = null, [s, e];
    return [!1]
  }

  function r() {
    return o(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
  }

  function l() {
    return o(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
  }

  function d() {
    return o(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
  }

  function p() {
    return "ontouchstart" in e || !!navigator.msMaxTouchPoints
  }

  function h() {
    return e.navigator.msPointerEnabled
  }
  var c, u, f;
  c = {
      start: 0,
      startX: 0,
      startY: 0,
      current: 0,
      currentX: 0,
      currentY: 0,
      offsetX: 0,
      offsetY: 0,
      distance: null,
      startTime: 0,
      endTime: 0,
      updatedX: 0,
      targetEl: null
    },
    u = {
      isTouch: !1,
      isScrolling: !1,
      isSwiping: !1,
      direction: !1,
      inMotion: !1
    },
    f = {
      _onDragStart: null,
      _onDragMove: null,
      _onDragEnd: null,
      _transitionEnd: null,
      _resizer: null,
      _responsiveCall: null,
      _goToLoop: null,
      _checkVisibile: null
    },
    a.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: e,
      responsiveClass: !1,
      fallbackEasing: "swing",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      themeClass: "owl-theme",
      baseClass: "owl-carousel",
      itemClass: "owl-item",
      centerClass: "center",
      activeClass: "active"
    },
    a.Width = {
      Default: "default",
      Inner: "inner",
      Outer: "outer"
    },
    a.Plugins = {},
    a.Pipe = [{
      filter: ["width", "items", "settings"],
      run: function(t) {
        t.current = this._items && this._items[this.relative(this._current)]
      }
    }, {
      filter: ["items", "settings"],
      run: function() {
        var t = this._clones,
          e = this.$stage.children(".cloned");
        (e.length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(),
          this._clones = [])
      }
    }, {
      filter: ["items", "settings"],
      run: function() {
        var t, e, i = this._clones,
          s = this._items,
          a = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
        for (t = 0,
          e = Math.abs(a / 2); e > t; t++)
          a > 0 ? (this.$stage.children().eq(s.length + i.length - 1).remove(),
            i.pop(),
            this.$stage.children().eq(0).remove(),
            i.pop()) : (i.push(i.length / 2),
            this.$stage.append(s[i[i.length - 1]].clone().addClass("cloned")),
            i.push(s.length - 1 - (i.length - 1) / 2),
            this.$stage.prepend(s[i[i.length - 1]].clone().addClass("cloned")))
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function() {
        var t, e, i, s = this.settings.rtl ? 1 : -1,
          a = (this.width() / this.settings.items).toFixed(3),
          n = 0;
        for (this._coordinates = [],
          e = 0,
          i = this._clones.length + this._items.length; i > e; e++)
          t = this._mergers[this.relative(e)],
          t = this.settings.mergeFit && Math.min(t, this.settings.items) || t,
          n += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : a * t) * s,
          this._coordinates.push(n)
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function() {
        var e, i, s = (this.width() / this.settings.items).toFixed(3),
          a = {
            width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
            "padding-left": this.settings.stagePadding || "",
            "padding-right": this.settings.stagePadding || ""
          };
        if (this.$stage.css(a),
          a = {
            width: this.settings.autoWidth ? "auto" : s - this.settings.margin
          },
          a[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && t.grep(this._mergers, function(t) {
            return t > 1
          }).length > 0)
          for (e = 0,
            i = this._coordinates.length; i > e; e++)
            a.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin,
            this.$stage.children().eq(e).css(a);
        else
          this.$stage.children().css(a)
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function(t) {
        t.current && this.reset(this.$stage.children().index(t.current))
      }
    }, {
      filter: ["position"],
      run: function() {
        this.animate(this.coordinates(this._current))
      }
    }, {
      filter: ["width", "position", "items", "settings"],
      run: function() {
        var t, e, i, s, a = this.settings.rtl ? 1 : -1,
          n = 2 * this.settings.stagePadding,
          o = this.coordinates(this.current()) + n,
          r = o + this.width() * a,
          l = [];
        for (i = 0,
          s = this._coordinates.length; s > i; i++)
          t = this._coordinates[i - 1] || 0,
          e = Math.abs(this._coordinates[i]) + n * a,
          (this.op(t, "<=", o) && this.op(t, ">", r) || this.op(e, "<", o) && this.op(e, ">", r)) && l.push(i);
        this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass),
          this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass),
          this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass),
            this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
      }
    }],
    a.prototype.initialize = function() {
      if (this.trigger("initialize"),
        this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl),
        this.browserSupport(),
        this.settings.autoWidth && this.state.imagesLoaded !== !0) {
        var e, i, a;
        if (e = this.$element.find("img"),
          i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s,
          a = this.$element.children(i).width(),
          e.length && 0 >= a)
          return this.preloadAutoWidthImages(e), !1
      }
      this.$element.addClass("owl-loading"),
        this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this._width = this.$element.width(),
        this.refresh(),
        this.$element.removeClass("owl-loading").addClass("owl-loaded"),
        this.eventsCall(),
        this.internalEvents(),
        this.addTriggerableEvents(),
        this.trigger("initialized")
    },
    a.prototype.setup = function() {
      var e = this.viewport(),
        i = this.options.responsive,
        s = -1,
        a = null;
      i ? (t.each(i, function(t) {
            e >= t && t > s && (s = Number(t))
          }),
          a = t.extend({}, this.options, i[s]),
          delete a.responsive,
          a.responsiveClass && this.$element.attr("class", function(t, e) {
            return e.replace(/\b owl-responsive-\S+/g, "")
          }).addClass("owl-responsive-" + s)) : a = t.extend({}, this.options),
        (null === this.settings || this._breakpoint !== s) && (this.trigger("change", {
            property: {
              name: "settings",
              value: a
            }
          }),
          this._breakpoint = s,
          this.settings = a,
          this.invalidate("settings"),
          this.trigger("changed", {
            property: {
              name: "settings",
              value: this.settings
            }
          }))
    },
    a.prototype.optionsLogic = function() {
      this.$element.toggleClass("owl-center", this.settings.center),
        this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1),
        this.settings.autoWidth && (this.settings.stagePadding = !1,
          this.settings.merge = !1)
    },
    a.prototype.prepare = function(e) {
      var i = this.trigger("prepare", {
        content: e
      });
      return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)),
        this.trigger("prepared", {
          content: i.data
        }),
        i.data
    },
    a.prototype.update = function() {
      for (var e = 0, i = this._pipe.length, s = t.proxy(function(t) {
          return this[t]
        }, this._invalidated), a = {}; i > e;)
        (this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(a),
        e++;
      this._invalidated = {}
    },
    a.prototype.width = function(t) {
      switch (t = t || a.Width.Default) {
        case a.Width.Inner:
        case a.Width.Outer:
          return this._width;
        default:
          return this._width - 2 * this.settings.stagePadding + this.settings.margin
      }
    },
    a.prototype.refresh = function() {
      return 0 === this._items.length ? !1 : ((new Date).getTime(),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$stage.addClass("owl-refresh"),
        this.update(),
        this.$stage.removeClass("owl-refresh"),
        this.state.orientation = e.orientation,
        this.watchVisibility(),
        this.trigger("refreshed"),
        void 0)
    },
    a.prototype.eventsCall = function() {
      this.e._onDragStart = t.proxy(function(t) {
          this.onDragStart(t)
        }, this),
        this.e._onDragMove = t.proxy(function(t) {
          this.onDragMove(t)
        }, this),
        this.e._onDragEnd = t.proxy(function(t) {
          this.onDragEnd(t)
        }, this),
        this.e._onResize = t.proxy(function(t) {
          this.onResize(t)
        }, this),
        this.e._transitionEnd = t.proxy(function(t) {
          this.transitionEnd(t)
        }, this),
        this.e._preventClick = t.proxy(function(t) {
          this.preventClick(t)
        }, this)
    },
    a.prototype.onThrottledResize = function() {
      e.clearTimeout(this.resizeTimer),
        this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    },
    a.prototype.onResize = function() {
      return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(),
        this.invalidate("width"),
        this.refresh(),
        void this.trigger("resized")) : !1
    },
    a.prototype.eventsRouter = function(t) {
      var e = t.type;
      "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
    },
    a.prototype.internalEvents = function() {
      var i = (p(),
        h());
      this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function(t) {
            this.eventsRouter(t)
          }, this)),
          this.$stage.on("dragstart", function() {
            return !1
          }),
          this.$stage.get(0).onselectstart = function() {
            return !1
          }
        ) : this.$element.addClass("owl-text-select-on"),
        this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function(t) {
          this.eventsRouter(t)
        }, this)),
        this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1),
        this.settings.responsive !== !1 && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
    },
    a.prototype.onDragStart = function(s) {
      var a, o, r, l;
      if (a = s.originalEvent || s || e.event,
        3 === a.which || this.state.isTouch)
        return !1;
      if ("mousedown" === a.type && this.$stage.addClass("owl-grab"),
        this.trigger("drag"),
        this.drag.startTime = (new Date).getTime(),
        this.speed(0),
        this.state.isTouch = !0,
        this.state.isScrolling = !1,
        this.state.isSwiping = !1,
        this.drag.distance = 0,
        o = n(a).x,
        r = n(a).y,
        this.drag.offsetX = this.$stage.position().left,
        this.drag.offsetY = this.$stage.position().top,
        this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin),
        this.state.inMotion && this.support3d)
        l = this.getTransformProperty(),
        this.drag.offsetX = l,
        this.animate(l),
        this.state.inMotion = !0;
      else if (this.state.inMotion && !this.support3d)
        return this.state.inMotion = !1, !1;
      this.drag.startX = o - this.drag.offsetX,
        this.drag.startY = r - this.drag.offsetY,
        this.drag.start = o - this.drag.startX,
        this.drag.targetEl = a.target || a.srcElement,
        this.drag.updatedX = this.drag.start,
        ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1),
        t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function(t) {
          this.eventsRouter(t)
        }, this))
    },
    a.prototype.onDragMove = function(t) {
      var i, a, o, r, l, d;
      this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event,
        a = n(i).x,
        o = n(i).y,
        this.drag.currentX = a - this.drag.startX,
        this.drag.currentY = o - this.drag.startY,
        this.drag.distance = this.drag.currentX - this.drag.offsetX,
        this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"),
        this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (r = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()),
          l = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()),
          d = this.settings.pullDrag ? this.drag.distance / 5 : 0,
          this.drag.currentX = Math.max(Math.min(this.drag.currentX, r + d), l + d)),
        (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== s ? i.preventDefault() : i.returnValue = !1,
          this.state.isSwiping = !0),
        this.drag.updatedX = this.drag.currentX,
        (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0,
          this.drag.updatedX = this.drag.start),
        this.animate(this.drag.updatedX)))
    },
    a.prototype.onDragEnd = function(e) {
      var s, a, n;
      if (this.state.isTouch) {
        if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"),
          this.trigger("dragged"),
          this.drag.targetEl.removeAttribute("draggable"),
          this.state.isTouch = !1,
          this.state.isScrolling = !1,
          this.state.isSwiping = !1,
          0 === this.drag.distance && this.state.inMotion !== !0)
          return this.state.inMotion = !1, !1;
        this.drag.endTime = (new Date).getTime(),
          s = this.drag.endTime - this.drag.startTime,
          a = Math.abs(this.drag.distance),
          (a > 3 || s > 300) && this.removeClick(this.drag.targetEl),
          n = this.closest(this.drag.updatedX),
          this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(n),
          this.invalidate("position"),
          this.update(),
          this.settings.pullDrag || this.drag.updatedX !== this.coordinates(n) || this.transitionEnd(),
          this.drag.distance = 0,
          t(i).off(".owl.dragEvents")
      }
    },
    a.prototype.removeClick = function(i) {
      this.drag.targetEl = i,
        t(i).on("click.preventClick", this.e._preventClick),
        e.setTimeout(function() {
          t(i).off("click.preventClick")
        }, 300)
    },
    a.prototype.preventClick = function(e) {
      e.preventDefault ? e.preventDefault() : e.returnValue = !1,
        e.stopPropagation && e.stopPropagation(),
        t(e.target).off("click.preventClick")
    },
    a.prototype.getTransformProperty = function() {
      var t, i;
      return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"),
        t = t.replace(/matrix(3d)?\(|\)/g, "").split(","),
        i = 16 === t.length,
        i !== !0 ? t[4] : t[12]
    },
    a.prototype.closest = function(e) {
      var i = -1,
        s = 30,
        a = this.width(),
        n = this.coordinates();
      return this.settings.freeDrag || t.each(n, t.proxy(function(t, o) {
          return e > o - s && o + s > e ? i = t : this.op(e, "<", o) && this.op(e, ">", n[t + 1] || o - a) && (i = "left" === this.state.direction ? t + 1 : t), -1 === i
        }, this)),
        this.settings.loop || (this.op(e, ">", n[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", n[this.maximum()]) && (i = e = this.maximum())),
        i
    },
    a.prototype.animate = function(e) {
      this.trigger("translate"),
        this.state.inMotion = this.speed() > 0,
        this.support3d ? this.$stage.css({
          transform: "translate3d(" + e + "px,0px, 0px)",
          transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
          left: e + "px"
        }) : this.$stage.animate({
          left: e
        }, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function() {
          this.state.inMotion && this.transitionEnd()
        }, this))
    },
    a.prototype.current = function(t) {
      if (t === s)
        return this._current;
      if (0 === this._items.length)
        return s;
      if (t = this.normalize(t),
        this._current !== t) {
        var e = this.trigger("change", {
          property: {
            name: "position",
            value: t
          }
        });
        e.data !== s && (t = this.normalize(e.data)),
          this._current = t,
          this.invalidate("position"),
          this.trigger("changed", {
            property: {
              name: "position",
              value: this._current
            }
          })
      }
      return this._current
    },
    a.prototype.invalidate = function(t) {
      this._invalidated[t] = !0
    },
    a.prototype.reset = function(t) {
      t = this.normalize(t),
        t !== s && (this._speed = 0,
          this._current = t,
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(t)),
          this.release(["translate", "translated"]))
    },
    a.prototype.normalize = function(e, i) {
      var a = i ? this._items.length : this._items.length + this._clones.length;
      return !t.isNumeric(e) || 1 > a ? s : e = this._clones.length ? (e % a + a) % a : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
    },
    a.prototype.relative = function(t) {
      return t = this.normalize(t),
        t -= this._clones.length / 2,
        this.normalize(t, !0)
    },
    a.prototype.maximum = function(t) {
      var e, i, s, a = 0,
        n = this.settings;
      if (t)
        return this._items.length - 1;
      if (!n.loop && n.center)
        e = this._items.length - 1;
      else if (n.loop || n.center)
        if (n.loop || n.center)
          e = this._items.length + n.items;
        else {
          if (!n.autoWidth && !n.merge)
            throw "Can not detect maximum absolute position.";
          for (revert = n.rtl ? 1 : -1,
            i = this.$stage.width() - this.$element.width();
            (s = this.coordinates(a)) && !(s * revert >= i);)
            e = ++a
        }
      else
        e = this._items.length - n.items;
      return e
    },
    a.prototype.minimum = function(t) {
      return t ? 0 : this._clones.length / 2
    },
    a.prototype.items = function(t) {
      return t === s ? this._items.slice() : (t = this.normalize(t, !0),
        this._items[t])
    },
    a.prototype.mergers = function(t) {
      return t === s ? this._mergers.slice() : (t = this.normalize(t, !0),
        this._mergers[t])
    },
    a.prototype.clones = function(e) {
      var i = this._clones.length / 2,
        a = i + this._items.length,
        n = function(t) {
          return t % 2 === 0 ? a + t / 2 : i - (t + 1) / 2
        };
      return e === s ? t.map(this._clones, function(t, e) {
        return n(e)
      }) : t.map(this._clones, function(t, i) {
        return t === e ? n(i) : null
      })
    },
    a.prototype.speed = function(t) {
      return t !== s && (this._speed = t),
        this._speed
    },
    a.prototype.coordinates = function(e) {
      var i = null;
      return e === s ? t.map(this._coordinates, t.proxy(function(t, e) {
        return this.coordinates(e)
      }, this)) : (this.settings.center ? (i = this._coordinates[e],
          i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0,
        i)
    },
    a.prototype.duration = function(t, e, i) {
      return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    },
    a.prototype.to = function(i, s) {
      if (this.settings.loop) {
        var a = i - this.relative(this.current()),
          n = this.current(),
          o = this.current(),
          r = this.current() + a,
          l = 0 > o - r,
          d = this._clones.length + this._items.length;
        r < this.settings.items && l === !1 ? (n = o + this._items.length,
            this.reset(n)) : r >= d - this.settings.items && l === !0 && (n = o - this._items.length,
            this.reset(n)),
          e.clearTimeout(this.e._goToLoop),
          this.e._goToLoop = e.setTimeout(t.proxy(function() {
            this.speed(this.duration(this.current(), n + a, s)),
              this.current(n + a),
              this.update()
          }, this), 30)
      } else
        this.speed(this.duration(this.current(), i, s)),
        this.current(i),
        this.update()
    },
    a.prototype.next = function(t) {
      t = t || !1,
        this.to(this.relative(this.current()) + 1, t)
    },
    a.prototype.prev = function(t) {
      t = t || !1,
        this.to(this.relative(this.current()) - 1, t)
    },
    a.prototype.transitionEnd = function(t) {
      return t !== s && (t.stopPropagation(),
        (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1,
        void this.trigger("translated"))
    },
    a.prototype.viewport = function() {
      var s;
      if (this.options.responsiveBaseElement !== e)
        s = t(this.options.responsiveBaseElement).width();
      else if (e.innerWidth)
        s = e.innerWidth;
      else {
        if (!i.documentElement || !i.documentElement.clientWidth)
          throw "Can not detect viewport width.";
        s = i.documentElement.clientWidth
      }
      return s
    },
    a.prototype.replace = function(e) {
      this.$stage.empty(),
        this._items = [],
        e && (e = e instanceof jQuery ? e : t(e)),
        this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)),
        e.filter(function() {
          return 1 === this.nodeType
        }).each(t.proxy(function(t, e) {
          e = this.prepare(e),
            this.$stage.append(e),
            this._items.push(e),
            this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)),
        this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
        this.invalidate("items")
    },
    a.prototype.add = function(t, e) {
      e = e === s ? this._items.length : this.normalize(e, !0),
        this.trigger("add", {
          content: t,
          position: e
        }),
        0 === this._items.length || e === this._items.length ? (this.$stage.append(t),
          this._items.push(t),
          this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t),
          this._items.splice(e, 0, t),
          this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)),
        this.invalidate("items"),
        this.trigger("added", {
          content: t,
          position: e
        })
    },
    a.prototype.remove = function(t) {
      t = this.normalize(t, !0),
        t !== s && (this.trigger("remove", {
            content: this._items[t],
            position: t
          }),
          this._items[t].remove(),
          this._items.splice(t, 1),
          this._mergers.splice(t, 1),
          this.invalidate("items"),
          this.trigger("removed", {
            content: null,
            position: t
          }))
    },
    a.prototype.addTriggerableEvents = function() {
      var e = t.proxy(function(e, i) {
        return t.proxy(function(t) {
          t.relatedTarget !== this && (this.suppress([i]),
            e.apply(this, [].slice.call(arguments, 1)),
            this.release([i]))
        }, this)
      }, this);
      t.each({
        next: this.next,
        prev: this.prev,
        to: this.to,
        destroy: this.destroy,
        refresh: this.refresh,
        replace: this.replace,
        add: this.add,
        remove: this.remove
      }, t.proxy(function(t, i) {
        this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
      }, this))
    },
    a.prototype.watchVisibility = function() {
      function i(t) {
        return t.offsetWidth > 0 && t.offsetHeight > 0
      }

      function s() {
        i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"),
          this.refresh(),
          e.clearInterval(this.e._checkVisibile))
      }
      i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"),
        e.clearInterval(this.e._checkVisibile),
        this.e._checkVisibile = e.setInterval(t.proxy(s, this), 500))
    },
    a.prototype.preloadAutoWidthImages = function(e) {
      var i, s, a, n;
      i = 0,
        s = this,
        e.each(function(o, r) {
          a = t(r),
            n = new Image,
            n.onload = function() {
              i++,
              a.attr("src", n.src),
                a.css("opacity", 1),
                i >= e.length && (s.state.imagesLoaded = !0,
                  s.initialize())
            },
            n.src = a.attr("src") || a.attr("data-src") || a.attr("data-src-retina")
        })
    },
    a.prototype.destroy = function() {
      this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass),
        this.settings.responsive !== !1 && t(e).off("resize.owl.carousel"),
        this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
      for (var s in this._plugins)
        this._plugins[s].destroy();
      (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"),
        t(i).off(".owl.dragEvents"),
        this.$stage.get(0).onselectstart = function() {},
        this.$stage.off("dragstart", function() {
          return !1
        })),
      this.$element.off(".owl"),
        this.$stage.children(".cloned").remove(),
        this.e = null,
        this.$element.removeData("owlCarousel"),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.unwrap()
    },
    a.prototype.op = function(t, e, i) {
      var s = this.settings.rtl;
      switch (e) {
        case "<":
          return s ? t > i : i > t;
        case ">":
          return s ? i > t : t > i;
        case ">=":
          return s ? i >= t : t >= i;
        case "<=":
          return s ? t >= i : i >= t
      }
    },
    a.prototype.on = function(t, e, i, s) {
      t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
    },
    a.prototype.off = function(t, e, i, s) {
      t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
    },
    a.prototype.trigger = function(e, i, s) {
      var a = {
          item: {
            count: this._items.length,
            index: this.current()
          }
        },
        n = t.camelCase(t.grep(["on", e, s], function(t) {
          return t
        }).join("-").toLowerCase()),
        o = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({
          relatedTarget: this
        }, a, i));
      return this._supress[e] || (t.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(o)
          }),
          this.$element.trigger(o),
          this.settings && "function" == typeof this.settings[n] && this.settings[n].apply(this, o)),
        o
    },
    a.prototype.suppress = function(e) {
      t.each(e, t.proxy(function(t, e) {
        this._supress[e] = !0
      }, this))
    },
    a.prototype.release = function(e) {
      t.each(e, t.proxy(function(t, e) {
        delete this._supress[e]
      }, this))
    },
    a.prototype.browserSupport = function() {
      if (this.support3d = d(),
        this.support3d) {
        this.transformVendor = l();
        var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
        this.transitionEndVendor = t[r()],
          this.vendorName = this.transformVendor.replace(/Transform/i, ""),
          this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
      }
      this.state.orientation = e.orientation
    },
    t.fn.owlCarousel = function(e) {
      return this.each(function() {
        t(this).data("owlCarousel") || t(this).data("owlCarousel", new a(this, e))
      })
    },
    t.fn.owlCarousel.Constructor = a
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
  var i = function(e) {
    this._core = e,
      this._loaded = [],
      this._handlers = {
        "initialized.owl.carousel change.owl.carousel": t.proxy(function(e) {
          if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
            for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, a = i.center && -1 * s || 0, n = (e.property && e.property.value || this._core.current()) + a, o = this._core.clones().length, r = t.proxy(function(t, e) {
                this.load(e)
              }, this); a++ < s;)
              this.load(o / 2 + this._core.relative(n)),
              o && t.each(this._core.clones(this._core.relative(n++)), r)
        }, this)
      },
      this._core.options = t.extend({}, i.Defaults, this._core.options),
      this._core.$element.on(this._handlers)
  };
  i.Defaults = {
      lazyLoad: !1
    },
    i.prototype.load = function(i) {
      var s = this._core.$stage.children().eq(i),
        a = s && s.find(".owl-lazy");
      !a || t.inArray(s.get(0), this._loaded) > -1 || (a.each(t.proxy(function(i, s) {
          var a, n = t(s),
            o = e.devicePixelRatio > 1 && n.attr("data-src-retina") || n.attr("data-src");
          this._core.trigger("load", {
              element: n,
              url: o
            }, "lazy"),
            n.is("img") ? n.one("load.owl.lazy", t.proxy(function() {
              n.css("opacity", 1),
                this._core.trigger("loaded", {
                  element: n,
                  url: o
                }, "lazy")
            }, this)).attr("src", o) : (a = new Image,
              a.onload = t.proxy(function() {
                n.css({
                    "background-image": "url(" + o + ")",
                    opacity: "1"
                  }),
                  this._core.trigger("loaded", {
                    element: n,
                    url: o
                  }, "lazy")
              }, this),
              a.src = o)
        }, this)),
        this._loaded.push(s.get(0)))
    },
    i.prototype.destroy = function() {
      var t, e;
      for (t in this.handlers)
        this._core.$element.off(t, this.handlers[t]);
      for (e in Object.getOwnPropertyNames(this))
        "function" != typeof this[e] && (this[e] = null)
    },
    t.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document),
function(t) {
  var e = function(i) {
    this._core = i,
      this._handlers = {
        "initialized.owl.carousel": t.proxy(function() {
          this._core.settings.autoHeight && this.update()
        }, this),
        "changed.owl.carousel": t.proxy(function(t) {
          this._core.settings.autoHeight && "position" == t.property.name && this.update()
        }, this),
        "loaded.owl.lazy": t.proxy(function(t) {
          this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
        }, this)
      },
      this._core.options = t.extend({}, e.Defaults, this._core.options),
      this._core.$element.on(this._handlers)
  };
  e.Defaults = {
      autoHeight: !1,
      autoHeightClass: "owl-height"
    },
    e.prototype.update = function() {
      this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    },
    e.prototype.destroy = function() {
      var t, e;
      for (t in this._handlers)
        this._core.$element.off(t, this._handlers[t]);
      for (e in Object.getOwnPropertyNames(this))
        "function" != typeof this[e] && (this[e] = null)
    },
    t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(t, e, i) {
  var s = function(e) {
    this._core = e,
      this._videos = {},
      this._playing = null,
      this._fullscreen = !1,
      this._handlers = {
        "resize.owl.carousel": t.proxy(function(t) {
          this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
        }, this),
        "refresh.owl.carousel changed.owl.carousel": t.proxy(function() {
          this._playing && this.stop()
        }, this),
        "prepared.owl.carousel": t.proxy(function(e) {
          var i = t(e.content).find(".owl-video");
          i.length && (i.css("display", "none"),
            this.fetch(i, t(e.content)))
        }, this)
      },
      this._core.options = t.extend({}, s.Defaults, this._core.options),
      this._core.$element.on(this._handlers),
      this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
        this.play(t)
      }, this))
  };
  s.Defaults = {
      video: !1,
      videoHeight: !1,
      videoWidth: !1
    },
    s.prototype.fetch = function(t, e) {
      var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube",
        s = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
        a = t.attr("data-width") || this._core.settings.videoWidth,
        n = t.attr("data-height") || this._core.settings.videoHeight,
        o = t.attr("href");
      if (!o)
        throw new Error("Missing video URL.");
      if (s = o.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
        s[3].indexOf("youtu") > -1)
        i = "youtube";
      else {
        if (!(s[3].indexOf("vimeo") > -1))
          throw new Error("Video URL not supported.");
        i = "vimeo"
      }
      s = s[6],
        this._videos[o] = {
          type: i,
          id: s,
          width: a,
          height: n
        },
        e.attr("data-video", o),
        this.thumbnail(t, this._videos[o])
    },
    s.prototype.thumbnail = function(e, i) {
      var s, a, n, o = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
        r = e.find("img"),
        l = "src",
        d = "",
        p = this._core.settings,
        h = function(t) {
          a = '<div class="owl-video-play-icon"></div>',
            s = p.lazyLoad ? '<div class="owl-video-tn ' + d + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
            e.after(s),
            e.after(a)
        };
      return e.wrap('<div class="owl-video-wrapper"' + o + "></div>"),
        this._core.settings.lazyLoad && (l = "data-src",
          d = "owl-lazy"),
        r.length ? (h(r.attr(l)),
          r.remove(), !1) : void("youtube" === i.type ? (n = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg",
          h(n)) : "vimeo" === i.type && t.ajax({
          type: "GET",
          url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
          jsonp: "callback",
          dataType: "jsonp",
          success: function(t) {
            n = t[0].thumbnail_large,
              h(n)
          }
        }))
    },
    s.prototype.stop = function() {
      this._core.trigger("stop", null, "video"),
        this._playing.find(".owl-video-frame").remove(),
        this._playing.removeClass("owl-video-playing"),
        this._playing = null
    },
    s.prototype.play = function(e) {
      this._core.trigger("play", null, "video"),
        this._playing && this.stop();
      var i, s, a = t(e.target || e.srcElement),
        n = a.closest("." + this._core.settings.itemClass),
        o = this._videos[n.attr("data-video")],
        r = o.width || "100%",
        l = o.height || this._core.$stage.height();
      "youtube" === o.type ? i = '<iframe width="' + r + '" height="' + l + '" src="http://www.youtube.com/embed/' + o.id + "?autoplay=1&v=" + o.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === o.type && (i = '<iframe src="http://player.vimeo.com/video/' + o.id + '?autoplay=1" width="' + r + '" height="' + l + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
        n.addClass("owl-video-playing"),
        this._playing = n,
        s = t('<div style="height:' + l + "px; width:" + r + 'px" class="owl-video-frame">' + i + "</div>"),
        a.after(s)
    },
    s.prototype.isInFullScreen = function() {
      var s = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
      return s && t(s).parent().hasClass("owl-video-frame") && (this._core.speed(0),
          this._fullscreen = !0),
        s && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== e.orientation ? (this._core.state.orientation = e.orientation, !1) : !0
    },
    s.prototype.destroy = function() {
      var t, e;
      this._core.$element.off("click.owl.video");
      for (t in this._handlers)
        this._core.$element.off(t, this._handlers[t]);
      for (e in Object.getOwnPropertyNames(this))
        "function" != typeof this[e] && (this[e] = null)
    },
    t.fn.owlCarousel.Constructor.Plugins.Video = s
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
  var a = function(e) {
    this.core = e,
      this.core.options = t.extend({}, a.Defaults, this.core.options),
      this.swapping = !0,
      this.previous = s,
      this.next = s,
      this.handlers = {
        "change.owl.carousel": t.proxy(function(t) {
          "position" == t.property.name && (this.previous = this.core.current(),
            this.next = t.property.value)
        }, this),
        "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
          this.swapping = "translated" == t.type
        }, this),
        "translate.owl.carousel": t.proxy(function() {
          this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
        }, this)
      },
      this.core.$element.on(this.handlers)
  };
  a.Defaults = {
      animateOut: !1,
      animateIn: !1
    },
    a.prototype.swap = function() {
      if (1 === this.core.settings.items && this.core.support3d) {
        this.core.speed(0);
        var e, i = t.proxy(this.clear, this),
          s = this.core.$stage.children().eq(this.previous),
          a = this.core.$stage.children().eq(this.next),
          n = this.core.settings.animateIn,
          o = this.core.settings.animateOut;
        this.core.current() !== this.previous && (o && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
            s.css({
              left: e + "px"
            }).addClass("animated owl-animated-out").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)),
          n && a.addClass("animated owl-animated-in").addClass(n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
      }
    },
    a.prototype.clear = function(e) {
      t(e.target).css({
          left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
        this.core.transitionEnd()
    },
    a.prototype.destroy = function() {
      var t, e;
      for (t in this.handlers)
        this.core.$element.off(t, this.handlers[t]);
      for (e in Object.getOwnPropertyNames(this))
        "function" != typeof this[e] && (this[e] = null)
    },
    t.fn.owlCarousel.Constructor.Plugins.Animate = a
}(window.Zepto || window.jQuery, window, document),
function(t, e, i) {
  var s = function(e) {
    this.core = e,
      this.core.options = t.extend({}, s.Defaults, this.core.options),
      this.handlers = {
        "translated.owl.carousel refreshed.owl.carousel": t.proxy(function() {
          this.autoplay()
        }, this),
        "play.owl.autoplay": t.proxy(function(t, e, i) {
          this.play(e, i)
        }, this),
        "stop.owl.autoplay": t.proxy(function() {
          this.stop()
        }, this),
        "mouseover.owl.autoplay": t.proxy(function() {
          this.core.settings.autoplayHoverPause && this.pause()
        }, this),
        "mouseleave.owl.autoplay": t.proxy(function() {
          this.core.settings.autoplayHoverPause && this.autoplay()
        }, this)
      },
      this.core.$element.on(this.handlers)
  };
  s.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1
    },
    s.prototype.autoplay = function() {
      this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval),
        this.interval = e.setInterval(t.proxy(function() {
          this.play()
        }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
    },
    s.prototype.play = function() {
      return i.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    },
    s.prototype.stop = function() {
      e.clearInterval(this.interval)
    },
    s.prototype.pause = function() {
      e.clearInterval(this.interval)
    },
    s.prototype.destroy = function() {
      var t, i;
      e.clearInterval(this.interval);
      for (t in this.handlers)
        this.core.$element.off(t, this.handlers[t]);
      for (i in Object.getOwnPropertyNames(this))
        "function" != typeof this[i] && (this[i] = null)
    },
    t.fn.owlCarousel.Constructor.Plugins.autoplay = s
}(window.Zepto || window.jQuery, window, document),
function(t) {
  "use strict";
  var e = function(i) {
    this._core = i,
      this._initialized = !1,
      this._pages = [],
      this._controls = {},
      this._templates = [],
      this.$element = this._core.$element,
      this._overrides = {
        next: this._core.next,
        prev: this._core.prev,
        to: this._core.to
      },
      this._handlers = {
        "prepared.owl.carousel": t.proxy(function(e) {
          this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
        }, this),
        "add.owl.carousel": t.proxy(function(e) {
          this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
        }, this),
        "remove.owl.carousel prepared.owl.carousel": t.proxy(function(t) {
          this._core.settings.dotsData && this._templates.splice(t.position, 1)
        }, this),
        "change.owl.carousel": t.proxy(function(t) {
          if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
            var e = this._core.current(),
              i = this._core.maximum(),
              s = this._core.minimum();
            t.data = t.property.value > i ? e >= i ? s : i : t.property.value < s ? i : t.property.value
          }
        }, this),
        "changed.owl.carousel": t.proxy(function(t) {
          "position" == t.property.name && this.draw()
        }, this),
        "refreshed.owl.carousel": t.proxy(function() {
          this._initialized || (this.initialize(),
              this._initialized = !0),
            this._core.trigger("refresh", null, "navigation"),
            this.update(),
            this.draw(),
            this._core.trigger("refreshed", null, "navigation")
        }, this)
      },
      this._core.options = t.extend({}, e.Defaults, this._core.options),
      this.$element.on(this._handlers)
  };
  e.Defaults = {
      nav: !1,
      navRewind: !0,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
      controlsClass: "owl-controls"
    },
    e.prototype.initialize = function() {
      var e, i, s = this._core.settings;
      s.dotsData || (this._templates = [t("<div>").addClass(s.dotClass).append(t("<span>")).prop("outerHTML")]),
        s.navContainer && s.dotsContainer || (this._controls.$container = t("<div>").addClass(s.controlsClass).appendTo(this.$element)),
        this._controls.$indicators = s.dotsContainer ? t(s.dotsContainer) : t("<div>").hide().addClass(s.dotsClass).appendTo(this._controls.$container),
        this._controls.$indicators.on("click", "div", t.proxy(function(e) {
          var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
          e.preventDefault(),
            this.to(i, s.dotsSpeed)
        }, this)),
        e = s.navContainer ? t(s.navContainer) : t("<div>").addClass(s.navContainerClass).prependTo(this._controls.$container),
        this._controls.$next = t("<" + s.navElement + ">"),
        this._controls.$previous = this._controls.$next.clone(),
        this._controls.$previous.addClass(s.navClass[0]).html(s.navText[0]).hide().prependTo(e).on("click", t.proxy(function() {
          this.prev(s.navSpeed)
        }, this)),
        this._controls.$next.addClass(s.navClass[1]).html(s.navText[1]).hide().appendTo(e).on("click", t.proxy(function() {
          this.next(s.navSpeed)
        }, this));
      for (i in this._overrides)
        this._core[i] = t.proxy(this[i], this)
    },
    e.prototype.destroy = function() {
      var t, e, i, s;
      for (t in this._handlers)
        this.$element.off(t, this._handlers[t]);
      for (e in this._controls)
        this._controls[e].remove();
      for (s in this.overides)
        this._core[s] = this._overrides[s];
      for (i in Object.getOwnPropertyNames(this))
        "function" != typeof this[i] && (this[i] = null)
    },
    e.prototype.update = function() {
      var t, e, i, s = this._core.settings,
        a = this._core.clones().length / 2,
        n = a + this._core.items().length,
        o = s.center || s.autoWidth || s.dotData ? 1 : s.dotsEach || s.items;
      if ("page" !== s.slideBy && (s.slideBy = Math.min(s.slideBy, s.items)),
        s.dots || "page" == s.slideBy)
        for (this._pages = [],
          t = a,
          e = 0,
          i = 0; n > t; t++)
          (e >= o || 0 === e) && (this._pages.push({
              start: t - a,
              end: t - a + o - 1
            }),
            e = 0,
            ++i),
          e += this._core.mergers(this._core.relative(t))
    },
    e.prototype.draw = function() {
      var e, i, s = "",
        a = this._core.settings,
        n = (this._core.$stage.children(),
          this._core.relative(this._core.current()));
      if (!a.nav || a.loop || a.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= n),
          this._controls.$next.toggleClass("disabled", n >= this._core.maximum())),
        this._controls.$previous.toggle(a.nav),
        this._controls.$next.toggle(a.nav),
        a.dots) {
        if (e = this._pages.length - this._controls.$indicators.children().length,
          a.dotData && 0 !== e) {
          for (i = 0; i < this._controls.$indicators.children().length; i++)
            s += this._templates[this._core.relative(i)];
          this._controls.$indicators.html(s)
        } else
          e > 0 ? (s = new Array(e + 1).join(this._templates[0]),
            this._controls.$indicators.append(s)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
        this._controls.$indicators.find(".active").removeClass("active"),
          this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
      }
      this._controls.$indicators.toggle(a.dots)
    },
    e.prototype.onTrigger = function(e) {
      var i = this._core.settings;
      e.page = {
        index: t.inArray(this.current(), this._pages),
        count: this._pages.length,
        size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
      }
    },
    e.prototype.current = function() {
      var e = this._core.relative(this._core.current());
      return t.grep(this._pages, function(t) {
        return t.start <= e && t.end >= e
      }).pop()
    },
    e.prototype.getPosition = function(e) {
      var i, s, a = this._core.settings;
      return "page" == a.slideBy ? (i = t.inArray(this.current(), this._pages),
          s = this._pages.length,
          e ? ++i : --i,
          i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()),
          s = this._core.items().length,
          e ? i += a.slideBy : i -= a.slideBy),
        i
    },
    e.prototype.next = function(e) {
      t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    },
    e.prototype.prev = function(e) {
      t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    },
    e.prototype.to = function(e, i, s) {
      var a;
      s ? t.proxy(this._overrides.to, this._core)(e, i) : (a = this._pages.length,
        t.proxy(this._overrides.to, this._core)(this._pages[(e % a + a) % a].start, i))
    },
    t.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
  "use strict";
  var i = function(s) {
    this._core = s,
      this._hashes = {},
      this.$element = this._core.$element,
      this._handlers = {
        "initialized.owl.carousel": t.proxy(function() {
          "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
        }, this),
        "prepared.owl.carousel": t.proxy(function(e) {
          var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
          this._hashes[i] = e.content
        }, this)
      },
      this._core.options = t.extend({}, i.Defaults, this._core.options),
      this.$element.on(this._handlers),
      t(e).on("hashchange.owl.navigation", t.proxy(function() {
        var t = e.location.hash.substring(1),
          i = this._core.$stage.children(),
          s = this._hashes[t] && i.index(this._hashes[t]) || 0;
        return t ? void this._core.to(s, !1, !0) : !1
      }, this))
  };
  i.Defaults = {
      URLhashListener: !1
    },
    i.prototype.destroy = function() {
      var i, s;
      t(e).off("hashchange.owl.navigation");
      for (i in this._handlers)
        this._core.$element.off(i, this._handlers[i]);
      for (s in Object.getOwnPropertyNames(this))
        "function" != typeof this[s] && (this[s] = null)
    },
    t.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document),
function(t) {
  function e(e, i, s, a) {
    var n = e.text(),
      o = n.split(i),
      r = "";
    o.length && (t(o).each(function(t, e) {
        r += '<span class="' + s + (t + 1) + '" aria-hidden="true">' + e + "</span>" + a
      }),
      e.attr("aria-label", n).empty().append(r))
  }
  var i = {
    init: function() {
      return this.each(function() {
        e(t(this), "", "char", "")
      })
    },
    words: function() {
      return this.each(function() {
        e(t(this), " ", "word", " ")
      })
    },
    lines: function() {
      return this.each(function() {
        var i = "eefec303079ad17405c889e092e105b0";
        e(t(this).children("br").replaceWith(i).end(), i, "line", "")
      })
    }
  };
  t.fn.lettering = function(e) {
    return e && i[e] ? i[e].apply(this, [].slice.call(arguments, 1)) : "letters" !== e && e ? (t.error("Method " + e + " does not exist on jQuery.lettering"),
      this) : i.init.apply(this, [].slice.call(arguments, 0))
  }
}(jQuery),
function(t) {
  "use strict";

  function e(e) {
    return /In/.test(e) || t.inArray(e, t.fn.textillate.defaults.inEffects) >= 0
  }

  function i(e) {
    return /Out/.test(e) || t.inArray(e, t.fn.textillate.defaults.outEffects) >= 0
  }

  function s(t) {
    return "true" !== t && "false" !== t ? t : "true" === t
  }

  function a(e) {
    var i = e.attributes || [],
      a = {};
    return i.length ? (t.each(i, function(t, e) {
        var i = e.nodeName.replace(/delayscale/, "delayScale");
        /^data-in-*/.test(i) ? (a["in"] = a["in"] || {},
          a["in"][i.replace(/data-in-/, "")] = s(e.nodeValue)) : /^data-out-*/.test(i) ? (a.out = a.out || {},
          a.out[i.replace(/data-out-/, "")] = s(e.nodeValue)) : /^data-*/.test(i) && (a[i.replace(/data-/, "")] = s(e.nodeValue))
      }),
      a) : a
  }

  function n(t) {
    for (var e, i, s = t.length; s; e = parseInt(Math.random() * s),
      i = t[--s],
      t[s] = t[e],
      t[e] = i)
    ;
    return t
  }

  function o(t, e, i) {
    t.addClass("animated " + e).css("visibility", "visible").show(),
      t.one("animationend webkitAnimationEnd oAnimationEnd", function() {
        t.removeClass("animated " + e),
          i && i()
      })
  }

  function r(s, a, r) {
    var l = s.length;
    return l ? (a.shuffle && (s = n(s)),
      a.reverse && (s = s.toArray().reverse()),
      void t.each(s, function(s, n) {
        function d() {
          e(a.effect) ? p.css("visibility", "visible") : i(a.effect) && p.css("visibility", "hidden"),
            l -= 1, !l && r && r()
        }
        var p = t(n),
          h = a.sync ? a.delay : a.delay * s * a.delayScale;
        p.text() ? setTimeout(function() {
          o(p, a.effect, d)
        }, h) : d()
      })) : void(r && r())
  }
  var l = function(s, n) {
    var o = this,
      l = t(s);
    o.init = function() {
        o.$texts = l.find(n.selector),
          o.$texts.length || (o.$texts = t('<ul class="texts"><li>' + l.html() + "</li></ul>"),
            l.html(o.$texts)),
          o.$texts.hide(),
          o.$current = t("<span>").html(o.$texts.find(":first-child").html()).prependTo(l),
          e(n["in"].effect) ? o.$current.css("visibility", "hidden") : i(n.out.effect) && o.$current.css("visibility", "visible"),
          o.setOptions(n),
          o.timeoutRun = null,
          setTimeout(function() {
            o.options.autoStart && o.start()
          }, o.options.initialDelay)
      },
      o.setOptions = function(t) {
        o.options = t
      },
      o.triggerEvent = function(e) {
        var i = t.Event(e + ".tlt");
        return l.trigger(i, o),
          i
      },
      o["in"] = function(s, n) {
        s = s || 0;
        var l, d = o.$texts.find(":nth-child(" + ((s || 0) + 1) + ")"),
          p = t.extend(!0, {}, o.options, d.length ? a(d[0]) : {});
        d.addClass("current"),
          o.triggerEvent("inAnimationBegin"),
          o.$current.html(d.html()).lettering("words"),
          "char" == o.options.type && o.$current.find('[class^="word"]').css({
            display: "inline-block",
            "-webkit-transform": "translate3d(0,0,0)",
            "-moz-transform": "translate3d(0,0,0)",
            "-o-transform": "translate3d(0,0,0)",
            transform: "translate3d(0,0,0)"
          }).each(function() {
            t(this).lettering()
          }),
          l = o.$current.find('[class^="' + o.options.type + '"]').css("display", "inline-block"),
          e(p["in"].effect) ? l.css("visibility", "hidden") : i(p["in"].effect) && l.css("visibility", "visible"),
          o.currentIndex = s,
          r(l, p["in"], function() {
            o.triggerEvent("inAnimationEnd"),
              p["in"].callback && p["in"].callback(),
              n && n(o)
          })
      },
      o.out = function(e) {
        var i = o.$texts.find(":nth-child(" + ((o.currentIndex || 0) + 1) + ")"),
          s = o.$current.find('[class^="' + o.options.type + '"]'),
          n = t.extend(!0, {}, o.options, i.length ? a(i[0]) : {});
        o.triggerEvent("outAnimationBegin"),
          r(s, n.out, function() {
            i.removeClass("current"),
              o.triggerEvent("outAnimationEnd"),
              n.out.callback && n.out.callback(),
              e && e(o)
          })
      },
      o.start = function(t) {
        setTimeout(function() {
          o.triggerEvent("start"),
            function e(t) {
              o["in"](t, function() {
                var i = o.$texts.children().length;
                t += 1, !o.options.loop && t >= i ? (o.options.callback && o.options.callback(),
                  o.triggerEvent("end")) : (t %= i,
                  o.timeoutRun = setTimeout(function() {
                    o.out(function() {
                      e(t)
                    })
                  }, o.options.minDisplayTime))
              })
            }(t || 0)
        }, o.options.initialDelay)
      },
      o.stop = function() {
        o.timeoutRun && (clearInterval(o.timeoutRun),
          o.timeoutRun = null)
      },
      o.init()
  };
  t.fn.textillate = function(e, i) {
      return this.each(function() {
        var s = t(this),
          n = s.data("textillate"),
          o = t.extend(!0, {}, t.fn.textillate.defaults, a(this), "object" == typeof e && e);
        n ? "string" == typeof e ? n[e].apply(n, [].concat(i)) : n.setOptions.call(n, o) : s.data("textillate", n = new l(this, o))
      })
    },
    t.fn.textillate.defaults = {
      selector: ".texts",
      loop: !1,
      minDisplayTime: 2e3,
      initialDelay: 0,
      "in": {
        effect: "fadeInLeftBig",
        delayScale: 1.5,
        delay: 50,
        sync: !1,
        reverse: !1,
        shuffle: !1,
        callback: function() {}
      },
      out: {
        effect: "hinge",
        delayScale: 1.5,
        delay: 50,
        sync: !1,
        reverse: !1,
        shuffle: !1,
        callback: function() {}
      },
      autoStart: !0,
      inEffects: [],
      outEffects: ["hinge"],
      callback: function() {},
      type: "char"
    }
}(jQuery),
function(t, e, i) {
  t.fn.backstretch = function(s, a) {
      return (s === i || 0 === s.length) && t.error("No images were supplied for Backstretch"),
        0 === t(e).scrollTop() && e.scrollTo(0, 0),
        this.each(function() {
          var e = t(this),
            i = e.data("backstretch");
          if (i) {
            if ("string" == typeof s && "function" == typeof i[s])
              return void i[s](a);
            a = t.extend(i.options, a),
              i.destroy(!0)
          }
          i = new n(this, s, a),
            e.data("backstretch", i)
        })
    },
    t.backstretch = function(e, i) {
      return t("body").backstretch(e, i).data("backstretch")
    },
    t.expr[":"].backstretch = function(e) {
      return t(e).data("backstretch") !== i
    },
    t.fn.backstretch.defaults = {
      centeredX: !0,
      centeredY: !0,
      duration: 5e3,
      fade: 0
    };
  var s = {
      left: 0,
      top: 0,
      overflow: "hidden",
      margin: 0,
      padding: 0,
      height: "100%",
      width: "100%",
      zIndex: -999999
    },
    a = {
      position: "absolute",
      display: "none",
      margin: 0,
      padding: 0,
      border: "none",
      width: "auto",
      height: "auto",
      maxHeight: "none",
      maxWidth: "none",
      zIndex: -999999
    },
    n = function(i, a, n) {
      this.options = t.extend({}, t.fn.backstretch.defaults, n || {}),
        this.images = t.isArray(a) ? a : [a],
        t.each(this.images, function() {
          t("<img />")[0].src = this
        }),
        this.isBody = i === document.body,
        this.$container = t(i),
        this.$root = this.isBody ? t(o ? e : document) : this.$container,
        i = this.$container.children(".backstretch").first(),
        this.$wrap = i.length ? i : t('<div class="backstretch"></div>').css(s).appendTo(this.$container),
        this.isBody || (i = this.$container.css("position"),
          a = this.$container.css("zIndex"),
          this.$container.css({
            position: "static" === i ? "relative" : i,
            zIndex: "auto" === a ? 0 : a,
            background: "none"
          }),
          this.$wrap.css({
            zIndex: -999998
          })),
        this.$wrap.css({
          position: this.isBody && o ? "fixed" : "absolute"
        }),
        this.index = 0,
        this.show(this.index),
        t(e).on("resize.backstretch", t.proxy(this.resize, this)).on("orientationchange.backstretch", t.proxy(function() {
          this.isBody && 0 === e.pageYOffset && (e.scrollTo(0, 1),
            this.resize())
        }, this))
    };
  n.prototype = {
    resize: function() {
      try {
        var t, i = {
            left: 0,
            top: 0
          },
          s = this.isBody ? this.$root.width() : this.$root.innerWidth(),
          a = s,
          n = this.isBody ? e.innerHeight ? e.innerHeight : this.$root.height() : this.$root.innerHeight(),
          o = a / this.$img.data("ratio");
        o >= n ? (t = (o - n) / 2,
            this.options.centeredY && (i.top = "-" + t + "px")) : (o = n,
            a = o * this.$img.data("ratio"),
            t = (a - s) / 2,
            this.options.centeredX && (i.left = "-" + t + "px")),
          this.$wrap.css({
            width: s,
            height: n
          }).find("img:not(.deleteable)").css({
            width: a,
            height: o
          }).css(i)
      } catch (r) {}
      return this
    },
    show: function(e) {
      if (!(Math.abs(e) > this.images.length - 1)) {
        var i = this,
          s = i.$wrap.find("img").addClass("deleteable"),
          n = {
            relatedTarget: i.$container[0]
          };
        return i.$container.trigger(t.Event("backstretch.before", n), [i, e]),
          this.index = e,
          clearInterval(i.interval),
          i.$img = t("<img />").css(a).bind("load", function(a) {
            var o = this.width || t(a.target).width();
            a = this.height || t(a.target).height(),
              t(this).data("ratio", o / a),
              t(this).fadeIn(i.options.speed || i.options.fade, function() {
                s.remove(),
                  i.paused || i.cycle(),
                  t(["after", "show"]).each(function() {
                    i.$container.trigger(t.Event("backstretch." + this, n), [i, e])
                  })
              }),
              i.resize()
          }).appendTo(i.$wrap),
          i.$img.attr("src", i.images[e]),
          i
      }
    },
    next: function() {
      return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
    },
    prev: function() {
      return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
    },
    pause: function() {
      return this.paused = !0,
        this
    },
    resume: function() {
      return this.paused = !1,
        this.next(),
        this
    },
    cycle: function() {
      return 1 < this.images.length && (clearInterval(this.interval),
          this.interval = setInterval(t.proxy(function() {
            this.paused || this.next()
          }, this), this.options.duration)),
        this
    },
    destroy: function(i) {
      t(e).off("resize.backstretch orientationchange.backstretch"),
        clearInterval(this.interval),
        i || this.$wrap.remove(),
        this.$container.removeData("backstretch")
    }
  };
  var o, r = navigator.userAgent,
    l = navigator.platform,
    d = r.match(/AppleWebKit\/([0-9]+)/),
    d = !!d && d[1],
    p = r.match(/Fennec\/([0-9]+)/),
    p = !!p && p[1],
    h = r.match(/Opera Mobi\/([0-9]+)/),
    c = !!h && h[1],
    u = r.match(/MSIE ([0-9]+)/),
    u = !!u && u[1];
  o = !((-1 < l.indexOf("iPhone") || -1 < l.indexOf("iPad") || -1 < l.indexOf("iPod")) && d && 534 > d || e.operamini && "[object OperaMini]" === {}.toString.call(e.operamini) || h && 7458 > c || -1 < r.indexOf("Android") && d && 533 > d || p && 6 > p || "palmGetResource" in e && d && 534 > d || -1 < r.indexOf("MeeGo") && -1 < r.indexOf("NokiaBrowser/8.5.0") || u && 6 >= u)
}(jQuery, window), ! function() {
  "use strict";

  function t(t) {
    t.fn.swiper = function(e) {
      var s;
      return t(this).each(function() {
          var t = new i(this, e);
          s || (s = t)
        }),
        s
    }
  }
  var e, i = function(t, s) {
    function a(t) {
      return Math.floor(t)
    }

    function n() {
      y.autoplayTimeoutId = setTimeout(function() {
        y.params.loop ? (y.fixLoop(),
          y._slideNext(),
          y.emit("onAutoplay", y)) : y.isEnd ? s.autoplayStopOnLast ? y.stopAutoplay() : (y._slideTo(0),
          y.emit("onAutoplay", y)) : (y._slideNext(),
          y.emit("onAutoplay", y))
      }, y.params.autoplay)
    }

    function o(t, i) {
      var s = e(t.target);
      if (!s.is(i))
        if ("string" == typeof i)
          s = s.parents(i);
        else if (i.nodeType) {
        var a;
        return s.parents().each(function(t, e) {
            e === i && (a = i)
          }),
          a ? i : void 0
      }
      return 0 !== s.length ? s[0] : void 0
    }

    function r(t, e) {
      e = e || {};
      var i = window.MutationObserver || window.WebkitMutationObserver,
        s = new i(function(t) {
          t.forEach(function(t) {
            y.onResize(!0),
              y.emit("onObserverUpdate", y, t)
          })
        });
      s.observe(t, {
          attributes: "undefined" == typeof e.attributes ? !0 : e.attributes,
          childList: "undefined" == typeof e.childList ? !0 : e.childList,
          characterData: "undefined" == typeof e.characterData ? !0 : e.characterData
        }),
        y.observers.push(s)
    }

    function l(t) {
      t.originalEvent && (t = t.originalEvent);
      var e = t.keyCode || t.charCode;
      if (!y.params.allowSwipeToNext && (y.isHorizontal() && 39 === e || !y.isHorizontal() && 40 === e))
        return !1;
      if (!y.params.allowSwipeToPrev && (y.isHorizontal() && 37 === e || !y.isHorizontal() && 38 === e))
        return !1;
      if (!(t.shiftKey || t.altKey || t.ctrlKey || t.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
        if (37 === e || 39 === e || 38 === e || 40 === e) {
          var i = !1;
          if (y.container.parents(".swiper-slide").length > 0 && 0 === y.container.parents(".swiper-slide-active").length)
            return;
          var s = {
              left: window.pageXOffset,
              top: window.pageYOffset
            },
            a = window.innerWidth,
            n = window.innerHeight,
            o = y.container.offset();
          y.rtl && (o.left = o.left - y.container[0].scrollLeft);
          for (var r = [
              [o.left, o.top],
              [o.left + y.width, o.top],
              [o.left, o.top + y.height],
              [o.left + y.width, o.top + y.height]
            ], l = 0; l < r.length; l++) {
            var d = r[l];
            d[0] >= s.left && d[0] <= s.left + a && d[1] >= s.top && d[1] <= s.top + n && (i = !0)
          }
          if (!i)
            return
        }
        y.isHorizontal() ? ((37 === e || 39 === e) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1),
          (39 === e && !y.rtl || 37 === e && y.rtl) && y.slideNext(),
          (37 === e && !y.rtl || 39 === e && y.rtl) && y.slidePrev()) : ((38 === e || 40 === e) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1),
          40 === e && y.slideNext(),
          38 === e && y.slidePrev())
      }
    }

    function d(t) {
      t.originalEvent && (t = t.originalEvent);
      var e = y.mousewheel.event,
        i = 0,
        s = y.rtl ? -1 : 1;
      if ("mousewheel" === e)
        if (y.params.mousewheelForceToAxis)
          if (y.isHorizontal()) {
            if (!(Math.abs(t.wheelDeltaX) > Math.abs(t.wheelDeltaY)))
              return;
            i = t.wheelDeltaX * s
          } else {
            if (!(Math.abs(t.wheelDeltaY) > Math.abs(t.wheelDeltaX)))
              return;
            i = t.wheelDeltaY
          }
      else
        i = Math.abs(t.wheelDeltaX) > Math.abs(t.wheelDeltaY) ? -t.wheelDeltaX * s : -t.wheelDeltaY;
      else if ("DOMMouseScroll" === e)
        i = -t.detail;
      else if ("wheel" === e)
        if (y.params.mousewheelForceToAxis)
          if (y.isHorizontal()) {
            if (!(Math.abs(t.deltaX) > Math.abs(t.deltaY)))
              return;
            i = -t.deltaX * s
          } else {
            if (!(Math.abs(t.deltaY) > Math.abs(t.deltaX)))
              return;
            i = -t.deltaY
          }
      else
        i = Math.abs(t.deltaX) > Math.abs(t.deltaY) ? -t.deltaX * s : -t.deltaY;
      if (0 !== i) {
        if (y.params.mousewheelInvert && (i = -i),
          y.params.freeMode) {
          var a = y.getWrapperTranslate() + i * y.params.mousewheelSensitivity,
            n = y.isBeginning,
            o = y.isEnd;
          if (a >= y.minTranslate() && (a = y.minTranslate()),
            a <= y.maxTranslate() && (a = y.maxTranslate()),
            y.setWrapperTransition(0),
            y.setWrapperTranslate(a),
            y.updateProgress(),
            y.updateActiveIndex(),
            (!n && y.isBeginning || !o && y.isEnd) && y.updateClasses(),
            y.params.freeModeSticky ? (clearTimeout(y.mousewheel.timeout),
              y.mousewheel.timeout = setTimeout(function() {
                y.slideReset()
              }, 300)) : y.params.lazyLoading && y.lazy && y.lazy.load(),
            0 === a || a === y.maxTranslate())
            return
        } else {
          if ((new window.Date).getTime() - y.mousewheel.lastScrollTime > 60)
            if (0 > i)
              if (y.isEnd && !y.params.loop || y.animating) {
                if (y.params.mousewheelReleaseOnEdges)
                  return !0
              } else
                y.slideNext();
          else if (y.isBeginning && !y.params.loop || y.animating) {
            if (y.params.mousewheelReleaseOnEdges)
              return !0
          } else
            y.slidePrev();
          y.mousewheel.lastScrollTime = (new window.Date).getTime()
        }
        return y.params.autoplay && y.stopAutoplay(),
          t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
      }
    }

    function p(t, i) {
      t = e(t);
      var s, a, n, o = y.rtl ? -1 : 1;
      s = t.attr("data-swiper-parallax") || "0",
        a = t.attr("data-swiper-parallax-x"),
        n = t.attr("data-swiper-parallax-y"),
        a || n ? (a = a || "0",
          n = n || "0") : y.isHorizontal() ? (a = s,
          n = "0") : (n = s,
          a = "0"),
        a = a.indexOf("%") >= 0 ? parseInt(a, 10) * i * o + "%" : a * i * o + "px",
        n = n.indexOf("%") >= 0 ? parseInt(n, 10) * i + "%" : n * i + "px",
        t.transform("translate3d(" + a + ", " + n + ",0px)")
    }

    function h(t) {
      return 0 !== t.indexOf("on") && (t = t[0] !== t[0].toUpperCase() ? "on" + t[0].toUpperCase() + t.substring(1) : "on" + t),
        t
    }
    if (!(this instanceof i))
      return new i(t, s);
    var c = {
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        autoplay: !1,
        autoplayDisableOnInteraction: !0,
        autoplayStopOnLast: !1,
        iOSEdgeSwipeDetection: !1,
        iOSEdgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: !0
        },
        flip: {
          slideShadows: !0,
          limitRotation: !0
        },
        cube: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: .94
        },
        fade: {
          crossFade: !1
        },
        parallax: !1,
        scrollbar: null,
        scrollbarHide: !0,
        scrollbarDraggable: !1,
        scrollbarSnapOnRelease: !1,
        keyboardControl: !1,
        mousewheelControl: !1,
        mousewheelReleaseOnEdges: !1,
        mousewheelInvert: !1,
        mousewheelForceToAxis: !1,
        mousewheelSensitivity: 1,
        hashnav: !1,
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        onlyExternal: !1,
        threshold: 0,
        touchMoveStopPropagation: !0,
        uniqueNavElements: !0,
        pagination: null,
        paginationElement: "span",
        paginationClickable: !1,
        paginationHide: !1,
        paginationBulletRender: null,
        paginationProgressRender: null,
        paginationFractionRender: null,
        paginationCustomRender: null,
        paginationType: "bullets",
        resistance: !0,
        resistanceRatio: .85,
        nextButton: null,
        prevButton: null,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        lazyLoading: !1,
        lazyLoadingInPrevNext: !1,
        lazyLoadingInPrevNextAmount: 1,
        lazyLoadingOnTransitionStart: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        control: void 0,
        controlInverse: !1,
        controlBy: "slide",
        allowSwipeToPrev: !0,
        allowSwipeToNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        buttonDisabledClass: "swiper-button-disabled",
        paginationCurrentClass: "swiper-pagination-current",
        paginationTotalClass: "swiper-pagination-total",
        paginationHiddenClass: "swiper-pagination-hidden",
        paginationProgressbarClass: "swiper-pagination-progressbar",
        observer: !1,
        observeParents: !1,
        a11y: !1,
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        runCallbacksOnInit: !0
      },
      u = s && s.virtualTranslate;
    s = s || {};
    var f = {};
    for (var m in s)
      if ("object" != typeof s[m] || null === s[m] || s[m].nodeType || s[m] === window || s[m] === document || "undefined" != typeof Dom7 && s[m] instanceof Dom7 || "undefined" != typeof jQuery && s[m] instanceof jQuery)
        f[m] = s[m];
      else {
        f[m] = {};
        for (var g in s[m])
          f[m][g] = s[m][g]
      }
    for (var v in c)
      if ("undefined" == typeof s[v])
        s[v] = c[v];
      else if ("object" == typeof s[v])
      for (var w in c[v])
        "undefined" == typeof s[v][w] && (s[v][w] = c[v][w]);
    var y = this;
    if (y.params = s,
      y.originalParams = f,
      y.classNames = [],
      "undefined" != typeof e && "undefined" != typeof Dom7 && (e = Dom7),
      ("undefined" != typeof e || (e = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (y.$ = e,
        y.currentBreakpoint = void 0,
        y.getActiveBreakpoint = function() {
          if (!y.params.breakpoints)
            return !1;
          var t, e = !1,
            i = [];
          for (t in y.params.breakpoints)
            y.params.breakpoints.hasOwnProperty(t) && i.push(t);
          i.sort(function(t, e) {
            return parseInt(t, 10) > parseInt(e, 10)
          });
          for (var s = 0; s < i.length; s++)
            t = i[s],
            t >= window.innerWidth && !e && (e = t);
          return e || "max"
        },
        y.setBreakpoint = function() {
          var t = y.getActiveBreakpoint();
          if (t && y.currentBreakpoint !== t) {
            var e = t in y.params.breakpoints ? y.params.breakpoints[t] : y.originalParams,
              i = y.params.loop && e.slidesPerView !== y.params.slidesPerView;
            for (var s in e)
              y.params[s] = e[s];
            y.currentBreakpoint = t,
              i && y.destroyLoop && y.reLoop(!0)
          }
        },
        y.params.breakpoints && y.setBreakpoint(),
        y.container = e(t),
        0 !== y.container.length)) {
      if (y.container.length > 1) {
        var b = [];
        return y.container.each(function() {
            b.push(new i(this, s))
          }),
          b
      }
      y.container[0].swiper = y,
        y.container.data("swiper", y),
        y.classNames.push("swiper-container-" + y.params.direction),
        y.params.freeMode && y.classNames.push("swiper-container-free-mode"),
        y.support.flexbox || (y.classNames.push("swiper-container-no-flexbox"),
          y.params.slidesPerColumn = 1),
        y.params.autoHeight && y.classNames.push("swiper-container-autoheight"),
        (y.params.parallax || y.params.watchSlidesVisibility) && (y.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(y.params.effect) >= 0 && (y.support.transforms3d ? (y.params.watchSlidesProgress = !0,
          y.classNames.push("swiper-container-3d")) : y.params.effect = "slide"),
        "slide" !== y.params.effect && y.classNames.push("swiper-container-" + y.params.effect),
        "cube" === y.params.effect && (y.params.resistanceRatio = 0,
          y.params.slidesPerView = 1,
          y.params.slidesPerColumn = 1,
          y.params.slidesPerGroup = 1,
          y.params.centeredSlides = !1,
          y.params.spaceBetween = 0,
          y.params.virtualTranslate = !0,
          y.params.setWrapperSize = !1),
        ("fade" === y.params.effect || "flip" === y.params.effect) && (y.params.slidesPerView = 1,
          y.params.slidesPerColumn = 1,
          y.params.slidesPerGroup = 1,
          y.params.watchSlidesProgress = !0,
          y.params.spaceBetween = 0,
          y.params.setWrapperSize = !1,
          "undefined" == typeof u && (y.params.virtualTranslate = !0)),
        y.params.grabCursor && y.support.touch && (y.params.grabCursor = !1),
        y.wrapper = y.container.children("." + y.params.wrapperClass),
        y.params.pagination && (y.paginationContainer = e(y.params.pagination),
          y.params.uniqueNavElements && "string" == typeof y.params.pagination && y.paginationContainer.length > 1 && 1 === y.container.find(y.params.pagination).length && (y.paginationContainer = y.container.find(y.params.pagination)),
          "bullets" === y.params.paginationType && y.params.paginationClickable ? y.paginationContainer.addClass("swiper-pagination-clickable") : y.params.paginationClickable = !1,
          y.paginationContainer.addClass("swiper-pagination-" + y.params.paginationType)),
        (y.params.nextButton || y.params.prevButton) && (y.params.nextButton && (y.nextButton = e(y.params.nextButton),
            y.params.uniqueNavElements && "string" == typeof y.params.nextButton && y.nextButton.length > 1 && 1 === y.container.find(y.params.nextButton).length && (y.nextButton = y.container.find(y.params.nextButton))),
          y.params.prevButton && (y.prevButton = e(y.params.prevButton),
            y.params.uniqueNavElements && "string" == typeof y.params.prevButton && y.prevButton.length > 1 && 1 === y.container.find(y.params.prevButton).length && (y.prevButton = y.container.find(y.params.prevButton)))),
        y.isHorizontal = function() {
          return "horizontal" === y.params.direction
        },
        y.rtl = y.isHorizontal() && ("rtl" === y.container[0].dir.toLowerCase() || "rtl" === y.container.css("direction")),
        y.rtl && y.classNames.push("swiper-container-rtl"),
        y.rtl && (y.wrongRTL = "-webkit-box" === y.wrapper.css("display")),
        y.params.slidesPerColumn > 1 && y.classNames.push("swiper-container-multirow"),
        y.device.android && y.classNames.push("swiper-container-android"),
        y.container.addClass(y.classNames.join(" ")),
        y.translate = 0,
        y.progress = 0,
        y.velocity = 0,
        y.lockSwipeToNext = function() {
          y.params.allowSwipeToNext = !1
        },
        y.lockSwipeToPrev = function() {
          y.params.allowSwipeToPrev = !1
        },
        y.lockSwipes = function() {
          y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !1
        },
        y.unlockSwipeToNext = function() {
          y.params.allowSwipeToNext = !0
        },
        y.unlockSwipeToPrev = function() {
          y.params.allowSwipeToPrev = !0
        },
        y.unlockSwipes = function() {
          y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !0
        },
        y.params.grabCursor && (y.container[0].style.cursor = "move",
          y.container[0].style.cursor = "-webkit-grab",
          y.container[0].style.cursor = "-moz-grab",
          y.container[0].style.cursor = "grab"),
        y.imagesToLoad = [],
        y.imagesLoaded = 0,
        y.loadImage = function(t, e, i, s, a) {
          function n() {
            a && a()
          }
          var o;
          t.complete && s ? n() : e ? (o = new window.Image,
            o.onload = n,
            o.onerror = n,
            i && (o.srcset = i),
            e && (o.src = e)) : n()
        },
        y.preloadImages = function() {
          function t() {
            "undefined" != typeof y && null !== y && (void 0 !== y.imagesLoaded && y.imagesLoaded++,
              y.imagesLoaded === y.imagesToLoad.length && (y.params.updateOnImagesReady && y.update(),
                y.emit("onImagesReady", y)))
          }
          y.imagesToLoad = y.container.find("img");
          for (var e = 0; e < y.imagesToLoad.length; e++)
            y.loadImage(y.imagesToLoad[e], y.imagesToLoad[e].currentSrc || y.imagesToLoad[e].getAttribute("src"), y.imagesToLoad[e].srcset || y.imagesToLoad[e].getAttribute("srcset"), !0, t)
        },
        y.autoplayTimeoutId = void 0,
        y.autoplaying = !1,
        y.autoplayPaused = !1,
        y.startAutoplay = function() {
          return "undefined" != typeof y.autoplayTimeoutId ? !1 : y.params.autoplay ? y.autoplaying ? !1 : (y.autoplaying = !0,
            y.emit("onAutoplayStart", y),
            void n()) : !1
        },
        y.stopAutoplay = function(t) {
          y.autoplayTimeoutId && (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId),
            y.autoplaying = !1,
            y.autoplayTimeoutId = void 0,
            y.emit("onAutoplayStop", y))
        },
        y.pauseAutoplay = function(t) {
          y.autoplayPaused || (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId),
            y.autoplayPaused = !0,
            0 === t ? (y.autoplayPaused = !1,
              n()) : y.wrapper.transitionEnd(function() {
              y && (y.autoplayPaused = !1,
                y.autoplaying ? n() : y.stopAutoplay())
            }))
        },
        y.minTranslate = function() {
          return -y.snapGrid[0]
        },
        y.maxTranslate = function() {
          return -y.snapGrid[y.snapGrid.length - 1]
        },
        y.updateAutoHeight = function() {
          var t = y.slides.eq(y.activeIndex)[0];
          if ("undefined" != typeof t) {
            var e = t.offsetHeight;
            e && y.wrapper.css("height", e + "px")
          }
        },
        y.updateContainerSize = function() {
          var t, e;
          t = "undefined" != typeof y.params.width ? y.params.width : y.container[0].clientWidth,
            e = "undefined" != typeof y.params.height ? y.params.height : y.container[0].clientHeight,
            0 === t && y.isHorizontal() || 0 === e && !y.isHorizontal() || (t = t - parseInt(y.container.css("padding-left"), 10) - parseInt(y.container.css("padding-right"), 10),
              e = e - parseInt(y.container.css("padding-top"), 10) - parseInt(y.container.css("padding-bottom"), 10),
              y.width = t,
              y.height = e,
              y.size = y.isHorizontal() ? y.width : y.height)
        },
        y.updateSlidesSize = function() {
          y.slides = y.wrapper.children("." + y.params.slideClass),
            y.snapGrid = [],
            y.slidesGrid = [],
            y.slidesSizesGrid = [];
          var t, e = y.params.spaceBetween,
            i = -y.params.slidesOffsetBefore,
            s = 0,
            n = 0;
          if ("undefined" != typeof y.size) {
            "string" == typeof e && e.indexOf("%") >= 0 && (e = parseFloat(e.replace("%", "")) / 100 * y.size),
              y.virtualSize = -e,
              y.rtl ? y.slides.css({
                marginLeft: "",
                marginTop: ""
              }) : y.slides.css({
                marginRight: "",
                marginBottom: ""
              });
            var o;
            y.params.slidesPerColumn > 1 && (o = Math.floor(y.slides.length / y.params.slidesPerColumn) === y.slides.length / y.params.slidesPerColumn ? y.slides.length : Math.ceil(y.slides.length / y.params.slidesPerColumn) * y.params.slidesPerColumn,
              "auto" !== y.params.slidesPerView && "row" === y.params.slidesPerColumnFill && (o = Math.max(o, y.params.slidesPerView * y.params.slidesPerColumn)));
            var r, l = y.params.slidesPerColumn,
              d = o / l,
              p = d - (y.params.slidesPerColumn * d - y.slides.length);
            for (t = 0; t < y.slides.length; t++) {
              r = 0;
              var h = y.slides.eq(t);
              if (y.params.slidesPerColumn > 1) {
                var c, u, f;
                "column" === y.params.slidesPerColumnFill ? (u = Math.floor(t / l),
                    f = t - u * l,
                    (u > p || u === p && f === l - 1) && ++f >= l && (f = 0,
                      u++),
                    c = u + f * o / l,
                    h.css({
                      "-webkit-box-ordinal-group": c,
                      "-moz-box-ordinal-group": c,
                      "-ms-flex-order": c,
                      "-webkit-order": c,
                      order: c
                    })) : (f = Math.floor(t / d),
                    u = t - f * d),
                  h.css({
                    "margin-top": 0 !== f && y.params.spaceBetween && y.params.spaceBetween + "px"
                  }).attr("data-swiper-column", u).attr("data-swiper-row", f)
              }
              "none" !== h.css("display") && ("auto" === y.params.slidesPerView ? (r = y.isHorizontal() ? h.outerWidth(!0) : h.outerHeight(!0),
                  y.params.roundLengths && (r = a(r))) : (r = (y.size - (y.params.slidesPerView - 1) * e) / y.params.slidesPerView,
                  y.params.roundLengths && (r = a(r)),
                  y.isHorizontal() ? y.slides[t].style.width = r + "px" : y.slides[t].style.height = r + "px"),
                y.slides[t].swiperSlideSize = r,
                y.slidesSizesGrid.push(r),
                y.params.centeredSlides ? (i = i + r / 2 + s / 2 + e,
                  0 === t && (i = i - y.size / 2 - e),
                  Math.abs(i) < .001 && (i = 0),
                  n % y.params.slidesPerGroup === 0 && y.snapGrid.push(i),
                  y.slidesGrid.push(i)) : (n % y.params.slidesPerGroup === 0 && y.snapGrid.push(i),
                  y.slidesGrid.push(i),
                  i = i + r + e),
                y.virtualSize += r + e,
                s = r,
                n++)
            }
            y.virtualSize = Math.max(y.virtualSize, y.size) + y.params.slidesOffsetAfter;
            var m;
            if (y.rtl && y.wrongRTL && ("slide" === y.params.effect || "coverflow" === y.params.effect) && y.wrapper.css({
                width: y.virtualSize + y.params.spaceBetween + "px"
              }),
              (!y.support.flexbox || y.params.setWrapperSize) && (y.isHorizontal() ? y.wrapper.css({
                width: y.virtualSize + y.params.spaceBetween + "px"
              }) : y.wrapper.css({
                height: y.virtualSize + y.params.spaceBetween + "px"
              })),
              y.params.slidesPerColumn > 1 && (y.virtualSize = (r + y.params.spaceBetween) * o,
                y.virtualSize = Math.ceil(y.virtualSize / y.params.slidesPerColumn) - y.params.spaceBetween,
                y.wrapper.css({
                  width: y.virtualSize + y.params.spaceBetween + "px"
                }),
                y.params.centeredSlides)) {
              for (m = [],
                t = 0; t < y.snapGrid.length; t++)
                y.snapGrid[t] < y.virtualSize + y.snapGrid[0] && m.push(y.snapGrid[t]);
              y.snapGrid = m
            }
            if (!y.params.centeredSlides) {
              for (m = [],
                t = 0; t < y.snapGrid.length; t++)
                y.snapGrid[t] <= y.virtualSize - y.size && m.push(y.snapGrid[t]);
              y.snapGrid = m,
                Math.floor(y.virtualSize - y.size) - Math.floor(y.snapGrid[y.snapGrid.length - 1]) > 1 && y.snapGrid.push(y.virtualSize - y.size)
            }
            0 === y.snapGrid.length && (y.snapGrid = [0]),
              0 !== y.params.spaceBetween && (y.isHorizontal() ? y.rtl ? y.slides.css({
                marginLeft: e + "px"
              }) : y.slides.css({
                marginRight: e + "px"
              }) : y.slides.css({
                marginBottom: e + "px"
              })),
              y.params.watchSlidesProgress && y.updateSlidesOffset()
          }
        },
        y.updateSlidesOffset = function() {
          for (var t = 0; t < y.slides.length; t++)
            y.slides[t].swiperSlideOffset = y.isHorizontal() ? y.slides[t].offsetLeft : y.slides[t].offsetTop
        },
        y.updateSlidesProgress = function(t) {
          if ("undefined" == typeof t && (t = y.translate || 0),
            0 !== y.slides.length) {
            "undefined" == typeof y.slides[0].swiperSlideOffset && y.updateSlidesOffset();
            var e = -t;
            y.rtl && (e = t),
              y.slides.removeClass(y.params.slideVisibleClass);
            for (var i = 0; i < y.slides.length; i++) {
              var s = y.slides[i],
                a = (e - s.swiperSlideOffset) / (s.swiperSlideSize + y.params.spaceBetween);
              if (y.params.watchSlidesVisibility) {
                var n = -(e - s.swiperSlideOffset),
                  o = n + y.slidesSizesGrid[i],
                  r = n >= 0 && n < y.size || o > 0 && o <= y.size || 0 >= n && o >= y.size;
                r && y.slides.eq(i).addClass(y.params.slideVisibleClass)
              }
              s.progress = y.rtl ? -a : a
            }
          }
        },
        y.updateProgress = function(t) {
          "undefined" == typeof t && (t = y.translate || 0);
          var e = y.maxTranslate() - y.minTranslate(),
            i = y.isBeginning,
            s = y.isEnd;
          0 === e ? (y.progress = 0,
              y.isBeginning = y.isEnd = !0) : (y.progress = (t - y.minTranslate()) / e,
              y.isBeginning = y.progress <= 0,
              y.isEnd = y.progress >= 1),
            y.isBeginning && !i && y.emit("onReachBeginning", y),
            y.isEnd && !s && y.emit("onReachEnd", y),
            y.params.watchSlidesProgress && y.updateSlidesProgress(t),
            y.emit("onProgress", y, y.progress)
        },
        y.updateActiveIndex = function() {
          var t, e, i, s = y.rtl ? y.translate : -y.translate;
          for (e = 0; e < y.slidesGrid.length; e++)
            "undefined" != typeof y.slidesGrid[e + 1] ? s >= y.slidesGrid[e] && s < y.slidesGrid[e + 1] - (y.slidesGrid[e + 1] - y.slidesGrid[e]) / 2 ? t = e : s >= y.slidesGrid[e] && s < y.slidesGrid[e + 1] && (t = e + 1) : s >= y.slidesGrid[e] && (t = e);
          (0 > t || "undefined" == typeof t) && (t = 0),
          i = Math.floor(t / y.params.slidesPerGroup),
            i >= y.snapGrid.length && (i = y.snapGrid.length - 1),
            t !== y.activeIndex && (y.snapIndex = i,
              y.previousIndex = y.activeIndex,
              y.activeIndex = t,
              y.updateClasses())
        },
        y.updateClasses = function() {
          y.slides.removeClass(y.params.slideActiveClass + " " + y.params.slideNextClass + " " + y.params.slidePrevClass);
          var t = y.slides.eq(y.activeIndex);
          t.addClass(y.params.slideActiveClass);
          var i = t.next("." + y.params.slideClass).addClass(y.params.slideNextClass);
          y.params.loop && 0 === i.length && y.slides.eq(0).addClass(y.params.slideNextClass);
          var s = t.prev("." + y.params.slideClass).addClass(y.params.slidePrevClass);
          if (y.params.loop && 0 === s.length && y.slides.eq(-1).addClass(y.params.slidePrevClass),
            y.paginationContainer && y.paginationContainer.length > 0) {
            var a, n = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length;
            if (y.params.loop ? (a = Math.ceil((y.activeIndex - y.loopedSlides) / y.params.slidesPerGroup),
                a > y.slides.length - 1 - 2 * y.loopedSlides && (a -= y.slides.length - 2 * y.loopedSlides),
                a > n - 1 && (a -= n),
                0 > a && "bullets" !== y.params.paginationType && (a = n + a)) : a = "undefined" != typeof y.snapIndex ? y.snapIndex : y.activeIndex || 0,
              "bullets" === y.params.paginationType && y.bullets && y.bullets.length > 0 && (y.bullets.removeClass(y.params.bulletActiveClass),
                y.paginationContainer.length > 1 ? y.bullets.each(function() {
                  e(this).index() === a && e(this).addClass(y.params.bulletActiveClass)
                }) : y.bullets.eq(a).addClass(y.params.bulletActiveClass)),
              "fraction" === y.params.paginationType && (y.paginationContainer.find("." + y.params.paginationCurrentClass).text(a + 1),
                y.paginationContainer.find("." + y.params.paginationTotalClass).text(n)),
              "progress" === y.params.paginationType) {
              var o = (a + 1) / n,
                r = o,
                l = 1;
              y.isHorizontal() || (l = o,
                  r = 1),
                y.paginationContainer.find("." + y.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + r + ") scaleY(" + l + ")").transition(y.params.speed)
            }
            "custom" === y.params.paginationType && y.params.paginationCustomRender && (y.paginationContainer.html(y.params.paginationCustomRender(y, a + 1, n)),
              y.emit("onPaginationRendered", y, y.paginationContainer[0]))
          }
          y.params.loop || (y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.isBeginning ? (y.prevButton.addClass(y.params.buttonDisabledClass),
              y.params.a11y && y.a11y && y.a11y.disable(y.prevButton)) : (y.prevButton.removeClass(y.params.buttonDisabledClass),
              y.params.a11y && y.a11y && y.a11y.enable(y.prevButton))),
            y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.isEnd ? (y.nextButton.addClass(y.params.buttonDisabledClass),
              y.params.a11y && y.a11y && y.a11y.disable(y.nextButton)) : (y.nextButton.removeClass(y.params.buttonDisabledClass),
              y.params.a11y && y.a11y && y.a11y.enable(y.nextButton))))
        },
        y.updatePagination = function() {
          if (y.params.pagination && y.paginationContainer && y.paginationContainer.length > 0) {
            var t = "";
            if ("bullets" === y.params.paginationType) {
              for (var e = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length, i = 0; e > i; i++)
                t += y.params.paginationBulletRender ? y.params.paginationBulletRender(i, y.params.bulletClass) : "<" + y.params.paginationElement + ' class="' + y.params.bulletClass + '"></' + y.params.paginationElement + ">";
              y.paginationContainer.html(t),
                y.bullets = y.paginationContainer.find("." + y.params.bulletClass),
                y.params.paginationClickable && y.params.a11y && y.a11y && y.a11y.initPagination()
            }
            "fraction" === y.params.paginationType && (t = y.params.paginationFractionRender ? y.params.paginationFractionRender(y, y.params.paginationCurrentClass, y.params.paginationTotalClass) : '<span class="' + y.params.paginationCurrentClass + '"></span> / <span class="' + y.params.paginationTotalClass + '"></span>',
                y.paginationContainer.html(t)),
              "progress" === y.params.paginationType && (t = y.params.paginationProgressRender ? y.params.paginationProgressRender(y, y.params.paginationProgressbarClass) : '<span class="' + y.params.paginationProgressbarClass + '"></span>',
                y.paginationContainer.html(t)),
              "custom" !== y.params.paginationType && y.emit("onPaginationRendered", y, y.paginationContainer[0])
          }
        },
        y.update = function(t) {
          function e() {
            s = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate()),
              y.setWrapperTranslate(s),
              y.updateActiveIndex(),
              y.updateClasses()
          }
          if (y.updateContainerSize(),
            y.updateSlidesSize(),
            y.updateProgress(),
            y.updatePagination(),
            y.updateClasses(),
            y.params.scrollbar && y.scrollbar && y.scrollbar.set(),
            t) {
            var i, s;
            y.controller && y.controller.spline && (y.controller.spline = void 0),
              y.params.freeMode ? (e(),
                y.params.autoHeight && y.updateAutoHeight()) : (i = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0),
                i || e())
          } else
            y.params.autoHeight && y.updateAutoHeight()
        },
        y.onResize = function(t) {
          y.params.breakpoints && y.setBreakpoint();
          var e = y.params.allowSwipeToPrev,
            i = y.params.allowSwipeToNext;
          y.params.allowSwipeToPrev = y.params.allowSwipeToNext = !0,
            y.updateContainerSize(),
            y.updateSlidesSize(),
            ("auto" === y.params.slidesPerView || y.params.freeMode || t) && y.updatePagination(),
            y.params.scrollbar && y.scrollbar && y.scrollbar.set(),
            y.controller && y.controller.spline && (y.controller.spline = void 0);
          var s = !1;
          if (y.params.freeMode) {
            var a = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate());
            y.setWrapperTranslate(a),
              y.updateActiveIndex(),
              y.updateClasses(),
              y.params.autoHeight && y.updateAutoHeight()
          } else
            y.updateClasses(),
            s = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0);
          y.params.lazyLoading && !s && y.lazy && y.lazy.load(),
            y.params.allowSwipeToPrev = e,
            y.params.allowSwipeToNext = i
        };
      var x = ["mousedown", "mousemove", "mouseup"];
      window.navigator.pointerEnabled ? x = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (x = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
        y.touchEvents = {
          start: y.support.touch || !y.params.simulateTouch ? "touchstart" : x[0],
          move: y.support.touch || !y.params.simulateTouch ? "touchmove" : x[1],
          end: y.support.touch || !y.params.simulateTouch ? "touchend" : x[2]
        },
        (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === y.params.touchEventsTarget ? y.container : y.wrapper).addClass("swiper-wp8-" + y.params.direction),
        y.initEvents = function(t) {
          var e = t ? "off" : "on",
            i = t ? "removeEventListener" : "addEventListener",
            a = "container" === y.params.touchEventsTarget ? y.container[0] : y.wrapper[0],
            n = y.support.touch ? a : document,
            o = !!y.params.nested;
          y.browser.ie ? (a[i](y.touchEvents.start, y.onTouchStart, !1),
              n[i](y.touchEvents.move, y.onTouchMove, o),
              n[i](y.touchEvents.end, y.onTouchEnd, !1)) : (y.support.touch && (a[i](y.touchEvents.start, y.onTouchStart, !1),
              a[i](y.touchEvents.move, y.onTouchMove, o),
              a[i](y.touchEvents.end, y.onTouchEnd, !1)), !s.simulateTouch || y.device.ios || y.device.android || (a[i]("mousedown", y.onTouchStart, !1),
              document[i]("mousemove", y.onTouchMove, o),
              document[i]("mouseup", y.onTouchEnd, !1))),
            window[i]("resize", y.onResize),
            y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.nextButton[e]("click", y.onClickNext),
              y.params.a11y && y.a11y && y.nextButton[e]("keydown", y.a11y.onEnterKey)),
            y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.prevButton[e]("click", y.onClickPrev),
              y.params.a11y && y.a11y && y.prevButton[e]("keydown", y.a11y.onEnterKey)),
            y.params.pagination && y.params.paginationClickable && (y.paginationContainer[e]("click", "." + y.params.bulletClass, y.onClickIndex),
              y.params.a11y && y.a11y && y.paginationContainer[e]("keydown", "." + y.params.bulletClass, y.a11y.onEnterKey)),
            (y.params.preventClicks || y.params.preventClicksPropagation) && a[i]("click", y.preventClicks, !0)
        },
        y.attachEvents = function() {
          y.initEvents()
        },
        y.detachEvents = function() {
          y.initEvents(!0)
        },
        y.allowClick = !0,
        y.preventClicks = function(t) {
          y.allowClick || (y.params.preventClicks && t.preventDefault(),
            y.params.preventClicksPropagation && y.animating && (t.stopPropagation(),
              t.stopImmediatePropagation()))
        },
        y.onClickNext = function(t) {
          t.preventDefault(),
            (!y.isEnd || y.params.loop) && y.slideNext()
        },
        y.onClickPrev = function(t) {
          t.preventDefault(),
            (!y.isBeginning || y.params.loop) && y.slidePrev()
        },
        y.onClickIndex = function(t) {
          t.preventDefault();
          var i = e(this).index() * y.params.slidesPerGroup;
          y.params.loop && (i += y.loopedSlides),
            y.slideTo(i)
        },
        y.updateClickedSlide = function(t) {
          var i = o(t, "." + y.params.slideClass),
            s = !1;
          if (i)
            for (var a = 0; a < y.slides.length; a++)
              y.slides[a] === i && (s = !0);
          if (!i || !s)
            return y.clickedSlide = void 0,
              void(y.clickedIndex = void 0);
          if (y.clickedSlide = i,
            y.clickedIndex = e(i).index(),
            y.params.slideToClickedSlide && void 0 !== y.clickedIndex && y.clickedIndex !== y.activeIndex) {
            var n, r = y.clickedIndex;
            if (y.params.loop) {
              if (y.animating)
                return;
              n = e(y.clickedSlide).attr("data-swiper-slide-index"),
                y.params.centeredSlides ? r < y.loopedSlides - y.params.slidesPerView / 2 || r > y.slides.length - y.loopedSlides + y.params.slidesPerView / 2 ? (y.fixLoop(),
                  r = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + n + '"]:not(.swiper-slide-duplicate)').eq(0).index(),
                  setTimeout(function() {
                    y.slideTo(r)
                  }, 0)) : y.slideTo(r) : r > y.slides.length - y.params.slidesPerView ? (y.fixLoop(),
                  r = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + n + '"]:not(.swiper-slide-duplicate)').eq(0).index(),
                  setTimeout(function() {
                    y.slideTo(r)
                  }, 0)) : y.slideTo(r)
            } else
              y.slideTo(r)
          }
        };
      var T, C, S, _, $, E, k, z, I, P, D = "input, select, textarea, button",
        M = Date.now(),
        A = [];
      y.animating = !1,
        y.touches = {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        };
      var O, B;
      if (y.onTouchStart = function(t) {
          if (t.originalEvent && (t = t.originalEvent),
            O = "touchstart" === t.type,
            O || !("which" in t) || 3 !== t.which) {
            if (y.params.noSwiping && o(t, "." + y.params.noSwipingClass))
              return void(y.allowClick = !0);
            if (!y.params.swipeHandler || o(t, y.params.swipeHandler)) {
              var i = y.touches.currentX = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX,
                s = y.touches.currentY = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY;
              if (!(y.device.ios && y.params.iOSEdgeSwipeDetection && i <= y.params.iOSEdgeSwipeThreshold)) {
                if (T = !0,
                  C = !1,
                  S = !0,
                  $ = void 0,
                  B = void 0,
                  y.touches.startX = i,
                  y.touches.startY = s,
                  _ = Date.now(),
                  y.allowClick = !0,
                  y.updateContainerSize(),
                  y.swipeDirection = void 0,
                  y.params.threshold > 0 && (z = !1),
                  "touchstart" !== t.type) {
                  var a = !0;
                  e(t.target).is(D) && (a = !1),
                    document.activeElement && e(document.activeElement).is(D) && document.activeElement.blur(),
                    a && t.preventDefault()
                }
                y.emit("onTouchStart", y, t)
              }
            }
          }
        },
        y.onTouchMove = function(t) {
          if (t.originalEvent && (t = t.originalEvent), !O || "mousemove" !== t.type) {
            if (t.preventedByNestedSwiper)
              return y.touches.startX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX,
                void(y.touches.startY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY);
            if (y.params.onlyExternal)
              return y.allowClick = !1,
                void(T && (y.touches.startX = y.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX,
                  y.touches.startY = y.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY,
                  _ = Date.now()));
            if (O && document.activeElement && t.target === document.activeElement && e(t.target).is(D))
              return C = !0,
                void(y.allowClick = !1);
            if (S && y.emit("onTouchMove", y, t), !(t.targetTouches && t.targetTouches.length > 1)) {
              if (y.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX,
                y.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY,
                "undefined" == typeof $) {
                var i = 180 * Math.atan2(Math.abs(y.touches.currentY - y.touches.startY), Math.abs(y.touches.currentX - y.touches.startX)) / Math.PI;
                $ = y.isHorizontal() ? i > y.params.touchAngle : 90 - i > y.params.touchAngle
              }
              if ($ && y.emit("onTouchMoveOpposite", y, t),
                "undefined" == typeof B && y.browser.ieTouch && (y.touches.currentX !== y.touches.startX || y.touches.currentY !== y.touches.startY) && (B = !0),
                T) {
                if ($)
                  return void(T = !1);
                if (B || !y.browser.ieTouch) {
                  y.allowClick = !1,
                    y.emit("onSliderMove", y, t),
                    t.preventDefault(),
                    y.params.touchMoveStopPropagation && !y.params.nested && t.stopPropagation(),
                    C || (s.loop && y.fixLoop(),
                      k = y.getWrapperTranslate(),
                      y.setWrapperTransition(0),
                      y.animating && y.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),
                      y.params.autoplay && y.autoplaying && (y.params.autoplayDisableOnInteraction ? y.stopAutoplay() : y.pauseAutoplay()),
                      P = !1,
                      y.params.grabCursor && (y.container[0].style.cursor = "move",
                        y.container[0].style.cursor = "-webkit-grabbing",
                        y.container[0].style.cursor = "-moz-grabbin",
                        y.container[0].style.cursor = "grabbing")),
                    C = !0;
                  var a = y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY;
                  a *= y.params.touchRatio,
                    y.rtl && (a = -a),
                    y.swipeDirection = a > 0 ? "prev" : "next",
                    E = a + k;
                  var n = !0;
                  if (a > 0 && E > y.minTranslate() ? (n = !1,
                      y.params.resistance && (E = y.minTranslate() - 1 + Math.pow(-y.minTranslate() + k + a, y.params.resistanceRatio))) : 0 > a && E < y.maxTranslate() && (n = !1,
                      y.params.resistance && (E = y.maxTranslate() + 1 - Math.pow(y.maxTranslate() - k - a, y.params.resistanceRatio))),
                    n && (t.preventedByNestedSwiper = !0), !y.params.allowSwipeToNext && "next" === y.swipeDirection && k > E && (E = k), !y.params.allowSwipeToPrev && "prev" === y.swipeDirection && E > k && (E = k),
                    y.params.followFinger) {
                    if (y.params.threshold > 0) {
                      if (!(Math.abs(a) > y.params.threshold || z))
                        return void(E = k);
                      if (!z)
                        return z = !0,
                          y.touches.startX = y.touches.currentX,
                          y.touches.startY = y.touches.currentY,
                          E = k,
                          void(y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY)
                    }
                    (y.params.freeMode || y.params.watchSlidesProgress) && y.updateActiveIndex(),
                      y.params.freeMode && (0 === A.length && A.push({
                          position: y.touches[y.isHorizontal() ? "startX" : "startY"],
                          time: _
                        }),
                        A.push({
                          position: y.touches[y.isHorizontal() ? "currentX" : "currentY"],
                          time: (new window.Date).getTime()
                        })),
                      y.updateProgress(E),
                      y.setWrapperTranslate(E)
                  }
                }
              }
            }
          }
        },
        y.onTouchEnd = function(t) {
          if (t.originalEvent && (t = t.originalEvent),
            S && y.emit("onTouchEnd", y, t),
            S = !1,
            T) {
            y.params.grabCursor && C && T && (y.container[0].style.cursor = "move",
              y.container[0].style.cursor = "-webkit-grab",
              y.container[0].style.cursor = "-moz-grab",
              y.container[0].style.cursor = "grab");
            var i = Date.now(),
              s = i - _;
            if (y.allowClick && (y.updateClickedSlide(t),
                y.emit("onTap", y, t),
                300 > s && i - M > 300 && (I && clearTimeout(I),
                  I = setTimeout(function() {
                    y && (y.params.paginationHide && y.paginationContainer.length > 0 && !e(t.target).hasClass(y.params.bulletClass) && y.paginationContainer.toggleClass(y.params.paginationHiddenClass),
                      y.emit("onClick", y, t))
                  }, 300)),
                300 > s && 300 > i - M && (I && clearTimeout(I),
                  y.emit("onDoubleTap", y, t))),
              M = Date.now(),
              setTimeout(function() {
                y && (y.allowClick = !0)
              }, 0), !T || !C || !y.swipeDirection || 0 === y.touches.diff || E === k)
              return void(T = C = !1);
            T = C = !1;
            var a;
            if (a = y.params.followFinger ? y.rtl ? y.translate : -y.translate : -E,
              y.params.freeMode) {
              if (a < -y.minTranslate())
                return void y.slideTo(y.activeIndex);
              if (a > -y.maxTranslate())
                return void(y.slides.length < y.snapGrid.length ? y.slideTo(y.snapGrid.length - 1) : y.slideTo(y.slides.length - 1));
              if (y.params.freeModeMomentum) {
                if (A.length > 1) {
                  var n = A.pop(),
                    o = A.pop(),
                    r = n.position - o.position,
                    l = n.time - o.time;
                  y.velocity = r / l,
                    y.velocity = y.velocity / 2,
                    Math.abs(y.velocity) < y.params.freeModeMinimumVelocity && (y.velocity = 0),
                    (l > 150 || (new window.Date).getTime() - n.time > 300) && (y.velocity = 0)
                } else
                  y.velocity = 0;
                A.length = 0;
                var d = 1e3 * y.params.freeModeMomentumRatio,
                  p = y.velocity * d,
                  h = y.translate + p;
                y.rtl && (h = -h);
                var c, u = !1,
                  f = 20 * Math.abs(y.velocity) * y.params.freeModeMomentumBounceRatio;
                if (h < y.maxTranslate())
                  y.params.freeModeMomentumBounce ? (h + y.maxTranslate() < -f && (h = y.maxTranslate() - f),
                    c = y.maxTranslate(),
                    u = !0,
                    P = !0) : h = y.maxTranslate();
                else if (h > y.minTranslate())
                  y.params.freeModeMomentumBounce ? (h - y.minTranslate() > f && (h = y.minTranslate() + f),
                    c = y.minTranslate(),
                    u = !0,
                    P = !0) : h = y.minTranslate();
                else if (y.params.freeModeSticky) {
                  var m, g = 0;
                  for (g = 0; g < y.snapGrid.length; g += 1)
                    if (y.snapGrid[g] > -h) {
                      m = g;
                      break
                    }
                  h = Math.abs(y.snapGrid[m] - h) < Math.abs(y.snapGrid[m - 1] - h) || "next" === y.swipeDirection ? y.snapGrid[m] : y.snapGrid[m - 1],
                    y.rtl || (h = -h)
                }
                if (0 !== y.velocity)
                  d = y.rtl ? Math.abs((-h - y.translate) / y.velocity) : Math.abs((h - y.translate) / y.velocity);
                else if (y.params.freeModeSticky)
                  return void y.slideReset();
                y.params.freeModeMomentumBounce && u ? (y.updateProgress(c),
                    y.setWrapperTransition(d),
                    y.setWrapperTranslate(h),
                    y.onTransitionStart(),
                    y.animating = !0,
                    y.wrapper.transitionEnd(function() {
                      y && P && (y.emit("onMomentumBounce", y),
                        y.setWrapperTransition(y.params.speed),
                        y.setWrapperTranslate(c),
                        y.wrapper.transitionEnd(function() {
                          y && y.onTransitionEnd()
                        }))
                    })) : y.velocity ? (y.updateProgress(h),
                    y.setWrapperTransition(d),
                    y.setWrapperTranslate(h),
                    y.onTransitionStart(),
                    y.animating || (y.animating = !0,
                      y.wrapper.transitionEnd(function() {
                        y && y.onTransitionEnd()
                      }))) : y.updateProgress(h),
                  y.updateActiveIndex()
              }
              return void((!y.params.freeModeMomentum || s >= y.params.longSwipesMs) && (y.updateProgress(),
                y.updateActiveIndex()))
            }
            var v, w = 0,
              b = y.slidesSizesGrid[0];
            for (v = 0; v < y.slidesGrid.length; v += y.params.slidesPerGroup)
              "undefined" != typeof y.slidesGrid[v + y.params.slidesPerGroup] ? a >= y.slidesGrid[v] && a < y.slidesGrid[v + y.params.slidesPerGroup] && (w = v,
                b = y.slidesGrid[v + y.params.slidesPerGroup] - y.slidesGrid[v]) : a >= y.slidesGrid[v] && (w = v,
                b = y.slidesGrid[y.slidesGrid.length - 1] - y.slidesGrid[y.slidesGrid.length - 2]);
            var x = (a - y.slidesGrid[w]) / b;
            if (s > y.params.longSwipesMs) {
              if (!y.params.longSwipes)
                return void y.slideTo(y.activeIndex);
              "next" === y.swipeDirection && (x >= y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w)),
                "prev" === y.swipeDirection && (x > 1 - y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w))
            } else {
              if (!y.params.shortSwipes)
                return void y.slideTo(y.activeIndex);
              "next" === y.swipeDirection && y.slideTo(w + y.params.slidesPerGroup),
                "prev" === y.swipeDirection && y.slideTo(w)
            }
          }
        },
        y._slideTo = function(t, e) {
          return y.slideTo(t, e, !0, !0)
        },
        y.slideTo = function(t, e, i, s) {
          "undefined" == typeof i && (i = !0),
            "undefined" == typeof t && (t = 0),
            0 > t && (t = 0),
            y.snapIndex = Math.floor(t / y.params.slidesPerGroup),
            y.snapIndex >= y.snapGrid.length && (y.snapIndex = y.snapGrid.length - 1);
          var a = -y.snapGrid[y.snapIndex];
          y.params.autoplay && y.autoplaying && (s || !y.params.autoplayDisableOnInteraction ? y.pauseAutoplay(e) : y.stopAutoplay()),
            y.updateProgress(a);
          for (var n = 0; n < y.slidesGrid.length; n++)
            - Math.floor(100 * a) >= Math.floor(100 * y.slidesGrid[n]) && (t = n);
          return !y.params.allowSwipeToNext && a < y.translate && a < y.minTranslate() ? !1 : !y.params.allowSwipeToPrev && a > y.translate && a > y.maxTranslate() && (y.activeIndex || 0) !== t ? !1 : ("undefined" == typeof e && (e = y.params.speed),
            y.previousIndex = y.activeIndex || 0,
            y.activeIndex = t,
            y.rtl && -a === y.translate || !y.rtl && a === y.translate ? (y.params.autoHeight && y.updateAutoHeight(),
              y.updateClasses(),
              "slide" !== y.params.effect && y.setWrapperTranslate(a), !1) : (y.updateClasses(),
              y.onTransitionStart(i),
              0 === e ? (y.setWrapperTranslate(a),
                y.setWrapperTransition(0),
                y.onTransitionEnd(i)) : (y.setWrapperTranslate(a),
                y.setWrapperTransition(e),
                y.animating || (y.animating = !0,
                  y.wrapper.transitionEnd(function() {
                    y && y.onTransitionEnd(i)
                  }))), !0))
        },
        y.onTransitionStart = function(t) {
          "undefined" == typeof t && (t = !0),
            y.params.autoHeight && y.updateAutoHeight(),
            y.lazy && y.lazy.onTransitionStart(),
            t && (y.emit("onTransitionStart", y),
              y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeStart", y),
                y.activeIndex > y.previousIndex ? y.emit("onSlideNextStart", y) : y.emit("onSlidePrevStart", y)))
        },
        y.onTransitionEnd = function(t) {
          y.animating = !1,
            y.setWrapperTransition(0),
            "undefined" == typeof t && (t = !0),
            y.lazy && y.lazy.onTransitionEnd(),
            t && (y.emit("onTransitionEnd", y),
              y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeEnd", y),
                y.activeIndex > y.previousIndex ? y.emit("onSlideNextEnd", y) : y.emit("onSlidePrevEnd", y))),
            y.params.hashnav && y.hashnav && y.hashnav.setHash()
        },
        y.slideNext = function(t, e, i) {
          return y.params.loop ? y.animating ? !1 : (y.fixLoop(),
            y.container[0].clientLeft,
            y.slideTo(y.activeIndex + y.params.slidesPerGroup, e, t, i)) : y.slideTo(y.activeIndex + y.params.slidesPerGroup, e, t, i)
        },
        y._slideNext = function(t) {
          return y.slideNext(!0, t, !0)
        },
        y.slidePrev = function(t, e, i) {
          return y.params.loop ? y.animating ? !1 : (y.fixLoop(),
            y.container[0].clientLeft,
            y.slideTo(y.activeIndex - 1, e, t, i)) : y.slideTo(y.activeIndex - 1, e, t, i)
        },
        y._slidePrev = function(t) {
          return y.slidePrev(!0, t, !0)
        },
        y.slideReset = function(t, e, i) {
          return y.slideTo(y.activeIndex, e, t)
        },
        y.setWrapperTransition = function(t, e) {
          y.wrapper.transition(t),
            "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTransition(t),
            y.params.parallax && y.parallax && y.parallax.setTransition(t),
            y.params.scrollbar && y.scrollbar && y.scrollbar.setTransition(t),
            y.params.control && y.controller && y.controller.setTransition(t, e),
            y.emit("onSetTransition", y, t)
        },
        y.setWrapperTranslate = function(t, e, i) {
          var s = 0,
            n = 0,
            o = 0;
          y.isHorizontal() ? s = y.rtl ? -t : t : n = t,
            y.params.roundLengths && (s = a(s),
              n = a(n)),
            y.params.virtualTranslate || (y.support.transforms3d ? y.wrapper.transform("translate3d(" + s + "px, " + n + "px, " + o + "px)") : y.wrapper.transform("translate(" + s + "px, " + n + "px)")),
            y.translate = y.isHorizontal() ? s : n;
          var r, l = y.maxTranslate() - y.minTranslate();
          r = 0 === l ? 0 : (t - y.minTranslate()) / l,
            r !== y.progress && y.updateProgress(t),
            e && y.updateActiveIndex(),
            "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTranslate(y.translate),
            y.params.parallax && y.parallax && y.parallax.setTranslate(y.translate),
            y.params.scrollbar && y.scrollbar && y.scrollbar.setTranslate(y.translate),
            y.params.control && y.controller && y.controller.setTranslate(y.translate, i),
            y.emit("onSetTranslate", y, y.translate)
        },
        y.getTranslate = function(t, e) {
          var i, s, a, n;
          return "undefined" == typeof e && (e = "x"),
            y.params.virtualTranslate ? y.rtl ? -y.translate : y.translate : (a = window.getComputedStyle(t, null),
              window.WebKitCSSMatrix ? (s = a.transform || a.webkitTransform,
                s.split(",").length > 6 && (s = s.split(", ").map(function(t) {
                  return t.replace(",", ".")
                }).join(", ")),
                n = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (n = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
                i = n.toString().split(",")),
              "x" === e && (s = window.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
              "y" === e && (s = window.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
              y.rtl && s && (s = -s),
              s || 0)
        },
        y.getWrapperTranslate = function(t) {
          return "undefined" == typeof t && (t = y.isHorizontal() ? "x" : "y"),
            y.getTranslate(y.wrapper[0], t)
        },
        y.observers = [],
        y.initObservers = function() {
          if (y.params.observeParents)
            for (var t = y.container.parents(), e = 0; e < t.length; e++)
              r(t[e]);
          r(y.container[0], {
              childList: !1
            }),
            r(y.wrapper[0], {
              attributes: !1
            })
        },
        y.disconnectObservers = function() {
          for (var t = 0; t < y.observers.length; t++)
            y.observers[t].disconnect();
          y.observers = []
        },
        y.createLoop = function() {
          y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove();
          var t = y.wrapper.children("." + y.params.slideClass);
          "auto" !== y.params.slidesPerView || y.params.loopedSlides || (y.params.loopedSlides = t.length),
            y.loopedSlides = parseInt(y.params.loopedSlides || y.params.slidesPerView, 10),
            y.loopedSlides = y.loopedSlides + y.params.loopAdditionalSlides,
            y.loopedSlides > t.length && (y.loopedSlides = t.length);
          var i, s = [],
            a = [];
          for (t.each(function(i, n) {
              var o = e(this);
              i < y.loopedSlides && a.push(n),
                i < t.length && i >= t.length - y.loopedSlides && s.push(n),
                o.attr("data-swiper-slide-index", i)
            }),
            i = 0; i < a.length; i++)
            y.wrapper.append(e(a[i].cloneNode(!0)).addClass(y.params.slideDuplicateClass));
          for (i = s.length - 1; i >= 0; i--)
            y.wrapper.prepend(e(s[i].cloneNode(!0)).addClass(y.params.slideDuplicateClass))
        },
        y.destroyLoop = function() {
          y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove(),
            y.slides.removeAttr("data-swiper-slide-index")
        },
        y.reLoop = function(t) {
          var e = y.activeIndex - y.loopedSlides;
          y.destroyLoop(),
            y.createLoop(),
            y.updateSlidesSize(),
            t && y.slideTo(e + y.loopedSlides, 0, !1)
        },
        y.fixLoop = function() {
          var t;
          y.activeIndex < y.loopedSlides ? (t = y.slides.length - 3 * y.loopedSlides + y.activeIndex,
            t += y.loopedSlides,
            y.slideTo(t, 0, !1, !0)) : ("auto" === y.params.slidesPerView && y.activeIndex >= 2 * y.loopedSlides || y.activeIndex > y.slides.length - 2 * y.params.slidesPerView) && (t = -y.slides.length + y.activeIndex + y.loopedSlides,
            t += y.loopedSlides,
            y.slideTo(t, 0, !1, !0))
        },
        y.appendSlide = function(t) {
          if (y.params.loop && y.destroyLoop(),
            "object" == typeof t && t.length)
            for (var e = 0; e < t.length; e++)
              t[e] && y.wrapper.append(t[e]);
          else
            y.wrapper.append(t);
          y.params.loop && y.createLoop(),
            y.params.observer && y.support.observer || y.update(!0)
        },
        y.prependSlide = function(t) {
          y.params.loop && y.destroyLoop();
          var e = y.activeIndex + 1;
          if ("object" == typeof t && t.length) {
            for (var i = 0; i < t.length; i++)
              t[i] && y.wrapper.prepend(t[i]);
            e = y.activeIndex + t.length
          } else
            y.wrapper.prepend(t);
          y.params.loop && y.createLoop(),
            y.params.observer && y.support.observer || y.update(!0),
            y.slideTo(e, 0, !1)
        },
        y.removeSlide = function(t) {
          y.params.loop && (y.destroyLoop(),
            y.slides = y.wrapper.children("." + y.params.slideClass));
          var e, i = y.activeIndex;
          if ("object" == typeof t && t.length) {
            for (var s = 0; s < t.length; s++)
              e = t[s],
              y.slides[e] && y.slides.eq(e).remove(),
              i > e && i--;
            i = Math.max(i, 0)
          } else
            e = t,
            y.slides[e] && y.slides.eq(e).remove(),
            i > e && i--,
            i = Math.max(i, 0);
          y.params.loop && y.createLoop(),
            y.params.observer && y.support.observer || y.update(!0),
            y.params.loop ? y.slideTo(i + y.loopedSlides, 0, !1) : y.slideTo(i, 0, !1)
        },
        y.removeAllSlides = function() {
          for (var t = [], e = 0; e < y.slides.length; e++)
            t.push(e);
          y.removeSlide(t)
        },
        y.effects = {
          fade: {
            setTranslate: function() {
              for (var t = 0; t < y.slides.length; t++) {
                var e = y.slides.eq(t),
                  i = e[0].swiperSlideOffset,
                  s = -i;
                y.params.virtualTranslate || (s -= y.translate);
                var a = 0;
                y.isHorizontal() || (a = s,
                  s = 0);
                var n = y.params.fade.crossFade ? Math.max(1 - Math.abs(e[0].progress), 0) : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                e.css({
                  opacity: n
                }).transform("translate3d(" + s + "px, " + a + "px, 0px)")
              }
            },
            setTransition: function(t) {
              if (y.slides.transition(t),
                y.params.virtualTranslate && 0 !== t) {
                var e = !1;
                y.slides.transitionEnd(function() {
                  if (!e && y) {
                    e = !0,
                      y.animating = !1;
                    for (var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < t.length; i++)
                      y.wrapper.trigger(t[i])
                  }
                })
              }
            }
          },
          flip: {
            setTranslate: function() {
              for (var t = 0; t < y.slides.length; t++) {
                var i = y.slides.eq(t),
                  s = i[0].progress;
                y.params.flip.limitRotation && (s = Math.max(Math.min(i[0].progress, 1), -1));
                var a = i[0].swiperSlideOffset,
                  n = -180 * s,
                  o = n,
                  r = 0,
                  l = -a,
                  d = 0;
                if (y.isHorizontal() ? y.rtl && (o = -o) : (d = l,
                    l = 0,
                    r = -o,
                    o = 0),
                  i[0].style.zIndex = -Math.abs(Math.round(s)) + y.slides.length,
                  y.params.flip.slideShadows) {
                  var p = y.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                    h = y.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                  0 === p.length && (p = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'),
                      i.append(p)),
                    0 === h.length && (h = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'),
                      i.append(h)),
                    p.length && (p[0].style.opacity = Math.max(-s, 0)),
                    h.length && (h[0].style.opacity = Math.max(s, 0))
                }
                i.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + r + "deg) rotateY(" + o + "deg)")
              }
            },
            setTransition: function(t) {
              if (y.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t),
                y.params.virtualTranslate && 0 !== t) {
                var i = !1;
                y.slides.eq(y.activeIndex).transitionEnd(function() {
                  if (!i && y && e(this).hasClass(y.params.slideActiveClass)) {
                    i = !0,
                      y.animating = !1;
                    for (var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < t.length; s++)
                      y.wrapper.trigger(t[s])
                  }
                })
              }
            }
          },
          cube: {
            setTranslate: function() {
              var t, i = 0;
              y.params.cube.shadow && (y.isHorizontal() ? (t = y.wrapper.find(".swiper-cube-shadow"),
                0 === t.length && (t = e('<div class="swiper-cube-shadow"></div>'),
                  y.wrapper.append(t)),
                t.css({
                  height: y.width + "px"
                })) : (t = y.container.find(".swiper-cube-shadow"),
                0 === t.length && (t = e('<div class="swiper-cube-shadow"></div>'),
                  y.container.append(t))));
              for (var s = 0; s < y.slides.length; s++) {
                var a = y.slides.eq(s),
                  n = 90 * s,
                  o = Math.floor(n / 360);
                y.rtl && (n = -n,
                  o = Math.floor(-n / 360));
                var r = Math.max(Math.min(a[0].progress, 1), -1),
                  l = 0,
                  d = 0,
                  p = 0;
                s % 4 === 0 ? (l = 4 * -o * y.size,
                    p = 0) : (s - 1) % 4 === 0 ? (l = 0,
                    p = 4 * -o * y.size) : (s - 2) % 4 === 0 ? (l = y.size + 4 * o * y.size,
                    p = y.size) : (s - 3) % 4 === 0 && (l = -y.size,
                    p = 3 * y.size + 4 * y.size * o),
                  y.rtl && (l = -l),
                  y.isHorizontal() || (d = l,
                    l = 0);
                var h = "rotateX(" + (y.isHorizontal() ? 0 : -n) + "deg) rotateY(" + (y.isHorizontal() ? n : 0) + "deg) translate3d(" + l + "px, " + d + "px, " + p + "px)";
                if (1 >= r && r > -1 && (i = 90 * s + 90 * r,
                    y.rtl && (i = 90 * -s - 90 * r)),
                  a.transform(h),
                  y.params.cube.slideShadows) {
                  var c = y.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
                    u = y.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                  0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'),
                      a.append(c)),
                    0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'),
                      a.append(u)),
                    c.length && (c[0].style.opacity = Math.max(-r, 0)),
                    u.length && (u[0].style.opacity = Math.max(r, 0))
                }
              }
              if (y.wrapper.css({
                  "-webkit-transform-origin": "50% 50% -" + y.size / 2 + "px",
                  "-moz-transform-origin": "50% 50% -" + y.size / 2 + "px",
                  "-ms-transform-origin": "50% 50% -" + y.size / 2 + "px",
                  "transform-origin": "50% 50% -" + y.size / 2 + "px"
                }),
                y.params.cube.shadow)
                if (y.isHorizontal())
                  t.transform("translate3d(0px, " + (y.width / 2 + y.params.cube.shadowOffset) + "px, " + -y.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + y.params.cube.shadowScale + ")");
                else {
                  var f = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90),
                    m = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
                    g = y.params.cube.shadowScale,
                    v = y.params.cube.shadowScale / m,
                    w = y.params.cube.shadowOffset;
                  t.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (y.height / 2 + w) + "px, " + -y.height / 2 / v + "px) rotateX(-90deg)")
                }
              var b = y.isSafari || y.isUiWebView ? -y.size / 2 : 0;
              y.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (y.isHorizontal() ? 0 : i) + "deg) rotateY(" + (y.isHorizontal() ? -i : 0) + "deg)")
            },
            setTransition: function(t) {
              y.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t),
                y.params.cube.shadow && !y.isHorizontal() && y.container.find(".swiper-cube-shadow").transition(t)
            }
          },
          coverflow: {
            setTranslate: function() {
              for (var t = y.translate, i = y.isHorizontal() ? -t + y.width / 2 : -t + y.height / 2, s = y.isHorizontal() ? y.params.coverflow.rotate : -y.params.coverflow.rotate, a = y.params.coverflow.depth, n = 0, o = y.slides.length; o > n; n++) {
                var r = y.slides.eq(n),
                  l = y.slidesSizesGrid[n],
                  d = r[0].swiperSlideOffset,
                  p = (i - d - l / 2) / l * y.params.coverflow.modifier,
                  h = y.isHorizontal() ? s * p : 0,
                  c = y.isHorizontal() ? 0 : s * p,
                  u = -a * Math.abs(p),
                  f = y.isHorizontal() ? 0 : y.params.coverflow.stretch * p,
                  m = y.isHorizontal() ? y.params.coverflow.stretch * p : 0;
                Math.abs(m) < .001 && (m = 0),
                  Math.abs(f) < .001 && (f = 0),
                  Math.abs(u) < .001 && (u = 0),
                  Math.abs(h) < .001 && (h = 0),
                  Math.abs(c) < .001 && (c = 0);
                var g = "translate3d(" + m + "px," + f + "px," + u + "px)  rotateX(" + c + "deg) rotateY(" + h + "deg)";
                if (r.transform(g),
                  r[0].style.zIndex = -Math.abs(Math.round(p)) + 1,
                  y.params.coverflow.slideShadows) {
                  var v = y.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                    w = y.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                  0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'),
                      r.append(v)),
                    0 === w.length && (w = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'),
                      r.append(w)),
                    v.length && (v[0].style.opacity = p > 0 ? p : 0),
                    w.length && (w[0].style.opacity = -p > 0 ? -p : 0)
                }
              }
              if (y.browser.ie) {
                var b = y.wrapper[0].style;
                b.perspectiveOrigin = i + "px 50%"
              }
            },
            setTransition: function(t) {
              y.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t)
            }
          }
        },
        y.lazy = {
          initialImageLoaded: !1,
          loadImageInSlide: function(t, i) {
            if ("undefined" != typeof t && ("undefined" == typeof i && (i = !0),
                0 !== y.slides.length)) {
              var s = y.slides.eq(t),
                a = s.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
              !s.hasClass("swiper-lazy") || s.hasClass("swiper-lazy-loaded") || s.hasClass("swiper-lazy-loading") || (a = a.add(s[0])),
                0 !== a.length && a.each(function() {
                  var t = e(this);
                  t.addClass("swiper-lazy-loading");
                  var a = t.attr("data-background"),
                    n = t.attr("data-src"),
                    o = t.attr("data-srcset");
                  y.loadImage(t[0], n || a, o, !1, function() {
                      if (a ? (t.css("background-image", 'url("' + a + '")'),
                          t.removeAttr("data-background")) : (o && (t.attr("srcset", o),
                            t.removeAttr("data-srcset")),
                          n && (t.attr("src", n),
                            t.removeAttr("data-src"))),
                        t.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),
                        s.find(".swiper-lazy-preloader, .preloader").remove(),
                        y.params.loop && i) {
                        var e = s.attr("data-swiper-slide-index");
                        if (s.hasClass(y.params.slideDuplicateClass)) {
                          var r = y.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + y.params.slideDuplicateClass + ")");
                          y.lazy.loadImageInSlide(r.index(), !1)
                        } else {
                          var l = y.wrapper.children("." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                          y.lazy.loadImageInSlide(l.index(), !1)
                        }
                      }
                      y.emit("onLazyImageReady", y, s[0], t[0])
                    }),
                    y.emit("onLazyImageLoad", y, s[0], t[0])
                })
            }
          },
          load: function() {
            var t;
            if (y.params.watchSlidesVisibility)
              y.wrapper.children("." + y.params.slideVisibleClass).each(function() {
                y.lazy.loadImageInSlide(e(this).index())
              });
            else if (y.params.slidesPerView > 1)
              for (t = y.activeIndex; t < y.activeIndex + y.params.slidesPerView; t++)
                y.slides[t] && y.lazy.loadImageInSlide(t);
            else
              y.lazy.loadImageInSlide(y.activeIndex);
            if (y.params.lazyLoadingInPrevNext)
              if (y.params.slidesPerView > 1 || y.params.lazyLoadingInPrevNextAmount && y.params.lazyLoadingInPrevNextAmount > 1) {
                var i = y.params.lazyLoadingInPrevNextAmount,
                  s = y.params.slidesPerView,
                  a = Math.min(y.activeIndex + s + Math.max(i, s), y.slides.length),
                  n = Math.max(y.activeIndex - Math.max(s, i), 0);
                for (t = y.activeIndex + y.params.slidesPerView; a > t; t++)
                  y.slides[t] && y.lazy.loadImageInSlide(t);
                for (t = n; t < y.activeIndex; t++)
                  y.slides[t] && y.lazy.loadImageInSlide(t)
              } else {
                var o = y.wrapper.children("." + y.params.slideNextClass);
                o.length > 0 && y.lazy.loadImageInSlide(o.index());
                var r = y.wrapper.children("." + y.params.slidePrevClass);
                r.length > 0 && y.lazy.loadImageInSlide(r.index())
              }
          },
          onTransitionStart: function() {
            y.params.lazyLoading && (y.params.lazyLoadingOnTransitionStart || !y.params.lazyLoadingOnTransitionStart && !y.lazy.initialImageLoaded) && y.lazy.load()
          },
          onTransitionEnd: function() {
            y.params.lazyLoading && !y.params.lazyLoadingOnTransitionStart && y.lazy.load()
          }
        },
        y.scrollbar = {
          isTouched: !1,
          setDragPosition: function(t) {
            var e = y.scrollbar,
              i = y.isHorizontal() ? "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX || t.clientX : "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY || t.clientY,
              s = i - e.track.offset()[y.isHorizontal() ? "left" : "top"] - e.dragSize / 2,
              a = -y.minTranslate() * e.moveDivider,
              n = -y.maxTranslate() * e.moveDivider;
            a > s ? s = a : s > n && (s = n),
              s = -s / e.moveDivider,
              y.updateProgress(s),
              y.setWrapperTranslate(s, !0)
          },
          dragStart: function(t) {
            var e = y.scrollbar;
            e.isTouched = !0,
              t.preventDefault(),
              t.stopPropagation(),
              e.setDragPosition(t),
              clearTimeout(e.dragTimeout),
              e.track.transition(0),
              y.params.scrollbarHide && e.track.css("opacity", 1),
              y.wrapper.transition(100),
              e.drag.transition(100),
              y.emit("onScrollbarDragStart", y)
          },
          dragMove: function(t) {
            var e = y.scrollbar;
            e.isTouched && (t.preventDefault ? t.preventDefault() : t.returnValue = !1,
              e.setDragPosition(t),
              y.wrapper.transition(0),
              e.track.transition(0),
              e.drag.transition(0),
              y.emit("onScrollbarDragMove", y))
          },
          dragEnd: function(t) {
            var e = y.scrollbar;
            e.isTouched && (e.isTouched = !1,
              y.params.scrollbarHide && (clearTimeout(e.dragTimeout),
                e.dragTimeout = setTimeout(function() {
                  e.track.css("opacity", 0),
                    e.track.transition(400)
                }, 1e3)),
              y.emit("onScrollbarDragEnd", y),
              y.params.scrollbarSnapOnRelease && y.slideReset())
          },
          enableDraggable: function() {
            var t = y.scrollbar,
              i = y.support.touch ? t.track : document;
            e(t.track).on(y.touchEvents.start, t.dragStart),
              e(i).on(y.touchEvents.move, t.dragMove),
              e(i).on(y.touchEvents.end, t.dragEnd)
          },
          disableDraggable: function() {
            var t = y.scrollbar,
              i = y.support.touch ? t.track : document;
            e(t.track).off(y.touchEvents.start, t.dragStart),
              e(i).off(y.touchEvents.move, t.dragMove),
              e(i).off(y.touchEvents.end, t.dragEnd)
          },
          set: function() {
            if (y.params.scrollbar) {
              var t = y.scrollbar;
              t.track = e(y.params.scrollbar),
                y.params.uniqueNavElements && "string" == typeof y.params.scrollbar && t.track.length > 1 && 1 === y.container.find(y.params.scrollbar).length && (t.track = y.container.find(y.params.scrollbar)),
                t.drag = t.track.find(".swiper-scrollbar-drag"),
                0 === t.drag.length && (t.drag = e('<div class="swiper-scrollbar-drag"></div>'),
                  t.track.append(t.drag)),
                t.drag[0].style.width = "",
                t.drag[0].style.height = "",
                t.trackSize = y.isHorizontal() ? t.track[0].offsetWidth : t.track[0].offsetHeight,
                t.divider = y.size / y.virtualSize,
                t.moveDivider = t.divider * (t.trackSize / y.size),
                t.dragSize = t.trackSize * t.divider,
                y.isHorizontal() ? t.drag[0].style.width = t.dragSize + "px" : t.drag[0].style.height = t.dragSize + "px",
                t.divider >= 1 ? t.track[0].style.display = "none" : t.track[0].style.display = "",
                y.params.scrollbarHide && (t.track[0].style.opacity = 0)
            }
          },
          setTranslate: function() {
            if (y.params.scrollbar) {
              var t, e = y.scrollbar,
                i = (y.translate || 0,
                  e.dragSize);
              t = (e.trackSize - e.dragSize) * y.progress,
                y.rtl && y.isHorizontal() ? (t = -t,
                  t > 0 ? (i = e.dragSize - t,
                    t = 0) : -t + e.dragSize > e.trackSize && (i = e.trackSize + t)) : 0 > t ? (i = e.dragSize + t,
                  t = 0) : t + e.dragSize > e.trackSize && (i = e.trackSize - t),
                y.isHorizontal() ? (y.support.transforms3d ? e.drag.transform("translate3d(" + t + "px, 0, 0)") : e.drag.transform("translateX(" + t + "px)"),
                  e.drag[0].style.width = i + "px") : (y.support.transforms3d ? e.drag.transform("translate3d(0px, " + t + "px, 0)") : e.drag.transform("translateY(" + t + "px)"),
                  e.drag[0].style.height = i + "px"),
                y.params.scrollbarHide && (clearTimeout(e.timeout),
                  e.track[0].style.opacity = 1,
                  e.timeout = setTimeout(function() {
                    e.track[0].style.opacity = 0,
                      e.track.transition(400)
                  }, 1e3))
            }
          },
          setTransition: function(t) {
            y.params.scrollbar && y.scrollbar.drag.transition(t)
          }
        },
        y.controller = {
          LinearSpline: function(t, e) {
            this.x = t,
              this.y = e,
              this.lastIndex = t.length - 1;
            var i, s;
            this.x.length,
              this.interpolate = function(t) {
                return t ? (s = a(this.x, t),
                  i = s - 1,
                  (t - this.x[i]) * (this.y[s] - this.y[i]) / (this.x[s] - this.x[i]) + this.y[i]) : 0
              };
            var a = function() {
              var t, e, i;
              return function(s, a) {
                for (e = -1,
                  t = s.length; t - e > 1;)
                  s[i = t + e >> 1] <= a ? e = i : t = i;
                return t
              }
            }()
          },
          getInterpolateFunction: function(t) {
            y.controller.spline || (y.controller.spline = y.params.loop ? new y.controller.LinearSpline(y.slidesGrid, t.slidesGrid) : new y.controller.LinearSpline(y.snapGrid, t.snapGrid))
          },
          setTranslate: function(t, e) {
            function s(e) {
              t = e.rtl && "horizontal" === e.params.direction ? -y.translate : y.translate,
                "slide" === y.params.controlBy && (y.controller.getInterpolateFunction(e),
                  n = -y.controller.spline.interpolate(-t)),
                n && "container" !== y.params.controlBy || (a = (e.maxTranslate() - e.minTranslate()) / (y.maxTranslate() - y.minTranslate()),
                  n = (t - y.minTranslate()) * a + e.minTranslate()),
                y.params.controlInverse && (n = e.maxTranslate() - n),
                e.updateProgress(n),
                e.setWrapperTranslate(n, !1, y),
                e.updateActiveIndex()
            }
            var a, n, o = y.params.control;
            if (y.isArray(o))
              for (var r = 0; r < o.length; r++)
                o[r] !== e && o[r] instanceof i && s(o[r]);
            else
              o instanceof i && e !== o && s(o)
          },
          setTransition: function(t, e) {
            function s(e) {
              e.setWrapperTransition(t, y),
                0 !== t && (e.onTransitionStart(),
                  e.wrapper.transitionEnd(function() {
                    n && (e.params.loop && "slide" === y.params.controlBy && e.fixLoop(),
                      e.onTransitionEnd())
                  }))
            }
            var a, n = y.params.control;
            if (y.isArray(n))
              for (a = 0; a < n.length; a++)
                n[a] !== e && n[a] instanceof i && s(n[a]);
            else
              n instanceof i && e !== n && s(n)
          }
        },
        y.hashnav = {
          init: function() {
            if (y.params.hashnav) {
              y.hashnav.initialized = !0;
              var t = document.location.hash.replace("#", "");
              if (t)
                for (var e = 0, i = 0, s = y.slides.length; s > i; i++) {
                  var a = y.slides.eq(i),
                    n = a.attr("data-hash");
                  if (n === t && !a.hasClass(y.params.slideDuplicateClass)) {
                    var o = a.index();
                    y.slideTo(o, e, y.params.runCallbacksOnInit, !0)
                  }
                }
            }
          },
          setHash: function() {
            y.hashnav.initialized && y.params.hashnav && (document.location.hash = y.slides.eq(y.activeIndex).attr("data-hash") || "")
          }
        },
        y.disableKeyboardControl = function() {
          y.params.keyboardControl = !1,
            e(document).off("keydown", l)
        },
        y.enableKeyboardControl = function() {
          y.params.keyboardControl = !0,
            e(document).on("keydown", l)
        },
        y.mousewheel = {
          event: !1,
          lastScrollTime: (new window.Date).getTime()
        },
        y.params.mousewheelControl) {
        try {
          new window.WheelEvent("wheel"),
            y.mousewheel.event = "wheel"
        } catch (H) {
          (window.WheelEvent || y.container[0] && "wheel" in y.container[0]) && (y.mousewheel.event = "wheel")
        }!y.mousewheel.event && window.WheelEvent,
          y.mousewheel.event || void 0 === document.onmousewheel || (y.mousewheel.event = "mousewheel"),
          y.mousewheel.event || (y.mousewheel.event = "DOMMouseScroll")
      }
      y.disableMousewheelControl = function() {
          return y.mousewheel.event ? (y.container.off(y.mousewheel.event, d), !0) : !1
        },
        y.enableMousewheelControl = function() {
          return y.mousewheel.event ? (y.container.on(y.mousewheel.event, d), !0) : !1
        },
        y.parallax = {
          setTranslate: function() {
            y.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                p(this, y.progress)
              }),
              y.slides.each(function() {
                var t = e(this);
                t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                  var e = Math.min(Math.max(t[0].progress, -1), 1);
                  p(this, e)
                })
              })
          },
          setTransition: function(t) {
            "undefined" == typeof t && (t = y.params.speed),
              y.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                var i = e(this),
                  s = parseInt(i.attr("data-swiper-parallax-duration"), 10) || t;
                0 === t && (s = 0),
                  i.transition(s)
              })
          }
        },
        y._plugins = [];
      for (var R in y.plugins) {
        var N = y.plugins[R](y, y.params[R]);
        N && y._plugins.push(N)
      }
      return y.callPlugins = function(t) {
          for (var e = 0; e < y._plugins.length; e++)
            t in y._plugins[e] && y._plugins[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        },
        y.emitterEventListeners = {},
        y.emit = function(t) {
          y.params[t] && y.params[t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          var e;
          if (y.emitterEventListeners[t])
            for (e = 0; e < y.emitterEventListeners[t].length; e++)
              y.emitterEventListeners[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          y.callPlugins && y.callPlugins(t, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        },
        y.on = function(t, e) {
          return t = h(t),
            y.emitterEventListeners[t] || (y.emitterEventListeners[t] = []),
            y.emitterEventListeners[t].push(e),
            y
        },
        y.off = function(t, e) {
          var i;
          if (t = h(t),
            "undefined" == typeof e)
            return y.emitterEventListeners[t] = [],
              y;
          if (y.emitterEventListeners[t] && 0 !== y.emitterEventListeners[t].length) {
            for (i = 0; i < y.emitterEventListeners[t].length; i++)
              y.emitterEventListeners[t][i] === e && y.emitterEventListeners[t].splice(i, 1);
            return y
          }
        },
        y.once = function(t, e) {
          t = h(t);
          var i = function() {
            e(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]),
              y.off(t, i)
          };
          return y.on(t, i),
            y
        },
        y.a11y = {
          makeFocusable: function(t) {
            return t.attr("tabIndex", "0"),
              t
          },
          addRole: function(t, e) {
            return t.attr("role", e),
              t
          },
          addLabel: function(t, e) {
            return t.attr("aria-label", e),
              t
          },
          disable: function(t) {
            return t.attr("aria-disabled", !0),
              t
          },
          enable: function(t) {
            return t.attr("aria-disabled", !1),
              t
          },
          onEnterKey: function(t) {
            13 === t.keyCode && (e(t.target).is(y.params.nextButton) ? (y.onClickNext(t),
                y.isEnd ? y.a11y.notify(y.params.lastSlideMessage) : y.a11y.notify(y.params.nextSlideMessage)) : e(t.target).is(y.params.prevButton) && (y.onClickPrev(t),
                y.isBeginning ? y.a11y.notify(y.params.firstSlideMessage) : y.a11y.notify(y.params.prevSlideMessage)),
              e(t.target).is("." + y.params.bulletClass) && e(t.target)[0].click())
          },
          liveRegion: e('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
          notify: function(t) {
            var e = y.a11y.liveRegion;
            0 !== e.length && (e.html(""),
              e.html(t))
          },
          init: function() {
            y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.a11y.makeFocusable(y.nextButton),
                y.a11y.addRole(y.nextButton, "button"),
                y.a11y.addLabel(y.nextButton, y.params.nextSlideMessage)),
              y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.a11y.makeFocusable(y.prevButton),
                y.a11y.addRole(y.prevButton, "button"),
                y.a11y.addLabel(y.prevButton, y.params.prevSlideMessage)),
              e(y.container).append(y.a11y.liveRegion)
          },
          initPagination: function() {
            y.params.pagination && y.params.paginationClickable && y.bullets && y.bullets.length && y.bullets.each(function() {
              var t = e(this);
              y.a11y.makeFocusable(t),
                y.a11y.addRole(t, "button"),
                y.a11y.addLabel(t, y.params.paginationBulletMessage.replace(/{{index}}/, t.index() + 1))
            })
          },
          destroy: function() {
            y.a11y.liveRegion && y.a11y.liveRegion.length > 0 && y.a11y.liveRegion.remove()
          }
        },
        y.init = function() {
          y.params.loop && y.createLoop(),
            y.updateContainerSize(),
            y.updateSlidesSize(),
            y.updatePagination(),
            y.params.scrollbar && y.scrollbar && (y.scrollbar.set(),
              y.params.scrollbarDraggable && y.scrollbar.enableDraggable()),
            "slide" !== y.params.effect && y.effects[y.params.effect] && (y.params.loop || y.updateProgress(),
              y.effects[y.params.effect].setTranslate()),
            y.params.loop ? y.slideTo(y.params.initialSlide + y.loopedSlides, 0, y.params.runCallbacksOnInit) : (y.slideTo(y.params.initialSlide, 0, y.params.runCallbacksOnInit),
              0 === y.params.initialSlide && (y.parallax && y.params.parallax && y.parallax.setTranslate(),
                y.lazy && y.params.lazyLoading && (y.lazy.load(),
                  y.lazy.initialImageLoaded = !0))),
            y.attachEvents(),
            y.params.observer && y.support.observer && y.initObservers(),
            y.params.preloadImages && !y.params.lazyLoading && y.preloadImages(),
            y.params.autoplay && y.startAutoplay(),
            y.params.keyboardControl && y.enableKeyboardControl && y.enableKeyboardControl(),
            y.params.mousewheelControl && y.enableMousewheelControl && y.enableMousewheelControl(),
            y.params.hashnav && y.hashnav && y.hashnav.init(),
            y.params.a11y && y.a11y && y.a11y.init(),
            y.emit("onInit", y)
        },
        y.cleanupStyles = function() {
          y.container.removeClass(y.classNames.join(" ")).removeAttr("style"),
            y.wrapper.removeAttr("style"),
            y.slides && y.slides.length && y.slides.removeClass([y.params.slideVisibleClass, y.params.slideActiveClass, y.params.slideNextClass, y.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),
            y.paginationContainer && y.paginationContainer.length && y.paginationContainer.removeClass(y.params.paginationHiddenClass),
            y.bullets && y.bullets.length && y.bullets.removeClass(y.params.bulletActiveClass),
            y.params.prevButton && e(y.params.prevButton).removeClass(y.params.buttonDisabledClass),
            y.params.nextButton && e(y.params.nextButton).removeClass(y.params.buttonDisabledClass),
            y.params.scrollbar && y.scrollbar && (y.scrollbar.track && y.scrollbar.track.length && y.scrollbar.track.removeAttr("style"),
              y.scrollbar.drag && y.scrollbar.drag.length && y.scrollbar.drag.removeAttr("style"))
        },
        y.destroy = function(t, e) {
          y.detachEvents(),
            y.stopAutoplay(),
            y.params.scrollbar && y.scrollbar && y.params.scrollbarDraggable && y.scrollbar.disableDraggable(),
            y.params.loop && y.destroyLoop(),
            e && y.cleanupStyles(),
            y.disconnectObservers(),
            y.params.keyboardControl && y.disableKeyboardControl && y.disableKeyboardControl(),
            y.params.mousewheelControl && y.disableMousewheelControl && y.disableMousewheelControl(),
            y.params.a11y && y.a11y && y.a11y.destroy(),
            y.emit("onDestroy"),
            t !== !1 && (y = null)
        },
        y.init(),
        y
    }
  };
  i.prototype = {
    isSafari: function() {
      var t = navigator.userAgent.toLowerCase();
      return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
    }(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
    isArray: function(t) {
      return "[object Array]" === Object.prototype.toString.apply(t)
    },
    browser: {
      ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
    },
    device: function() {
      var t = navigator.userAgent,
        e = t.match(/(Android);?[\s\/]+([\d.]+)?/),
        i = t.match(/(iPad).*OS\s([\d_]+)/),
        s = t.match(/(iPod)(.*OS\s([\d_]+))?/),
        a = !i && t.match(/(iPhone\sOS)\s([\d_]+)/);
      return {
        ios: i || a || s,
        android: e
      }
    }(),
    support: {
      touch: window.Modernizr && Modernizr.touch === !0 || function() {
        return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
      }(),
      transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
        var t = document.createElement("div").style;
        return "webkitPerspective" in t || "MozPerspective" in t || "OPerspective" in t || "MsPerspective" in t || "perspective" in t
      }(),
      flexbox: function() {
        for (var t = document.createElement("div").style, e = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < e.length; i++)
          if (e[i] in t)
            return !0
      }(),
      observer: function() {
        return "MutationObserver" in window || "WebkitMutationObserver" in window
      }()
    },
    plugins: {}
  };
  for (var s = ["jQuery", "Zepto", "Dom7"], a = 0; a < s.length; a++)
    window[s[a]] && t(window[s[a]]);
  var n;
  n = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7,
    n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function(t) {
        function e(n) {
          if (n.target === this)
            for (t.call(this, n),
              i = 0; i < s.length; i++)
              a.off(s[i], e)
        }
        var i, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
          a = this;
        if (t)
          for (i = 0; i < s.length; i++)
            a.on(s[i], e);
        return this
      }),
      "transform" in n.fn || (n.fn.transform = function(t) {
        for (var e = 0; e < this.length; e++) {
          var i = this[e].style;
          i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = t
        }
        return this
      }),
      "transition" in n.fn || (n.fn.transition = function(t) {
        "string" != typeof t && (t += "ms");
        for (var e = 0; e < this.length; e++) {
          var i = this[e].style;
          i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = t
        }
        return this
      })),
    window.Swiper = i
}(),
"undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
  "use strict";
  return window.Swiper
});
