// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getCurrentRelativeTeamUrl} from 'xenia-redux/selectors/entities/teams';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import {getSelectedPostCard} from 'selectors/rhs.jsx';

import RhsCard from './rhs_card.jsx';

function mapStateToProps(state) {
    const selected = getSelectedPostCard(state);
    const config = getConfig(state);
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';

    return {
        enablePostUsernameOverride,
        selected,
        pluginPostCardTypes: state.plugins.postCardTypes,
        teamUrl: getCurrentRelativeTeamUrl(state),
    };
}

export default connect(mapStateToProps)(RhsCard);
