var videoLists = [];

$(document).ready(function(){
    var url = window.localStorage.getItem('initialURL');
    $('#ytplayer').attr('src', url);
    videoLists.push(url);
    videoLists.push("2nd url");
    videoLists.push("3rd url");

    $('#videoLists').click(function(){
        if ($('.modal-videoURLs').is(":empty")){
            videoLists.map(videoURL => {
                $('.modal-videoURLs').append(`
                <div class="d-flex flex-row">
                    <div class="p-4 align-self-start">
                    <p>VideoURL <i class="fas fa-video"></i></p>  
                    </div>
                    <div class="VideoURL p-4 align-self-end">${videoURL}</div>
                </div>
                `);
            });
            
            $('.modal-videoURLs').append(`
                <div class="d-flex flex-row">
                    <div class="p-4 align-self-start">
                        <p >new <i class="fas fa-video"></i></p>
                    </div>
                    <div class="VideoURL p-4 align-self-end">
                        <input style="width: 25vw;"type="text" placeholder="Video URL:">
                    </div>
                </div>
            `);
        }
        
    });
    
});