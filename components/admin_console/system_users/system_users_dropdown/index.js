// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {updateUserActive, revokeAllSessionsForUser} from 'xenia-redux/actions/users';
import {getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {getBotAccounts} from 'xenia-redux/selectors/entities/bots';
import {loadBots} from 'xenia-redux/actions/bots';

import * as Selectors from 'xenia-redux/selectors/entities/admin';

import SystemUsersDropdown from './system_users_dropdown.jsx';

function mapStateToProps(state) {
    const bots = getBotAccounts(state);
    return {
        config: Selectors.getConfig(state),
        currentUser: getCurrentUser(state),
        bots,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updateUserActive,
            revokeAllSessionsForUser,
            loadBots,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemUsersDropdown);
