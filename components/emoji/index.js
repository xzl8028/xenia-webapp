// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';
import {loadRolesIfNeeded} from 'xenia-redux/actions/roles';

import EmojiPage from './emoji_page.jsx';

function mapStateToProps(state) {
    const team = getCurrentTeam(state) || {};

    return {
        teamId: team.id,
        teamName: team.name,
        teamDisplayName: team.display_name,
        siteName: state.entities.general.config.SiteName,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadRolesIfNeeded,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmojiPage);
