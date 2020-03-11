// replace these values with those generated in your TokBox Account
var apiKey = "46535332";
var sessionId = "1_MX40NjUzNTMzMn5-MTU4MzkzMzA0Njk4NH5nUmtjVzBxM055d0NzTzdHUGg1eFJDL2V-UH4";
//var token = "T1==cGFydG5lcl9pZD00NjUzNTMzMiZzaWc9YzUwNTY0ZjYzYmM3ZTE3NWQ3ZTYwODVhZTdlMDY1ZDdhODRiMjZlYTpzZXNzaW9uX2lkPTFfTVg0ME5qVXpOVE16TW41LU1UVTRNemt6TXpBME5qazROSDVuVW10alZ6QnhNMDU1ZDBOelR6ZEhVR2cxZUZKREwyVi1VSDQmY3JlYXRlX3RpbWU9MTU4MzkzMzE0NSZub25jZT0wLjI5MjAyODE5MTgwNTY4Nzk1JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1ODM5MzY3NDQmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";
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
  session.on('streamCreated', function(event) {
  session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  var tokenInput = document.getElementById("token");
  var token = tokenInput.value;
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

function toggleVideo() {
  var hasVideo = publisher.stream.hasVideo
  publisher.publishVideo(!hasVideo)
}
