// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createChannel} from 'xenia-redux/actions/channels';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';

import {switchToChannel} from 'actions/views/channel';

import NewChannelFlow from './new_channel_flow.jsx';

function mapStateToProps(state) {
    return {
        currentTeamId: getCurrentTeamId(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createChannel,
            switchToChannel,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChannelFlow);
