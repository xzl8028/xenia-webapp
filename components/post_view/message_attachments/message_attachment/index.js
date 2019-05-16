// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getConfig} from 'xenia-redux/selectors/entities/general';
import {doPostActionWithCookie} from 'xenia-redux/actions/posts';

import MessageAttachment from './message_attachment';

function mapStateToProps(state) {
    return {
        hasImageProxy: getConfig(state).HasImageProxy === 'true',
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            doPostActionWithCookie,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageAttachment);
