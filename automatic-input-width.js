var automaticInputWidth = (function () {
    'use strict';

    var CLASS_TOKEN                     = '.',
        BACKSPACE_KEY_CODE              = 8,
        INPUT_TEXT_HOLDER_ELEMENT       = '<span />',
        INPUT_TEXT_HOLDER_CLASS_NAME    = 'input-text-holder',
        KEYPRESS_EVENT_NAME             = 'keypress',
        KEYUP_EVENT_NAME                = 'keyup',
        BODY_ELEMENT_NAME               = 'body',
        INITIAL_INPUT_WIDTH_ATTRIBUTE   = 'data-initial-input-width',
        INPUT_TEXT_HOLDER_SELECTOR      = CLASS_TOKEN + INPUT_TEXT_HOLDER_CLASS_NAME,
        EXPANDABLE_WIDTH_INPUT_SELECTOR = CLASS_TOKEN + 'expandable-input-width';

    var $body;

    var setDOMElements = function setDOMElements () {
        $body = $(BODY_ELEMENT_NAME);
    };

    var setInitialInputWidth = function setInitialInputWidth () {
        $(EXPANDABLE_WIDTH_INPUT_SELECTOR).each(function () {
            var $this = $(this);

            $this.attr(INITIAL_INPUT_WIDTH_ATTRIBUTE, $this.outerWidth());
        });
    };

    var createInputTextHolders = function createInputTextHolders () {
        $(EXPANDABLE_WIDTH_INPUT_SELECTOR).each(function () {
            $(INPUT_TEXT_HOLDER_ELEMENT).addClass(INPUT_TEXT_HOLDER_CLASS_NAME).insertAfter($(this));
        });
    };

    var adjustInputWidth = function adjustInputWidth (element) {
        var thisTextHolder = $(element).siblings(INPUT_TEXT_HOLDER_SELECTOR)[0],
            thisInitialInputWidth = parseInt(element.dataset.initialInputWidth, 10),
            textHolderWidth;

        thisTextHolder.innerHTML = element.value;

        textHolderWidth = Math.ceil(
            parseInt(thisTextHolder.offsetWidth, 10)
        );

        if (0 === textHolderWidth) {
            textHolderWidth = thisInitialInputWidth;
        }

        element.style.width = textHolderWidth + 'px';
    }

    var handleInputKeyUp = function handleInputKeyUp (e) {
        adjustInputWidth(e.currentTarget);
    };

    var bindEvents = function () {
        $body.on(KEYUP_EVENT_NAME, EXPANDABLE_WIDTH_INPUT_SELECTOR, handleInputKeyUp);
    };

    return {
        init: function () {
            setDOMElements();
            setInitialInputWidth();
            createInputTextHolders();
            bindEvents();
        }
    };
})();

