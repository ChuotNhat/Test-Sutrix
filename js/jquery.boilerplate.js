// ---------------------------------
// ---------- Plugin Name ----------
// ---------------------------------
// Brief plugin description
// ------------------------

/*
    The semi-colon before the function invocation is a safety net against
    concatenated scripts and/or other plugins which may not be closed properly.

    "undefined" is used because the undefined global variable in ECMAScript 3
    is mutable (ie. it can be changed by someone else). Because we don't pass a
    value to undefined when the anonymyous function is invoked, we ensure that
    undefined is truly undefined. Note, in ECMAScript 5 undefined can no
    longer be modified.

    "window" and "document" are passed as local variables rather than global.
    This (slightly) quickens the resolution process.
*/
;(function ( $, window, document, undefined ) {
    
    /*
        Store the name of the plugin in the "pluginName" variable. This
        variable is used in the "Plugin" constructor below, as well as the
        plugin wrapper to construct the key for the "$.data" method.

        More: http://api.jquery.com/jquery.data/
    */
    var pluginName = 'CreateSlide';
    

    /*
        The "Plugin" constructor, builds a new instance of the plugin for the
        DOM node(s) that the plugin is called on. For example,
        "$('h1').pluginName();" creates a new instance of pluginName for
        all h1's.
    */
    // Create the plugin constructor
    function Plugin ( element, options ) {
        /*
            Provide local access to the DOM node(s) that called the plugin,
            as well local access to the plugin name and default options.
        */
        this.element = element;
        this._name = pluginName;
        this._defaults = $.fn.CreateSlide.defaults;
        /*
            The "$.extend" method merges the contents of two or more objects,
            and stores the result in the first object. The first object is
            empty so that we don't alter the default options for future
            instances of the plugin.

            More: http://api.jquery.com/jquery.extend/
        */
        this.options = $.extend( {}, this._defaults, options );

        /*
            The "init" method is the starting point for all plugin logic.
            Calling the init method here in the "Plugin" constructor function
            allows us to store all methods (including the init method) in the
            plugin's prototype. Storing methods required by the plugin in its
            prototype lowers the memory footprint, as each instance of the
            plugin does not need to duplicate all of the same methods. Rather,
            each instance can inherit the methods from the constructor
            function's prototype.
        */
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {

        // Initialization logic
        init: function () {
            /*
                Create additional methods below and call them via
                "this.myFunction(arg1, arg2)", ie: "this.buildCache();".

                Note, you can cccess the DOM node(s), plugin name, default
                plugin options and custom plugin options for a each instance
                of the plugin by using the variables "this.element",
                "this._name", "this._defaults" and "this.options" created in
                the "Plugin" constructor function (as shown in the buildCache
                method below).
            */
            this.buildCache();
            this.bindEvents();
            // Xet thoi chay lai ham auto
            plugin=this;
            setTimeout("plugin.auto()",2000);
            
        },

        // Remove plugin instance completely
        destroy: function() {
            /*
                The destroy method unbinds all events for the specific instance
                of the plugin, then removes all plugin data that was stored in
                the plugin instance using jQuery's .removeData method.

                Since we store data for each instance of the plugin in its
                instantiating element using the $.data method (as explained
                in the plugin wrapper below), we can call methods directly on
                the instance outside of the plugin initalization, ie:
                $('selector').data('plugin_myPluginName').someOtherFunction();

                Consequently, the destroy method can be called using:
                $('selector').data('plugin_myPluginName').destroy();
            */
            this.unbindEvents();
            this.$element.removeData();
        },

        // Cache DOM nodes for performance
        buildCache: function () {
            /*
                Create variable(s) that can be accessed by other plugin
                functions. For example, "this.$element = $(this.element);"
                will cache a jQuery reference to the elementthat initialized
                the plugin. Cached variables can then be used in other methods. 
            */
            this.$element = $(this.element);
        },

        // Bind events that trigger methods

        bindEvents: function() {
            var plugin = this;

			        

            
            /*
                Bind event(s) to handlers that trigger other functions, ie:
                "plugin.$element.on('click', function() {});". Note the use of
                the cached variable we created in the buildCache method.

                All events are namespaced, ie:
                ".on('click'+'.'+this._name', function() {});".
                This allows us to unbind plugin-specific events using the
                unbindEvents method below.
            */
            // function nextTo() {
            	
            // }
            // Lay nut dieu khien ben trai va xu ly su kien click no
            var left = plugin.$element.find(".left");
            left.on('click'+'.'+plugin._name, function() {
                /*
                    Use the "call" method so that inside of the method being
                    called, ie: "someOtherFunction", the "this" keyword refers
                    to the plugin instance, not the event handler.

                    More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
                */
                plugin.click_element_pre.call(plugin);
            });

            // lay nut dieu khien ben phai va xu ly su kien click no
            var right = plugin.$element.find(".right");
            right.on('click'+'.'+plugin._name, function() {
                /*
                    Use the "call" method so that inside of the method being
                    called, ie: "someOtherFunction", the "this" keyword refers
                    to the plugin instance, not the event handler.

                    More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
                */
                plugin.click_element_next.call(plugin);
            });

            // lay 4 nut tron dieu huong va xu ly su kien khi click 1 trong 4 nut do
            var jumb_button = plugin.$element.find("#cover-ctrl div");
            jumb_button.each(function()
            {
            	$(this).on('click'+'.'+plugin._name, function() {
                /*
                    Use the "call" method so that inside of the method being
                    called, ie: "someOtherFunction", the "this" keyword refers
                    to the plugin instance, not the event handler.

                    More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
                */
                plugin.click_goto($(this).attr('node')).call(plugin);
            });
            });
           
        },

        // ham tu dong chuyen slide
        auto : function() {
        	plugin = this;
        	plugin.click_element_next();
        	setTimeout("eval(plugin.auto())",2000);

        },

        // Unbind events that trigger methods
        unbindEvents: function() {
            /*
                Unbind all events in our plugin's namespace that are attached
                to "this.$element".
            */
            this.$element.off('.'+this._name);
        },

        /*
            "someOtherFunction" is an example of a custom method in your
            plugin. Each method should perform a specific task. For example,
            the buildCache method exists only to create variables for other
            methods to access. The bindEvents method exists only to bind events
            to event handlers that trigger other methods. Creating custom
            plugin methods this way is less confusing (separation of concerns)
            and makes your code easier to test.
        */
        // Bắt sự kiện oclick của các nút phai
        click_element_next: function() {
        	var current = $(".active").attr("stt")*1.0;    
        	var next = current + 1;
        	if(next > 4) {
        		next = 1;
        	}

        	$("[node='"+current+"']").removeClass("change-bg");
			$("[node='"+next+"']").addClass("change-bg");
			$("[stt='"+current+"']").removeClass("active");
			$("[stt='"+next+"']").addClass("active");
			current = next;

        },
        // ham xu ly su kien nut trai
        click_element_pre : function() {
        	var current = $(".active").attr("stt")*1.0; 
        	var pre = current - 1;
        	if(pre < 1) {
        		pre = 4;
        	}
        	$("[node='"+current+"']").removeClass("change-bg");
			$("[node='"+pre+"']").addClass("change-bg");
			$("[stt='"+current+"']").removeClass("active");
			$("[stt='"+pre+"']").addClass("active");
			current = pre;
        },
        // ham xu ly su kien 4 nut o duoi
        click_goto : function(stt) {
        	var current = $(".active").attr("stt")*1.0; 
        	$("[node='"+current+"']").removeClass("change-bg");
			$("[node='"+stt+"']").addClass("change-bg");
			$("[stt='"+current+"']").removeClass("active");
			$("[stt='"+stt+"']").addClass("active");
			current = stt;
        }
       


    });

    /*
        Create a lightweight plugin wrapper around the "Plugin" constructor,
        preventing against multiple instantiations.

        More: http://learn.jquery.com/plugins/basic-plugin-creation/
    */
    $.fn.CreateSlide = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                /*
                    Use "$.data" to save each instance of the plugin in case
                    the user wants to modify it. Using "$.data" in this way
                    ensures the data is removed when the DOM element(s) are
                    removed via jQuery methods, as well as when the userleaves
                    the page. It's a smart way to prevent memory leaks.

                    More: http://api.jquery.com/jquery.data/
                */
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        /*
            "return this;" returns the original jQuery object. This allows
            additional jQuery methods to be chained.
        */
        return this;
    };

    /*
        Attach the default plugin options directly to the plugin object. This
        allows users to override default plugin options globally, instead of
        passing the same option(s) every time the plugin is initialized.

        For example, the user could set the "property" value once for all
        instances of the plugin with
        "$.fn.pluginName.defaults.property = 'myValue';". Then, every time
        plugin is initialized, "property" will be set to "myValue".

        More: http://learn.jquery.com/plugins/advanced-plugin-concepts/
    */
    $.fn.CreateSlide.defaults = {
        property: 'value',
        onComplete: null
    };

    
})( jQuery, window, document );