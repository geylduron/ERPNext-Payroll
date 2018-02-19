// Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

cur_frm.add_fetch("employee", "employee_name", "full_name");
frappe.ui.form.on('Salary Grade', {
	refresh: function(frm) {

	}
});

frappe.ui.form.on('Salary Grade', {
	after_save: function(frm, cdt, cdn) {
	
	var salary = frappe.model.get_doc(cdt, cdn);
	var sg = salary.salary_grade;
	var si = salary.step_increment;
	var sg_inc = "SG " + String(sg)+ "-" + String(si);
	
	frm.set_value("sg_increment", sg_inc);
	salary.sg_increment = sg_inc;
	//console.log(sg_inc);
	
	
	var cor_salary = [
		[10510, 10602, 10695, 10789, 10884, 10982, 11076, 11173],
		[11200, 11293, 11386, 11480, 11575, 11671, 11767, 11864],
		[11914, 12013, 12112, 12212, 12313, 12414, 12517, 12620],
		[12674, 12778, 12884, 12990, 13097, 13206, 13315, 13424],
		[13481, 13606, 13705, 13818, 13932, 14047, 14163, 14280],
		[14340, 14459, 14578, 14699, 14820, 14942, 15066, 15190],
		[15254, 15380, 15507, 15635, 15765, 15895, 16026, 16158],
		[16282, 16433, 16585, 16739, 16895, 17051, 17209, 17369],
		[17473, 17627, 17781, 17937, 18095, 18253, 18413, 18575],
		[18718, 18883, 19048, 19215, 19384, 19567, 19725, 19898],
		[20179, 20437, 20698, 20963, 21231, 21502, 21777, 22055],
		[22149, 22410, 22674, 22942, 23212, 23486, 23763, 24043],
		[24224, 24510, 24799, 25091, 25387, 25686, 25989, 26296]
	];
	//console.log(cor_salary[sg-1][si-1]);
	
	//console.log(c_salary);
	salary.corresponding_salary = cor_salary[sg-1][si-1];
	frm.refresh();

	
	}
});
	