$(document).on(
    'mouseover',
    '[tippy]',
    function() {

        tippy('[tippy]', {
            inertia: true,
            hideOnClick: false,

            delay: 0,
            zIndex: 9999,
            duration: 0,
            appendTo: () => document.body,
            animateFill: false,
            theme: 'tomato',
        })

    }
);