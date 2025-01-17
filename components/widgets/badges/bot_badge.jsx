// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Badge from './badge.jsx';

export default function BotBadge(props) {
    return (
        <Badge
            className={'BotBadge ' + props.className}
            show={props.show}
        >
            <FormattedMessage
                id='post_info.bot'
                defaultMessage='BOT'
            />
        </Badge>
    );
}

BotBadge.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
};

BotBadge.defaultProps = {
    show: true,
    className: '',
};
