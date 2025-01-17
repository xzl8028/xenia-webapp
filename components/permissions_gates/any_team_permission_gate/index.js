// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {haveITeamPermission} from 'xenia-redux/selectors/entities/roles';
import {getMyTeams} from 'xenia-redux/selectors/entities/teams';

import AnyTeamPermissionGate from './any_team_permission_gate.jsx';

function mapStateToProps(state, ownProps) {
    const teams = getMyTeams(state);
    for (const team of teams) {
        for (const permission of ownProps.permissions) {
            if (haveITeamPermission(state, {team: team.id, permission})) {
                return {hasPermission: true};
            }
        }
    }

    return {hasPermission: false};
}

export default connect(mapStateToProps)(AnyTeamPermissionGate);
