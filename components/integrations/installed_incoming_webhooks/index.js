// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'xenia-redux/actions/integrations';
import {getAllChannels} from 'xenia-redux/selectors/entities/channels';
import {getIncomingHooks} from 'xenia-redux/selectors/entities/integrations';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';
import {getUsers} from 'xenia-redux/selectors/entities/users';
import {haveITeamPermission} from 'xenia-redux/selectors/entities/roles';
import {Permissions} from 'xenia-redux/constants';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import {loadIncomingHooksAndProfilesForTeam} from 'actions/integration_actions';

import InstalledIncomingWebhooks from './installed_incoming_webhooks.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const teamId = getCurrentTeamId(state);
    const canManageOthersWebhooks = haveITeamPermission(state, {team: teamId, permission: Permissions.MANAGE_OTHERS_INCOMING_WEBHOOKS});
    const incomingHooks = getIncomingHooks(state);
    const incomingWebhooks = Object.keys(incomingHooks).
        map((key) => incomingHooks[key]).
        filter((incomingWebhook) => incomingWebhook.team_id === teamId);
    const enableIncomingWebhooks = config.EnableIncomingWebhooks === 'true';

    return {
        incomingWebhooks,
        channels: getAllChannels(state),
        users: getUsers(state),
        teamId,
        canManageOthersWebhooks,
        enableIncomingWebhooks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadIncomingHooksAndProfilesForTeam,
            removeIncomingHook: Actions.removeIncomingHook,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledIncomingWebhooks);
