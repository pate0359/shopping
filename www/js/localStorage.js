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

var itemList = [];
var STORAGE_KEY = "grocery-pate0359"

var LSOperation = {
    // Application Constructor
    addItem: function () {
        this.bindEvents();
        var newItem = document.querySelector("#item").value;
        itemList.push(newItem);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(itemList));
    },
    
    removeItem:function()
    {
        var txt = ev.currentTarget.firstChild.nodeValue;
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i] == txt) {
                //found the match
                myList.splice(i, 1);
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(itemList));
        showList();
    },
    
    showList:function()
    {
        var output = document.querySelector(".list");
    //  output.innerHTML = "";
        for (var i = 0; i < myList.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = itemList[i];

            output.appendChild(li);
            li.addEventListener("click", removeItem);
        }
    }
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        console.log("bindEvents");
        document.addEventListener('deviceready', this.onDeviceReady, false); //DOMContentLoaded
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        console.log("Device ready");

        if (localStorage.getItem(STORAGE_KEY)) {
            itemList = JSON.parse(localStorage.getItem(STORAGE_KEY));
            //convert from String to Array
        }
        showList();

        $("#form").submit(function (event) {
            alert("submit");
            event.preventDefault();

            var newItem = document.querySelector("#item").value;
            itemList.push(newItem);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(itemList));
            //convert from Array to String.
            showList();
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        console.log('Received Event: ' + id);
    },

};

app.initialize();

function removeItem(ev) {
    //this.firstChild.nodeValue
    //ev.currentTarget.firstChild - the textNode inside the paragraph
    //ev.currentTarget.firstChild.nodeValue - the text inside the textNode
    var txt = ev.currentTarget.firstChild.nodeValue;
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i] == txt) {
            //found the match
            myList.splice(i, 1);
        }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemList));
    showList();
}

function showList() {
    var output = document.querySelector(".list");
    //  output.innerHTML = "";
    for (var i = 0; i < myList.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = itemList[i];

        output.appendChild(li);
        li.addEventListener("click", removeItem);
    }
}