(function() {
    'use strict';
    var CustomHandlers = {
        /*this method will be added to the PageManager class and will be called in that context
        so if there are any mystery methods that aren't visible here, they will be defined in PageManager (contentscript.js)*/
        zaraCustomHandler: function(retailer) {
            var self = this;
            var timeout = 1200;
            var popupTimeout = 1500;
            /* listen to history changes*/
            window.onpopstate = function() {
                setTimeout(function() {
                    self.removeButtons().injectButton(retailer);
                }, timeout);
            };

            $('body').on('click', 'a', function() {
                var $el = $(this);
                if ($el.parent().is('li.product') || $el.parent().is('#products-nav')) {
                    setTimeout(function() {
                        self.removeButtons().injectButton(retailer);
                    }, timeout);
                }
                if ($el.hasClass('_product-popup-link')) {
                    setTimeout(function() {
                        self.removeButtons('popup').injectButton(retailer, {
                            injectType: 'popup'
                        });
                    }, popupTimeout);
                }
            });

            $('body').on('click', 'span', function() {
                var $el = $(this);
                if ($el.hasClass('arrow')) {
                    setTimeout(function() {

                        self.removeButtons('popup').injectButton(retailer, {
                            injectType: 'popup'
                        });
                    }, popupTimeout);
                }
            });
        },
        newBalanceCustomHandler: function(retailer) {
            var self = this;
            var timeout = 1200;
            var popupTimeout = 1500;
            $('body').on('click', 'li.tile', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        shopBopCustomHandler: function(retailer) {
            var self = this;
            var timeout = 1200;
            var popupTimeout = 1500;
            $('body').on('click', 'li.product', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        theShoeCompanyCustomHandler: function(retailer) {
            var self = this;
            var timeout = 1200;
            var popupTimeout = 1500;
            $('body').on('click', 'a.productQuickViewLink', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });

            $('body').on('click', '#quickviewLightbox .sizeSelector li', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });

            $('body').on('click', '#quickviewLightbox .dk_options_inner li > a', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        americanEagleCustomHandler: function(retailer) {
            var self = this;
            var popupTimeout = 2000;
            $('body').on('click', '.aeoicon-add', function() {
                if ($(this).parent().hasClass('quickview-product-btn')) {
                    setTimeout(function() {
                        self.removeButtons('popup').injectButton(retailer, {
                            injectType: 'popup',
                            stopPolling: true
                        });
                    }, popupTimeout);
                }
            });

            $('body').on('click', '.quickview-product-btn', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });

            $('body').on('click', '.quickview-swatch-img', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        billabongCustomHandler: function(retailer) {
            var self = this;
            var popupTimeout = 2000;
            $('body').on('click', 'a.quickview', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        nikeCustomHandler: function(retailer) {
            var self = this;
            var timeout = 800;
            $('body').on('click', 'li', function() {
                var $el = $(this);
                if ($el.parents('.color-chips').length > 0) {
                    setTimeout(function() {
                        self.removeButtons().injectButton(retailer);
                    }, timeout);
                }
            });
        },
        garageCustomHandler: function(retailer) {
            var self = this;
            var popupTimeout = 2000;
            $('body').on('click', 'a.quickViewImg', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        footLockerCustomHandler: function(retailer) {
            var self = this;
            var popupTimeout = 1500;
            $('body').on('mousedown', 'a.quickviewButton', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        hollisterCustomHandler: function(retailer) {
            var self = this;
            var popupTimeout = 1500;
            $('body').on('click', 'a.grid-product__quick-view', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        jackjonesCustomHandler: function(retailer) {
            var self = this;
            var popupTimeout = 2000;
            $('body').on('click', 'a.quick-view', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        marcianoCustomHandler: function(retailer) {
            var self = this;
            var popupTimeout = 2000;
            $('body').on('mouseup', 'a.quickviewLink', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, popupTimeout);
            });
        },
        melanieLyneCustomHandler: function(retailer) {
            var self = this;
            // delay this a lot because everything gets loaded in an iframe. Not very efficient
            var popupTimeout = 5000;
            var timeout = 1500;
            $('body').on('click', '.quickview', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true,
                        isIframe: true
                    });
                }, popupTimeout);
            }).on('click','.swatches li.selectable',function(){
                setTimeout(function() {
                    self.removeButtons().injectButton(retailer, {
                        stopPolling: true
                    });
                }, timeout);
            });
        },

        underArmourCustomHandler: function(retailer) {
            var self = this;
            // delay this a lot because everything gets loaded in an iframe. Not very efficient
            var popupTimeout = 5000;
            $('body').on('click', '.product-quickview', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true,
                        isIframe: true
                    });
                }, popupTimeout);
            });
        },

        rwcoCustomHandler: function(retailer) {
            var self = this;
            var timeout = 1500;
            $('body').on('click', '.swatchanchor', function() {
                setTimeout(function() {
                    self.removeButtons().injectButton(retailer);
                }, timeout);
            }).on('click', 'a.btn-quickview', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, timeout);
            });
        },

        forever21Handler: function(retailer) {
            var self = this;
            var timeout = 1500;
            $('body').on('click', '.quick_view', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, timeout);
            });
        },

        brownShoesHandler: function(retailer) {
            var self = this;
            var timeout = 1500;
            var swatchSelectTimeout = 1800;
            $('body').on('click', '#quickviewbutton', function() {
                setTimeout(function() {
                    self.removeButtons().injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, timeout);
            }).on('click', '.swatchanchor,.swatches.Color .selected,.swatches.size .selected', function() {
                setTimeout(function() {
                    self.removeButtons().injectButton(retailer, {
                        stopPolling: true
                    });
                }, swatchSelectTimeout);
            });
        },

        runningRoomCustomHandler: function(retailer) {
            var self = this;
            var timeout = 4000;
            $('body').on('mouseup', '.quickview-link', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true,
                        isIframe: true
                    });
                }, timeout);
            });
        },

        benchCustomHandler: function(retailer) {
            var self = this;
            var timeout = 9000;
            $('body').on('click', '.quickview', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true,
                        isIframe: true
                    });
                }, timeout);
            });
        },

        simonsCustomHandler: function(retailer) {
            var self = this;
            var timeout = 2000;
            $('body').on('click', 'a.quick > span', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true
                    });
                }, timeout);
            });
        },

        theBayCustomHandler: function(retailer) {
            var self = this;
            var timeout = 2000;
            $('body').on('mouseup', '.quickview', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true,
                        isIframe: true
                    });
                }, timeout);
            });
        },

        joeFreshCustomHandler: function(retailer) {
            var self = this;
            var timeout = 1500;
            $('body').on('change', '#variant,#qty', function() {
                setTimeout(function() {
                    self.removeButtons().injectButton(retailer, {
                        stopPolling: true
                    });
                }, timeout);
            }).on('click', 'li.active-result', function() {
                setTimeout(function() {
                    self.removeButtons().injectButton(retailer, {
                        stopPolling: true
                    });
                }, timeout);
            });
        },

        clubMonacoCustomHandler: function(retailer) {
            var self = this;
            var timeout = 5000;
            $('body').on('click', '.quickshop-link-magnify', function() {
                setTimeout(function() {
                    self.removeButtons('popup').injectButton(retailer, {
                        injectType: 'popup',
                        stopPolling: true,
                        isIframe: true
                    });
                }, timeout);
            });
        }
    };
    window.Blackcart.CustomHandlers = CustomHandlers;
}());