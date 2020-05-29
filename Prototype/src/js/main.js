var latestURL = "";
var videoId = "";
var noteTitle = "";
var timestamp = 0;
var tsList = [];
var tempTs = [];
var tsListCount = 0;
var videoTitle = "";

// YOUTUBE VIDEO INITIALIZATION
latestURL = window.localStorage.getItem("embedURL");
videoId = window.localStorage.getItem("videoId");
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videotime = 0;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    // height: '390',
    // width: '640',
    videoId: videoId,
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  function updateTime() {
    var oldTime = videotime;
    if (player && player.getCurrentTime) {
      videotime = player.getCurrentTime().toFixed(2);
      document.getElementById("timeurl").innerHTML = videotime;
    }
  }
  timeupdater = setInterval(updateTime, 10);
}

function stopVideo() {
  player.stopVideo();
}

// SPLIT LIBRARY

Split([".a", ".b"], {
  gutterSize: 5,
  sizes: [50, 50],
  minSize: [200, 200],
});

//CKEDITOR PART

var noteContent;
var editor = CKEDITOR.replace("mytextarea");
CKEDITOR.config.tabSpaces = 4;
CKEDITOR.config.height = "80vh";
CKEDITOR.config.removePlugins = "specialchar,image";

CKEDITOR.config.extraPlugins = "codesnippet";

editor.on("change", function (evt) {
  // getData() returns CKEditor's HTML content.
  //console.log( 'Total bytes: ' + evt.editor.getData() );
  console.log("something typed");
});
function saveHandle() {
  console.log("save clicked");
  noteContent = CKEDITOR.instances.mytextarea.getData();
  window.localStorage.setItem("content", noteContent);
  console.log("noteContent: " + noteContent);
}
function openHandle() {
  console.log("open clicked");

  CKEDITOR.instances.mytextarea.insertHtml(noteContent);
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
// setPost();

// function doseNoteExist() {
//   database
//     .collection("user-note")
//     .get()
//     .then((snapshot) => {
//       snapshot.docs.forEach((docs) => {
//         // console.log(docs.data());
//         docs.data().title;
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function deleteDoc(){
//     database.collection("posts")
//             .doc('document1').delete();
// }
// deleteDoc();

// TIMESTAMP VIDEO CALL
function openVideoByTS(id, stime) {
  player.loadVideoById({
    videoId: id,
    startSeconds: parseInt(stime),
  });

  $("#cancel-ts").click();
}

$(document).ready(function () {
  latestURL = window.localStorage.getItem("embedURL");

  // SET NEW YOUTUBE VIDEO

  $("#newVideoURLBtn").click(function () {
    var newUrl = $("#urlInput").val();
    console.log(newUrl);
    var isValidURL = embed_videoURL_generator(newUrl);
    if (isValidURL) {
      player.loadVideoById({
        videoId: videoId,
      });

      $("#newVideoURLBtn").prop("href", "main.html");
      $("#cancel-btn").click();
    } else {
      alert("Enter a valid Youtube URL");
    }
  });

  // CREATE NEW NOTE

  $("#newNoteBtn").click(function () {
    // clear note section
    CKEDITOR.instances.mytextarea.setData("");
    // make timestamp list empty
    tsList = [];
    while (tsListCount != 0) {
      $("#tsDiv").prev("#tsLists").remove();
      tsListCount--;
    }

    // SAVE NOTE VALIDATE
    $("#saveNote").click(function () {
      if (videoTitle != undefined || videoTitle != "") {
        // Save Note Action with title (Modal required)
        $("#saveNoteModal").modal("show");
      } else {
        // Save Note Action without  title
        alert("save note");
      }
    });

    // SAVE NOTE
    $("#saveNoteBtn").click(function () {
      alert("saveNoteBTN");
      // Title input
      var title = $("#saveNoteInput").val();
      database.collection("user-note").doc(title).set({
        //   author : "hyunsoo",
        //   createdAt : "2020-05-29",
        //   postContent: "This is 2nd post",
        //   postName : "Welcome Again!"
        title: title,
        noteContent: CKEDITOR.instances.mytextarea.getData(),
        latestURL: videoId,
        date: new Date(),
      });

      tsList.map((eachTS) => {
        database
          .collection("user-note")
          .doc(title)
          .collection("timestamps")
          .doc(eachTS[1])
          .set({
            videoId: eachTS[0],
            title: eachTS[1],
            time: eachTS[2],
            date: eachTS[3],
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });

    // REFRESH NEW VIDEO URL INPUT BOX

    $("#watchNewVideo").click(function () {
      $("#urlInput").val("");
    });

    // Open modal for new video URL
    $("#watchNewVideo").click();
    $("#cancel-newNote").click();
  });

  // PREVENT ENTER KEY DOWN

  $('input[type="text"]').keydown(function () {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
  // TIMESTAMP SAVING

  $("#saveTS").click(function () {
    var tsTitleInput = $("#tsTitle").val();
    if (tsTitleInput != undefined || tsTitleInput != "") {
      while (tsListCount != 0) {
        $("#tsDiv").prev("#tsLists").remove();
        tsListCount--;
      }
      // Add title, time and date in tempTs
      tempTs.push(videoId);
      tempTs.push(tsTitleInput);
      tempTs.push(videotime);
      tempTs.push(new Date());

      // Add tempTs in tsList
      tsList.push(tempTs);
      console.log(tsList.length);
      var id = "";
      var stime = 0;
      tsList.map((eachTS) => {
        tsListCount++;
        id = eachTS[0];
        stime = eachTS[2];
        $(`
                <div id="tsLists" class="d-flex flex-row">
                    <div class="pl-4 align-self-start">
                        <a href="#" onclick='openVideoByTS("${eachTS[0]}", "${eachTS[2]}");'>
                            <p>[${eachTS[2]}]</p>
                        </a>
                    </div>
                    <div class="VideoURL pl-4 align-self-end">${eachTS[1]}</div>
                </div>
                `).insertBefore("#tsDiv");
      });

      // set tempTS list empty
      tempTs = [];
    }
  });

  // EMBED VIDEOURL GENERATOR

  function embed_videoURL_generator(url) {
    if (url != undefined || url != "") {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        // Do anything for being valid
        // if need to change the url to embed url then use below line
        videoId = match[2];
        latestURL = "https://www.youtube.com/embed/" + match[2] + "?autoplay=0";
        return true;
      } else {
        // Do anything for not being valid
        return false;
      }
    }
  }
});
