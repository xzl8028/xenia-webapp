// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {
    getPostIdsInChannel,
    makeGetPostIdsAroundPost,
} from 'xenia-redux/selectors/entities/posts';
import {makePreparePostIdsForPostList} from 'xenia-redux/utils/post_list';

import PostList from './post_list_virtualized.jsx';

function makeMapStateToProps() {
    const getPostIdsAroundPost = makeGetPostIdsAroundPost();
    const preparePostIdsForPostList = makePreparePostIdsForPostList();

    return function mapStateToProps(state, ownProps) {
        let postIds;
        const lastViewedAt = state.views.channel.lastChannelViewTime[ownProps.channelId];
        if (ownProps.focusedPostId) {
            postIds = getPostIdsAroundPost(state, ownProps.focusedPostId, ownProps.channelId);
        } else {
            postIds = getPostIdsInChannel(state, ownProps.channelId);
        }

        if (postIds) {
            postIds = preparePostIdsForPostList(state, {postIds, lastViewedAt, indicateNewMessages: true});
        }

        return {
            postListIds: postIds,
        };
    };
}

export default connect(makeMapStateToProps)(PostList);
