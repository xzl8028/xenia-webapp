// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getSupportedTimezones as getTimezones} from 'xenia-redux/selectors/entities/general';
import moment from 'moment-timezone';

import store from 'stores/redux_store.jsx';

export function getSupportedTimezones() {
    return getTimezones(store.getState());
}

export function getBrowserTimezone() {
    return moment.tz.guess();
}

export function getBrowserUtcOffset() {
    return moment().utcOffset();
}

export function getUtcOffsetForTimeZone(timezone) {
    return moment.tz(timezone).utcOffset();
}