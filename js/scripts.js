channels = ['freecodecamp', 'comster404', 'esl_sc2'];

for (i = 0; i < channels.length; i++) {
  getData(channels[i]);
}

function getData(myChannel) {
  $.ajax({
    dataType: 'json',
    url: 'https://wind-bow.gomix.me/twitch-api/channels/' + myChannel,
    success: parseChannel
  })

  function parseChannel(channelData) {
    $.ajax({
      dataType: 'json',
      url: 'https://wind-bow.gomix.me/twitch-api/streams/' + myChannel,
      success: function parseStream(streamData) {
        channel = myChannel;
        myData = streamData;
        url = 'https://www.twitch.tv/' + myChannel;
        if (streamData.stream) {
          status = streamData.stream.channel.status;
        } else if (channelData.error) {
          status = "Channel does not exist";
        } else {
          status = "Offline";
        }
        console.log(channel);
        console.log(url)
        console.log(status);
        $(".streams").append('<tr id="' + channel + '"><td><a href="' + url + '">' + channel + "</a></td><td>" + status + "</td></tr>");
        if (streamData.stream) {
          $("#" + channel).css('background-color', 'YellowGreen');
        }
        else if (channelData.error) {
          $("#" + channel).css('background-color', 'tomato');
        } else {
          $("#" + channel).css('background-color', 'gold');
        }
      }
    })
  }
}
