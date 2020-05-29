var embed_video_url = "";
var videoId = "";
var tsList = {};
var timestamp = 0;
var data;

// YOUTUBE VIDEO INITIALIZATION

    videoId = window.localStorage.getItem('videoId');
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    var videotime = 0;


    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            // height: '390',
            // width: '640',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
        function updateTime() {
            var oldTime = videotime;
            if(player && player.getCurrentTime) {
            videotime = player.getCurrentTime().toFixed(2);
            document.getElementById("timeurl").innerHTML = videotime;
            }
            if(videotime !== oldTime) {
            onProgress(videotime);
            }
        }
        timeupdater = setInterval(updateTime, 10);
    }

    function stopVideo() {
        player.stopVideo();
    }


// SPLIT LIBRARY

    Split(['.a','.b'],{
        gutterSize:5,
        sizes:[50,50],
        minSize:[200,200]
    });


//CKEDITOR PART

    
    var editor = CKEDITOR.replace( 'mytextarea' );
    CKEDITOR.config.tabSpaces = 4;
    CKEDITOR.config.height = '80vh';
    CKEDITOR.config.removePlugins = 'specialchar,image';

    CKEDITOR.config.extraPlugins = 'codesnippet';
            
            
    editor.on( 'change', function( evt ) {
        // getData() returns CKEditor's HTML content.
        //console.log( 'Total bytes: ' + evt.editor.getData() );
        console.log("something typed");
    });
    function saveHandle(){
        console.log("save clicked");
        data = CKEDITOR.instances.mytextarea.getData();
        
        console.log("data: " + data);
        database.collection('user-note')
        .doc('note1')
        .update({
            noteContent: data
        })
       
    }
    function openHandle(){
        console.log("open clicked");
        
        CKEDITOR.instances.mytextarea.insertHtml(data);
        
    }
            

// Firestore

// function setPost(){
//     database.collection('posts')
//             .doc()
//             .set({
//                 author : "hyunsoo",
//                 createdAt : "2020-05-29",
//                 postContent: "This is 2nd post",
//                 postName : "Welcome Again!"
//             })
// }
// setPost(); vdgf3ak6fc

function getPosts() {
    database.collection("user-note")
              .get()
              .then(snapshot => {
                  snapshot.docs.forEach(docs => {
                      console.log(docs.data());
                  });
              })
              .catch(err => {
                  console.log(err);
              });
}


// function deleteDoc(){
//     database.collection("posts")
//             .doc('document1').delete();
// }
// deleteDoc();


$(document).ready(function(){
    embed_video_url = window.localStorage.getItem('embedURL');

    // SET NEW YOUTUBE VIDEO

    $('#newVideoURLBtn').click(function(){
        var newUrl  = $('#urlInput').val();
        console.log(newUrl);
        var isValidURL = embed_videoURL_generator(newUrl);
        if(isValidURL){
            player.loadVideoById({
                videoId:videoId
            });
            
            $('#newVideoURLBtn').prop('href', "main.html");
            $('#cancel-btn').click();
            
 
        } else {
            alert("Enter a valid Youtube URL");
        }
    });


    // REFRESH NEW VIDEO URL INPUT BOX

    $('#watchNewVideo').click(function(){
        $('#urlInput').val('');
    });


    // TIMESTAMP SAVING

    $('#saveTS').click(function(){
        var tsTitleInput = $('#tsTitle').val();
        if (tsTitleInput != undefined || tsTitleInput != '') {
            var len = Object.keys(tsList).length;
         
            var key = len.toString().concat(tsTitleInput);
            tsList[key] = $('#timeurl').val();
            
        }
        var count = 0;
        if ($('.modal-videoURLs').is(":empty")){
            videoLists.map(videoURL => {
                $('.modal-videoURLs').append(`
                <div class="d-flex flex-row">
                    <div class="p-4 align-self-start">
                    <p><i class="fas fa-video"></i><br>URL</p>  
                    </div>
                    <a href="main.html"><div id="url${count}" class="VideoURL p-4 align-self-end">${videoURL}</div></a>
                </div>
                `);
                count += 1;
            });
        }

    });


    // EMBED VIDEOURL GENERATOR

    function embed_videoURL_generator(url){
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                // Do anything for being valid
                // if need to change the url to embed url then use below line
                videoId = match[2];
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

    
    function timestampFunction() {
        var table= document.getElementById("timestampTable");
        
        if ("explanation" != ""){
            var row = table.insertRow(1);
            row.classname = "newtimestamp";
            var c1 = row.insertCell(0);
            var c2 = row.insertCell(1); 
            
            c2.innerHTML = document.getElementById("explanation").value;
              
            var player = document.getElementById('player');
            var time = player.getCurrentTime();

            setTimeout(stopVideo, 6000);
            if(player && player.getCurrentTime) {
            videotime = player.getCurrentTime();

            var prettytime= parseInt(videotime);
            document.getElementById("timeurl").innerHTML = prettytime;
          }
        }
    }

    

    

    
});

