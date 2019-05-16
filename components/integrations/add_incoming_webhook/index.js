// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createIncomingHook} from 'xenia-redux/actions/integrations';
import {getConfig} from 'xenia-redux/selectors/entities/general';

import AddIncomingWebhook from './add_incoming_webhook.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';
    const enablePostIconOverride = config.EnablePostIconOverride === 'true';

    return {
        createIncomingHookRequest: state.requests.integrations.createIncomingHook,
        enablePostUsernameOverride,
        enablePostIconOverride,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createIncomingHook,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIncomingWebhook);
