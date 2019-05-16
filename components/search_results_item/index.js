// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getChannel} from 'xenia-redux/selectors/entities/channels';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getUser} from 'xenia-redux/selectors/entities/users';
import {makeGetCommentCountForPost} from 'xenia-redux/selectors/entities/posts';
import {getMyPreferences} from 'xenia-redux/selectors/entities/preferences';
import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';
import {isPostFlagged} from 'xenia-redux/utils/post_utils';

import {
    closeRightHandSide,
    selectPostFromRightHandSideSearch,
    setRhsExpanded,
} from 'actions/views/rhs';

import SearchResultsItem from './search_results_item.jsx';

function mapStateToProps() {
    const getCommentCountForPost = makeGetCommentCountForPost();

    return (state, ownProps) => {
        const config = getConfig(state);
        const preferences = getMyPreferences(state);
        const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';
        const {post} = ownProps;
        const user = getUser(state, post.user_id);

        return {
            channel: getChannel(state, post.channel_id),
            currentTeamName: getCurrentTeam(state).name,
            commentCountForPost: getCommentCountForPost(state, {post}),
            enablePostUsernameOverride,
            isFlagged: isPostFlagged(post.id, preferences),
            isBot: user ? user.is_bot : false,
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            closeRightHandSide,
            selectPost: selectPostFromRightHandSideSearch,
            setRhsExpanded,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsItem);
