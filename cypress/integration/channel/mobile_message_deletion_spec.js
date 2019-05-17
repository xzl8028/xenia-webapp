// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getRandomInt} from '../../utils';

// ***************************************************************
// - [number] indicates a test step (e.g. 1. Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

/* eslint max-nested-callbacks: ["error", 4] */

describe('Delete Parent Message', () => {
    before(() => {
        // 1. Go to Main Channel View with "user-1"
        cy.viewport('iphone-6');
        cy.toMainChannelView('user-1');
    });

    it('M14270 Deleting parent message should also delete replies from center and RHS', () => {
        // 2. Close Hamburger menu, post a message, and add replies
        cy.get('#post_textbox').click({force: true});
        cy.postMessage('Parent Message');

        cy.getLastPostId().then((postId) => {
            cy.clickPostCommentIcon(postId);

            // * Check that the RHS is open
            cy.get('#rhsContainer').should('be.visible');

            // * Add replies (randomly between 1 to 3)
            const replyCount = getRandomInt(2) + 1;
            for (var i = 0; i < replyCount; i++) {
                cy.get('#reply_textbox').type('Reply').type('{enter}');

                // add wait time to ensure that a post gets posted and not on pending state
                cy.wait(500); // eslint-disable-line
            }

            cy.getLastPostId().then((replyPostId) => {
                // * No delete modal should be visible yet
                cy.get('#deletePostModal').should('not.be.visible');

                // 3.Close RHS view, open delete confirmation modal for the parent message from the center screen
                cy.get('#sidebarCollapse').click();
                cy.clickPostDotMenu(postId);
                cy.get(`#delete_post_${postId}`).click();

                // * Modal should now be visible and warning message should match the number of replies
                cy.get('#deletePostModal').should('be.visible');
                cy.get('#deletePostModal').contains(`${replyCount}`).should('be.visible');

                // 4. Delete the parent message
                cy.get('#deletePostModalButton').click({force: true});

                // * Post is deleted from both center and RHS is not visible to the user who deleted it
                cy.get('#rhsContainer').should('not.be.visible');
                cy.get(`#post_${postId}`).should('not.be.visible');
                cy.get(`#post_${replyPostId}`).should('not.be.visible');
            });
        });
    });
});
