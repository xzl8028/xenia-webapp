// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getPost} from 'xenia-redux/selectors/entities/posts';

import {canDownloadFiles} from 'utils/file_utils.jsx';

import ViewImage from './view_image.jsx';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);

    return {
        canDownloadFiles: canDownloadFiles(config),
        enablePublicLink: config.EnablePublicLink === 'true',
        pluginFilePreviewComponents: state.plugins.components.FilePreview,
        post: ownProps.post || getPost(state, ownProps.postId),
    };
}

export default connect(mapStateToProps)(ViewImage);
