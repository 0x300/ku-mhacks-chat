function parseSchedule(data, done) {
	var rootRef = new Firebase("https://sizzling-heat-3782.firebaseio.com/");
	var classesRef =  rootRef.child("Classes");
	var header = $(data).find('.staticheaders');
	var name = header.html();
	name = $.trim(name).substring(10,header.html().length-48)
	var userRef = rootRef.child("Users");
	var users;
	var userFound = false;
	var userID = 1;
	userRef.once("value", function(snapshot){
		users = snapshot.val();
		if (users) {
			$.each(users, function(key, userObject)
			{
				if(userObject.userName == name)
				{
					userFound = true;
					userID = key;
				}
			});
		}

		if(userFound == false)
		{
			userID = userRef.push().name();
			userRef.child(userID).set({userName: name});
		}

		//gets bolded class name, e.x.: Microcomputers I - CE 320 - 01
		$(data).find('.captiontext').each(function()
		{
			var parsedClassName = $(this).html();
			var classes;
			var classFound = false;
			var classExists = false;
			if(!(parsedClassName == "Scheduled Meeting Times"))
			{

				classesRef.once("value", function(snapshot){
					classes = snapshot.val();

					if (classes) {
						$.each(classes, function(key, classObject){
							if(parsedClassName == classObject.ClassName)
							{
								userRef.child(userID + "/Classes").once("value", function(snapshot){
									classes2 = snapshot.val();

									if (classes2) {
										$.each(classes2, function(key2, userClassObject)
										{
											if(userClassObject.ClassName == parsedClassName)
											{
												classExists = true;
											}
										});
									
									}
									if(!classExists)
									{
										userRef.child(userID + "/Classes").push({ClassName : parsedClassName, classKey : key});
									}
								});
								classFound = true;
							}
						});
					}

					if(classFound == false)
					{
						var classId = classesRef.push().name();
						classesRef.child(classId).set({ClassName : parsedClassName});
						userRef.child(userID + "/Classes").push({ClassName : parsedClassName, classKey : classId});
					}

					done && done();
					return userRef.child(userID + "/userName");
				});
			}
		});

	});

}
