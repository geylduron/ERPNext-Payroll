// Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Trip Ticket", {
    // validate: function(frm, cdt, cdn) { 
	// var table = frappe.model.get_doc(cdt, cdn);
	// var identifier = table.name;
	// table.id = identifier;
	// console.log(identifier);
	// frm.refresh();
	// }
// });

frappe.ui.form.on("Trip Ticket", {
    refresh: function(frm) { 
		frm.toggle_enable("username", false);
	}
})

frappe.ui.form.on("Trip Ticket", {
    after_save: function(frm, cdt, cdn) { 
	var table = frappe.model.get_doc(cdt, cdn);
	var date_created = table.creation;
	var scheduled_date = table.date;
	
	if(scheduled_date > date_created){
		var identifier = table.name;
		frm.set_value("id", identifier);
		frm.refresh();

	}else{
		frappe.msgprint("Scheduled date must be later than the date today.")
	}
	}
});


frappe.ui.form.on("Trip Ticket", {
	employee_name: function(frm, cdt, cdn){
		var table = frappe.model.get_doc(cdt, cdn);


		var c = frm.add_child('passengers');
		c.employee_name=table.employee_name;
		c.department=table.department;
		frm.refresh_field('passengers');	
		
	}
});


frappe.ui.form.on("Trip Ticket", {
    validate: function(frm, cdt, cdn) {
		
	var sheer = user;

	var data = frappe.model.get_doc(cdt, cdn);
	  
	var username = data.username;
	var password = data.password;

	
	if(sheer != "Administrator")
	{
	  
	$.ajax({
		type: "POST",
		url: 'http://10.99.201.159:8000/api/method/login?usr='+username+'&pwd='+password,
		complete: function(response){
			var data = response;
			console.log('*************************************************')
			switch(data.status){
				case 200:
					
					console.log("Correct password");
					
				break;
				
				case 401:
					frappe.msgprint("Password is Incorrect")
					validated=false;
					return false;
				break;
				
				case 500:
					frappe.msgprint('Internal Server Error');
				break;
			}
			console.log('*************************************************')
		}

	});
	  
	}
	}
});

cur_frm.add_fetch("employee_name", "user_id", "username");
var full_name = cur_frm.add_fetch("employee_name", "employee_name", "full_name");

frappe.ui.form.on("Trip Ticket", {
	employee_name: function(frm,cdt,cdn) {
		var trip_ticket = frappe.model.get_doc(cdt, cdn);
		var full_name = trip_ticket.full_name;
		
		//frm.set_value("employee_name", full_name);
	},
});

cur_frm.set_query("employee_name", "passengers", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return{
		filters: [
			['Employee', 'user_id', '!=', user],
		]
	}
});


frappe.ui.form.on("Passengers Table", {
		passengers_add: function(frm,cdt,cdn) {
			var passenger = frappe.model.get_doc(cdt, cdn);
			passenger.employee_name = "";
			frm.refresh();
		},
});
cur_frm.add_fetch("employee_name", "department", "department");














