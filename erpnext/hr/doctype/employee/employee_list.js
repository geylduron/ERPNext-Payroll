frappe.listview_settings['Employee'] = {
	add_fields: ["status", "branch", "department", "designation","image"],
	filters: [["status","=", "Active"]],
	get_indicator: function(doc) {
		var indicator = [__(doc.status), frappe.utils.guess_colour(doc.status), "status,=," + doc.status];
		indicator[1] = {"Active": "green", "Left": "darkgrey"}[doc.status];
		return indicator;
	}
 };

if(user!="Administrator"){
frappe.listview_settings['Employee'] = {
	onload: function(me) {
		
		frappe.route_options = {
			"user_id": user
		};
		me.page.set_title(__("Employee"));

	}
}
}
