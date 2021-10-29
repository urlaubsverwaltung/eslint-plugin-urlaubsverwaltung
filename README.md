[![Build Status](https://travis-ci.org/synyx/eslint-plugin-urlaubsverwaltung.svg?branch=main)](https://travis-ci.org/synyx/eslint-plugin-urlaubsverwaltung)

# eslint-plugin-urlaubsverwaltung

custom eslint rules for the [Open Source Urlaubsverwaltung](https://github.com/synyx/urlaubsverwaltung) application.

## Rules

### @urlaubsverwaltung/no-date-fns

some date-fns functions like `format` are wrapped by the application with special behaviour.  
(e.g. internationalisation or date patterns)

valid:

```js
import format from "../lib/date-fns/format";
import startOfWeek from "../lib/date-fns/startOfWeek";
```

invaild:

```js
import { format } from "date-fns";
import { startOfWeek } from "date-fns";
import DateFns from "date-fns";
```

### @urlaubsverwaltung/no-global-fetch

global fetch api should not be used in favor of an abstraction layer.
this layer could handle JSON serialisation for instance, or authorization and common error handling.

valid:

```js
import * as fetch from "../lib/http";

fetch.json('/api');
```

```js
import fetch from "fetch";

fetch('/api');
```

```js
function fetch() {
  // ...
}

fetch('/api');
```

invaild:

```js
fetch('/api')
window.fetch('/api')
global.fetch('/api')
```
