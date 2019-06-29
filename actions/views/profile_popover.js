// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getTeamMember} from 'xenia-redux/actions/teams';
import {getChannelMember} from 'xenia-redux/actions/channels';
import {getCurrentChannel} from 'xenia-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';

import {getSelectedPost} from 'selectors/rhs';

export function getMembershipForCurrentEntities(userId) {
    return async (dispatch, getState) => {
        const state = getState();
        const currentTeamId = getCurrentTeamId(state);

        const selectedPost = getSelectedPost(state);
        const currentChannel = getCurrentChannel(state);

        let channelId;
        if (selectedPost.exists === false) {
            channelId = currentChannel.id;
        } else {
            channelId = selectedPost.channel_id;
        }

        return Promise.all([dispatch(getTeamMember(currentTeamId, userId)), dispatch(getChannelMember(channelId, userId))]);
    };
}
