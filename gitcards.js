/*
*
*
*  	Author: Grant McGovern 
*	Date: 26 Feb 2015 
*	
* 	:: Gitcards :: 
*
*		A javascript module for creating virtual business cards
*		from ones Github profile.
*
*
*	LICENSE:
*
* 	The MIT License (MIT)
*
*	Copyright (c) 2014 Grant McGovern
*
*	Permission is hereby granted, free of charge, to any person
*	obtaining a copy of this software and associated documentation
*	files (the "Software"), to deal in the Software without 
*	restriction, including without limitation the rights to use, 
*	copy, modify, merge, publish, distribute, sublicense, and/or 
*	sell copies of the Software, and to permit persons to whom the 
*	Software is furnished to do so, subject to the following 
*	conditions:
*
*	The above copyright notice and this permission notice shall be
*	included in all copies or substantial portions of the Software.
*
*	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
*	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
*	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
*	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
*	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
*	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
*	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
*	DEALINGS IN THE SOFTWARE.
*
*/



$("head").append('<script type="text/javascript" src="config.js"></script>');

$(document).ready(function() {

	// Load the main gh3 script, and begin order of execution after
	$.getScript("includes/gh3/gh3.js", function() {
		getUserName(gitCards);
	});

	/*
	* Fetch username based on the "class" and "id" values contained in the HTML block
	*/
	function getUserName(gitCards) {
		try {
			var userName;
			var cardSize;
			
			/* First try for gitcard-small */
			try { 
				userName = document.getElementsByClassName("gitcard-small")[0].getAttribute("id");
				cardSize = "small";
			} 
			catch(err) { 
				/* Then gitcard-medium */
				try { 
					userName = document.getElementsByClassName("gitcard-medium")[0].getAttribute("id"); 
					cardSize = "medium";
				} 
				catch(err){
					/* Finally, gitcard-large */
					try { 
						userName = document.getElementsByClassName("gitcard-large")[0].getAttribute("id"); 
						cardSize = "large";
					} 
					catch(err){ throw err; }
				}
			
			}
		
			console.log(userName);
		} 
		catch(err) {
			console.log("Unable to fetch User");
			console.log(err);
		}

		gitCards(userName, cardSize);
	};

	/*
	* Leveraging gh3 to fetch specific Github API info
	*/
	function gitCards(username, cardSize) {

		var userInfo = {};
		var user = new Gh3.User(username);

		user.fetch(function(err, resUser){
			if(err) {
				throw "Unable to fetch error";
				throw err;
			}
			else {
				console.log("Username :", resUser.name);

				//userRepositories(user);

				userInfo["username"] = username;
				userInfo["name"] = resUser.name;
				//userInfo["repos"] = resUser.repositories;
			}
		});
		
		buildCard(username, userInfo, cardSize);
 	};

 	/*
 	* Get repositories related to a user.
 	*/
 	var userRepositories = function(userObject) {
 		var repos = new Gh3.Repositories(userObject);

 		repos.fetch(function() {
 			console.log("Repositories", repos);
 		}, function(){},{page:1, per_page:500, direction : "desc"});

 	};

 	/*
 	* Takes in a userInfo dict and a card size, and creates it in the DOM
 	*/
 	function buildCard(username, userInfo, cardSize) {

 		/* So we know what div to grab */
 		var username = userInfo["username"];

 		var element = document.getElementById(username);
 		console.log(element);

 		switch(cardSize) {
 			case "small":
 				console.log("small");
 				break;
 			case "medium":
 				console.log("medium");
 				break;
 			case "large":
 				console.log("large");
 				break;
 		}
 	};

});