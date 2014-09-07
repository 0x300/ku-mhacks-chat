function parseSchedule(data) {
	var classesRef =  new Firebase("https://sizzling-heat-3782.firebaseio.com/Classes")
	var header = $(data).children('.staticheaders');
	var name = header.html();
	name = $.trim(name).substring(10,header.html().length-48)
	var userRef = new Firebase("https://sizzling-heat-3782.firebaseio.com/Users");
	var users;
	var userFound = false;
	var userID;
	userRef.once("value", function(snapshot){
		users = snapshot.val();
		.each(users, function(index, userObject)
		{
			if(userObject.userName == name)
			{
				userFound = true;
				userID = userObject.name();
			}
		});

		if(userFound == false)
		{
			userRef.on("child_added", function(snapshot)
			{
				userID = snapshot.name(); 
			});
			userRef.push({userName: name});
		}
	});
	//gets bolded class name, e.x.: Microcomputers I - CE 320 - 01
	$(data).find('.captiontext').each(function()
	{
		var theClassName = $(this).html();
		var classes;
		var classFound = false;
		if(!(theClassName == "Scheduled Meeting Times"))
		{

			classesRef.once("value", function(snapshot){
				classes = snapshot.val();

				$.each(classes, function(index, classObject){
					if(theClassName == classObject.ClassName)
					{
						classFound = true;
						userRef.once("value", function(snapshot)
						{
							snapshot.val().Classes.push({ClassName : theClassName, classKey : classObject.name() });
						});
					}
				});

				if(classFound == false)
				{
					userRef.once("value", function(snapshot){
						snapshot.val()[userID].Classes.push(ClassName : theClassName, classKey : classesRef.push({ClassName : theClassName}).name());
					});
				}
			});
		}
	});
}
