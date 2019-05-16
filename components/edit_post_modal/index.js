// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessageIntoHistory} from 'xenia-redux/actions/posts';
import {Preferences, Permissions} from 'xenia-redux/constants';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {haveIChannelPermission} from 'xenia-redux/selectors/entities/roles';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';
import {getCurrentChannelId} from 'xenia-redux/selectors/entities/channels';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';
import {getBool} from 'xenia-redux/selectors/entities/preferences';

import {openModal} from 'actions/views/modals';
import {hideEditPostModal} from 'actions/post_actions';
import {editPost} from 'actions/views/posts';
import {getEditingPost} from 'selectors/posts';
import Constants from 'utils/constants';

import EditPostModal from './edit_post_modal.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const editingPost = getEditingPost(state);
    const currentUserId = getCurrentUserId(state);
    let canDeletePost = false;
    let canEditPost = false;
    if (editingPost && editingPost.post && editingPost.post.user_id === currentUserId) {
        canDeletePost = haveIChannelPermission(state, {channel: getCurrentChannelId(state), team: getCurrentTeamId(state), permission: Permissions.DELETE_POST});
        canEditPost = haveIChannelPermission(state, {channel: getCurrentChannelId(state), team: getCurrentTeamId(state), permission: Permissions.EDIT_POST});
    } else {
        canDeletePost = haveIChannelPermission(state, {channel: getCurrentChannelId(state), team: getCurrentTeamId(state), permission: Permissions.DELETE_OTHERS_POSTS});
        canEditPost = haveIChannelPermission(state, {channel: getCurrentChannelId(state), team: getCurrentTeamId(state), permission: Permissions.EDIT_OTHERS_POSTS});
    }

    return {
        canEditPost,
        canDeletePost,
        ctrlSend: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
        config,
        editingPost,
        maxPostSize: parseInt(config.MaxPostSize, 10) || Constants.DEFAULT_CHARACTER_LIMIT,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addMessageIntoHistory,
            editPost,
            hideEditPostModal,
            openModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostModal);
