import React, { Component } from 'react';
import { func, number, object, objectOf, oneOfType, oneOf, string } from 'prop-types';

export default class Translator extends Component {
    static propTypes = {
        id: string,
        className: string,
        defaultTranslation: string,
        onClick: func,
        style: objectOf(oneOfType([number, string])),
        tag: oneOf(['a', 'b', 'button', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '1i', 'p', 'span', 'strong']),
    }

    static defaultProps = {
        id: null,
        className: null,
        defaultTranslation: '',
        onClick: null,
        style: null,
        tag: 'span',
    }

    static contextTypes = {
        locale: string,
        translations: oneOfType([objectOf(object), objectOf(string)]),
    }

    get tagProps() {
        const { className, onClick, style } = this.props;
        return {
            className: className || undefined,
            onClick: onClick || undefined,
            style: style || undefined,
        };
    }

    get translation() {
        const { defaultTranslation, id } = this.props;
        const { translations } = this.context;
        return (id ? (translations[id] || id) : this.translateChildren()) || defaultTranslation;
    }

    translateChildren() {
        const { children } = this.props;
        let translation;

        if (children && typeof children === 'string') {
            translation = this.translateWord(children, true) || this.translateSentence(children);
        }
        return translation;
    }

    translateSentence(sentence) {
        return sentence.split(' ').map(word => this.translateWord(word)).join(' ');
    }

    translateWord(word, skipWordFallback) {
        const { locale, translations } = this.context;
        const { defaultTranslation } = this.props;
        const dictionary = translations[word] || {};

        let translation = dictionary[locale] || dictionary[locale.split('-')[0]];
        if (!translation && !defaultTranslation && !skipWordFallback) {
            translation = word;
        }
        return translation
    }

    render() {
        const Tag = this.props.tag;
        return <Tag {...this.tagProps}>{this.translation}</Tag>;
    }
}
