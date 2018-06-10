/**
 * @file Controling the extension
 * @author Dimitriadis Dimitris <karaokesuite@gmail.com>
 * @version 0.11
 */

/**
 * Refresh apply polytonic greek on demand 
 *  for dynamic web pages, example facebook.
 */
function refresh() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id, 
			{message: "refresh"}, 
			function(response) { 	}
		);
	});
}

/**
 * Activates or deactivates the plugin globaly.
 * When active apply polytonic greek to current page.
 * When deactive refreshes the current page.
 */
function activation() {
	chrome.tabs.query(
		{active: true, currentWindow: true}, 
		function(tabs) {
			var value = document.getElementById('activate').checked;
			if(value) {
				chrome.storage.sync.set({ "active" : value }, function() {
					if (chrome.runtime.error) {  console.log("Runtime error.");	}
				  });
				chrome.tabs.sendMessage(tabs[0].id, {message: "activate"}, function(response) { 	}	);
			} else {
				chrome.storage.sync.set({ "active" : value }, function() {
					if (chrome.runtime.error) {  console.log("Runtime error.");	}
				  });
				chrome.tabs.sendMessage(tabs[0].id, {message: "deactivate"}, function(response) { }	);
				chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
					chrome.tabs.reload(arrayOfTabs[0].id);
				});
			}
		}
	);
}

// Connect the popup.html buttons to functions.
document.getElementById('refresh').addEventListener('click', refresh);
document.getElementById('activate').addEventListener('click', activation);

/**
 * Set the popup.html checkbox to true or false
 * based on the stored value.
 */
document.body.onload = function() {
  chrome.storage.sync.get("active", function(items) {
    if (!chrome.runtime.error) {
      document.getElementById("activate").checked = items.active;
    }
  });
}