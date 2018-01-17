import './hello.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.logs = new ReactiveVar(false);
});

Template.hello.helpers({
  logs() {
    return Template.instance().logs.get();
  },
});

Template.hello.events({
  'click .syncNow'(event, instance) {
    if (!navigator.nfc) {
      alert('No NFC Support');
      return false;
    }
    navigator.nfc.watch(function (message) {
      instance.logs.set("NFC message received from URL " + message.url);
      if (message.data[0].recordType === 'empty') {
        navigator.nfc.push([{
          url: message.url,
          data: [{
            recordType: "text",
            data: 'Hello World'
          }]
        }]);
      }
      processMessage(message);
    })
    .then(() => instance.logs.set("Added a watch."))
    .catch(err => instance.logs.set("Adding watch failed: " + err.name));

    function processMessage(message) {
      message.data.forEach(function (record) {
        instance.logs.set(record.data);
      });
    }
  },
});

