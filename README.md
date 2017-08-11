# react-rosetta
A react library for translating text based on your current locale

## Components
**Rosetta**
----
  A component that acts as a provider of translations for the Translator component.

* **translations** `Object`

  An object containing a lookup table of translations.  The translations object can take two forms.  The first is for id based translations, see example 1 below.  The second is for dictionary based translations, in order to activate dictionary based translations, the dictionary config must also be set on the Rosetta component.  See example 2 below.

* **locale** `String`

  A locale string to override the one found by window.navigator.languages.

* **dictionary** `Boolean`

  Set this config to enable dictionary based translations.


**Translator**
----
  A component that translates text from one languge to another based on the locale.  This component needs to have a Rosetta component somewhere above it in the component tree to function.

* **id** `String`

  An id to tie the Translator component to a text string in the translations object.  This is only used when not using a dictionary based translation.

* **className** `String`

  A normal className string that is passed to the html tag.


* **defaultTranslation** `String`

  A default translation to use if no valid translation is found.  If this is not specified and a valid translation is not found, the text will be left as is.

* **onClick** `Function`

  An onClick listener to be passed to the html tag.

* **style** `Object`

  A normal style object that is passed to the html tag.

* **tag** `String`

  Use this config to change what html tag the Translator component renders as


**Basic Use Cases**
----

Example 1. A simple use case involves defining the translations as Ids, as shown below.
```javascript
import React, { Children, Component } from 'react';
import { Rosetta, Translator } from 'react-rosetta';

// translations can be defined inline or imported via JavaScript modules
const translations = {
    en: {
        greeting: 'Hello'
    },
    "en-US": {
        greeting: 'Howdy'
    },
    es: {
        greeting: 'Hola'
    }
};

export default class Hello extends Component {
    render() {
        return (
            <Rosetta translations={translations}>
                <Translator id="greeting" />
            </Rosetta>
        );
    }
}
```

Example 2. A slightly more complicated use case using the dictionary based translations is shown below.  Note, in order to use this method of translation, the dictonary config must be specified on the Rosetta component.
```javascript
import React, { Children, Component } from 'react';
import { Rosetta, Translator } from 'react-rosetta';

const translations = {
    Hello: {
        en: 'Hi',
        es: 'Hola'
    },
    World: {
        en: 'Earth',
        es: 'Mundo'
    },
    'Something else': {
        en: 'Foo',
        es: 'Bar'
    }
};

export default class Hello extends Component {
    render() {
        return (
            <Rosetta translations={translations} dictionary>
                <div>
                    <Translator tag="div" defaultTranslation="Foo">Hello World</Translator>
                    <Translator tag="p">Something else</Translator>
                </div>
            </Rosetta>
        );
    }
}
```

Example 3. The Rosetta component can be generated programatically.  The third parameter in withRosetta should be set to true to enable dictionary translations.
```javascript
import React, { Children, Component } from 'react';
import { Translator, withRosetta } from 'react-rosetta';

class Hello extends Component {
    render() {
        return (
            <div>
                <Translator tag="div" defaultTranslation="Foo">Hello World</Translator>
                <Translator tag="p">Something else</Translator>
            </div>
        );
    }
}

export default withRosetta(Hello, {
    Hello: {
        en: 'Hi',
        es: 'Hola'
    },
    World: {
        en: 'Earth',
        es: 'Mundo'
    },
    'Something else': {
        en: 'Foo',
        es: 'Bar'
    }
}, true);
```
