/**********************************************

No Right Click Images plugin
by Keith P. Graham

Plugin URI: http://www.BlogsEye.com/
Description: Uses Javascript to prevent right clicking of images to help keep leaches from copying images
Version: 3.4
Author: Keith P. Graham
Author URI: http://www.BlogsEye.com/

This software is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.


***********************************************/
	document.addEventListener("contextmenu",kpg_nrci_cm, false);
	
	if (nrci_opts['drag']=='Y') {
		document.addEventListener("dragstart",kpg_nrci_cm, false);
		document.addEventListener("touchmove",kpg_nrci_cm, false); /* same as drag? */
	}
	if (nrci_opts['touch']=='Y') {
		document.addEventListener("touchstart",kpg_nrci_cm, false);
	}
	if (nrci_opts['gesture']=='Y') {
		document.addEventListener("gesturestart",kpg_nrci_cm, false);
	}


function kpg_nrci_block(event) {
	event.cancelBubble = true;
	if(event.preventDefault != undefined) {
		event.preventDefault();
	}
	if(event.stopPropagation != undefined) {
		event.stopPropagation();
	}
	return false;
}
function kpg_nrci_cm(event) {
	try {
		if (event.target.tagName == "IMG") {
			//alert("in IMG");
			event.cancelBubble = true;
			if(event.preventDefault != undefined) {
				event.preventDefault();
			}
			if(event.stopPropagation != undefined) {
				event.stopPropagation();
			}
			//console.log('in img tag');
			return false;
		} 
	} catch(error) {
		console.log("NRI error:"+error);
	}

	try {
		if(event.target.getAttribute("style")==null || 
			event.target.getAttribute("style")=="") {
				return true;
		}
		if  (event.target.style.backgroundImage != null 
			&& event.target.style.backgroundImage != 'none' 
			&& event.target.style.backgroundImage != '') {
				event.cancelBubble = true;
				if(event.preventDefault != undefined) {
					event.preventDefault();
				}
				if(event.stopPropagation != undefined) {
					event.stopPropagation();
				}
				return false;
		}
	} catch(error) {
		console.log("NRI error:"+error);
	}
	return true;
	
}

	

