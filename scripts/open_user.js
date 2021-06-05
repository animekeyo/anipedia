$(document).on('click', '[open_user]', function() {
    const userid = $(this).attr('userid');
    window.location.href = "/u?id=" + userid;
});