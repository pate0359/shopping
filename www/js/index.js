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
        
        itemList.splice(id, 1);
        console.log(itemList);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(itemList));
        app.showList();
    },
	
    showList: function (ev) {

        $("#myList").html("");
        var node = ""
        for (var i = 0; i < itemList.length; i++) {            
			node = node+ ('<li><label class="label"><input type="checkbox">'+itemList[i]+'</label><a href="#" data-role="button" class="btnDelete" id="'+i+'" data-iconpos="notext" data-mini="true" data-icon="delete">Delete</a></li>');
        }

		$("#myList").html(node);
//		$( "#mylist" ).listview( "refresh" );

		//Open dialog
        $('.btnDelete').on("click", function () {
            deletId=$(this).attr("id");
            $("#dialog").find(".alertMessage").html("Are you sure, you want to delete \""+itemList[deletId]+"\" ?");
            $(this).attr("href","#dialog");
        });
                
        $('.YesBtn').unbind( 'click' ).click( function() {
            console.log("YesBtn");
            app.removeItem(deletId);
        });
        
        $(document).on('pageshow', '.btnDelete', function(){
            
          $('#dialog').popup('reposition', 'positionTo: window');
        });
    }
};

app.initialize();