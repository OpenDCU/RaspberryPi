// Copyright 2009 FriendFeed
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

$(document).ready(function() {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function() {};

$("#messageform").on("submit", function() {
  newMessage($(this));
  return false;
});
$("#messageform").on("keypress", function(e) {
  if (e.keyCode == 13) {
      newMessage($(this));
      return false;
  }
});
    
    $("#message").select();
    updater.start();
});

function newMessage(form) {
    var message = form.formToDict();
    updater.socket.send(JSON.stringify(message));
    form.find('#message').val("").select();
}

$.fn.formToDict = function() {
    var fields = this.serializeArray();
    var json = {}
    for (var i = 0; i < fields.length; i++) {
        json[fields[i].name] = fields[i].value;
    }
    if (json.next) delete json.next;
    return json;
};

var updater = {
    socket: null,

    start: function() {
        var url = "ws://" + location.host + "/chatsocket";
        if ("WebSocket" in window) {
        	updater.socket = new WebSocket(url);
        } else {
            updater.socket = new MozWebSocket(url);
        }
		updater.socket.onmessage = function(event) {
		    updater.showMessage(JSON.parse(event.data));
		}
    },

    showMessage: function(message) {
        var existing = $("#m" + message.id); // first check to see if we've already shown this message
        if (existing.length > 0) return;     // and return if we have
        var node = $(message.html);			 // otherwise this is what we want to show...
        node.hide();					     // so do the show cutely
        $("#inbox").append(node);
        node.slideDown();
    }
};
