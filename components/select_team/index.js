// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import {getTeams} from 'xenia-redux/actions/teams';
import {loadRolesIfNeeded} from 'xenia-redux/actions/roles';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {Permissions} from 'xenia-redux/constants';
import {haveISystemPermission} from 'xenia-redux/selectors/entities/roles';
import {getSortedListableTeams, getTeamMemberships} from 'xenia-redux/selectors/entities/teams';
import {getCurrentUser} from 'xenia-redux/selectors/entities/users';

import {addUserToTeam} from 'actions/team_actions';

import SelectTeam from './select_team.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const currentUser = getCurrentUser(state);
    const myTeamMemberships = Object.values(getTeamMemberships(state));

    return {
        currentUserId: currentUser.id,
        currentUserRoles: currentUser.roles || '',
        customDescriptionText: config.CustomDescriptionText,
        isMemberOfTeam: myTeamMemberships && myTeamMemberships.length > 0,
        listableTeams: getSortedListableTeams(state, currentUser.locale),
        siteName: config.SiteName,
        canCreateTeams: haveISystemPermission(state, {permission: Permissions.CREATE_TEAM}),
        canManageSystem: haveISystemPermission(state, {permission: Permissions.MANAGE_SYSTEM}),
        canJoinPublicTeams: haveISystemPermission(state, {permission: Permissions.JOIN_PUBLIC_TEAMS}),
        canJoinPrivateTeams: haveISystemPermission(state, {permission: Permissions.JOIN_PRIVATE_TEAMS}),
        siteURL: config.SiteURL,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getTeams,
            loadRolesIfNeeded,
            addUserToTeam,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectTeam));
