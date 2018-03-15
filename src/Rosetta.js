// @flow
import React, { createContext, Children, PureComponent } from 'react';
import type { Node } from 'react';



const TranslationContext = createContext();
const { Provider, Consumer } = TranslationContext;



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

type State = {
  translations: Translations,
};

class TranslationProvider extends PureComponent<Props, State> {
  static defaultProps = {
    locale: null,
  }

  /**
   * 
   */
  defaultLocale = 'en'

  /**
   * 
   * @param {*} param0 
   */
  getLocale({ locale }): string {
    let ret = locale;

    // if the locale isn't defined as a prop,
    // attempt to pull it out of the window navigator
    if (!ret && typeof window !== 'undefined') {
      ret = navigator.languages ? navigator.languages[0] : navigator.language;
    }

    // if the locale is STILL unknown, fallback to the default
    if (!ret) {
      ret = this.defaultLocale;
    }

    // finally, return the locale
    return ret;
  }

  /**
   * 
   */
  get translations(): LocaleTranslations {
    const locale = this.getLocale(props)
    const { translations } = this.props;
    return translations[this.locale] || translations[this.locale.split('-')[0]] || {};
  }

  render() {
    return (
      <Provider value={this.state}>{this.props.children}</Provider>
    );
  }
}
