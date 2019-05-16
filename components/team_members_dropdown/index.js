// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getChannelStats} from 'xenia-redux/actions/channels';
import {
    getMyTeamMembers,
    getMyTeamUnreads,
    getTeamStats,
    updateTeamMemberSchemeRoles,
} from 'xenia-redux/actions/teams';
import {getUser, updateUserActive} from 'xenia-redux/actions/users';
import {getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {getCurrentChannelId} from 'xenia-redux/selectors/entities/channels';
import {getCurrentRelativeTeamUrl, getCurrentTeam} from 'xenia-redux/selectors/entities/teams';

import {removeUserFromTeamAndGetStats} from 'actions/team_actions.jsx';

import TeamMembersDropdown from './team_members_dropdown.jsx';

function mapStateToProps(state) {
    return {
        currentUser: getCurrentUser(state),
        currentChannelId: getCurrentChannelId(state),
        teamUrl: getCurrentRelativeTeamUrl(state),
        currentTeam: getCurrentTeam(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getMyTeamMembers,
            getMyTeamUnreads,
            getUser,
            getTeamStats,
            getChannelStats,
            updateUserActive,
            updateTeamMemberSchemeRoles,
            removeUserFromTeamAndGetStats,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersDropdown);
