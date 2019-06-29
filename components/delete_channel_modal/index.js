// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteChannel} from 'xenia-redux/actions/channels';
import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import DeleteChannelModal from './delete_channel_modal.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);

    return {
        canViewArchivedChannels: config.ExperimentalViewArchivedChannels === 'true',
        currentTeamDetails: getCurrentTeam(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            deleteChannel,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteChannelModal);
