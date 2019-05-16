// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getCurrentUserLocale} from 'xenia-redux/selectors/entities/i18n';

import * as I18n from 'i18n/i18n';

// This is a placeholder for if we ever implement browser-locale detection
export function getCurrentLocale(state) {
    return getCurrentUserLocale(state, getConfig(state).DefaultClientLocale);
}

export function getTranslations(state, locale) {
    const localeInfo = I18n.getLanguageInfo(locale);

    let translations;
    if (localeInfo) {
        translations = state.views.i18n.translations[locale];
    } else {
        // Default to English if an unsupported locale is specified
        translations = state.views.i18n.translations.en;
    }

    return translations;
}
