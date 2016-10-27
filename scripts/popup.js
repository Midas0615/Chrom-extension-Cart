! function() {
    "use strict";
    window.BLACKCART_CONFIG = {
        server: {
            baseURL: "https://blackcart.co:3000",
            endPoints: {
                auth: "/auth",
                getUserByID: "/user/",
                getOrder: "/order",
                getOrderByUser: "/order/byuser",
                addProduct: "/order/addproduct",
                removeProduct: "/order/removeproduct",
                createOrder: "/order",
                getToken: "/token",
                refreshToken: "/token/refresh",
                getBrands: "/brands",
                getUserInfo: "/user/info",
                saveShippingInfo: "/user/info/shipping",
                savePaymentInfo: "/user/info/payment",
                analytics: {
                    showButton: "/analytics/showbutton"
                }
            }
        },
        uploadURL: "https://api.imgur.com/3/image",
        loginRedirectURL: "https://blackcart.co/register/walkthrough.php"
    }
}(),
function() {
    "use strict";
    var a = {},
        b = {};
    _.mixin({
        capitalize: function(a) {
            return _.map(a.split(" "), function(a) {
                return a.charAt(0).toUpperCase() + a.substring(1)
            }).join(" ")
        }
    }), window.Blackcart = {
        globals: {},
        views: {},
        collections: {
            addCollection: function(b, c, d) {
                return d = d || {}, a[c] && d.override || (a[c] = b), b
            },
            getCollectionInstance: function(c) {
                var d;
                if (!c) throw new Error("collection name is required");
                return d = b[c], d ? d : b[c] = new a[c]
            }
        }
    }
}(),
function() {
    "use strict";
    var a = {},
        b = "",
        c = "",
        d = window.BLACKCART_CONFIG,
        e = 800,
        f = 1,
        g = function(a) {
            var b = {
                url: a.url,
                type: a.method,
                dataType: "json",
                cache: !1,
                processData: !1
            };
            return a.data && (a.contentType || "GET" === a.method || (b.contentType = "application/json"), "application/json" === b.contentType ? b.data = JSON.stringify(a.data) : b.data = a.data), $.ajax(b)
        },
        h = function(a) {
            var b = window.BLACKCART_CONFIG.server.baseURL,
                c = a.endpoint;
            return a.url = b + (c.startsWith("/") ? c : "/" + c), g(a)
        };
    window.Blackcart.utils = {
        extendMany: function() {
            var a = Array.prototype.slice.call(arguments),
                b = a.shift();
            return _.reduce(a, function(a, b) {
                return a.extend(b)
            }, b)
        },
        createCustomViewClass: function() {
            return this.extendMany(Backbone.View, this.UtilsClass, this.TemplateLoader)
        },
        UtilsClass: {
            log: function() {
                var a = Array.prototype.slice.call(arguments);
                1 === a.length ? console.log("Blackcart:", a[0]) : a.length >= 2 && console[a[0]] && console[a[0]]("Blackcart:", a[1])
            },
            getChromeURL: function(a) {
                return chrome.extension.getURL(a)
            },
            ajax: g,
            rest: h,
            getShadowElement: function(a) {
                var b = this.$el.get(0),
                    c = b.shadowRoot;
                return c.querySelectorAll(a)
            }
        },
        TemplateLoader: {
            vendorCSS: ["styles/vendor/font-awesome.min.css", "bower_components/bootstrap/dist/css/bootstrap.min.css", "bower_components/bootstrap/dist/css/bootstrap-theme.min.css"],
            loadTemplateFromURL: function(b) {
                var c;
                return a[b] ? a[b] : (c = $.get(this.getChromeURL(b)), c.done(function(c) {
                    a[b] = c
                }), c)
            },
            loadCSSFromURL: function(a) {
                return '<style> @import "' + chrome.extension.getURL(a) + '"; </style>'
            },
            loadVendorCSS: function() {
                return _.map(this.vendorCSS, function(a) {
                    return '<style> @import "' + chrome.extension.getURL(a) + '"; </style>'
                }).join("\n")
            }
        },
        generateRandom: function(a) {
            var b = Math.pow(10, a || 5);
            return Math.round(Math.random() * b)
        },
        resetImgurToken: function() {
            return b = null, c = null, this
        },
        getImgurToken: function() {
            var a = d.server.baseURL + d.server.endPoints.getToken + "/imgur",
                e = $.Deferred();
            return b ? e.resolve() : ($.ajax({
                url: a,
                type: "GET"
            }).done(function(a) {
                b = a.access_token, c = a.refresh_token, e.resolve()
            }).fail(function() {
                e.reject()
            }), e)
        },
        refreshImgurToken: function() {
            var a = d.server.baseURL + d.server.endPoints.refreshToken + "/imgur";
            return $.ajax({
                url: a,
                type: "POST"
            })
        },
        getDataURI: function(a, b) {
            chrome.runtime.sendMessage({
                evt: "get-dataurl",
                imgURL: a
            }, function(a) {
                b(a.dataURL)
            })
        },
        checkImageLoad: function(a, b) {
            chrome.runtime.sendMessage({
                evt: "check-image-load",
                imgURL: a
            }, function(a) {
                b(a && "check-image-load:ok" === a.resp)
            })
        },
        uploadImage: function(a, g, h) {
            var i = this;
            return h = h || $.Deferred(), g = _.isUndefined(g) ? 0 : g, a ? (g || (a = a.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "")), $.ajax({
                url: d.uploadURL,
                type: "POST",
                headers: {
                    Authorization: "Bearer " + b,
                    Accept: "application/json"
                },
                data: {
                    image: a,
                    type: "file"
                }
            }).done(function(a) {
                h.resolve(a)
            }).fail(function(d) {
                401 === d.status || 403 === d.status ? g > f ? (i.resetImgurToken().refreshImgurToken(), h.reject("token-error")) : (g += 1, i.resetImgurToken().refreshImgurToken().done(function(d) {
                    return d && "IN-PROGRESS" === d.result ? setTimeout(function() {
                        i.getImgurToken().done(function() {
                            return i.uploadImage(a, g, h)
                        }).fail(function() {
                            h.reject("token-error")
                        })
                    }, e) : d && d.access_token ? (b = d.access_token, c = d.refresh_token, i.uploadImage(a, g, h)) : void h.reject("token-error")
                }).fail(function() {
                    h.reject("token-error")
                })) : 504 === d.status && (i.UtilsClass.log("error", "Gateway time out"), h.resolve({
                    data: {}
                }))
            }), h) : (h.reject("datauri-undefined"), h)
        },
        logShowButton: function(a, b) {
            return h({
                endpoint: d.server.endPoints.analytics.showButton,
                data: {
                    uid: a.UID,
                    retailerName: b.PSource
                },
                method: "POST"
            })
        },
        fixThumbnailURL: function(a) {
            return !a || a.indexOf("?") < 0 ? a : a.split("?")[0]
        },
        uploadImageConditional: function(a) {
            var b, c, d = this;
            return a && a.startsWith("data:image") ? a.startsWith("data:image/jpeg") || a.startsWith("data:image/png") ? this.uploadImage(a) : (b = $.Deferred(), this.getDataURI(a, function(a) {
                d.uploadImage(a).done(function(a) {
                    b.resolve(a)
                }).fail(function(a) {
                    b.reject(a)
                })
            }), b.promise()) : (b = $.Deferred(), c = this.fixThumbnailURL(a), this.checkImageLoad(c, function(e) {
                e ? b.resolve(c) : d.getDataURI(a, function(a) {
                    d.uploadImage(a).done(function(a) {
                        b.resolve(a)
                    }).fail(function(a) {
                        b.reject(a)
                    })
                })
            }), b.promise())
        }
    }
}(),
function() {
    "use strict";
    var a = window.Blackcart,
        b = a.utils,
        c = window.BLACKCART_CONFIG,
        d = b.createCustomViewClass().extend({
            events: {},
            initialize: function() {
                var a = this;
                this._getBrands().done(function(b) {
                    a.brands = b, a.render()
                }).complete(function(b){
                	var f = $(".blackcart-auth-failure");
                	0 === b.status && f.text("Error connecting to the server.").removeClass("hidden"), console.log(b)
                })
            },
            _getBrands: function() {
                return this.rest({
                    endpoint: c.server.endPoints.getBrands,
                    method: "GET"
                })
            },
            render: function() {
                var a, b = this.$el.find(".row"),
                    c = [];
                return b.empty(), _.each(this.brands, function(b) {
                    return 0 === b.Active ? !0 : (a = ['<div class="col-md-6 column">'], a.push('<a class="brand-name" href="' + b.URL + '" target="_blank" title="' + b.BTitle + '" style="font-size:13px;">'), a.push(b.BTitle + "</a><br/>"), a.push('<a href="' + b.URL + '" target="_blank" title="' + b.BTitle + '">'), a.push('<img src="' + b.BThumbnail + '" alt="' + b.BTitle + '" />'), a.push("</a></div>"), c.push(a.join("\n")), void a.splice(0, a.length))
                }), b.html(c.join("\n")), c.splice(0, c.length), this
            },
            show: function() {
                this.$el.removeClass("hidden")
            },
            hide: function() {
                this.$el.addClass("hidden")
            },
            toggle: function() {
                this.$el.hasClass("hidden") ? this.show() : this.hide()
            }
        });
    window.Blackcart.views.Brands = d
}(), $(function() {
    "use strict";

    function a() {
        var a = $(".blackcart-status");
        chrome.runtime.sendMessage({
            evt: "blackcart-is-tab-active"
        }, function(b) {
            a[b.status ? "removeClass" : "addClass"]("hidden")
        })
    }
    var b, c = window.BLACKCART_CONFIG,
        d = Blackcart.views.Brands,
        e = $(".blackcart-brands-container"),
        f = $(".blackcart-auth-failure");
    a(), b = new d({
        el: e
    }), chrome.storage.sync.get({
        UID: "",
        UserName: "",
        UName: ""
    }, function(a) {
        $(".blackcart-popup-container .loading").addClass("hidden"), a.UID ? $(".logged-in-user").removeClass("hidden") : $("#blackcart-signin-form").removeClass("hidden")
    }), $("#blackcart-signin-form").on("submit", function(a) {
        a.preventDefault(), f.addClass("hidden"), $.ajax({
            url: c.server.baseURL + c.server.endPoints.auth,
            type: "POST",
            data: JSON.stringify({
                email: $("#email").val(),
                password: $("#password").val()
            }),
            dataType: "json",
            cache: !1,
            contentType: "application/json",
            processData: !1
        }).done(function(a) {
            chrome.storage.sync.set({
                UID: a.UID,
                UEmailID: a.UEmailID,
                UName: a.UName
            }, function() {
                $("#blackcart-signin-form").addClass("hidden"), $(".logged-in-user").removeClass("hidden"), chrome.runtime.sendMessage({
                    evt: "blackcart-login-success"
                }), window.close()
            })
        }).fail(function(a) {
            403 === a.status && f.text("Please check your email/password.").removeClass("hidden"), console.log(a)
        }).complete(function(a){
        	0 === a.status && f.text("Error connecting to the server.").removeClass("hidden"), console.log(a)
        })
    }), chrome.runtime.onMessage.addListener(function(a, b, c) {
        "blackcart-external-login" === a.evt && ($("#blackcart-signin-form").addClass("hidden"), $(".logged-in-user").removeClass("hidden"), window.close())
    }), $("#open-cart").on("click", function() {
        chrome.tabs.query({
            currentWindow: !0,
            active: !0
        }, function(a) {
            var b = a[0];
            chrome.tabs.sendMessage(b.id, {
                evt: "blackcart-click"
            }, function(a) {
                "blackcart-click:OK" === a.farewell && window.close()
            })
        })
    }), $(".blackcart-brands-link").on("click", function(a) {
        a.preventDefault(), b.toggle()
    })
});