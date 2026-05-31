console.log('ml-capture.js cargado');

function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

// Detectar el evento correcto
var originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, listener, options) {
  if (type.indexOf('ml') !== -1 || type.indexOf('ML') !== -1) {
    console.log('Evento MailerLite detectado:', type);
  }
  originalAddEventListener.call(this, type, listener, options);
};
document.addEventListener('ml-form-success', function(e) {
  console.log('ml-form-success disparado!');
  
  var email = document.querySelector('input[type="email"]') ? document.querySelector('input[type="email"]').value : '';
  var fname = document.querySelector('input[name="fields[name]"]') ? document.querySelector('input[name="fields[name]"]').value : '';

  fetch('https://encuentroorganico.app.n8n.cloud/webhook/d81ede22-d3e8-4a46-b87f-5142f37b25ac', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: email,
      name: fname,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      user_agent: navigator.userAgent
    })
  });
});
