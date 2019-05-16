// Copyright (c) 2015-present xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

export default class MessageIcon extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <FormattedMessage
                    id='generic_icons.message'
                    defaultMessage='Message Icon'
                >
                    {(ariaLabel) => (
                        <svg
                            width='18px'
                            height='16px'
                            viewBox='0 0 18 16'
                            role='icon'
                            aria-label={ariaLabel}
                        >
                            <g
                                stroke='none'
                                strokeWidth='1'
                                fill='inherit'
                                fillRule='evenodd'
                            >
                                <g
                                    transform='translate(-200.000000, -174.000000)'
                                    fill='inherit'
                                >
                                    <g transform='translate(200.000000, 174.000000)'>
                                        <path d='M7.2546625,1.42801356 C10.458475,1.42801356 12.999475,3.24528136 12.999475,5.52023729 C12.9895,8.04188475 10.6062625,9.89326102 7.40245,9.89326102 C7.40245,9.89326102 6.9134125,9.91229831 6.4115125,9.83747119 L5.82535,9.79622373 L5.15335,10.3586169 C4.997425,10.5397356 4.3199125,11.1095322 3.736375,11.4794373 C4.0915375,10.4598847 4.07605,10.1370441 4.07605,10.1370441 L4.1251375,9.49004068 L3.55315,9.19549153 C2.0986375,8.44616271 1.4444875,6.88616271 1.4444875,5.52023729 C1.4444875,3.24528136 4.05085,1.42801356 7.2546625,1.42801356 M7.2546625,0.370386441 C3.465475,0.370386441 0.3944875,2.65829831 0.3944875,5.52023729 C0.3944875,7.3028678 1.2623125,9.20342373 3.0751375,10.1370441 C3.0751375,10.1478847 3.07225,10.1560814 3.07225,10.1679797 C3.07225,10.9426915 2.43175,12.0048136 2.1794875,12.4429356 L2.1805375,12.4429356 C2.1605875,12.4902644 2.148775,12.5420881 2.148775,12.5973492 C2.148775,12.8141627 2.322025,12.9881424 2.5375375,12.9881424 C2.5693,12.9881424 2.6210125,12.9815322 2.6393875,12.9815322 C2.6446375,12.9815322 2.6467375,12.9815322 2.6462125,12.9831186 C3.986275,12.762339 5.9642125,11.2435864 6.2576875,10.8837288 C6.5585125,10.928678 6.761425,10.9358169 7.0136875,10.9358169 C7.120525,10.9358169 7.2347125,10.9342305 7.3696375,10.9342305 C11.1583,10.9342305 14.094625,8.75446102 14.049475,5.52023729 C14.049475,2.65829831 11.0435875,0.370386441 7.2546625,0.370386441'/>
                                        <path d='M17.2055125,9.79172881 C17.2055125,8.35811525 16.6498,7.26532203 15.2624875,6.4451322 C15.228625,6.82614237 15.120475,7.23517966 15.0031375,7.59477288 C15.8998375,8.21903729 16.1555125,8.85995932 16.1555125,9.79172881 C16.1555125,10.9323797 15.62815,11.7597085 14.40175,12.3919051 L13.879375,12.653139 C13.879375,12.653139 13.9337125,14.0082237 14.0140375,14.3511593 C12.9895,13.5946915 12.6374875,12.9630237 12.6374875,12.9630237 L12.08545,13.0486915 C11.86705,13.0809492 11.276425,13.0812136 11.276425,13.0812136 C9.85,13.0812136 8.7929125,12.7388068 7.8909625,12.0278169 C8.135875,12.0124814 6.42805,12.0132746 6.3899875,12.0468542 C7.4326375,13.3297559 9.1373125,14.1388407 11.276425,14.1388407 C11.3927125,14.1388407 11.49115,14.1398983 11.58355,14.1398983 C11.801425,14.1398983 11.9773,14.1338169 12.237175,14.095478 C12.491275,14.4058915 13.914025,15.7728746 15.0724375,15.9629831 C15.0719125,15.9619254 15.073225,15.9619254 15.078475,15.9619254 C15.0939625,15.9619254 15.13885,15.967478 15.16615,15.967478 C15.3522625,15.967478 15.5024125,15.8167661 15.5024125,15.6293017 C15.5024125,15.5817085 15.49165,15.5367593 15.47485,15.4960407 L15.4759,15.4960407 C15.258025,15.117939 14.9159875,14.0129831 14.9159875,13.3435051 C14.9159875,13.3331932 14.9128375,13.3260542 14.9128375,13.3168 C16.4797,12.5095661 17.2055125,11.3321627 17.2055125,9.79172881'/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    )}
                </FormattedMessage>
            </span>
        );
    }
}
