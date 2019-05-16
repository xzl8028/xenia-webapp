// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getPost} from 'xenia-redux/selectors/entities/posts';
import * as PostListUtils from 'xenia-redux/utils/post_list';

import FloatingTimestamp from './floating_timestamp';

function mapStateToProps(state, ownProps) {
    let postId = ownProps.postId;
    if (PostListUtils.isCombinedUserActivityPost(postId)) {
        const combinedIds = PostListUtils.getPostIdsForCombinedUserActivityPost(postId);

        postId = combinedIds[combinedIds.length - 1];
    }

    const post = getPost(state, postId);

    return {
        createAt: post ? post.create_at : 0,
    };
}

export default connect(mapStateToProps)(FloatingTimestamp);
