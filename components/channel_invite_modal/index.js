// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getTeamStats} from 'xenia-redux/actions/teams';
import {getProfilesNotInChannel, searchProfiles} from 'xenia-redux/actions/users';
import {getProfilesNotInCurrentChannel} from 'xenia-redux/selectors/entities/users';

import {addUsersToChannel} from 'actions/channel_actions';

import ChannelInviteModal from './channel_invite_modal.jsx';

function mapStateToProps(state) {
    return {
        profilesNotInCurrentChannel: getProfilesNotInCurrentChannel(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addUsersToChannel,
            getProfilesNotInChannel,
            getTeamStats,
            searchProfiles,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelInviteModal);
