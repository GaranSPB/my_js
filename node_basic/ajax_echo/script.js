let form = $('#form'),
    display = $('#res'),
    sendButton = $('#req');

const sendAjax = (req,cb) => $.post('http://127.0.0.1:3000',req,cb);

const render = data => display.append(`<p>${data}</p>`);

const echoInput = () => sendAjax(form.serialize(),render);

sendButton.click(echoInput);


