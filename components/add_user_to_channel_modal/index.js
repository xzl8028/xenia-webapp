// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addChannelMember, getChannelMember} from 'xenia-redux/actions/channels';
import {getChannelMembersInChannels} from 'xenia-redux/selectors/entities/channels';

import AddUserToChannelModal from './add_user_to_channel_modal.jsx';

function mapStateToProps(state) {
    const channelMembers = getChannelMembersInChannels(state) || {};
    return {
        channelMembers,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addChannelMember,
            getChannelMember,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToChannelModal);
