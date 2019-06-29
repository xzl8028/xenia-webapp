// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';
import {getUserTimezone} from 'xenia-redux/selectors/entities/timezone';
import {getUserCurrentTimezone} from 'xenia-redux/utils/timezone_utils';

import {areTimezonesEnabledAndSupported} from 'selectors/general';

import DateSeparator from './date_separator';

function mapStateToProps(state, props) {
    const currentUserId = getCurrentUserId(state);

    let userTimezone;
    if (props.userTimezone) {
        userTimezone = props.userTimezone;
    } else {
        userTimezone = getUserTimezone(state, currentUserId);
    }

    return {
        enableTimezone: areTimezonesEnabledAndSupported(state),
        timeZone: getUserCurrentTimezone(userTimezone),
    };
}

export default connect(mapStateToProps)(DateSeparator);
