// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import AdminPanelWithLink from './admin_panel_with_link.jsx';

describe('components/widgets/admin_console/AdminPanelWithLink', () => {
    const defaultProps = {
        className: 'test-class-name',
        id: 'test-id',
        titleId: 'test-title-id',
        titleDefault: 'test-title-default',
        subtitleId: 'test-subtitle-id',
        subtitleDefault: 'test-subtitle-default',
        url: '/path',
        linkTextId: 'test-button-text-id',
        linkTextDefault: 'test-button-text-default',
        disabled: false,
    };

    test('should match snapshot', () => {
        const wrapper = shallow(
            <AdminPanelWithLink {...defaultProps}>
                {'Test'}
            </AdminPanelWithLink>
        );
        expect(wrapper).toMatchInlineSnapshot(`
<AdminPanel
  button={
    <Link
      className="btn btn-primary"
      disabled={false}
      to="/path"
    >
      <FormattedMessage
        defaultMessage="test-button-text-default"
        id="test-button-text-id"
        values={Object {}}
      />
    </Link>
  }
  className="AdminPanelWithLink test-class-name"
  id="test-id"
  subtitleDefault="test-subtitle-default"
  subtitleId="test-subtitle-id"
  titleDefault="test-title-default"
  titleId="test-title-id"
>
  Test
</AdminPanel>
`
        );
    });

    test('should match snapshot when disabled', () => {
        const wrapper = shallow(
            <AdminPanelWithLink
                {...defaultProps}
                disabled={true}
            >
                {'Test'}
            </AdminPanelWithLink>
        );
        expect(wrapper).toMatchInlineSnapshot(`
<AdminPanel
  button={
    <Link
      className="btn btn-primary"
      disabled={true}
      to="/path"
    >
      <FormattedMessage
        defaultMessage="test-button-text-default"
        id="test-button-text-id"
        values={Object {}}
      />
    </Link>
  }
  className="AdminPanelWithLink test-class-name"
  id="test-id"
  subtitleDefault="test-subtitle-default"
  subtitleId="test-subtitle-id"
  titleDefault="test-title-default"
  titleId="test-title-id"
>
  Test
</AdminPanel>
`
        );
    });
});
