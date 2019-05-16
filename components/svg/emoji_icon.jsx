// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

export default class EmojiIcon extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <svg
                    width='16px'
                    height='16px'
                    viewBox='0 0 15 15'
                    role='icon'
                    aria-label='Emoji icon'
                >
                    <g
                        stroke='none'
                        strokeWidth='1'
                        fill='inherit'
                        fillRule='evenodd'
                    >
                        <g
                            transform='translate(-1071.000000, -954.000000)'
                            fill='inherit'
                        >
                            <g transform='translate(25.000000, 937.000000)'>
                                <g transform='translate(1046.000000, 17.000000)'>
                                    <path d='M7.5,0.0852272727 C3.405,0.0852272727 0.0852272727,3.405 0.0852272727,7.5 C0.0852272727,11.595 3.405,14.9147727 7.5,14.9147727 C11.595,14.9147727 14.9147727,11.595 14.9147727,7.5 C14.9147727,3.405 11.595,0.0852272727 7.5,0.0852272727 Z M7.5,14.0663436 C3.87926951,14.0663436 0.933656417,11.1207305 0.933656417,7.5 C0.933656417,3.87926951 3.87926951,0.933656417 7.5,0.933656417 C11.1207305,0.933656417 14.0663436,3.87926951 14.0663436,7.5 C14.0663436,11.1207305 11.1207305,14.0663436 7.5,14.0663436 Z'/>
                                    <path d='M11.7732955,8.95397727 C12.0119318,8.90488636 12.2159659,9.11778409 12.1684091,9.35676136 C11.8063636,11.1790909 9.85346591,12.5710227 7.49846591,12.5710227 C5.15096591,12.5710227 3.20284091,11.1877841 2.83193182,9.37397727 C2.78181818,9.129375 2.99267045,8.911875 3.23744318,8.96198864 C4.85369318,9.29232955 10.1786932,9.28142045 11.7732955,8.95397727 Z'/>
                                    <ellipse
                                        cx='4.94318182'
                                        cy='5.50431818'
                                        rx='1'
                                        ry='1.06534091'
                                    />
                                    <ellipse
                                        cx='10.0568182'
                                        cy='5.50431818'
                                        rx='1'
                                        ry='1.06534091'
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </span>
        );
    }
}
