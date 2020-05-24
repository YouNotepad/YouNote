var embed_video_url = "";
var videoLists = [];

$(document).ready(function(){
    var url = window.localStorage.getItem('initialURL');
    $('#ytplayer').attr('src', url);

    videoLists.push(url);
    videoLists.push("2nd url");
    videoLists.push("3rd url");
    

    $('#newVideoURLBtn').click(function(){
        var newUrl  = $('#urlInput').val();
        console.log(newUrl);
        var isValidURL = embed_videoURL_generator(newUrl);
        if(isValidURL){
            $('#ytplayer').attr('src', embed_video_url);
            $('#newVideoURLBtn').prop('href', "main.html");
            $('#inputNewUrl').remove();
            $('#cancel-btn').click();
        } else {
            alert("Enter a valid Youtube URL");
            
        }
    });

    $('#videoLists').click(function(){
        // var count = 0;
        // if ($('.modal-videoURLs').is(":empty")){
        //     videoLists.map(videoURL => {
        //         $('.modal-videoURLs').append(`
        //         <div class="d-flex flex-row">
        //             <div class="p-4 align-self-start">
        //             <p><i class="fas fa-video"></i><br>URL</p>  
        //             </div>
        //             <a href="main.html"><div id="url${count}" class="VideoURL p-4 align-self-end">${videoURL}</div></a>
        //         </div>
        //         `);
        //         count += 1;
        //     });
            
        
        // }

        $('.modal-videoURLs').append(`
            <div id="inputNewUrl" class="d-flex flex-row">
                <div class="p-4 align-self-start">
                    <p >new <i class="fas fa-video"></i></p>
                </div>
                <div class="VideoURL p-4 align-self-end">
                
                    <div class="form-group">
                        <input id="urlInput" type="text" class="form-control form-control-lg" placeholder="Video URL:">
                    </div>
                </div>
            </div>
        `);

    });


    function embed_videoURL_generator(url){
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                // Do anything for being valid
                // if need to change the url to embed url then use below line
                embed_video_url = 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0';
                //$('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
                return true;
            }
            else {
                // Do anything for not being valid
                return false;
            }
        }
    }

    
});

