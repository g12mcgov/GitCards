/*
*
*
*  	Author: Grant McGovern 
*	Date: 26 Feb 2015 
*	
*
*	~ A javascript module for creating virtual business cards
*	from ones Github profile ~
*
*
*
*
*
*/

$("head").append('<script type="text/javascript" src="config.js"></script>');

$(document).ready(function() {
	// Pass in our user object to authenticate against

	var userName;
	var name;

	$.getScript("includes/gh3/gh3.js", function() {
		getUserName(function(user));

	});

	function getUserName(gitcards) {
		try {
		
		userName = document.getElementsByClassName("gitcard")[0].getAttribute("id"); 
		console.log(userName);
	
		} 
		catch(err) {
			console.log("Unable to fetch User");
			console.log(err);
		}

		gitcards(userName);
	};

	var gitcards = function(user) {
 			console.log("user" + user);
 	};
});