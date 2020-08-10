// replace these values with those generated in your TokBox Account
var apiKey = "46535332";
var sessionId =
  "1_MX40NjUzNTMzMn5-MTU4MzkzMzA0Njk4NH5nUmtjVzBxM055d0NzTzdHUGg1eFJDL2V-UH4";
var publisher;
var session;
// (optional) add server code here
//initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  session = OT.initSession(apiKey, sessionId);

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

function rePublish() {
  session.unpublish()
  publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );
  session.publish(publisher, handleError);
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

/*
if (API_KEY && TOKEN && SESSION_ID) {
  apiKey = API_KEY;
  sessionId = SESSION_ID;
  token = TOKEN;
  initializeSession();
} else if (SAMPLE_SERVER_BASE_URL) {
  // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
  fetch(SAMPLE_SERVER_BASE_URL + '/session').then(function fetch(res) {
    return res.json();
  }).then(function fetchJson(json) {
    apiKey = json.apiKey;
    sessionId = json.sessionId;
    token = json.token;

    initializeSession();
  }).catch(function catchErr(error) {
    handleError(error);
    alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
  });
}
*/
