$(document).on(
    'mouseover',
    '[tippy]',
    function() {

        tippy('[tippy]', {
            inertia: true,
            hideOnClick: false,
            interactive: true,
            theme: 'tomato',
        })

    }
);