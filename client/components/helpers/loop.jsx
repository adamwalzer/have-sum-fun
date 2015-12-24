loop = {
  each: function(obj, iteratee, context) {
    var i, length;
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
    return obj;
  }
};