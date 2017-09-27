import React, { Children, Component } from 'react';
import { bool, object, objectOf, string } from 'prop-types';

export default class Rosetta extends Component {
    static propTypes = {
        dictionary: bool,
        locale: string,
        translations: objectOf(object),
    }

    static defaultProps = {
        dictionary: false,
        locale: null,
        translations: {},
    }

    static childContextTypes = {
        locale: string,
        translations: object,
    }

    get locale() {
        const {locale} = this.props;
        return (
            locale ||
            (typeof navigator !== 'undefined' && (navigator.languages ? navigator.languages[0] : navigator.language)) ||
            (typeof process !== 'undefined' && process.locale) ||
            'en'
        );
    }

    getChildContext() {
        return {
            locale: this.locale,
            translations: this.translations,
        };
    }

    get translations() {
        const { dictionary, translations } = this.props;

        if (dictionary) {
            return translations;
        }
        return translations[this.locale] || translations[this.locale.split('-')[0]] || {};
    }

    render() {
        return Children.only(this.props.children);
    }
}
