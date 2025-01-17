// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removePost} from 'xenia-redux/actions/posts';

import {createPost} from 'actions/post_actions.jsx';

import FailedPostOptions from './failed_post_options.jsx';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createPost,
            removePost,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(FailedPostOptions);
