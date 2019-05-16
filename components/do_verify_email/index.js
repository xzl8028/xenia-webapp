// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {verifyUserEmail, getMe} from 'xenia-redux/actions/users';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getCurrentUserId, getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {clearErrors, logError} from 'xenia-redux/actions/errors';

import DoVerifyEmail from './do_verify_email.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const siteName = config.SiteName;
    return {
        isLoggedIn: Boolean(getCurrentUserId(state)),
        siteName,
        user: getCurrentUser(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            verifyUserEmail,
            getMe,
            logError,
            clearErrors,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoVerifyEmail);
