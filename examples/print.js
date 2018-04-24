const fs = require('fs');
const CDP = require('chrome-remote-interface');
fs.unlink(__dirname + '/test.pdf', function () {})

CDP((client) => {
  // Extract used DevTools domains.
  const {Page, Runtime} = client;

  // Enable events on domains we are interested in.
  Promise.all([
    Page.enable()
  ]).then(() => {
    return Page.navigate({url: 'https://google.com'});
  });

  // Evaluate outerHTML after page has loaded.
  Page.loadEventFired(async () => {
      const { data } = await Page.printToPDF({
        displayHeaderFooter: false
      })
      console.log(data)
      fs.writeFile(__dirname + '/../test.pdf', Buffer.from(data, 'base64'), function (err) {
        if (err) {
            return console.log(err)
        }
        client.close();
      })
  })
}).on('error', (err) => {
  console.error('Cannot connect to browser:', err);
});