// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBotAccounts} from 'xenia-redux/selectors/entities/bots';
import {loadBots, disableBot, enableBot} from 'xenia-redux/actions/bots';
import {createUserAccessToken, revokeUserAccessToken, enableUserAccessToken, disableUserAccessToken, getUserAccessTokensForUser, getUser} from 'xenia-redux/actions/users';
import * as UserSelectors from 'xenia-redux/selectors/entities/users';

import Bots from './bots.jsx';

function mapStateToProps(state) {
    const bots = getBotAccounts(state);
    const owners = Object.values(bots).
        reduce((result, bot) => {
            result[bot.user_id] = UserSelectors.getUser(state, bot.owner_id);
            return result;
        }, {});
    return {
        bots,
        accessTokens: state.entities.admin.userAccessTokensByUser,
        owners,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadBots,
            getUserAccessTokensForUser,
            createUserAccessToken,
            revokeUserAccessToken,
            enableUserAccessToken,
            disableUserAccessToken,
            getUser,
            disableBot,
            enableBot,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bots);