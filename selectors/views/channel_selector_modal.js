// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {getAllChannels} from 'xenia-redux/selectors/entities/channels.js';

export const getChannelsForChannelSelector = createSelector(
    (state) => state.views.channelSelectorModal.channels,
    getAllChannels,
    (channelIds, channels) => {
        if (channelIds) {
            return channelIds.map((id) => channels[id]);
        }
        return [];
    }
);
