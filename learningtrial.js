function openTab(info, TabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tab-content");
	
	tablinks = document.getElementsByClassName("nav-link");

	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace("active", "");
	}
	document.getELementById(TabName).style.display = "block";
	info.currentTarget.className += " active";
}