// @flow
import React, { Children, PureComponent } from 'react';
import type { Node } from 'react';

type LocaleTranslations = {
  [key: string]: string,
};

type Translations = {
  [locale: string]: LocaleTranslations,
};

type Props = {
  children: Node,
  locale?: string,
  translations: Translations,
};

/*
  static childContextTypes = {
    locale: string,
    translations: object,
  }

    getChildContext() {
    return {
      locale: this.locale,
      translations: this.translations,
    };
  }
  */

class Rosetta extends PureComponent<Props> {
  static defaultProps = {
    locale: null,
  }

  defaultLocale = 'en';

  get locale(): string {
    const { locale } = this.props;
    let ret = locale;

    // if the locale isn't defined as a prop,
    // attempt to pull it out of the window navigator
    if (!ret && typeof window !== 'undefined') {
      ret = navigator.languages ? navigator.languages[0] : navigator.language;
    }

    // if the locale is STILL unknown, just fallback
    // to english bcause that is what I speak
    if (!ret) {
      ret = this.defaultLocale;
    }

    // finally, return the locale
    return ret;
  }

  get translations(): LocaleTranslations {
    const { translations } = this.props;
    return translations[this.locale] || translations[this.locale.split('-')[0]] || {};
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default Rosetta;
