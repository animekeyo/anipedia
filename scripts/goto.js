$.getScript('/scripts/purl.js', function() {});
$('[goto]').on('click', function() {
    const url = $.url().attr('relative');
    const to = $(this).attr('to');

    const ready = '/' + to + '?goback=' + url;
    window.location.href = ready;
});