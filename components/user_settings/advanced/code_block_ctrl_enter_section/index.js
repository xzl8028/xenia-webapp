// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {savePreferences} from 'xenia-redux/actions/preferences';
import {Preferences} from 'xenia-redux/constants';
import {get as getPreference, getBool} from 'xenia-redux/selectors/entities/preferences';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';

import CodeBlockCtrlEnterSection from './code_block_ctrl_enter_section';

function mapStateToProps(state) {
    return {
        currentUserId: getCurrentUserId(state),
        codeBlockOnCtrlEnter: getPreference(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'code_block_ctrl_enter', 'true'),
        sendMessageOnCtrlEnter: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            savePreferences,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeBlockCtrlEnterSection);
