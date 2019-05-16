// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {makeGetPostsAroundPost, makeGetPostsInChannel} from 'xenia-redux/selectors/entities/posts';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';

import PostList from './post_list_ie.jsx';

function makeMapStateToProps() {
    const getPostsInChannel = makeGetPostsInChannel();
    const getPostsAroundPost = makeGetPostsAroundPost();

    return function mapStateToProps(state, ownProps) {
        let posts;
        if (ownProps.focusedPostId) {
            posts = getPostsAroundPost(state, ownProps.focusedPostId, ownProps.channelId);
        } else {
            posts = getPostsInChannel(state, ownProps.channelId, ownProps.postVisibility);
        }

        return {
            posts,
            currentUserId: getCurrentUserId(state),
            lastViewedAt: state.views.channel.lastChannelViewTime[ownProps.channelId],
        };
    };
}

export default connect(makeMapStateToProps)(PostList);
