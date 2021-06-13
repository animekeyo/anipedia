$(document).on(
    'mouseover',
    '[tippy]',
    function() {

        tippy('[tippy]', {
            inertia: true,
            hideOnClick: false,
            interactive: true,
            delay: 0,
            zIndex: 9999,
            duration: 0,
            animateFill: false,
            theme: 'tomato',
        })

    }
);