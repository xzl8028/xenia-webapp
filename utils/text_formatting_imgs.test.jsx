// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import assert from 'assert';

import * as Markdown from 'utils/markdown';

describe('Markdown.Imgs', () => {
    it('Inline mage', (done) => {
        assert.equal(
            Markdown.format('![Xenia](/images/icon.png)').trim(),
            '<p><img src="/images/icon.png" alt="Xenia" class="markdown-inline-img"></p>'
        );

        done();
    });

    it('Image with hover text', (done) => {
        assert.equal(
            Markdown.format('![Xenia](/images/icon.png "Xenia Icon")').trim(),
            '<p><img src="/images/icon.png" alt="Xenia" title="Xenia Icon" class="markdown-inline-img"></p>'
        );

        done();
    });

    it('Image with link', (done) => {
        assert.equal(
            Markdown.format('[![Xenia](../../images/icon-76x76.png)](https://github.com/xzl8028/platform)').trim(),
            '<p><a class="theme markdown__link" href="https://github.com/xzl8028/platform" rel="noreferrer" target="_blank"><img src="../../images/icon-76x76.png" alt="Xenia" class="markdown-inline-img"></a></p>'
        );

        done();
    });

    it('Image with width and height', (done) => {
        assert.equal(
            Markdown.format('![Xenia](../../images/icon-76x76.png =50x76 "Xenia Icon")').trim(),
            '<p><img src="../../images/icon-76x76.png" alt="Xenia" title="Xenia Icon" width="50" height="76" class="markdown-inline-img"></p>'
        );

        done();
    });

    it('Image with width', (done) => {
        assert.equal(
            Markdown.format('![Xenia](../../images/icon-76x76.png =50 "Xenia Icon")').trim(),
            '<p><img src="../../images/icon-76x76.png" alt="Xenia" title="Xenia Icon" width="50" class="markdown-inline-img"></p>'
        );

        done();
    });
});
