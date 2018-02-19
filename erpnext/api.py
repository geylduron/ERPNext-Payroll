import frappe
from frappe import _






@frappe.whitelist()
def createattendance(doc, method):

	datas = frappe.get_all("Trip Ticket",
		filters={'workflow_state': 'Approved'},
				fields=["id","employee_name","date"], 
        	)

	
	#item_added = frappe.get_all("Passengers Table",
	#		filter ={
	#			: doc.name
	#		},
	#		fields=["employee_name"]
    #    	)
	#frappe.msgprint(str(doc.passengers))
	for item in doc.passengers:		
		passenger = frappe.get_doc({
							"doctype"			: "Attendance",
							"employee": str(item.employee_name),
							"attendance_date": datas[0].date,
							"hours": 8
						})
	#	frappe.msgprint(str(item.employee_name))
		passenger.insert()
			
															#s=data inside of the datatable 
	# frappe.msgprint(datas[0].id)
	
	
	# doc = frappe.get_doc({
	# "doctype": "Attendance",
	# "employee": datas[0].employee_name,
	# "attendance_date": datas[0].date,
	# "hours": 8
	# })
	# doc.insert()
	