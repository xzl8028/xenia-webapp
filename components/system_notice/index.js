// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {bindActionCreators} from 'redux';
import {makeGetCategory} from 'xenia-redux/selectors/entities/preferences';
import {getConfig, getLicense} from 'xenia-redux/selectors/entities/general';
import {haveISystemPermission} from 'xenia-redux/selectors/entities/roles';
import {savePreferences} from 'xenia-redux/actions/preferences';
import {Permissions} from 'xenia-redux/constants';
import {getStandardAnalytics} from 'xenia-redux/actions/admin';

import {dismissNotice} from 'actions/views/notice';
import {Preferences} from 'utils/constants.jsx';

import Notices from './notices.jsx';
import SystemNotice from './system_notice.jsx';

function makeMapStateToProps() {
    const getCategory = makeGetCategory();

    const getPreferenceNameMap = createSelector(
        getCategory,
        (preferences) => {
            const nameMap = {};
            preferences.forEach((p) => {
                nameMap[p.name] = p;
            });
            return nameMap;
        }
    );

    return function mapStateToProps(state) {
        const license = getLicense(state);
        const config = getConfig(state);
        const serverVersion = state.entities.general.serverVersion;
        const analytics = state.entities.admin.analytics;

        return {
            currentUserId: state.entities.users.currentUserId,
            preferences: getPreferenceNameMap(state, Preferences.CATEGORY_SYSTEM_NOTICE),
            dismissedNotices: state.views.notice.hasBeenDismissed,
            isSystemAdmin: haveISystemPermission(state, {permission: Permissions.MANAGE_SYSTEM}),
            notices: Notices,
            config,
            license,
            serverVersion,
            analytics,
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            savePreferences,
            dismissNotice,
            getStandardAnalytics,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(SystemNotice);
