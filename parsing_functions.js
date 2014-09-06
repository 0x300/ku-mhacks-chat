function parseSchedule(data) {
	//gets bolded class name, e.x.: Microcomputers I - CE 320 - 01
	var classNames = $(data).children('.captiontext');
	
	// get row of class='ddlabel' e.x.: CRN:	30082
	var CRNs = $(data).children('.ddlabel');
	
	
}