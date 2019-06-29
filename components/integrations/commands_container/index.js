// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCommands} from 'xenia-redux/selectors/entities/integrations';
import {getUsers} from 'xenia-redux/selectors/entities/users';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import {loadCommandsAndProfilesForTeam} from 'actions/integration_actions';

import CommandsContainer from './commands_container.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const enableCommands = config.EnableCommands === 'true';

    return {
        commands: Object.values(getCommands(state)),
        users: getUsers(state),
        enableCommands,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadCommandsAndProfilesForTeam,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandsContainer);
