// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateChannelNotifyProps} from 'xenia-redux/actions/channels';

import MenuItemToggleMuteChannel from './toggle_mute_channel';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        updateChannelNotifyProps,
    }, dispatch),
});

export default connect(null, mapDispatchToProps)(MenuItemToggleMuteChannel);
