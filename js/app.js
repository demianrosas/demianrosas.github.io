// replace these values with those generated in your TokBox Account
var apiKey = "46535332";
var sessionId =
  "1_MX40NjUzNTMzMn5-MTU4MzkzMzA0Njk4NH5nUmtjVzBxM055d0NzTzdHUGg1eFJDL2V-UH4";
var publisher;
// (optional) add server code here
//initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });

  // Create a publisher
  publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
      videoSource:
        "74cf348252c4411694249d617da13a95b1ded9310dd338e4e43dd8a9f7ecfdfb",
    },
    handleError
  );

  //publisher.publishVideo(true);

  // Connect to the session
  var tokenInput = document.getElementById("token");
  var token = tokenInput.value;
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

function toggleCamera() {
  publisher.cycleVideo();
}

function publishVideo(hasVideo) {
  publisher.publishVideo(hasVideo);
}

function toggleVideo() {
  var hasVideo = publisher.stream.hasVideo;
  publishVideo(!hasVideo);
}
