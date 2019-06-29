// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {sendEmailInvitesToTeam} from 'xenia-redux/actions/teams';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getChannelsNameMapInCurrentTeam} from 'xenia-redux/selectors/entities/channels';
import {getCurrentUser} from 'xenia-redux/selectors/entities/users';
import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';

import Constants from 'utils/constants';

import InviteMemberModal from './invite_member_modal.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);

    const sendEmailNotifications = config.SendEmailNotifications === 'true';
    const enableUserCreation = config.EnableUserCreation === 'true';

    const defaultChannel = getChannelsNameMapInCurrentTeam(state)[Constants.DEFAULT_CHANNEL];
    const team = getCurrentTeam(state);

    return {
        sendEmailNotifications,
        enableUserCreation,
        currentUser: getCurrentUser(state),
        defaultChannelName: defaultChannel ? defaultChannel.display_name : '',
        teamType: team ? team.type : '',
        teamId: team ? team.id : '',
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            sendEmailInvitesToTeam,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMemberModal);
