// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removePost} from 'xenia-redux/actions/posts';
import {isCurrentChannelReadOnly} from 'xenia-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';
import {get} from 'xenia-redux/selectors/entities/preferences';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import {Preferences} from 'utils/constants.jsx';
import {getSelectedPostCard} from 'selectors/rhs.jsx';

import PostInfo from './post_info.jsx';

function mapStateToProps(state, ownProps) {
    const selectedCard = getSelectedPostCard(state);
    const config = getConfig(state);
    const channel = state.entities.channels.channels[ownProps.post.channel_id];
    const channelIsArchived = channel ? channel.delete_at !== 0 : null;
    const enableEmojiPicker = config.EnableEmojiPicker === 'true' && !channelIsArchived;
    const teamId = getCurrentTeamId(state);

    return {
        teamId,
        isFlagged: get(state, Preferences.CATEGORY_FLAGGED_POST, ownProps.post.id, null) != null,
        isMobile: state.views.channel.mobileView,
        isCardOpen: selectedCard && selectedCard.id === ownProps.post.id,
        enableEmojiPicker,
        isReadOnly: isCurrentChannelReadOnly(state) || channelIsArchived,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            removePost,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
