/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function checkConnection(){
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    
    if(states[networkState] == 'No network connection'){
        document.getElementById("mailResponse").innerHTML = "<p>Brak połączenia z internetem</p>";
        return 0;
    }else{
        return 1;
    }
}


function checkCode(){
if(checkConnection()){
    var code = document.getElementById("code").value;
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "http://walickiwojciech.pl/checkcode.php?token66=1&code="+code;
    httpc.open("GET", url, true);
    httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    document.getElementById("mailResponse").innerHTML = "<h2>Sprawdzam...</h2>";

    httpc.onreadystatechange = function() { //Call a function when the state changes.
        
    if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
        document.getElementById("mailResponse").innerHTML = httpc.responseText;
             } 
        }   
    httpc.send();
    showButton();
            }
    }

function showButton(){
    document.getElementById("use").style.display = "inline";
}

function deleteCode(){
    if(checkConnection()){
    var code = document.getElementById("code").value;
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "http://walickiwojciech.pl/deletecode.php?token66=1&code="+code;
    httpc.open("GET", url, true);
    httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    document.getElementById("mailResponse").innerHTML = "<h2>Usuwanie...</h2>";

    httpc.onreadystatechange = function() { //Call a function when the state changes.
        
    if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
        document.getElementById("mailResponse").innerHTML = httpc.responseText;
             } 
        }   
    httpc.send();
    hideButton();
            }
}


function hideButton(){
    document.getElementById("use").style.display = "none";
}