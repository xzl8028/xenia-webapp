// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {haveISystemPermission} from 'xenia-redux/selectors/entities/roles';
import {Permissions} from 'xenia-redux/constants';
import {getConfig, getLicense} from 'xenia-redux/selectors/entities/general';
import {getDisplayableErrors} from 'xenia-redux/selectors/errors';
import {dismissError} from 'xenia-redux/actions/errors';
import {getStandardAnalytics} from 'xenia-redux/actions/admin';

import {dismissNotice} from 'actions/views/notice';

import AnnouncementBarController from './announcement_bar_controller.jsx';

function mapStateToProps(state) {
    const canViewSystemErrors = haveISystemPermission(state, {permission: Permissions.MANAGE_SYSTEM});
    const license = getLicense(state);
    const config = getConfig(state);
    const user = getCurrentUser(state);
    const errors = getDisplayableErrors(state);
    const totalUsers = state.entities.admin.analytics.TOTAL_USERS;
    let latestError = null;
    if (errors && errors.length >= 1) {
        latestError = errors[0];
    }

    return {
        license,
        config,
        user,
        canViewSystemErrors,
        latestError,
        totalUsers,
    };
}

function mapDispatchToProps(dispatch) {
    const dismissFirstError = dismissError.bind(null, 0);
    return {
        actions: bindActionCreators({
            getStandardAnalytics,
            dismissError: dismissFirstError,
            dismissNotice,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementBarController);
