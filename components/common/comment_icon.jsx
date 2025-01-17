// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import {Locations} from 'utils/constants.jsx';

import ReplyIcon from 'components/svg/reply_icon';

export default class CommentIcon extends React.PureComponent {
    static propTypes = {
        location: PropTypes.oneOf([Locations.CENTER, Locations.SEARCH]).isRequired,
        handleCommentClick: PropTypes.func.isRequired,
        searchStyle: PropTypes.string,
        commentCount: PropTypes.number,
        postId: PropTypes.string,
        extraClass: PropTypes.string,
    };

    static defaultProps = {
        searchStyle: '',
        commentCount: 0,
        extraClass: '',
        location: Locations.CENTER,
    };

    render() {
        let commentCountSpan = '';
        let iconStyle = 'comment-icon__container';
        if (this.props.commentCount > 0) {
            iconStyle += ' icon--show';
            commentCountSpan = (
                <span className='comment-count'>
                    {this.props.commentCount}
                </span>
            );
        } else if (this.props.searchStyle !== '') {
            iconStyle = iconStyle + ' ' + this.props.searchStyle;
        }

        const tooltip = (
            <Tooltip
                id='comment-icon-tooltip'
                className='hidden-xs'
            >
                <FormattedMessage
                    id='post_info.comment_icon.tooltip.reply'
                    defaultMessage='Reply'
                />
            </Tooltip>
        );

        return (
            <OverlayTrigger
                className='hidden-xs'
                delayShow={500}
                placement='top'
                overlay={tooltip}
            >
                <button
                    id={`${this.props.location}_commentIcon_${this.props.postId}`}
                    className={iconStyle + ' color--link style--none ' + this.props.extraClass}
                    onClick={this.props.handleCommentClick}
                >
                    <ReplyIcon className='comment-icon'/>
                    {commentCountSpan}
                </button>
            </OverlayTrigger>
        );
    }
}
