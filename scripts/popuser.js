$.each($('[popuserid]'), function() {
    const id = String($(this).attr('popuserid'));

    const icon_loader = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M4,9L4,9c0.26,0.26,0.34,0.63,0.25,0.98c-0.35,1.36-0.36,2.87,0.1,4.38c0.88,2.91,3.44,5.1,6.44,5.55 c5.52,0.81,10.19-4.06,9.03-9.62c-0.65-3.13-3.23-5.61-6.37-6.16c-1.21-0.21-2.38-0.15-3.46,0.13C9.64,4.35,9.26,4.26,9.01,4.01l0,0 C8.45,3.45,8.73,2.52,9.48,2.32c1.47-0.38,3.06-0.44,4.7-0.09c3.98,0.86,7.09,4.18,7.7,8.2c1.04,6.81-4.82,12.58-11.64,11.42 C6.23,21.16,2.98,17.99,2.2,14c-0.31-1.59-0.24-3.12,0.12-4.53C2.52,8.72,3.45,8.45,4,9z M6,12c0-3.31,2.69-6,6-6s6,2.69,6,6 s-2.69,6-6,6S6,15.31,6,12z M7,5.5C7,6.33,6.33,7,5.5,7S4,6.33,4,5.5S4.67,4,5.5,4S7,4.67,7,5.5z"/></svg>';
    const small_loader = '<style>small_loader svg { animation: loading 0.5s linear infinite } @keyframes loading { to { transform: rotate(359deg) } }</style><loading class="theme-fDFSDF342DSDFGG center-flex"><small_loader>' + icon_loader + '</small_loader></loading>';

    tippy('[popuserid="' + id + '"]', {
        content: '<div  popopen_user popuserid="' + id + '" class="theme-fsdsdfADFF324 center-flex">' +
            small_loader +
            '</div>',
        trigger: 'click',
        allowHTML: true,
        appendTo: () => document.body,
        placement: 'right-start',
        offset: [-10, 30],
        theme: 'tomatox',
        delay: 0,
        sticky: true,
        zIndex: 9999,
        duration: 0,
        arrow: false,
        animateFill: false,
        interactiveBorder: 0,
        interactive: true,
        onShow(instance) {
            // v5
            setTimeout(
                function() {
                    const user = firebase.auth().currentUser;
                    $(document).on({
                        mouseenter: function() {
                            $(this).html('<div class="theme-c-s-sdfsdfsdf435345">View Profile</div>')
                        },
                        mouseleave: function() {
                            $(this).html('')
                        }
                    }, '.pvcafsgdfd1231FDSDFSDF');

                    console.log('working')
                    const thish = $('[popopen_user]');
                    const user_id = $('[popopen_user]').attr('popuserid')

                    const data = firebase.database().ref('/data/users/');
                    data.child(user_id).once(
                        'value',
                        function(snapshot) {
                            const displayName = snapshot.val().displayName;
                            const profile_picture = (snapshot.val() && snapshot.val().profile_picture);
                            const banner = (snapshot.val() && snapshot.val().banner);
                            const bio = (snapshot.val() && snapshot.val().bio);
                            const userid = (snapshot.val() && snapshot.val().userid);
                            const onlineState = (snapshot.val() && snapshot.val().onlineState);
                            const afkTimeout = (snapshot.val() && snapshot.val().afkTimeout);
                            const username = (snapshot.val() && snapshot.val().username);



                            ////////////////////////////////
                            if (bio == 0) {

                                var boix = 'Looks like ' + displayName + ' didnt add bio!';

                            } else {
                                if (typeof bio == "undefined") {

                                    var boix = 'Looks like ' + displayName + ' didnt add bio!';

                                } else {
                                    ///////////////////STP///////////////

                                    const st2 = bio.replace(/(<([^>]+)>)/gi, "");
                                    var st3 = st2.replace(/\[/g, '<span stb class="pointer theme-FDFgdf3243FDSDF">');
                                    var st4 = st3.replace(/\]/g, '</span>');
                                    var boix = st4;

                                    $(document).on('click', '[stb]', function() {
                                        $(this).css('color', 'var(--c9)');
                                        $(this).css('cursor', 'unset');
                                    });
                                    //////////////////////////////////////
                                    $.getScript('/scripts/linky.js', function() {});
                                };
                            }
                            ///////////////////////////////////////////
                            var db_ref = firebase.database().ref('/data/users/' + userid);

                            db_ref.child('badges').once('value', function(snapshot) {
                                console.log('working badges');
                                const verified = (snapshot.val() && snapshot.val().verified);
                                if (verified == true) {
                                    var verified_x = icon_verified;

                                } else {
                                    var verified_x = '';

                                }
                                const partner = (snapshot.val() && snapshot.val().partner);
                                if (partner == true) {
                                    var partner_x = icon_turbo_1;

                                } else {
                                    var partner_x = '';
                                }
                                const staff = (snapshot.val() && snapshot.val().staff);
                                if (staff == true) {

                                    var staff_x = icon_staff;
                                } else {
                                    var staff_x = '';
                                }
                                const tester = (snapshot.val() && snapshot.val().tester);
                                if (tester == true) {
                                    var tester_x = icon_beta_tester;
                                } else {
                                    var tester_x = '';
                                }
                                const king = (snapshot.val() && snapshot.val().king);
                                if (king == true) {

                                    var king_x = icon_owner;
                                } else {
                                    var king_x = '';
                                }
                                const simp = (snapshot.val() && snapshot.val().simp);
                                if (simp == true) {
                                    var simp_x = '<div  class=" center-flex" tippy data-tippy-content="Ultra Simp"><img style="width: 1.5rem; height: 1.5rem; border-radius: 0.2rem;" src="https://cdn.discordapp.com/attachments/847879736092131388/849530189348470854/444436026149175297.png"></div>';

                                } else {
                                    var simp_x = '';
                                }
                                console.log('working+')
                                const badges_x = simp_x +
                                    king_x +
                                    tester_x +
                                    staff_x +
                                    partner_x +
                                    verified_x;

                                const profile_card =
                                    '<div class="center-flex pvcard1231FDSDFSDF">' +

                                    '<div style="background-image:url(' + banner + ')" class="full-bg center-flex pvcard1231FDSfffdddseDFSDF">' +
                                    '<div open_user userid="' + userid + '" style="background-image:url(' + profile_picture + ')" class="pointer full-bg center-flex pvcafsgdfd1231FDSDFSDF"> <!--PROFLE PIC--> </div>' +
                                    '</div>' +
                                    '<div class="center-flex pvcard1231sdDSsdfDaaFSDF">' +
                                    '<div class="center-flex pvcard12sdcv31FDSDFSDF"> ' + displayName + ' <!--DISPLAY NAME-->  </div>' +
                                    '<div class="center-flex pvcard123ad1FDSDvxweqFSDF"> @' + username + ' <!--USERNAME-->  </div>' +
                                    '</div>' +
                                    '<badge badges_x="' + userid + '" class="center-flex code-fsdfsdfFSDF theme-FDSHGF45GFFFS">' +

                                    '</badge>' +
                                    '<div class="center-flex pvcard1231FDsaSSDF">' +
                                    '<div class="center-flex pvcard1231FDsaghfgh24ggg5SDFSDF">Bio</div>' +
                                    '<div class="center-flex pvcard1231FDsa24ggg5SDFSDF"> ' + boix + ' <!-- BIO--> </div>' +
                                    '</div>' +
                                    '<div class="center-flex pvcard1231FDsa24ggg5SDFddSDF">View Profile</div>' +
                                    '</div>';
                                setTimeout(function() {
                                    $('[popopen_user]').html(profile_card)
                                    setTimeout(function() {
                                        $('[badges_x=' + userid + ']').html(badges_x);
                                    }, 0001)
                                }, 0001)


                                console.log(displayName);
                                console.log(profile_picture);
                                console.log(banner);
                                console.log(bio);
                                console.log(userid);
                                console.log(onlineState);
                                console.log(afkTimeout);
                                console.log(username);
                            });

                            //////////////////////////////////

                        }
                    );

                },
                0001
            )
        },
    });

});