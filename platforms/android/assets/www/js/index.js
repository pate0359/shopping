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
var deletId;

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        // document.addEventListener('deviceready', app.onDeviceReady, false);
        document.addEventListener('DOMContentLoaded', app.onDeviceReady, false); //DOMContentLoaded
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
            app.showList();
            //convert from String to Array
        }

        $("#form").submit(function (event) {
            event.preventDefault();

            //alert(document.querySelector("#item").value);
            if (document.querySelector("#item").value != "") {
                var newItem = document.querySelector("#item").value;
                
                itemList.push(newItem);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(itemList));
                //convert from Array to String.
                app.showList();

                document.querySelector("#item").value = "";
            }
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
    },

    removeItem: function (id) {
        //ev.currentTarget.firstChild - the textNode inside the paragraph
        //ev.currentTarget.firstChild.nodeValue - the text inside the textNode
//        var txt = $.trim($(ev).text());
//        console.log("hello : "+txt);
//        //alert(txt);
//        
//        for (var i = 0; i < itemList.length; i++) {
//            
//            console.log("1:"+itemList[i]+"-->2:"+txt);
//            
//            if (itemList[i] === txt) {
//                //found the match
//                
//                itemList.splice(i, 1);
//                //alert("matched")
//            }
//        }
        
        itemList.splice(id, 1);
        console.log(itemList);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(itemList));
        app.showList();
    },

    showList: function (ev) {

        //console.log("showList called");
        
        var node = ""
        for (var i = 0; i < itemList.length; i++) {
            node = node + ('<li><input type="checkbox"> '+itemList[i]+'<a href="#" data-role="button" class="btnDelete" data-mini="true" data-icon="delete" id="'+i+'">delete</a></li>');
//            node = node + ('<li><input type="checkbox"> '+itemList[i]+'<input type="button" class="btnDelete" id="'+i+'"value="Delete"/></a></li>');
        }
                 
        $(".list").html(node);
        
        //Open dialog
        $('.btnDelete').on("click", function () {
            //console.log('Prove event fired');
            deletId=$(this).attr("id");
            $(this).attr("href","#dialog");
        });
        
//         $("li").click(function (e) {
//            var cb = $(this).find(":checkbox")[0];
//            if (e.target != cb) cb.checked = !cb.checked;
//            $(this).toggleClass("selected", cb.checked);
//        });
        
//        $('.YesBtn').unbind( 'click' ).click( function() {
//            // your code
//        });
        
        $('.YesBtn').unbind( 'click' ).click( function() {
            
            console.log("YesBtn");
            app.removeItem(deletId);
//            var abc = $(this).previousObject;
            
            
        });
        
        $('.list li a').on("click",function()
                              {
            
           // alert($(this).attr("id"));
           // $.mobile.navigate( "#dialog", { role: "dialog" } );
        });
        
        
        
        
//        $('.list li span').on("click",app.removeItem());
        
//        $('.list li span:last-child').dialog({
//          modal: true, title: 'Are you sure?', zIndex: 10000, autoOpen: true,
//          width: 'auto', resizable: false,
//          buttons: {
//              Yes: function () {
//                  doFunctionForYes();
//                  $(this).dialog("close");
//              },
//              No: function () {
//                  doFunctionForNo();
//                  $(this).dialog("close");
//              }
//          },
//          close: function (event, ui) {
//              $(this).remove();
//          }
//        });
    }
    
//    callback: function(value) {
//        if (value) {
//            alert("Confirmed");
//        } else {
//            alert("Rejected");
//        }
//    },
};

app.initialize();