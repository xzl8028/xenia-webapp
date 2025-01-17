// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {canManageChannelMembers} from 'xenia-redux/selectors/entities/channels';

import {openModal} from 'actions/views/modals';

import ChannelMembersModal from './channel_members_modal';

const mapStateToProps = (state) => ({
    canManageChannelMembers: canManageChannelMembers(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({openModal}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMembersModal);
