(function() {
    // constructor for the bottom bar
    this.BarButton = function() {
        var defaults = { 
            buttonText:  'Sample Text',
            className: '',
            handler: undefined
        }
    }
    // Define our constructor
    this.Modal = function() {

        // Create global element references
        this.closeButton = null;
        this.modal = null;
        this.overlay = null;

        // Determine proper prefix
        this.transitionEnd = transitionSelect();

        // Define option defaults
        var defaults = {
            autoOpen: false,
            className: 'fade-and-drop',
            closeButton: true,
            content: "",
            maxWidth: 600,
            minWidth: 280,
            overlay: true,
            toolbarButtons: [],
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        if(this.options.autoOpen === true) this.open();

    }

    // Public Methods

    Modal.prototype.close = function() {
        var _ = this;
        this.modal.className = this.modal.className.replace(" jh-open", "");
        this.overlay.className = this.overlay.className.replace(" jh-open",
        "");
        
        this.modal.addEventListener(this.transitionEnd, function() {
            _.modal.parentNode.removeChild(_.modal);
        });
        this.overlay.addEventListener(this.transitionEnd, function() {
            if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
        });
    },
    
    Modal.prototype.open = function() {
        buildOut.call(this);
        initializeEvents.call(this);
        window.getComputedStyle(this.modal).height;

        this.modal.className = this.modal.className.replace(" invisible", "");
        this.overlay.className = this.overlay.className.replace(" invisible", "",
            "");
        this.modal.className = this.modal.className +
        (this.modal.offsetHeight > window.innerHeight ?
            " jh-open jh-anchored" : " jh-open");
            this.overlay.className = this.overlay.className + " jh-open";
    }

    // Private Methods

    
    function buttonBarInit() {
        var buttonBar = '<div class="toolbar">';
        var buttonBarItems = this.options.toolbarButtons;
        var counter = 0;
        buttonBarItems.map(function(item) {
            buttonBar += '<button type="button" id="b_' + counter + '" class="' + item.className +  '">' + item.buttonText + '</button>&nbsp;&nbsp;';     
            counter++;
        });
        button = '</div>'
        return buttonBar;
    }
     
    function buttonBarAddHandlers() {
        /* 
        * Once the DOM element of the popup is created, call to add event handlers.
        */

        var buttons = this.options.toolbarButtons;
        var len = buttons.length;
        for (var i = 0; i < len; i++) {
            var button = document.getElementById('b_' + i);
            buttonHandler = buttons[i].handler;
            var self = this;
            if (buttonHandler !== undefined) {
                attachEvent.call(this, button, 'click', buttonHandler);
            }
        }
    }
    
    function attachEvent(element, event, handler)
    {
        /*
        * Helper method to mitigate scope hell.
        */
        if (element && element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
        else if (element && element.addEventListener) {
            element.addEventListener(event, handler, false);
        }
    }
    
    function buildOut() {
        var content, toolbar, contentHolder, docFrag;
        /*
        * If content is an HTML string, append the HTML string.
        * If content is a domNode, append its content.
        * If toolbarButtons is non-empty, add the buttons.
        */

        if (typeof this.options.content === "string") {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }
        
        // add buttons
        if (this.options.toolbarButtons.length > 0) {
            toolbar = buttonBarInit.call(this);
        }
        
        // Create a DocumentFragment to build with
        docFrag = document.createDocumentFragment();

        // Create modal element
        this.modal = document.createElement("div");
        this.modal.className = "jh-modal " + this.options.className;
        this.modal.style.minWidth = this.options.minWidth + "px";
        this.modal.style.maxWidth = this.options.maxWidth + "px";

        // If closeButton option is true, add a close button
        if (this.options.closeButton === true) {
            this.closeButton = document.createElement("button");
            this.closeButton.className = "jh-close close-button";
            this.closeButton.innerHTML = "&times;";
            this.modal.appendChild(this.closeButton);
        }

        // If overlay is true, add one
        if (this.options.overlay === true) {
            this.overlay = document.createElement("div");
            this.overlay.className = "jh-overlay " + this.options.className;
            docFrag.appendChild(this.overlay);
        }

        // Create content area and append to modal
        contentHolder = document.createElement("div");
        contentHolder.className = "jh-content";
        contentHolder.innerHTML = content + toolbar;
        this.modal.appendChild(contentHolder);

        // Append modal to DocumentFragment
        docFrag.appendChild(this.modal);

        // Append DocumentFragment to body
        document.body.appendChild(docFrag);
        
        // Add event handlers to the buttons
        if (this.options.toolbarButtons.length > 0) {
            buttonBarAddHandlers.call(this);        
        }
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function initializeEvents() {
        /*
        * Add events that close the window.
        */
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', this.close.bind(this));
        }
    }

    function transitionSelect() {
        var el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }

})();


// Demo modal 1 - uncomment below
// var myContent = document.getElementById('content');
//
// var myModal = new Modal({
//     content: myContent
// });
//
// var triggerButton = document.getElementById('trigger');
//
// triggerButton.addEventListener('click', function() {
//     myModal.open();
// });


// Demo modal 2 - uncomment below
// var myContent = document.getElementById('content');
//
// var myModal = new Modal({
//   content: myContent,
//   className: 'zoom'
// });
//
// var triggerButton = document.getElementById('trigger');
//
// triggerButton.addEventListener('click', function() {
//   myModal.open();
// });


// Demo modal 3 - uncomment below
// var myContent = document.getElementById('content');
//
// var myModal = new Modal({
//   content: myContent,
//   className: 'zoom-and-spin',
// });
//
// var triggerButton = document.getElementById('trigger');
//
// triggerButton.addEventListener('click', function() {
//   myModal.open();


//Demo Modal 4: Demo with button bar - uncomment below
// var triggerButton = document.getElementById('trigger');
// myModal = new Modal({
//     content: '<h1>Loading&#8230;</h1><p>This is great!</p>',
//     className: 'zoom',
//     closeButton: true,
//     toolbarButtons: [{
//         buttonText: 'Show an alert and close.',
//         className: '',
//         handler: function() {
//             myModal.close();
//             alert('button handler');
//         }
//     }, {
//         buttonText: 'Just get me outta here!',
//         className: '',
//         handler: function() {
//             myModal.close();
//         }
//     }]
// });
//
// var triggerButton = document.getElementById('trigger');
//
// triggerButton.addEventListener('click', function() {
//     myModal.open();
// });