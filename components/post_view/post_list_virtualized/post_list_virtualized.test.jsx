// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import {DATE_LINE} from 'mattermost-redux/utils/post_list';

import LoadingScreen from 'components/loading_screen';
import {PostListRowListIds} from 'utils/constants';

import NewMessagesBelow from 'components/post_view/new_messages_below';
import PostListRow from 'components/post_view/post_list_row';

import PostList from './post_list_virtualized';

describe('PostList', () => {
    const baseProps = {
        channel: {id: 'channel'},
        focusedPostId: '',
        postListIds: [
            'post1',
            'post2',
            'post3',
            DATE_LINE + 1551711600000,
        ],
        latestPostTimeStamp: 12345,
        postVisibility: 10,
        actions: {
            checkAndSetMobileView: jest.fn(),
            increasePostVisibility: jest.fn(),
            loadInitialPosts: jest.fn(() => ({posts: {posts: {}, order: []}, hasMoreBefore: false})),
            syncPostsInChannel: jest.fn(),
        },
    };

    const postListIdsForClassNames = [
        'post1',
        'post2',
        'post3',
        DATE_LINE + 1551711600000,
        'post4',
        PostListRowListIds.START_OF_NEW_MESSAGES,
        'post5',
    ];

    test('should render loading screen while loading posts', () => {
        const props = {
            ...baseProps,
            postListIds: null,
        };

        const wrapper = shallow(<PostList {...props}/>);

        expect(wrapper.state('loadingFirstSetOfPosts')).toBe(true);
        expect(wrapper.find(LoadingScreen).exists()).toBe(true);

        wrapper.setState({loadingFirstSetOfPosts: false});

        expect(wrapper.find(LoadingScreen).exists()).toBe(false);
    });

    describe('renderRow', () => {
        const postListIds = ['a', 'b', 'c', 'd'];

        test('should get previous item ID correctly for oldest row', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            const row = shallow(wrapper.instance().renderRow({
                data: postListIds,
                itemId: 'd',
            }));

            expect(row.find(PostListRow).prop('previousListId')).toEqual('');
        });

        test('should get previous item ID correctly for other rows', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            const row = shallow(wrapper.instance().renderRow({
                data: postListIds,
                itemId: 'b',
            }));

            expect(row.find(PostListRow).prop('previousListId')).toEqual('c');
        });

        test('should highlight the focused post', () => {
            const props = {
                ...baseProps,
                focusedPostId: 'b',
            };

            const wrapper = shallow(<PostList {...props}/>);

            let row = shallow(wrapper.instance().renderRow({
                data: postListIds,
                itemId: 'c',
            }));
            expect(row.find(PostListRow).prop('shouldHighlight')).toEqual(false);

            row = shallow(wrapper.instance().renderRow({
                data: postListIds,
                itemId: 'b',
            }));
            expect(row.find(PostListRow).prop('shouldHighlight')).toEqual(true);
        });
    });

    describe('new messages below', () => {
        test('should mount outside of permalink view', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            wrapper.setState({loadingFirstSetOfPosts: false});

            expect(wrapper.find(NewMessagesBelow).exists()).toBe(true);
        });

        test('should not mount when in permalink view', () => {
            const props = {
                ...baseProps,
                focusedPostId: '1234',
            };

            const wrapper = shallow(<PostList {...props}/>);
            wrapper.setState({loadingFirstSetOfPosts: false});

            expect(wrapper.find(NewMessagesBelow).exists()).toBe(false);
        });
    });

    describe('initScrollToIndex', () => {
        test('should return index of start of new messages and call increasePostVisibility when all posts are unread', () => {
            baseProps.actions.increasePostVisibility.mockResolvedValue({moreToLoad: false});
            const postListIds = [];
            for (let i = 0; i < 30; i++) {
                postListIds.push(`post${i}`);
            }
            postListIds.push(PostListRowListIds.START_OF_NEW_MESSAGES);

            const props = {
                ...baseProps,
                postListIds,
            };

            const wrapper = shallow(<PostList {...props}/>);
            const initScrollToIndex = wrapper.instance().initScrollToIndex();

            expect(initScrollToIndex).toEqual({index: 31, position: 'start'});

            expect(baseProps.actions.increasePostVisibility).toHaveBeenCalledTimes(1);
        });
    });

    describe('loadMorePosts', () => {
        test('should set state.atEnd to true after loading all posts in the channel', async () => {
            baseProps.actions.increasePostVisibility.mockResolvedValue({moreToLoad: false});

            const wrapper = shallow(<PostList {...baseProps}/>);

            await wrapper.instance().loadMorePosts();

            expect(baseProps.actions.increasePostVisibility).toHaveBeenCalledTimes(1);
            expect(baseProps.actions.increasePostVisibility).toHaveBeenCalledWith(baseProps.channel.id, 'post3');

            wrapper.update();

            expect(wrapper.state('atEnd')).toEqual(true);
        });
    });

    describe('onScroll', () => {
        test('should call checkBottom', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            wrapper.instance().checkBottom = jest.fn();

            const scrollOffset = 1234;
            const scrollHeight = 1000;
            const clientHeight = 500;

            wrapper.instance().onScroll({
                scrollDirection: 'forward',
                scrollOffset,
                scrollUpdateWasRequested: false,
                scrollHeight,
                clientHeight,
            });

            expect(wrapper.instance().checkBottom).toHaveBeenCalledWith(scrollOffset, scrollHeight, clientHeight);
        });
    });

    describe('isAtBottom', () => {
        const scrollHeight = 1000;
        const clientHeight = 500;

        for (const testCase of [
            {
                name: 'when viewing the top of the post list',
                scrollOffset: 0,
                expected: false,
            },
            {
                name: 'when 11 pixel from the bottom',
                scrollOffset: 489,
                expected: false,
            },
            {
                name: 'when 9 pixel from the bottom also considered to be bottom',
                scrollOffset: 490,
                expected: true,
            },
            {
                name: 'when clientHeight is less than scrollHeight', // scrollHeight is a state value in virt list and can be one cycle off when compared to actual value
                scrollOffset: 501,
                expected: true,
            },
        ]) {
            test(testCase.name, () => {
                const wrapper = shallow(<PostList {...baseProps}/>);
                expect(wrapper.instance().isAtBottom(testCase.scrollOffset, scrollHeight, clientHeight)).toBe(testCase.expected);
            });
        }
    });

    describe('updateAtBottom', () => {
        test('should update atBottom and lastViewedBottom when atBottom changes', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            wrapper.setState({lastViewedBottom: 1234});

            wrapper.instance().updateAtBottom(false);

            expect(wrapper.state('atBottom')).toBe(false);
            expect(wrapper.state('lastViewedBottom')).not.toBe(1234);
        });

        test('should not update lastViewedBottom when atBottom does not change', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            wrapper.setState({lastViewedBottom: 1234});

            wrapper.instance().updateAtBottom(true);

            expect(wrapper.state('lastViewedBottom')).toBe(1234);
        });

        test('should update lastViewedBottom with latestPostTimeStamp as that is greater than Date.now()', () => {
            Date.now = jest.fn().mockReturnValue(12344);

            const wrapper = shallow(<PostList {...baseProps}/>);
            wrapper.setState({lastViewedBottom: 1234});

            wrapper.instance().updateAtBottom(false);

            expect(wrapper.state('lastViewedBottom')).toBe(12345);
        });

        test('should update lastViewedBottom with Date.now() as it is greater than latestPostTimeStamp', () => {
            Date.now = jest.fn().mockReturnValue(12346);

            const wrapper = shallow(<PostList {...baseProps}/>);
            wrapper.setState({lastViewedBottom: 1234});

            wrapper.instance().updateAtBottom(false);

            expect(wrapper.state('lastViewedBottom')).toBe(12346);
        });
    });

    describe('Scroll correction logic on mount of posts at the top', () => {
        test('should return previous scroll position from getSnapshotBeforeUpdate', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            const instance = wrapper.instance();
            instance.componentDidUpdate = jest.fn();

            instance.postListRef = {current: {scrollTop: 10, scrollHeight: 100}};
            wrapper.setState({atEnd: true, atBottom: false});
            expect(instance.componentDidUpdate).toHaveBeenCalledTimes(1);
            expect(instance.componentDidUpdate.mock.calls[0][2]).toEqual({previousScrollTop: 10, previousScrollHeight: 100});

            instance.postListRef = {current: {scrollTop: 30, scrollHeight: 200}};
            wrapper.setState({atEnd: false});
            expect(instance.componentDidUpdate).toHaveBeenCalledTimes(2);
            expect(instance.componentDidUpdate.mock.calls[1][2]).toEqual({previousScrollTop: 30, previousScrollHeight: 200});

            /*instance.postListRef = {current: {scrollTop: 40, scrollHeight: 400}};
            wrapper.setProps({postListIds: [
                'post1',
                'post2',
                'post3',
                'post4',
                'post5',
                DATE_LINE + 1551711600000,
            ]});

            expect(instance.componentDidUpdate).toHaveBeenCalledTimes(3);
            expect(instance.componentDidUpdate.mock.calls[2][2]).toEqual({previousScrollTop: 40, previousScrollHeight: 400});*/
        });

        test('should not return previous scroll position from getSnapshotBeforeUpdate as list is at bottom', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            const instance = wrapper.instance();
            instance.componentDidUpdate = jest.fn();

            instance.postListRef = {current: {scrollTop: 10, scrollHeight: 100}};
            wrapper.setState({atEnd: true, atBottom: true});
            expect(instance.componentDidUpdate.mock.calls[0][2]).toEqual(null);

            /*wrapper.setState({atEnd: false});
            instance.postListRef = {current: {scrollTop: 40, scrollHeight: 400}};
            wrapper.setProps({postListIds: [
                'post1',
                'post2',
                'post3',
                'post4',
                'post5',
                DATE_LINE + 1551711600000,
            ]});

            expect(instance.componentDidUpdate.mock.calls[2][2]).toEqual(null);*/
        });
    });

    describe('initRangeToRender', () => {
        test('should return 0 to 50 for channel with more than 50 messages', () => {
            const postListIds = [];
            for (let i = 0; i < 70; i++) {
                postListIds.push(`post${i}`);
            }

            const props = {
                ...baseProps,
                postListIds,
            };

            const wrapper = shallow(<PostList {...props}/>);
            const instance = wrapper.instance();
            expect(instance.initRangeToRender).toEqual([0, 50]);
        });

        test('should return range if new messages are present', () => {
            const postListIds = [];
            for (let i = 0; i < 120; i++) {
                postListIds.push(`post${i}`);
            }
            postListIds[65] = PostListRowListIds.START_OF_NEW_MESSAGES;

            const props = {
                ...baseProps,
                postListIds,
            };

            const wrapper = shallow(<PostList {...props}/>);
            const instance = wrapper.instance();
            expect(instance.initRangeToRender).toEqual([35, 95]);
        });
    });

    describe('renderRow', () => {
        test('should have appropriate classNames for rows with START_OF_NEW_MESSAGES and DATE_LINE', () => {
            const props = {
                ...baseProps,
                postListIds: postListIdsForClassNames,
            };

            const wrapper = shallow(<PostList {...props}/>);
            const instance = wrapper.instance();
            const post3Row = shallow(instance.renderRow({
                data: postListIdsForClassNames,
                itemId: 'post3',
            }));

            const post5Row = shallow(instance.renderRow({
                data: postListIdsForClassNames,
                itemId: 'post5',
            }));

            expect(post3Row.prop('className')).toEqual('post-row__padding top');
            expect(post5Row.prop('className')).toEqual('post-row__padding bottom');
        });

        test('should have both top and bottom classNames as post is in between DATE_LINE and START_OF_NEW_MESSAGES', () => {
            const props = {
                ...baseProps,
                postListIds: [
                    'post1',
                    'post2',
                    'post3',
                    DATE_LINE + 1551711600000,
                    'post4',
                    PostListRowListIds.START_OF_NEW_MESSAGES,
                    'post5',
                ],
            };

            const wrapper = shallow(<PostList {...props}/>);

            const row = shallow(wrapper.instance().renderRow({
                data: props.postListIds,
                itemId: 'post4',
            }));

            expect(row.prop('className')).toEqual('post-row__padding bottom top');
        });

        test('should have empty string as className when both previousItemId and nextItemId are posts', () => {
            const props = {
                ...baseProps,
                postListIds: [
                    'post1',
                    'post2',
                    'post3',
                    DATE_LINE + 1551711600000,
                    'post4',
                    PostListRowListIds.START_OF_NEW_MESSAGES,
                    'post5',
                ],
            };

            const wrapper = shallow(<PostList {...props}/>);

            const row = shallow(wrapper.instance().renderRow({
                data: props.postListIds,
                itemId: 'post2',
            }));

            expect(row.prop('className')).toEqual('');
        });
    });

    describe('updateFloatingTimestamp', () => {
        test('should not update topPostId as is it not mobile view', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            const instance = wrapper.instance();
            wrapper.setState({isMobile: false});
            instance.onItemsRendered({visibleStartIndex: 0});
            expect(wrapper.state('topPostId')).toBe('');
        });

        test('should update topPostId with latest visible postId', () => {
            const wrapper = shallow(<PostList {...baseProps}/>);
            const instance = wrapper.instance();
            wrapper.setState({isMobile: true});
            instance.onItemsRendered({visibleStartIndex: 1});
            expect(wrapper.state('topPostId')).toBe('post2');

            instance.onItemsRendered({visibleStartIndex: 2});
            expect(wrapper.state('topPostId')).toBe('post3');
        });
    });

    describe('getPostsSince', () => {
        test('should call getPostsSince on channel switch', () => {
            shallow(<PostList {...baseProps}/>);
            expect(baseProps.actions.syncPostsInChannel).toHaveBeenCalledWith(baseProps.channel.id, baseProps.latestPostTimeStamp);
        });
    });
});
