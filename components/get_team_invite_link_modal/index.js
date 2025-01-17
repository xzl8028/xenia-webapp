// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import GetTeamInviteLinkModal from './get_team_invite_link_modal.jsx';

function mapStateToProps(state) {
    return {
        currentTeam: getCurrentTeam(state),
        config: getConfig(state),
    };
}

export default connect(mapStateToProps)(GetTeamInviteLinkModal);
