// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {shallowWithIntl} from 'tests/helpers/intl-test-helper.jsx';

import UsersEmailsInput from './users_emails_input.jsx';

describe('components/widgets/inputs/UsersEmailsInput', () => {
    test('should match snapshot', () => {
        const wrapper = shallowWithIntl(
            <UsersEmailsInput
                placeholder='test'
                usersLoader={jest.fn()}
                onChange={jest.fn()}
                value={['test@email.com', {id: 'test-user-id', username: 'test-username', first_name: 'test', last_name: 'user'}]}
            />
        );
        expect(wrapper).toMatchInlineSnapshot(`
<Async
  cacheOptions={false}
  className="UsersEmailsInput"
  classNamePrefix="users-emails-input"
  components={
    Object {
      "IndicatorsContainer": [Function],
      "NoOptionsMessage": [Function],
    }
  }
  defaultOptions={true}
  filterOption={null}
  formatOptionLabel={[Function]}
  getOptionValue={[Function]}
  isClearable={false}
  isMulti={true}
  isValidNewOption={[Function]}
  loadOptions={[MockFunction]}
  loadingMessage={[Function]}
  onChange={[Function]}
  placeholder="test"
  value={
    Array [
      Object {
        "label": "test@email.com",
        "value": "test@email.com",
      },
      Object {
        "first_name": "test",
        "id": "test-user-id",
        "last_name": "user",
        "username": "test-username",
      },
    ]
  }
/>
`);
    });
});
