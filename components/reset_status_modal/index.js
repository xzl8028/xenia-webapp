// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {savePreferences} from 'xenia-redux/actions/preferences';
import {setStatus} from 'xenia-redux/actions/users';
import {Preferences} from 'xenia-redux/constants';
import {get} from 'xenia-redux/selectors/entities/preferences';
import {getStatusForUserId} from 'xenia-redux/selectors/entities/users';

import {autoResetStatus} from 'actions/user_actions.jsx';

import ResetStatusModal from './reset_status_modal.jsx';

function mapStateToProps(state) {
    const {currentUserId} = state.entities.users;
    return {
        autoResetPref: get(state, Preferences.CATEGORY_AUTO_RESET_MANUAL_STATUS, currentUserId, ''),
        currentUserStatus: getStatusForUserId(state, currentUserId),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            autoResetStatus,
            setStatus,
            savePreferences,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetStatusModal);
