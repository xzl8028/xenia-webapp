// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {Posts} from 'xenia-redux/constants';
import {isChannelReadOnlyById} from 'xenia-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getPost} from 'xenia-redux/selectors/entities/posts';
import {get} from 'xenia-redux/selectors/entities/preferences';
import {isSystemMessage} from 'xenia-redux/utils/post_utils';

import {Preferences} from 'utils/constants.jsx';
import {isEmbedVisible} from 'selectors/posts';

import RhsComment from './rhs_comment.jsx';

function isConsecutivePost(state, ownProps) {
    const post = ownProps.post;
    const previousPost = ownProps.previousPostId && getPost(state, ownProps.previousPostId);

    let consecutivePost = false;

    if (previousPost) {
        const postFromWebhook = Boolean(post.props && post.props.from_webhook);
        const prevPostFromWebhook = Boolean(previousPost.props && previousPost.props.from_webhook);
        if (previousPost && previousPost.user_id === post.user_id &&
            post.create_at - previousPost.create_at <= Posts.POST_COLLAPSE_TIMEOUT &&
            !postFromWebhook && !prevPostFromWebhook &&
            !isSystemMessage(post) && !isSystemMessage(previousPost) &&
            (previousPost.root_id === post.root_id || previousPost.id === post.root_id)) {
            // The last post and this post were made by the same user within some time
            consecutivePost = true;
        }
    }
    return consecutivePost;
}

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);
    const enableEmojiPicker = config.EnableEmojiPicker === 'true';
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';
    const teamId = ownProps.teamId || getCurrentTeamId(state);
    const channel = state.entities.channels.channels[ownProps.post.channel_id];

    return {
        enableEmojiPicker,
        enablePostUsernameOverride,
        isEmbedVisible: isEmbedVisible(state, ownProps.post.id),
        isReadOnly: isChannelReadOnlyById(state, ownProps.post.channel_id),
        teamId,
        pluginPostTypes: state.plugins.postTypes,
        channelIsArchived: channel.delete_at !== 0,
        isConsecutivePost: isConsecutivePost(state, ownProps),
        isFlagged: get(state, Preferences.CATEGORY_FLAGGED_POST, ownProps.post.id, null) != null,
        compactDisplay: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.MESSAGE_DISPLAY, Preferences.MESSAGE_DISPLAY_DEFAULT) === Preferences.MESSAGE_DISPLAY_COMPACT,
    };
}

export default connect(mapStateToProps)(RhsComment);
