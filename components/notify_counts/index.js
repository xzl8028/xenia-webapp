// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getUnreadsInCurrentTeam} from 'xenia-redux/selectors/entities/channels';

import NotifyCounts from './notify_counts.jsx';

function mapStateToProps(state) {
    const {mentionCount, messageCount} = getUnreadsInCurrentTeam(state);
    return {
        mentionCount,
        messageCount,
    };
}

export default connect(mapStateToProps)(NotifyCounts);
