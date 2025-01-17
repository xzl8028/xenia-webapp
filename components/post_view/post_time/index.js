// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getCurrentRelativeTeamUrl} from 'xenia-redux/selectors/entities/teams';

import PostTime from './post_time.jsx';

function mapStateToProps(state) {
    return {
        teamUrl: getCurrentRelativeTeamUrl(state),
    };
}

export default connect(mapStateToProps)(PostTime);
