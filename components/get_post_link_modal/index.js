// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';

import {getSiteURL} from 'utils/url.jsx';

import GetPostLinkModal from './get_post_link_modal';

function mapStateToProps(state) {
    const currentTeam = getCurrentTeam(state) || {};
    const currentTeamUrl = `${getSiteURL()}/${currentTeam.name}`;
    return {
        currentTeamUrl,
    };
}

export default connect(mapStateToProps)(GetPostLinkModal);
