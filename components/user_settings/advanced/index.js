// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {get, makeGetCategory} from 'xenia-redux/selectors/entities/preferences';
import {savePreferences} from 'xenia-redux/actions/preferences';
import {updateUserActive} from 'xenia-redux/actions/users';

import {revokeAllSessions} from 'actions/user_actions.jsx';
import {Preferences} from 'utils/constants.jsx';

import AdvancedSettingsDisplay from './user_settings_advanced.jsx';

function makeMapStateToProps() {
    const getAdvancedSettingsCategory = makeGetCategory();

    return (state) => {
        const config = getConfig(state);

        const enablePreviewFeatures = config.EnablePreviewFeatures === 'true';
        const enableUserDeactivation = config.EnableUserDeactivation === 'true';

        return {
            advancedSettingsCategory: getAdvancedSettingsCategory(state, Preferences.CATEGORY_ADVANCED_SETTINGS),
            sendOnCtrlEnter: get(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter', 'false'),
            formatting: get(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'formatting', 'true'),
            joinLeave: get(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'join_leave', 'true'),
            currentUser: getCurrentUser(state),
            enablePreviewFeatures,
            enableUserDeactivation,
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            savePreferences,
            updateUserActive,
            revokeAllSessions,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(AdvancedSettingsDisplay);
