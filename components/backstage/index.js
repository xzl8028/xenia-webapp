// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {getMyTeams, getCurrentTeam} from 'xenia-redux/selectors/entities/teams';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {haveITeamPermission, haveISystemPermission} from 'xenia-redux/selectors/entities/roles';
import {Permissions} from 'xenia-redux/constants';

import BackstageController from './backstage_controller.jsx';

function mapStateToProps(state) {
    const user = getCurrentUser(state);
    const team = getCurrentTeam(state);

    const config = getConfig(state);

    const siteName = config.SiteName;
    const enableCustomEmoji = config.EnableCustomEmoji === 'true';
    const enableIncomingWebhooks = config.EnableIncomingWebhooks === 'true';
    const enableOutgoingWebhooks = config.EnableOutgoingWebhooks === 'true';
    const enableCommands = config.EnableCommands === 'true';
    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true';

    let canCreateOrDeleteCustomEmoji = (haveISystemPermission(state, {permission: Permissions.CREATE_EMOJIS}) || haveISystemPermission(state, {permission: Permissions.DELETE_EMOJIS}));
    if (!canCreateOrDeleteCustomEmoji) {
        for (const t of getMyTeams(state)) {
            if (haveITeamPermission(state, {team: t.id, permission: Permissions.CREATE_EMOJIS}) || haveITeamPermission(state, {team: t.id, permission: Permissions.DELETE_EMOJIS})) {
                canCreateOrDeleteCustomEmoji = true;
                break;
            }
        }
    }

    return {
        user,
        team,
        siteName,
        enableCustomEmoji,
        enableIncomingWebhooks,
        enableOutgoingWebhooks,
        enableCommands,
        enableOAuthServiceProvider,
        canCreateOrDeleteCustomEmoji,
    };
}

export default withRouter(connect(mapStateToProps)(BackstageController));
