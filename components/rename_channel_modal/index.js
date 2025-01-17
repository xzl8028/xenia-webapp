// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {patchChannel} from 'xenia-redux/actions/channels';
import {getTeam} from 'xenia-redux/selectors/entities/teams';

import {getSiteURL} from 'utils/url.jsx';

import RenameChannelModal from './rename_channel_modal.jsx';

const mapStateToProps = createSelector(
    (state) => {
        const currentTeamId = state.entities.teams.currentTeamId;
        const team = getTeam(state, currentTeamId);
        const currentTeamUrl = `${getSiteURL()}/${team.name}`;
        return {
            currentTeamUrl,
            team,
        };
    },
    (teamInfo) => ({...teamInfo})
);

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            patchChannel: bindActionCreators(patchChannel, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RenameChannelModal);
