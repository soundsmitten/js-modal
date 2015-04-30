// Create an immediately invoked functional expression to wrap our code
(function() {

    // Define our constructor method
    this.Modal = function() {
        // Create global element references
        this.closeButton = null;
        this.modal = null;
        this.overlay = null;

        // Define option defaults
        var defaults = {
            className: 'fade-and-drop',
            closeButton: true,
            content: "",
            maxWidth: 600,
            minWidth: 280,
            overlay: true
        }

        // Create options by extending defaults with the passed arguments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }
    }

    // Public methods
    Modal.prototype.open = function() {
        //open code goes here

    }

    // Private methods
    function buildOut() {
        var content, contentHolder, docFrag;

        /*
         * If content is on an HTML string, append the JTML string.
         * If content is in a domNode, append its content.
         */

        if (typeof this.options.content == "string") {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }

        // Create a DocumentFragment to build with
        docFrag = document.createDocumentFragment();

        // Create modal element
        this.modal = document.createElement("div");
        this.modal.className = "jezuhke-modal" + this.options.className;
        this.modal.style.minWidth = this.options.minWidth + "px";
        this.modal.style.maxWidth = this.options.maxWidth + "px";

        // If closeButton option is true, add a close button
        if (this.options.closeButton === true) {
            this.closeButton = document.createElement("button");
            this.closeButton.className = "jezuhke-close close-button";
            this.closeButton.innerHTML = "x";
            this.modal.appendChild(this.closeButton);
        }

        // If overlay is true, add one
        if (this.options.overlay === true) {
            this.overlay = document.createElement("div");
            this.overlay.className = "jezuhke-overlay" + this.options.classname;
            docFrag.appendChild(contentHolder);
        }

        // Create content area and append to modal
        contentHolder = document.createElement("div");
        contentHolder.className = "jezuhke-content";
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);

        // Append modal to DocumentFragment
        docFrag.appendChild(this.modal);

        // Append DocumentFragment to body
        document.body.appendChild(docFrag);
    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    // Attach events
    function initializeEvents() {

        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', this.close.bind(this));
        }

    }

}());
