var STORAGE_KEY = "MyTasks";
var taksobj = {
  set: function(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
  get: function() {
    var val = localStorage.getItem(STORAGE_KEY) || "[]";
    val = JSON.parse(val);
    return val;
  }
};
export default taksobj;
