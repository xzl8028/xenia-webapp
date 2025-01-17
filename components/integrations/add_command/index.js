// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCommand} from 'xenia-redux/actions/integrations';

import AddCommand from './add_command.jsx';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addCommand,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(AddCommand);
