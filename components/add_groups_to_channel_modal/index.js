// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGroupsNotAssociatedToChannel, linkGroupSyncable, getAllGroupsAssociatedToChannel} from 'xenia-redux/actions/groups';
import {getGroupsNotAssociatedToChannel as selectGroupsNotAssociatedToChannel} from 'xenia-redux/selectors/entities/groups';
import {getCurrentChannel} from 'xenia-redux/selectors/entities/channels';

import {setModalSearchTerm} from 'actions/views/search';

import AddGroupsToChannelModal from './add_groups_to_channel_modal';

function mapStateToProps(state) {
    const searchTerm = state.views.search.modalSearch;

    const channel = getCurrentChannel(state) || {};

    let groups = selectGroupsNotAssociatedToChannel(state, channel.id);
    if (searchTerm) {
        var regex = RegExp(searchTerm, 'i');
        groups = groups.filter((group) => regex.test(group.display_name) || regex.test(group.name));
    }

    return {
        currentChannelName: channel.display_name,
        currentChannelId: channel.id,
        searchTerm,
        groups,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getGroupsNotAssociatedToChannel,
            setModalSearchTerm,
            linkGroupSyncable,
            getAllGroupsAssociatedToChannel,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupsToChannelModal);
