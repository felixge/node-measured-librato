# measured-librato

Example:

```js
var collection = require('measured').createCollection();

var reporter = require('measured-librato').createReporter({
  email    : 'your librato e-mail',
  token    : 'your librato token',
  interval : 1000,
});

reporter.addCollection(collection);
```
