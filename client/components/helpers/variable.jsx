setVar = function(name, value) {
  Session.set(name,value);
  localStorage.setItem(name,value);
};

getVar =  function(name) {
  return localStorage.getItem(name);
};

Variable = {
	get: function(name) {
	  return localStorage.getItem(name);
	},
	set: function(name, value) {
	  Session.set(name,value);
	  localStorage.setItem(name,value);
	}
}