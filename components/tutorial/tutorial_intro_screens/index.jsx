// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';
import {getCurrentTeam} from 'xenia-redux/selectors/entities/teams';
import {getInt} from 'xenia-redux/selectors/entities/preferences';
import {savePreferences} from 'xenia-redux/actions/preferences';

import {Preferences} from 'utils/constants.jsx';

import TutorialIntroScreens from './tutorial_intro_screens.jsx';

function mapStateToProps(state) {
    const currentUserId = getCurrentUserId(state);
    const team = getCurrentTeam(state) || {};
    return {
        currentUserId,
        teamType: team.type,
        step: getInt(state, Preferences.TUTORIAL_STEP, currentUserId, 0),
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({
        savePreferences,
    }, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorialIntroScreens);
