function parseSchedule(data) {
	var classesRef =  new Firebase("https://sizzling-heat-3782.firebaseio.com/Classes")
	var header = $(data).find('.staticheaders');
	var name = header.html();
	name = $.trim(name).substring(10,header.html().length-48)
	var userRef = new Firebase("https://sizzling-heat-3782.firebaseio.com/Users");
	var users;
	var userFound = false;
	var userID = 1;
	userRef.once("value", function(snapshot){
		users = snapshot.val();
		$.each(users, function(key, userObject)
		{
			if(userObject.userName == name)
			{
				userFound = true;
				userID = key;
			}
		});

		if(userFound == false)
		{
			userID = userRef.push({userName: name});
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

				$.each(classes, function(key, classObject){
					if(theClassName == classObject.ClassName)
					{

						userRef.child(userID + "/Classes").push({ClassName : theClassName, classKey : key});
					
						classFound = true;
					}
				});

				if(classFound == false)
				{
					var classId = classesRef.push({ClassName : theClassName});
					userRef.child(userID + "/Classes").push({ClassName : theClassName, classKey : classId});
				}
			});
		}
	});
}
