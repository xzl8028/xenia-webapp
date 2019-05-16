// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {FormattedMessage} from 'react-intl';

export default class AddIcon extends React.PureComponent {
    render() {
        return (
            <FormattedMessage
                id='generic_icons.add'
                defaultMessage='Add Icon'
            >
                {(title) => (
                    <i
                        className='fa fa-plus'
                        title={title}
                    />
                )}
            </FormattedMessage>
        );
    }
}