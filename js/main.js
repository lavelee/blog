const addClassToBodyEl = str => $(document.body).addClass(str);

$(document).ready(function() {
  const path = new URL(window.location.href).pathname
  if (path === '/') addClassToBodyEl('home')
  else if (path.indexOf('/articles/') === 0) addClassToBodyEl('post')
  // 아직 더이상은 필요 없다
});
