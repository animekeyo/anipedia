$(document).on('click', '[getview]', function() {

    //////////////////////////////////////////////
    $('.theme-fil123DX').remove()
    $('[data-tippy-root]').remove()
    $(document).on('click', '.theme-px123DFDRG', function() {
            $('.theme-fil123DX').remove()
        })
        /////////////////////////////////////////////
    const userid = $(this).attr('userid');

    setTimeout(
        function() {
            const data =
                '<div class="center-flex fixed full-wh theme-fil123DX"> <div class="center-flex absolute full-wh theme-px123DFDRG"> </div> <div class="center-flex theme-px123DFDR"> <div class="relative center-flex theme-px123DFDR1"> <div BANNER_EXMO class="center-flex full-bg theme-px123DFDR2"> </div> <div class="center-flex theme-px123DFDR4"> <div SFBTN_EXMO class="center-flex theme-px123DFDR4D"> <div import_small_loader></div> <!--Follow/Unfollow--> </div> </div> <div class="absolute center-flex theme-px123DFDR3"> <svg width="120" height="120" viewBox="0 0 120 120" fill="none"> <circle cx="60" cy="60" r="60" fill="#0B0E11"/> <foreignObject x="0" y="0" width="120" height="120"> <div class="full-wh center-flex theme-px123DFDR3Z"> <!--Profile Image-->' +
                '<img PFP_EXMO src="https://i.imgur.com/WntP0vl.jpg">' +
                '</div> </foreignObject> <circle cx="100" cy="92" r="19" fill="#0B0E11"/> <circle ONLINE_EXMO cx="100" cy="92" r="12"/> <defs> </defs> </svg> </div> </div> <div class="center-flex theme-px123DFDR45"> <div class="center-flex theme-px123DFDR451">' +
                '<px NAME_EXMO class="center-flex theme-px123DFDR4511"> <!--DisplayName--> </px>' +
                '<px TIME_EXMO class="center-flex theme-px123DFDR4512"> <!--Time--> </px>' +
                '</div> <div class="center-flex theme-px123DFDR4513x"> <badge pxbadges class="center-flex theme-px123DFDR4513xc code-fsdfsdfFSDF theme-FDSHGF45GFFFS"> <!--Badges--> </badge> </div> <div class="center-flex theme-px123DFDR451s"> <px pxBTN px="Main" class="center-flex theme-px123DFDR4511s theme-px123DFDR4511sx"> Main </px> <px pxBTN px="Followers" class="center-flex theme-px123DFDR4511sx"> Followers <count class="followers"> 0 </count> </px> <px pxBTN px="Following" class="center-flex theme-px123DFDR4511sx"> Following <count class="following"> 0 </count> </px> </div> <div class="theme-px123DFFG"> <div px-pg px-page="Main"> <div class="center-flex gtheme-px123DFFG pvcard1231FDsaSSDF"> <div class="center-flex gtheme-px123DFFG pvcard1231FDsaghfgh24ggg5SDFSDF">Bio</div> <div BIO_EXMO class="center-flex gtheme-px123DFFG pvcard1231FDsa24ggg5SDFSDF"> <!-- BIO--> </div> </div> </div> <div style="display: none;" px-pg px-page="Followers"> </div> <div style="display: none;" px-pg px-page="Following"> </div> </div> </div> </div> </div>';
            $('body').prepend(data)
            const rexo = firebase.database().ref('/data/users/' + userid);

            rexo.once('value', function(snapshot) {
                const currentUserID = firebase.auth().currentUser.uid;
                const userid = (snapshot.val() && snapshot.val().userid);
                const displayName = (snapshot.val() && snapshot.val().displayName);
                const profile_picture = (snapshot.val() && snapshot.val().profile_picture);
                const banner = (snapshot.val() && snapshot.val().banner);
                const bio = (snapshot.val() && snapshot.val().bio);
                const onlineState = (snapshot.val() && snapshot.val().onlineState);
                const afkTimeout = (snapshot.val() && snapshot.val().afkTimeout);
                const username = (snapshot.val() && snapshot.val().username);

                $(document).on('click', '[pxBTN]', function() {
                    const page = $(this).attr('px');
                    $('[px-pg]').hide()
                    $('[pxBTN]').removeClass('theme-px123DFDR4511s')
                    $(this).addClass('theme-px123DFDR4511s')
                    $('[px-page="' + page + '"]').show()
                });

                if (snapshot.exists()) {
                    if (onlineState == true) {
                        $('[ONLINE_EXMO]').attr('fill', 'var(--c7)');
                    } else {
                        $('[ONLINE_EXMO]').attr('fill', 'var(--c13)');
                    }
                    if (bio == 0) {
                        if (userid == userid) {
                            $("[BIO_EXMO]").html('<div click_bio_add class="theme-FFGEKOGGF33DF" open_setting>Empty Bio!!! Click <span style="color:var(--c19)">Here</span> to add bio. </div>');
                        } else {
                            $("[BIO_EXMO]").text('Looks like ' + displayName + ' didnt add bio!');
                        }
                    } else {
                        if (typeof bio == "undefined") {
                            if (userid == userid) {
                                $("[BIO_EXMO]").html('<div click_bio_add class="theme-FFGEKOGGF33DF" open_setting>Empty Bio!!! Click <span style="color:var(--c19)">Here</span> to add bio. </div>');
                            } else {
                                $("[BIO_EXMO]").text('Looks like ' + displayName + ' didnt add bio!');
                            }
                        } else {
                            ///////////////////STP///////////////

                            const st2 = bio.replace(/(<([^>]+)>)/gi, "");
                            const st3 = st2.replace(/\[/g, '<span stb class="pointer theme-FDFgdf3243FDSDF">');
                            const st4 = st3.replace(/\]/g, '</span>');
                            $('[BIO_EXMO]').html(st4);

                            $(document).on('click', '[stb]', function() {
                                $(this).css('color', 'var(--c9)');
                                $(this).css('cursor', 'unset');
                            });
                            //////////////////////////////////////
                            $.getScript('/scripts/linky.js', function() {});
                        };
                    }



                    /////////////////////////BADGES//////////////////////////////
                    const database_badges = firebase.database().ref('/data/users/' + userid);
                    database_badges.child('badges').on('value', function(snapshot) {
                        console.log('working badges');
                        const verified = (snapshot.val() && snapshot.val().verified);
                        if (verified == true) {
                            $('[pxbadges]').prepend(icon_verified);
                            $('[add_verified_icon]').html(icon_close);
                        } else {
                            $('[add_verified_icon]').html(icon_checkmark);
                        }
                        const partner = (snapshot.val() && snapshot.val().partner);
                        if (partner == true) {
                            $('[pxbadges]').prepend(icon_turbo_1);
                            $('[add_partner_icon]').html(icon_close);
                        } else {
                            $('[add_partner_icon]').html(icon_checkmark);
                        }
                        const staff = (snapshot.val() && snapshot.val().staff);
                        if (staff == true) {
                            $('[pxbadges]').prepend(icon_staff);
                            $('[add_staff_icon]').html(icon_close);
                        } else {
                            $('[add_staff_icon]').html(icon_checkmark);
                        }
                        const tester = (snapshot.val() && snapshot.val().tester);
                        if (tester == true) {
                            $('[pxbadges]').prepend(icon_beta_tester);
                            $('[add_beta_tester_icon]').html(icon_close);
                        } else {
                            $('[add_beta_tester_icon]').html(icon_checkmark);
                        }
                        const king = (snapshot.val() && snapshot.val().king);
                        if (king == true) {
                            $('[pxbadges]').prepend(icon_owner);
                            $('[add_king_icon]').html(icon_close);
                        } else {
                            $('[add_king_icon]').html(icon_checkmark);
                        }
                        const simp = (snapshot.val() && snapshot.val().simp);
                        if (simp == true) {
                            $('[pxbadges]').prepend('<div  data-aos="zoom-in" class=" center-flex" tippy data-tippy-content="Ultra Simp"><img style="width: 1.5rem; height: 1.5rem; border-radius: 0.2rem;" src="https://cdn.discordapp.com/attachments/847879736092131388/849530189348470854/444436026149175297.png"></div>');
                            $('[add_simp_icon]').html(icon_close);
                        } else {
                            $('[add_simp_icon]').html(icon_checkmark);
                        }
                    });
                    ///////////////////////////FOLLOWING/FOLLOWERS///////////////////////////
                    if (userid == currentUserID) {

                        const database = firebase.database().ref('/data/users/');
                        database.child(currentUserID + '/followers/').on('value', function(snapshot) {
                            const foll = snapshot.numChildren();
                            $("count.followers").text(foll);
                        });

                        database.child(currentUserID + '/followers/').once('value', function(snapshot) {
                            snapshot.forEach((user) => {
                                const users = user.val().id;

                            });
                        });

                        database.child(currentUserID + '/following/').on('value', function(snapshot) {
                            const foll = snapshot.numChildren();
                            $("count.following").text(foll);
                        });

                        database.child(currentUserID + '/following/').once('value', function(snapshot) {
                            snapshot.forEach((user) => {
                                const users = user.val().id;

                            });
                        });



                    } else {


                        const database = firebase.database().ref('/data/users/');
                        database.child(userid + '/followers/').on('value', function(snapshot) {
                            const foll = snapshot.numChildren();
                            $("count.followers").text(foll);
                        });

                        database.child(userid + '/followers/').once('value', function(snapshot) {
                            snapshot.forEach((user) => {
                                const useridx = user.val().id;

                                database.child(useridx).once('value', function(snapshot) {
                                    const userid = (snapshot.val() && snapshot.val().userid);
                                    const displayName = (snapshot.val() && snapshot.val().displayName);
                                    const profile_picture = (snapshot.val() && snapshot.val().profile_picture);
                                    const banner = (snapshot.val() && snapshot.val().banner);
                                    const bio = (snapshot.val() && snapshot.val().bio);
                                    const onlineState = (snapshot.val() && snapshot.val().onlineState);
                                    const afkTimeout = (snapshot.val() && snapshot.val().afkTimeout);
                                    const username = (snapshot.val() && snapshot.val().username);
                                    if (onlineState == true) {

                                        const data =
                                            '<div getview userid="' + useridx + '" class="center-flex code-px12DECD theme-dfsdSDfF2344DFG" aria-expanded="false">' +
                                            '<div class=" relative full-bg center-flex theme-dfsdSDF2344DaFG"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32" fill="none"> <foreignObject x="0" y="0" width="32" height="32"><div class="avatarStack-2Dr8S9">' +
                                            '<img src="' + profile_picture + '">' +
                                            '</div></foreignObject> <g id="Frame 1" clip-path="url(#clip0)"> <rect width="32" height="32"></rect> <rect id="pfp 1" width="32" height="32" rx="16" fill="url(#pattern0)"></rect> <circle id="Ellipse 2" cx="27" cy="27" r="8.5" fill="var(--c15)"></circle> <circle id="Ellipse 1" cx="27" cy="27" r="5" tippy="" fill="var(--c7)" data-tippy-content="Online"></circle> </g> </svg>' +
                                            '<div class="center-flex theme-dfsdsSDF2344ST"></div>' +
                                            '</div>' +
                                            '<div class="center-flex theme-dfsdsSDF2344DFG">' + displayName + '</div>' +
                                            '</div>';
                                        $('[px-page="Followers"]').prepend(data);
                                    } else {
                                        const data =
                                            '<div getview userid="' + useridx + '" class="center-flex code-px12DECD theme-dfsdSDfF2344DFG" aria-expanded="false">' +
                                            '<div class=" relative full-bg center-flex theme-dfsdSDF2344DaFG"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32" fill="none"> <foreignObject x="0" y="0" width="32" height="32"><div class="avatarStack-2Dr8S9">' +
                                            '<img src="' + profile_picture + '">' +
                                            '</div></foreignObject> <g id="Frame 1" clip-path="url(#clip0)"> <rect width="32" height="32"></rect> <rect id="pfp 1" width="32" height="32" rx="16" fill="url(#pattern0)"></rect> <circle id="Ellipse 2" cx="27" cy="27" r="8.5" fill="var(--c15)"></circle> <circle id="Ellipse 1" cx="27" cy="27" r="5" tippy="" fill="var(--c13)" data-tippy-content="Offline"></circle> </g> </svg>' +
                                            '<div class="center-flex theme-dfsdsSDF2344ST"></div>' +
                                            '</div>' +
                                            '<div class="center-flex theme-dfsdsSDF2344DFG">' + displayName + '</div>' +
                                            '</div>';
                                        $('[px-page="Followers"]').prepend(data);
                                    }

                                });


                            });
                        });

                        database.child(userid + '/following/').on('value', function(snapshot) {
                            const foll = snapshot.numChildren();
                            $("count.following").text(foll);
                        });

                        database.child(userid + '/following/').once('value', function(snapshot) {
                            snapshot.forEach((user) => {
                                const useridx = user.val().id;

                                database.child(useridx).once('value', function(snapshot) {
                                    const userid = (snapshot.val() && snapshot.val().userid);
                                    const displayName = (snapshot.val() && snapshot.val().displayName);
                                    const profile_picture = (snapshot.val() && snapshot.val().profile_picture);
                                    const banner = (snapshot.val() && snapshot.val().banner);
                                    const bio = (snapshot.val() && snapshot.val().bio);
                                    const onlineState = (snapshot.val() && snapshot.val().onlineState);
                                    const afkTimeout = (snapshot.val() && snapshot.val().afkTimeout);
                                    const username = (snapshot.val() && snapshot.val().username);
                                    if (onlineState == true) {

                                        const data =
                                            '<div getview userid="' + useridx + '" class="center-flex code-px12DECD theme-dfsdSDfF2344DFG" aria-expanded="false">' +
                                            '<div class=" relative full-bg center-flex theme-dfsdSDF2344DaFG"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32" fill="none"> <foreignObject x="0" y="0" width="32" height="32"><div class="avatarStack-2Dr8S9">' +
                                            '<img src="' + profile_picture + '">' +
                                            '</div></foreignObject> <g id="Frame 1" clip-path="url(#clip0)"> <rect width="32" height="32"></rect> <rect id="pfp 1" width="32" height="32" rx="16" fill="url(#pattern0)"></rect> <circle id="Ellipse 2" cx="27" cy="27" r="8.5" fill="var(--c15)"></circle> <circle id="Ellipse 1" cx="27" cy="27" r="5" tippy="" fill="var(--c7)" data-tippy-content="Online"></circle> </g> </svg>' +
                                            '<div class="center-flex theme-dfsdsSDF2344ST"></div>' +
                                            '</div>' +
                                            '<div class="center-flex theme-dfsdsSDF2344DFG">' + displayName + '</div>' +
                                            '</div>';
                                        $('[px-page="Following"]').prepend(data);
                                    } else {
                                        const data =
                                            '<div getview userid="' + useridx + '" class="center-flex code-px12DECD theme-dfsdSDfF2344DFG" aria-expanded="false">' +
                                            '<div class=" relative full-bg center-flex theme-dfsdSDF2344DaFG"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32" fill="none"> <foreignObject x="0" y="0" width="32" height="32"><div class="avatarStack-2Dr8S9">' +
                                            '<img src="' + profile_picture + '">' +
                                            '</div></foreignObject> <g id="Frame 1" clip-path="url(#clip0)"> <rect width="32" height="32"></rect> <rect id="pfp 1" width="32" height="32" rx="16" fill="url(#pattern0)"></rect> <circle id="Ellipse 2" cx="27" cy="27" r="8.5" fill="var(--c15)"></circle> <circle id="Ellipse 1" cx="27" cy="27" r="5" tippy="" fill="var(--c13)" data-tippy-content="Online"></circle> </g> </svg>' +
                                            '<div class="center-flex theme-dfsdsSDF2344ST"></div>' +
                                            '</div>' +
                                            '<div class="center-flex theme-dfsdsSDF2344DFG">' + displayName + '</div>' +
                                            '</div>';
                                        $('[px-page="Following"]').prepend(data);
                                    }

                                });


                            });
                        });

                    }

                    //////////////////////////////////////////////////////////////

                    if (userid == currentUserID) {

                        $('[SFBTN_EXMO]').html('<div open_setting><!--BTN-->Setting</div>');
                    } else {

                        $('[SFBTN_EXMO]').html('<div FOLLOW_EXMO><!--BTN-->Follow</div>');
                        const ruf = firebase.database().ref('/data/users/' + currentUserID + '/following/' + userid);
                        const rxf = firebase.database().ref('/data/users/' + userid + '/followers/' + currentUserID);


                        ruf.on('value', function(snapshot) {
                            const follow = (snapshot.val() && snapshot.val().follow);

                            if (follow == true) {
                                $("[FOLLOW_EXMO]").text("Follow");
                                $(".center-flex.theme-px123DFDR4D").css('background-color', 'var(--c7)');
                            } else {
                                $("[FOLLOW_EXMO]").text("Unfollow");
                                $(".center-flex.theme-px123DFDR4D").css('background-color', 'var(--c19)');
                            };

                        });



                        $(document).on('click', '[FOLLOW_EXMO]', function() {
                            ruf.once('value', function(snapshot) {
                                const follow = (snapshot.val() && snapshot.val().follow);
                                if (follow == true) {
                                    ruf.remove();
                                } else {
                                    ruf.update({
                                        follow: true,
                                        id: userid,
                                    });
                                };
                            });
                            rxf.once('value', function(snapshot) {
                                const follow = (snapshot.val() && snapshot.val().follow);
                                if (follow == true) {
                                    rxf.remove();
                                } else {
                                    rxf.update({
                                        follow: true,
                                        id: currentUserID,
                                    });
                                };
                            });

                        });

                    }





                    $('[NAME_EXMO]').text(displayName);
                    $('[PFP_EXMO]').attr('src', profile_picture);
                    $('[BANNER_EXMO]').css('background-image', 'url(' + banner + '),url(/images/banner.png)');
                }
            });
        }, 0001
    )
})