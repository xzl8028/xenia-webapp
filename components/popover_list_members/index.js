// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfilesInChannel} from 'xenia-redux/actions/users';
import {getAllChannelStats} from 'xenia-redux/selectors/entities/channels';
import {getCurrentRelativeTeamUrl} from 'xenia-redux/selectors/entities/teams';
import {getCurrentUserId, getUserStatuses, makeGetProfilesInChannel} from 'xenia-redux/selectors/entities/users';

import {openDirectChannelToUserId} from 'actions/channel_actions.jsx';
import {openModal} from 'actions/views/modals';

import PopoverListMembers from './popover_list_members.jsx';

function makeMapStateToProps() {
    const doGetProfilesInChannel = makeGetProfilesInChannel();

    return function mapStateToProps(state, ownProps) {
        const stats = getAllChannelStats(state)[ownProps.channel.id] || {};
        const users = doGetProfilesInChannel(state, ownProps.channel.id, true);

        return {
            currentUserId: getCurrentUserId(state),
            memberCount: stats.member_count,
            users,
            statuses: getUserStatuses(state),
            teamUrl: getCurrentRelativeTeamUrl(state),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            openModal,
            getProfilesInChannel,
            openDirectChannelToUserId,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(PopoverListMembers);
