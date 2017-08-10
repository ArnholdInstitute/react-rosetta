import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Rosetta from './Rosetta';
import Translator from './Translator';

test('Rosetta should accept a hardoded locale.', () => {
    const translations = {
        en: {
            foo: 'Hello'
        },
        es: {
            foo: 'Hola'
        }
    };

    const component = mount(
        <Rosetta translations={translations} locale="es">
            <Translator id="foo" />
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Rosetta should not throw an error if no translations are found for the locale.', () => {
    const translations = {
        en: {
            foo: 'Hello'
        },
        es: {
            foo: 'Hola'
        }
    };

    const component = mount(
        <Rosetta translations={translations} locale="fr">
            <Translator id="foo" />
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should be able to translate by Id.', () => {
    const translations = {
        en: {
            foo: 'Hello'
        },
        es: {
            foo: 'Hola'
        }
    };

    const component = mount(
        <Rosetta translations={translations}>
            <Translator id="foo" />
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should be able to translate a single word using a dictionary.', () => {
    const translations = {
        Hello: {
            en: 'Hi',
            es: 'Hola'
        }
    };

    const component = mount(
        <Rosetta translations={translations} dictionary>
            <Translator>Hello</Translator>
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should be able to translate a phrase using a dictionary.', () => {
    const translations = {
        'Hello World': {
            en: 'Hi Earth',
            es: 'Hola Mundo'
        }
    };

    const component = mount(
        <Rosetta translations={translations} dictionary>
            <Translator>Hello World</Translator>
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should be able to translate a sentence using a dictionary.', () => {
    const translations = {
        Hello: {
            en: 'Hi',
            es: 'Hola'
        },
        World: {
            en: 'Earth',
            es: 'Mundo'
        }
    };

    const component = mount(
        <Rosetta locale="es" translations={translations} dictionary>
            <Translator>Hello World</Translator>
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should fall back to the id if no matches are found in the translations.', () => {
    const translations = {
        en: {
            foo: 'Hello'
        },
        es: {
            foo: 'Hola'
        }
    };

    const component = mount(
        <Rosetta translations={translations} locale="es">
            <Translator id="bar" />
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should fall back to the original word if no matches are found in the translations (by dictionary).', () => {
    const translations = {
        Hello: {
            en: 'Hi',
            es: 'Hola'
        },
        World: {
            en: 'Earth',
            es: 'Mundo'
        }
    };

    const component = mount(
        <Rosetta translations={translations} dictionary>
            <Translator>Foo</Translator>
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should fall back to the defaultTranslation if no matches are found and a default is defined.', () => {
    const translations = {
        Hello: {
            en: 'Hi',
            es: 'Hola'
        },
        World: {
            en: 'Earth',
            es: 'Mundo'
        }
    };

    const component = mount(
        <Rosetta translations={translations} dictionary>
            <Translator defaultTranslation="Bar">Foo</Translator>
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should render the default translation if no children are defined and using a dictionary', () => {
    const translations = {
        Hello: {
            en: 'Hi',
            es: 'Hola'
        },
        World: {
            en: 'Earth',
            es: 'Mundo'
        }
    };

    const component = mount(
        <Rosetta translations={translations} dictionary>
            <Translator defaultTranslation="Bar" />
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Translator should be able to apply className, onClick, and Style.', () => {
    const translations = {
        en: {
            foo: 'bar'
        },
        es: {
            foo: 'Hola'
        }
    };

    const component = mount(
        <Rosetta translations={translations}>
            <Translator
                id="foo"
                className="foo"
                onClick={() => console.log('foo')}
                style={{background: 'red'}}
            />
        </Rosetta>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});
