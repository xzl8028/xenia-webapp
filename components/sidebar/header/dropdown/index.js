// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';
import {getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {getInt} from 'xenia-redux/selectors/entities/preferences';

import {openModal} from 'actions/views/modals';

import {Preferences, TutorialSteps} from 'utils/constants.jsx';
import * as Utils from 'utils/utils.jsx';

import SidebarHeaderDropdown from './sidebar_header_dropdown.jsx';

function mapStateToProps(state) {
    const currentTeam = getCurrentTeam(state);
    const currentUser = getCurrentUser(state);
    const showTutorialTip = getInt(state, Preferences.TUTORIAL_STEP, currentUser.id) === TutorialSteps.MENU_POPOVER && !Utils.isMobile();
    return {
        currentUser,
        teamDescription: currentTeam.description,
        teamDisplayName: currentTeam.display_name,
        teamId: currentTeam.id,
        showTutorialTip,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            openModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeaderDropdown);
