(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Defuddle"] = factory();
	else
		root["Defuddle"] = factory();
})(typeof self !== "undefined" ? self : this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 608:
/*!*************************!*\
  !*** ./src/metadata.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataExtractor = void 0;
class MetadataExtractor {
    static extract(doc, schemaOrgData) {
        var _a, _b;
        let domain = '';
        let url = '';
        try {
            // Try to get URL from document location
            url = ((_a = doc.location) === null || _a === void 0 ? void 0 : _a.href) || '';
            // If no URL from location, try other sources
            if (!url) {
                url = this.getMetaContent(doc, "property", "og:url") ||
                    this.getMetaContent(doc, "property", "twitter:url") ||
                    this.getSchemaProperty(doc, schemaOrgData, 'url') ||
                    this.getSchemaProperty(doc, schemaOrgData, 'mainEntityOfPage.url') ||
                    this.getSchemaProperty(doc, schemaOrgData, 'mainEntity.url') ||
                    this.getSchemaProperty(doc, schemaOrgData, 'WebSite.url') ||
                    ((_b = doc.querySelector('link[rel="canonical"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('href')) || '';
            }
            if (url) {
                domain = new URL(url).hostname.replace(/^www\./, '');
            }
        }
        catch (e) {
            // If URL parsing fails, try to get from base tag
            const baseTag = doc.querySelector('base[href]');
            if (baseTag) {
                try {
                    url = baseTag.getAttribute('href') || '';
                    domain = new URL(url).hostname.replace(/^www\./, '');
                }
                catch (e) {
                    console.warn('Failed to parse base URL:', e);
                }
            }
        }
        return {
            title: this.getTitle(doc, schemaOrgData),
            description: this.getDescription(doc, schemaOrgData),
            domain,
            favicon: this.getFavicon(doc, url),
            image: this.getImage(doc, schemaOrgData),
            published: this.getPublished(doc, schemaOrgData),
            author: this.getAuthor(doc, schemaOrgData),
            site: this.getSite(doc, schemaOrgData),
            schemaOrgData,
            wordCount: 0,
            parseTime: 0
        };
    }
    static getAuthor(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "name", "sailthru.author") ||
            this.getSchemaProperty(doc, schemaOrgData, 'author.name') ||
            this.getMetaContent(doc, "property", "author") ||
            this.getMetaContent(doc, "name", "byl") ||
            this.getMetaContent(doc, "name", "author") ||
            this.getMetaContent(doc, "name", "authorList") ||
            this.getMetaContent(doc, "name", "copyright") ||
            this.getSchemaProperty(doc, schemaOrgData, 'copyrightHolder.name') ||
            this.getMetaContent(doc, "property", "og:site_name") ||
            this.getSchemaProperty(doc, schemaOrgData, 'publisher.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'sourceOrganization.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'isPartOf.name') ||
            this.getMetaContent(doc, "name", "twitter:creator") ||
            this.getMetaContent(doc, "name", "application-name") ||
            '');
    }
    static getSite(doc, schemaOrgData) {
        return (this.getSchemaProperty(doc, schemaOrgData, 'publisher.name') ||
            this.getMetaContent(doc, "property", "og:site_name") ||
            this.getSchemaProperty(doc, schemaOrgData, 'WebSite.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'sourceOrganization.name') ||
            this.getMetaContent(doc, "name", "copyright") ||
            this.getSchemaProperty(doc, schemaOrgData, 'copyrightHolder.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'isPartOf.name') ||
            this.getMetaContent(doc, "name", "application-name") ||
            this.getAuthor(doc, schemaOrgData) ||
            '');
    }
    static getTitle(doc, schemaOrgData) {
        var _a, _b;
        const rawTitle = (this.getMetaContent(doc, "property", "og:title") ||
            this.getMetaContent(doc, "name", "twitter:title") ||
            this.getSchemaProperty(doc, schemaOrgData, 'headline') ||
            this.getMetaContent(doc, "name", "title") ||
            this.getMetaContent(doc, "name", "sailthru.title") ||
            ((_b = (_a = doc.querySelector('title')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) ||
            '');
        return this.cleanTitle(rawTitle, this.getSite(doc, schemaOrgData));
    }
    static cleanTitle(title, siteName) {
        if (!title || !siteName)
            return title;
        // Remove site name if it exists
        const siteNameEscaped = siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const patterns = [
            `\\s*[\\|\\-–—]\\s*${siteNameEscaped}\\s*$`, // Title | Site Name
            `^\\s*${siteNameEscaped}\\s*[\\|\\-–—]\\s*`, // Site Name | Title
        ];
        for (const pattern of patterns) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(title)) {
                title = title.replace(regex, '');
                break;
            }
        }
        return title.trim();
    }
    static getDescription(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "name", "description") ||
            this.getMetaContent(doc, "property", "description") ||
            this.getMetaContent(doc, "property", "og:description") ||
            this.getSchemaProperty(doc, schemaOrgData, 'description') ||
            this.getMetaContent(doc, "name", "twitter:description") ||
            this.getMetaContent(doc, "name", "sailthru.description") ||
            '');
    }
    static getImage(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "property", "og:image") ||
            this.getMetaContent(doc, "name", "twitter:image") ||
            this.getSchemaProperty(doc, schemaOrgData, 'image.url') ||
            this.getMetaContent(doc, "name", "sailthru.image.full") ||
            '');
    }
    static getFavicon(doc, baseUrl) {
        var _a, _b;
        const iconFromMeta = this.getMetaContent(doc, "property", "og:image:favicon");
        if (iconFromMeta)
            return iconFromMeta;
        const iconLink = (_a = doc.querySelector("link[rel='icon']")) === null || _a === void 0 ? void 0 : _a.getAttribute("href");
        if (iconLink)
            return iconLink;
        const shortcutLink = (_b = doc.querySelector("link[rel='shortcut icon']")) === null || _b === void 0 ? void 0 : _b.getAttribute("href");
        if (shortcutLink)
            return shortcutLink;
        // Only try to construct favicon URL if we have a valid base URL
        if (baseUrl) {
            try {
                return new URL("/favicon.ico", baseUrl).href;
            }
            catch (e) {
                console.warn('Failed to construct favicon URL:', e);
            }
        }
        return '';
    }
    static getPublished(doc, schemaOrgData) {
        return (this.getSchemaProperty(doc, schemaOrgData, 'datePublished') ||
            this.getMetaContent(doc, "name", "publishDate") ||
            this.getMetaContent(doc, "property", "article:published_time") ||
            this.getTimeElement(doc) ||
            this.getMetaContent(doc, "name", "sailthru.date") ||
            '');
    }
    static getMetaContent(doc, attr, value) {
        var _a, _b;
        const selector = `meta[${attr}]`;
        const element = Array.from(doc.querySelectorAll(selector))
            .find(el => { var _a; return ((_a = el.getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === value.toLowerCase(); });
        const content = element ? (_b = (_a = element.getAttribute("content")) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "" : "";
        return this.decodeHTMLEntities(content, doc);
    }
    static getTimeElement(doc) {
        var _a, _b, _c, _d;
        const selector = `time`;
        const element = Array.from(doc.querySelectorAll(selector))[0];
        const content = element ? ((_d = (_b = (_a = element.getAttribute("datetime")) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : (_c = element.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "") : "";
        return this.decodeHTMLEntities(content, doc);
    }
    static decodeHTMLEntities(text, doc) {
        const textarea = doc.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }
    static getSchemaProperty(doc, schemaOrgData, property, defaultValue = '') {
        if (!schemaOrgData)
            return defaultValue;
        const searchSchema = (data, props, fullPath, isExactMatch = true) => {
            if (typeof data === 'string') {
                return props.length === 0 ? [data] : [];
            }
            if (!data || typeof data !== 'object') {
                return [];
            }
            if (Array.isArray(data)) {
                const currentProp = props[0];
                if (/^\[\d+\]$/.test(currentProp)) {
                    const index = parseInt(currentProp.slice(1, -1));
                    if (data[index]) {
                        return searchSchema(data[index], props.slice(1), fullPath, isExactMatch);
                    }
                    return [];
                }
                if (props.length === 0 && data.every(item => typeof item === 'string' || typeof item === 'number')) {
                    return data.map(String);
                }
                return data.flatMap(item => searchSchema(item, props, fullPath, isExactMatch));
            }
            const [currentProp, ...remainingProps] = props;
            if (!currentProp) {
                if (typeof data === 'string')
                    return [data];
                if (typeof data === 'object' && data.name) {
                    return [data.name];
                }
                return [];
            }
            if (data.hasOwnProperty(currentProp)) {
                return searchSchema(data[currentProp], remainingProps, fullPath ? `${fullPath}.${currentProp}` : currentProp, true);
            }
            if (!isExactMatch) {
                const nestedResults = [];
                for (const key in data) {
                    if (typeof data[key] === 'object') {
                        const results = searchSchema(data[key], props, fullPath ? `${fullPath}.${key}` : key, false);
                        nestedResults.push(...results);
                    }
                }
                if (nestedResults.length > 0) {
                    return nestedResults;
                }
            }
            return [];
        };
        try {
            let results = searchSchema(schemaOrgData, property.split('.'), '', true);
            if (results.length === 0) {
                results = searchSchema(schemaOrgData, property.split('.'), '', false);
            }
            const result = results.length > 0 ? results.filter(Boolean).join(', ') : defaultValue;
            return this.decodeHTMLEntities(result, doc);
        }
        catch (error) {
            console.error(`Error in getSchemaProperty for ${property}:`, error);
            return defaultValue;
        }
    }
    static extractSchemaOrgData(doc) {
        const schemaScripts = doc.querySelectorAll('script[type="application/ld+json"]');
        const schemaData = [];
        schemaScripts.forEach(script => {
            let jsonContent = script.textContent || '';
            try {
                jsonContent = jsonContent
                    .replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, '')
                    .replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1')
                    .replace(/^\s*(\*\/|\/\*)\s*|\s*(\*\/|\/\*)\s*$/g, '')
                    .trim();
                const jsonData = JSON.parse(jsonContent);
                if (jsonData['@graph'] && Array.isArray(jsonData['@graph'])) {
                    schemaData.push(...jsonData['@graph']);
                }
                else {
                    schemaData.push(jsonData);
                }
            }
            catch (error) {
                console.error('Error parsing schema.org data:', error);
                console.error('Problematic JSON content:', jsonContent);
            }
        });
        return schemaData;
    }
}
exports.MetadataExtractor = MetadataExtractor;


/***/ }),

/***/ 628:
/*!*************************!*\
  !*** ./src/defuddle.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Defuddle = void 0;
const metadata_1 = __webpack_require__(/*! ./metadata */ 608);
// Entry point elements
// These are the elements that will be used to find the main content
const ENTRY_POINT_ELEMENTS = [
    'article',
    '[role="article"]',
    '[itemprop="articleBody"]',
    '.post-content',
    '.article-content',
    '#article-content',
    '.content-article',
    'main',
    '[role="main"]',
    'body' // ensures there is always a match
];
const MOBILE_WIDTH = 600;
const BLOCK_ELEMENTS = ['div', 'section', 'article', 'main'];
// Hidden elements that should be removed
const HIDDEN_ELEMENT_SELECTORS = [
    '[hidden]',
    '[aria-hidden="true"]',
    //	'[style*="display: none"]', causes problems for math formulas
    //	'[style*="display:none"]',
    '[style*="visibility: hidden"]',
    '[style*="visibility:hidden"]',
    '.hidden',
    '.invisible'
].join(',');
// Selectors to be removed
const EXACT_SELECTORS = [
    // scripts, styles
    'noscript',
    'script',
    'style',
    // ads
    '.ad:not([class*="gradient"])',
    '[class^="ad-" i]',
    '[class$="-ad" i]',
    '[id^="ad-" i]',
    '[id$="-ad" i]',
    '[role="banner" i]',
    '.promo',
    '.Promo',
    // comments
    '[id="comments" i]',
    // header, nav
    'header',
    '.header',
    '#header',
    'nav',
    '.navigation',
    '#navigation',
    '[role="navigation" i]',
    '[role="dialog" i]',
    '[role*="complementary" i]',
    '[class*="pagination" i]',
    '.menu',
    '#menu',
    // metadata
    '.author',
    '.Author',
    '.contributor',
    '.date',
    '.meta',
    '.tags',
    '.toc',
    '.Toc',
    '#toc',
    '#title',
    '#Title',
    '[href*="/category"]',
    '[href*="/categories"]',
    '[href*="/tag/"]',
    '[href*="/tags/"]',
    '[href*="/topics"]',
    '[href*="author"]',
    '[href="#site-content"]',
    '[src*="author"]',
    // footer
    'footer',
    // inputs, forms, elements
    'aside',
    'button',
    // '[role="button"]', Medium images
    'canvas',
    'dialog',
    'fieldset',
    'form',
    'input:not([type="checkbox"])',
    'label',
    'link',
    'option',
    'select',
    'textarea',
    'time',
    // iframes
    'instaread-player',
    'iframe:not([src*="youtube"]):not([src*="youtu.be"]):not([src*="vimeo"]):not([src*="twitter"])',
    // logos
    '[class="logo" i]',
    '#logo',
    '#Logo',
    // newsletter
    '#newsletter',
    '#Newsletter',
    // hidden for print
    '.noprint',
    '[data-link-name*="skip" i]',
    '[data-print-layout="hide" i]',
    '[data-block="donotprint" i]',
    // footnotes, citations
    '[class*="clickable-icon" i]',
    'li span[class*="ltx_tag" i][class*="ltx_tag_item" i]',
    'a[href^="#"][class*="anchor" i]',
    'a[href^="#"][class*="ref" i]',
    // link lists
    '[data-container*="most-viewed" i]',
    // sidebar
    '.sidebar',
    '.Sidebar',
    '#sidebar',
    '#Sidebar',
    '#sitesub',
    // other
    'table.infobox',
    '.pencraft:not(.pc-display-contents)', // Substack
    '[data-optimizely="related-articles-section" i]' // The Economist
];
// Removal patterns tested against attributes: class, id, data-testid, and data-qa
// Case insensitive, partial matches allowed
const PARTIAL_SELECTORS = [
    'access-wall',
    'activitypub',
    'appendix',
    'avatar',
    'advert',
    '-ad-',
    '_ad_',
    'allterms',
    'around-the-web',
    'article__copy',
    'article_date',
    'article-end ',
    'article_header',
    'article__header',
    'article__info',
    'article-info',
    'article__meta',
    'article-subject',
    'article_subject',
    'article-snippet',
    'article-separator',
    'article-tags',
    'article_tags',
    'article-title',
    'article_title',
    'articletopics',
    'article-topics',
    'article-type',
    'article--lede', // The Verge
    'associated-people',
    //	'author', Gwern
    'back-to-top',
    'backlinks-section',
    'banner',
    'bio-block',
    'blog-pager',
    'bottom-of-article',
    'brand-bar',
    'breadcrumb',
    'button-wrapper',
    'btn-',
    '-btn',
    'byline',
    'captcha',
    'cat_header',
    'catlinks',
    'chapter-list', // The Economist
    'collections',
    'comments',
    //	'-comment', Syntax highlighting
    'comment-count',
    'comment-content',
    'comment-form',
    'comment-number',
    'comment-respond',
    'comment-thread',
    'complementary',
    'consent',
    'content-card', // The Verge
    'content-topics',
    'contentpromo',
    'core-collateral',
    '_cta',
    '-cta',
    'cta-',
    'cta_',
    'current-issue', // The Nation
    'custom-list-number',
    'dateline',
    'dateheader',
    'date-header',
    'date_header-',
    //	'dialog',
    'disclaimer',
    'disclosure',
    'discussion',
    'discuss_',
    'disqus',
    'donate',
    'dropdown', // Ars Technica
    'eletters',
    'emailsignup',
    'engagement-widget',
    'entry-author-info',
    'entry-categories',
    'entry-date',
    'entry-meta',
    'entry-title',
    'entry-utility',
    'eyebrow',
    'expand-reduce',
    'externallinkembedwrapper', // The New Yorker
    'extra-title',
    'facebook',
    'favorite',
    'feedback',
    'feed-links',
    'field-site-sections',
    'fixed',
    'follow',
    'footer',
    'footnote-back',
    'footnoteback',
    'for-you',
    'frontmatter',
    'further-reading',
    'gist-meta',
    //	'global',
    'google',
    'goog-',
    'graph-view',
    'header-logo',
    'header-pattern', // The Verge
    'hero-list',
    'hide-for-print',
    'hide-print',
    'hidden-sidenote',
    'interlude',
    'interaction',
    'jumplink',
    //	'keyword', // used in syntax highlighting
    'kicker',
    '-labels',
    'language-name',
    'latest-content',
    '-ledes-', // The Verge
    '-license',
    'link-box',
    'links-grid', // BBC
    'links-title', // BBC
    'listing-dynamic-terms', // Boston Review
    'loading',
    'loa-info',
    'logo_container',
    'ltx_role_refnum', // Arxiv
    'ltx_tag_bibitem',
    'ltx_error',
    'marketing',
    'media-inquiry',
    'menu-',
    'meta-',
    'metadata',
    'might-like',
    '_modal',
    '-modal',
    'more-',
    'morenews',
    'morestories',
    'mw-editsection',
    'mw-cite-backlink',
    'mw-indicators',
    'mw-jump-link',
    'nav-',
    'nav_',
    'navbar',
    //	'navigation',
    'next-',
    'news-story-title',
    //	'newsletter', used on Substack
    'newsletter_',
    'newsletter-signup',
    'newslettersignup',
    'newsletterwidget',
    'newsletterwrapper',
    'not-found',
    'nomobile',
    'noprint',
    'originally-published', // Mercury News
    'outline-view',
    'overlay',
    'page-title',
    '-partners',
    'plea',
    'popular',
    //	'popup', Gwern
    'pop-up',
    'popover',
    'post-bottom',
    'post__category',
    'postcomment',
    'postdate',
    'post-date',
    'post_date',
    'post-feeds',
    'postinfo',
    'post-info',
    'post_info',
    'post-inline-date',
    'post-links',
    'post-meta',
    'postmeta',
    'postsnippet',
    'post_snippet',
    'post-snippet',
    'posttitle',
    'post-title',
    'post_title',
    'posttax',
    'post-tax',
    'post_tax',
    'posttag',
    'post_tag',
    'post-tag',
    //	'preview', used on Obsidian Publish
    'prevnext',
    'previousnext',
    'print-none',
    'print-header',
    'profile',
    //	'promo',
    'pubdate',
    'pub_date',
    'pub-date',
    'publication-date',
    'publicationName', // Medium
    'qr-code',
    'qr_code',
    '_rail',
    'readmore',
    'read-next',
    'read_next',
    'read_time',
    'read-time',
    'reading_time',
    'reading-time',
    'reading-list',
    'recentpost',
    'recent_post',
    'recent-post',
    'recommend',
    'redirectedfrom',
    'recirc',
    'register',
    'related',
    'reversefootnote',
    'screen-reader-text',
    //	'share',
    //	'-share', scitechdaily.com
    'share-box',
    'share-icons',
    'sharelinks',
    'share-section',
    'sidebartitle',
    'sidebar_',
    'similar-',
    'similar_',
    'similars-',
    'sideitems',
    'side-box',
    'site-index',
    'site-header',
    'site-logo',
    'site-name',
    //	'skip-',
    'skip-link',
    'social',
    'speechify-ignore',
    'sponsor',
    //	'-stats',
    '_stats',
    'sticky',
    'storyreadtime', // Medium
    'storypublishdate', // Medium
    'subject-label',
    'subscribe',
    '_tags',
    'tags__item',
    'tag_list',
    'taxonomy',
    'table-of-contents',
    'tabs-',
    //	'teaser', Nature
    'terminaltout',
    'time-rubric',
    'timestamp',
    'tip_off',
    'tiptout',
    '-toc',
    'topic-list',
    'toolbar',
    'tooltip',
    'top-wrapper',
    'tree-item',
    'trending',
    'trust-feat',
    'trust-badge',
    'twitter',
    'visually-hidden',
    'welcomebox'
];
// Selectors for footnotes and citations
const FOOTNOTE_INLINE_REFERENCES = [
    'sup.reference',
    'cite.ltx_cite',
    'sup[id^="fnr"]',
    'sup[id^="fnref:"]',
    'span.footnote-link',
    'a.citation',
    'a[id^="ref-link"]',
    'a[href^="#fn"]',
    'a[href^="#cite"]',
    'a[href^="#reference"]',
    'a[href^="#footnote"]',
    'a[href^="#r"]', // Common in academic papers
    'a[href^="#b"]', // Common for bibliography references
    'a[href*="cite_note"]',
    'a[href*="cite_ref"]',
    'a.footnote-anchor', // Substack
    'span.footnote-hovercard-target a', // Substack
    'a[role="doc-biblioref"]', // Science.org
    'a[id^="fnref"]',
    'a[id^="ref-link"]', // Nature.com
].join(',');
const FOOTNOTE_LIST_SELECTORS = [
    'div.footnote ol',
    'div.footnotes ol',
    'div[role="doc-endnotes"]',
    'div[role="doc-footnotes"]',
    'ol.footnotes-list',
    'ol.footnotes',
    'ol.references',
    'ol[class*="article-references"]',
    'section.footnotes ol',
    'section[role="doc-endnotes"]',
    'section[role="doc-footnotes"]',
    'section[role="doc-bibliography"]',
    'ul.footnotes-list',
    'ul.ltx_biblist',
    'div.footnote[data-component-name="FootnoteToDOM"]' // Substack
].join(',');
// Elements that are allowed to be empty
// These are not removed even if they have no content
const ALLOWED_EMPTY_ELEMENTS = new Set([
    'area',
    'audio',
    'base',
    'br',
    'circle',
    'col',
    'defs',
    'ellipse',
    'embed',
    'figure',
    'g',
    'hr',
    'iframe',
    'img',
    'input',
    'line',
    'link',
    'mask',
    'meta',
    'object',
    'param',
    'path',
    'pattern',
    'picture',
    'polygon',
    'polyline',
    'rect',
    'source',
    'stop',
    'svg',
    'td',
    'th',
    'track',
    'use',
    'video',
    'wbr'
]);
// Attributes to keep
const ALLOWED_ATTRIBUTES = new Set([
    'alt',
    'allow',
    'allowfullscreen',
    'aria-label',
    'class',
    'checked',
    'colspan',
    'controls',
    'data-src',
    'data-srcset',
    'data-lang',
    'dir',
    'frameborder',
    'headers',
    'height',
    'href',
    'id',
    'lang',
    'role',
    'rowspan',
    'src',
    'srcset',
    'title',
    'type',
    'width'
]);
// Supported languages for code blocks
const SUPPORTED_LANGUAGES = new Set([
    // Markup & Web
    'markup', 'html', 'xml', 'svg', 'mathml', 'ssml', 'atom', 'rss',
    'javascript', 'js', 'jsx', 'typescript', 'ts', 'tsx',
    'webassembly', 'wasm',
    // Common Programming Languages
    'python',
    'java',
    'csharp', 'cs', 'dotnet', 'aspnet',
    'cpp', 'c++', 'c', 'objc',
    'ruby', 'rb',
    'php',
    'golang',
    'rust',
    'swift',
    'kotlin',
    'scala',
    'dart',
    // Shell & Scripting
    'bash', 'shell', 'sh',
    'powershell',
    'batch',
    // Data & Config
    'json', 'jsonp',
    'yaml', 'yml',
    'toml',
    'dockerfile',
    'gitignore',
    // Query Languages
    'sql', 'mysql', 'postgresql',
    'graphql',
    'mongodb',
    'sparql',
    // Markup & Documentation
    'markdown', 'md',
    'latex', 'tex',
    'asciidoc', 'adoc',
    'jsdoc',
    // Functional Languages
    'haskell', 'hs',
    'elm',
    'elixir',
    'erlang',
    'ocaml',
    'fsharp',
    'scheme',
    'lisp', 'elisp',
    'clojure',
    // Other Languages
    'matlab',
    'fortran',
    'cobol',
    'pascal',
    'perl',
    'lua',
    'julia',
    'groovy',
    'crystal',
    'nim',
    'zig',
    // Domain Specific
    'regex',
    'gradle',
    'cmake',
    'makefile',
    'nix',
    'terraform',
    'solidity',
    'glsl',
    'hlsl',
    // Assembly
    'nasm',
    'masm',
    'armasm',
    // Game Development
    'gdscript',
    'unrealscript',
    // Others
    'abap',
    'actionscript',
    'ada',
    'agda',
    'antlr4',
    'applescript',
    'arduino',
    'coffeescript',
    'django',
    'erlang',
    'fortran',
    'haxe',
    'idris',
    'kotlin',
    'livescript',
    'matlab',
    'nginx',
    'pascal',
    'prolog',
    'puppet',
    'scala',
    'scheme',
    'tcl',
    'verilog',
    'vhdl'
]);
const ELEMENT_STANDARDIZATION_RULES = [
    // Code blocks
    {
        selector: 'pre',
        element: 'pre',
        transform: (el) => {
            if (!(el instanceof HTMLElement))
                return el;
            // Function to get language from class
            const getLanguageFromClass = (element) => {
                // Check data-lang attribute first
                const dataLang = element.getAttribute('data-lang');
                if (dataLang) {
                    return dataLang.toLowerCase();
                }
                // Define language patterns
                const languagePatterns = [
                    /^language-(\w+)$/, // language-javascript
                    /^lang-(\w+)$/, // lang-javascript
                    /^(\w+)-code$/, // javascript-code
                    /^code-(\w+)$/, // code-javascript
                    /^syntax-(\w+)$/, // syntax-javascript
                    /^code-snippet__(\w+)$/, // code-snippet__javascript
                    /^highlight-(\w+)$/, // highlight-javascript
                    /^(\w+)-snippet$/ // javascript-snippet
                ];
                // Then check the class attribute for patterns
                if (element.className && typeof element.className === 'string') {
                    for (const pattern of languagePatterns) {
                        const match = element.className.toLowerCase().match(pattern);
                        if (match) {
                            return match[1].toLowerCase();
                        }
                    }
                    // Then check for supported language
                    if (SUPPORTED_LANGUAGES.has(element.className.toLowerCase())) {
                        return element.className.toLowerCase();
                    }
                }
                const classNames = Array.from(element.classList);
                for (const className of classNames) {
                    // Check patterns first
                    for (const pattern of languagePatterns) {
                        const match = className.match(pattern);
                        if (match) {
                            return match[1].toLowerCase();
                        }
                    }
                }
                // Only check bare language names if no patterns were found
                for (const className of classNames) {
                    if (SUPPORTED_LANGUAGES.has(className.toLowerCase())) {
                        return className.toLowerCase();
                    }
                }
                return '';
            };
            // Try to get the language from the element and its ancestors
            let language = '';
            let currentElement = el;
            while (currentElement && !language) {
                language = getLanguageFromClass(currentElement);
                // Also check for code elements within the current element
                if (!language && currentElement.querySelector('code')) {
                    language = getLanguageFromClass(currentElement.querySelector('code'));
                }
                currentElement = currentElement.parentElement;
            }
            // Function to recursively extract text content while preserving structure
            const extractStructuredText = (element) => {
                if (element.nodeType === Node.TEXT_NODE) {
                    return element.textContent || '';
                }
                let text = '';
                if (element instanceof HTMLElement) {
                    // Handle line breaks
                    if (element.tagName === 'BR') {
                        return '\n';
                    }
                    // Handle code elements and their children
                    element.childNodes.forEach(child => {
                        text += extractStructuredText(child);
                    });
                    // Add newline after each code element
                    if (element.tagName === 'CODE') {
                        text += '\n';
                    }
                }
                return text;
            };
            // Extract all text content
            let codeContent = extractStructuredText(el);
            // Clean up the content
            codeContent = codeContent
                // Remove any extra newlines at the start
                .replace(/^\n+/, '')
                // Remove any extra newlines at the end
                .replace(/\n+$/, '')
                // Replace multiple consecutive newlines with a single newline
                .replace(/\n{3,}/g, '\n\n');
            // Create new pre element
            const newPre = document.createElement('pre');
            // Copy allowed attributes
            Array.from(el.attributes).forEach(attr => {
                if (ALLOWED_ATTRIBUTES.has(attr.name)) {
                    newPre.setAttribute(attr.name, attr.value);
                }
            });
            // Create code element
            const code = document.createElement('code');
            if (language) {
                code.setAttribute('data-lang', language);
                code.setAttribute('class', `language-${language}`);
            }
            code.textContent = codeContent;
            newPre.appendChild(code);
            return newPre;
        }
    },
    // Simplify headings by removing internal navigation elements
    {
        selector: 'h1, h2, h3, h4, h5, h6',
        element: 'keep',
        transform: (el) => {
            var _a, _b, _c, _d, _e;
            // If heading only contains a single anchor with internal link
            if (el.children.length === 1 &&
                ((_a = el.firstElementChild) === null || _a === void 0 ? void 0 : _a.tagName) === 'A' &&
                (((_b = el.firstElementChild.getAttribute('href')) === null || _b === void 0 ? void 0 : _b.includes('#')) ||
                    ((_c = el.firstElementChild.getAttribute('href')) === null || _c === void 0 ? void 0 : _c.startsWith('#')))) {
                // Create new heading of same level
                const newHeading = document.createElement(el.tagName);
                // Copy allowed attributes from original heading
                Array.from(el.attributes).forEach(attr => {
                    if (ALLOWED_ATTRIBUTES.has(attr.name)) {
                        newHeading.setAttribute(attr.name, attr.value);
                    }
                });
                // Just use the text content
                newHeading.textContent = ((_d = el.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '';
                return newHeading;
            }
            // If heading contains navigation buttons or other utility elements
            const buttons = el.querySelectorAll('button');
            if (buttons.length > 0) {
                const newHeading = document.createElement(el.tagName);
                // Copy allowed attributes
                Array.from(el.attributes).forEach(attr => {
                    if (ALLOWED_ATTRIBUTES.has(attr.name)) {
                        newHeading.setAttribute(attr.name, attr.value);
                    }
                });
                // Just use the text content
                newHeading.textContent = ((_e = el.textContent) === null || _e === void 0 ? void 0 : _e.trim()) || '';
                return newHeading;
            }
            return el;
        }
    },
    // Convert divs with paragraph role to actual paragraphs
    {
        selector: 'div[data-testid^="paragraph"], div[role="paragraph"]',
        element: 'p',
        transform: (el) => {
            const p = document.createElement('p');
            // Copy innerHTML
            p.innerHTML = el.innerHTML;
            // Copy allowed attributes
            Array.from(el.attributes).forEach(attr => {
                if (ALLOWED_ATTRIBUTES.has(attr.name)) {
                    p.setAttribute(attr.name, attr.value);
                }
            });
            return p;
        }
    },
    // Convert divs with list roles to actual lists
    {
        selector: 'div[role="list"]',
        element: 'ul',
        // Custom handler for list type detection and transformation
        transform: (el) => {
            var _a;
            // First determine if this is an ordered list
            const firstItem = el.querySelector('div[role="listitem"] .label');
            const label = ((_a = firstItem === null || firstItem === void 0 ? void 0 : firstItem.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            const isOrdered = label.match(/^\d+\)/);
            // Create the appropriate list type
            const list = document.createElement(isOrdered ? 'ol' : 'ul');
            // Process each list item
            const items = el.querySelectorAll('div[role="listitem"]');
            items.forEach(item => {
                const li = document.createElement('li');
                const content = item.querySelector('.content');
                if (content) {
                    // Convert any paragraph divs inside content
                    const paragraphDivs = content.querySelectorAll('div[role="paragraph"]');
                    paragraphDivs.forEach(div => {
                        const p = document.createElement('p');
                        p.innerHTML = div.innerHTML;
                        div.replaceWith(p);
                    });
                    // Convert any nested lists recursively
                    const nestedLists = content.querySelectorAll('div[role="list"]');
                    nestedLists.forEach(nestedList => {
                        var _a;
                        const firstNestedItem = nestedList.querySelector('div[role="listitem"] .label');
                        const nestedLabel = ((_a = firstNestedItem === null || firstNestedItem === void 0 ? void 0 : firstNestedItem.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                        const isNestedOrdered = nestedLabel.match(/^\d+\)/);
                        const newNestedList = document.createElement(isNestedOrdered ? 'ol' : 'ul');
                        // Process nested items
                        const nestedItems = nestedList.querySelectorAll('div[role="listitem"]');
                        nestedItems.forEach(nestedItem => {
                            const nestedLi = document.createElement('li');
                            const nestedContent = nestedItem.querySelector('.content');
                            if (nestedContent) {
                                // Convert paragraph divs in nested items
                                const nestedParagraphs = nestedContent.querySelectorAll('div[role="paragraph"]');
                                nestedParagraphs.forEach(div => {
                                    const p = document.createElement('p');
                                    p.innerHTML = div.innerHTML;
                                    div.replaceWith(p);
                                });
                                nestedLi.innerHTML = nestedContent.innerHTML;
                            }
                            newNestedList.appendChild(nestedLi);
                        });
                        nestedList.replaceWith(newNestedList);
                    });
                    li.innerHTML = content.innerHTML;
                }
                list.appendChild(li);
            });
            return list;
        }
    },
    {
        selector: 'div[role="listitem"]',
        element: 'li',
        // Custom handler for list item content
        transform: (el) => {
            const content = el.querySelector('.content');
            if (!content)
                return el;
            // Convert any paragraph divs inside content
            const paragraphDivs = content.querySelectorAll('div[role="paragraph"]');
            paragraphDivs.forEach(div => {
                const p = document.createElement('p');
                p.innerHTML = div.innerHTML;
                div.replaceWith(p);
            });
            return content;
        }
    },
    // Code blocks with syntax highlighting
    {
        selector: '.wp-block-syntaxhighlighter-code, .syntaxhighlighter, .highlight, .highlight-source, .wp-block-code, pre[class*="language-"], pre[class*="brush:"]',
        element: 'pre',
        transform: (el) => {
            if (!(el instanceof HTMLElement))
                return el;
            // Create new pre element
            const newPre = document.createElement('pre');
            // Try to detect language
            let language = '';
            // Check for WordPress syntax highlighter specific format
            const syntaxEl = el.querySelector('.syntaxhighlighter');
            if (syntaxEl) {
                // Get language from syntaxhighlighter class
                const classes = Array.from(syntaxEl.classList);
                const langClass = classes.find(c => !['syntaxhighlighter', 'nogutter'].includes(c));
                if (langClass && SUPPORTED_LANGUAGES.has(langClass.toLowerCase())) {
                    language = langClass.toLowerCase();
                }
            }
            // If no language found yet, check other common patterns
            if (!language) {
                const classNames = Array.from(el.classList);
                const languagePatterns = [
                    /(?:^|\s)(?:language|lang|brush|syntax)-(\w+)(?:\s|$)/i,
                    /(?:^|\s)(\w+)(?:\s|$)/i
                ];
                for (const className of classNames) {
                    for (const pattern of languagePatterns) {
                        const match = className.match(pattern);
                        if (match && match[1] && SUPPORTED_LANGUAGES.has(match[1].toLowerCase())) {
                            language = match[1].toLowerCase();
                            break;
                        }
                    }
                    if (language)
                        break;
                }
            }
            // Extract code content, handling various formats
            let codeContent = '';
            // Handle WordPress syntax highlighter table format
            const codeContainer = el.querySelector('.syntaxhighlighter table .code .container');
            if (codeContainer) {
                // Process each line
                const lines = Array.from(codeContainer.children);
                codeContent = lines
                    .map(line => {
                    // Get all code elements in this line
                    const codeParts = Array.from(line.querySelectorAll('code'))
                        .map(code => {
                        // Get the text content, preserving spaces
                        let text = code.textContent || '';
                        // If this is a 'spaces' class element, convert to actual spaces
                        if (code.classList.contains('spaces')) {
                            text = ' '.repeat(text.length);
                        }
                        return text;
                    })
                        .join('');
                    return codeParts || line.textContent || '';
                })
                    .join('\n');
            }
            else {
                // Handle WordPress syntax highlighter non-table format
                const codeLines = el.querySelectorAll('.code .line');
                if (codeLines.length > 0) {
                    codeContent = Array.from(codeLines)
                        .map(line => {
                        const codeParts = Array.from(line.querySelectorAll('code'))
                            .map(code => code.textContent || '')
                            .join('');
                        return codeParts || line.textContent || '';
                    })
                        .join('\n');
                }
                else {
                    // Fallback to regular text content
                    codeContent = el.textContent || '';
                }
            }
            // Clean up the content
            codeContent = codeContent
                .replace(/^\s+|\s+$/g, '') // Trim start/end whitespace
                .replace(/\t/g, '    ') // Convert tabs to spaces
                .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
                .replace(/\u00a0/g, ' '); // Replace non-breaking spaces with regular spaces
            // Create code element with language class if detected
            const code = document.createElement('code');
            if (language) {
                code.setAttribute('data-lang', language);
                code.setAttribute('class', `language-${language}`);
            }
            code.textContent = codeContent;
            newPre.appendChild(code);
            return newPre;
        }
    }
];
class Defuddle {
    /**
     * Create a new Defuddle instance
     * @param doc - The document to parse
     * @param options - Options for parsing
     */
    constructor(doc, options = {}) {
        this.doc = doc;
        this.options = options;
        this.debug = options.debug || false;
    }
    /**
     * Parse the document and extract its main content
     */
    parse() {
        const startTime = performance.now();
        // Extract metadata first since we'll need it in multiple places
        const schemaOrgData = metadata_1.MetadataExtractor.extractSchemaOrgData(this.doc);
        const metadata = metadata_1.MetadataExtractor.extract(this.doc, schemaOrgData);
        try {
            // Evaluate styles and sizes on original document
            const mobileStyles = this._evaluateMediaQueries(this.doc);
            // Check for small images in original document, excluding lazy-loaded ones
            const smallImages = this.findSmallImages(this.doc);
            // Clone document
            const clone = this.doc.cloneNode(true);
            // Apply mobile style to clone
            this.applyMobileStyles(clone, mobileStyles);
            // Find main content
            const mainContent = this.findMainContent(clone);
            if (!mainContent) {
                const endTime = performance.now();
                return Object.assign(Object.assign({ content: this.doc.body.innerHTML }, metadata), { wordCount: this.countWords(this.doc.body.innerHTML), parseTime: Math.round(endTime - startTime) });
            }
            // Remove small images identified from original document
            this.removeSmallImages(clone, smallImages);
            // Perform other destructive operations on the clone
            this.removeHiddenElements(clone);
            this.removeClutter(clone);
            // Clean up the main content
            this.cleanContent(mainContent, metadata);
            const content = mainContent ? mainContent.outerHTML : this.doc.body.innerHTML;
            const endTime = performance.now();
            return Object.assign(Object.assign({ content }, metadata), { wordCount: this.countWords(content), parseTime: Math.round(endTime - startTime) });
        }
        catch (error) {
            console.error('Defuddle', 'Error processing document:', error);
            const endTime = performance.now();
            return Object.assign(Object.assign({ content: this.doc.body.innerHTML }, metadata), { wordCount: this.countWords(this.doc.body.innerHTML), parseTime: Math.round(endTime - startTime) });
        }
    }
    countWords(content) {
        // Create a temporary div to parse HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        // Get text content, removing extra whitespace
        const text = tempDiv.textContent || '';
        const words = text
            .trim()
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .split(' ')
            .filter(word => word.length > 0); // Filter out empty strings
        return words.length;
    }
    // Make all other methods private by removing the static keyword and using private
    _log(...args) {
        if (this.debug) {
            console.log('Defuddle:', ...args);
        }
    }
    _evaluateMediaQueries(doc) {
        const mobileStyles = [];
        const maxWidthRegex = /max-width[^:]*:\s*(\d+)/;
        try {
            // Get all styles, including inline styles
            const sheets = Array.from(doc.styleSheets).filter(sheet => {
                try {
                    // Access rules once to check validity
                    sheet.cssRules;
                    return true;
                }
                catch (e) {
                    // Expected error for cross-origin stylesheets
                    if (e instanceof DOMException && e.name === 'SecurityError') {
                        return false;
                    }
                    throw e;
                }
            });
            // Process all sheets in a single pass
            const mediaRules = sheets.flatMap(sheet => {
                try {
                    return Array.from(sheet.cssRules)
                        .filter((rule) => rule instanceof CSSMediaRule &&
                        rule.conditionText.includes('max-width'));
                }
                catch (e) {
                    if (this.debug) {
                        console.warn('Defuddle: Failed to process stylesheet:', e);
                    }
                    return [];
                }
            });
            // Process all media rules in a single pass
            mediaRules.forEach(rule => {
                const match = rule.conditionText.match(maxWidthRegex);
                if (match) {
                    const maxWidth = parseInt(match[1]);
                    if (MOBILE_WIDTH <= maxWidth) {
                        // Batch process all style rules
                        const styleRules = Array.from(rule.cssRules)
                            .filter((r) => r instanceof CSSStyleRule);
                        styleRules.forEach(cssRule => {
                            try {
                                mobileStyles.push({
                                    selector: cssRule.selectorText,
                                    styles: cssRule.style.cssText
                                });
                            }
                            catch (e) {
                                if (this.debug) {
                                    console.warn('Defuddle: Failed to process CSS rule:', e);
                                }
                            }
                        });
                    }
                }
            });
        }
        catch (e) {
            console.error('Defuddle: Error evaluating media queries:', e);
        }
        return mobileStyles;
    }
    applyMobileStyles(doc, mobileStyles) {
        let appliedCount = 0;
        mobileStyles.forEach(({ selector, styles }) => {
            try {
                const elements = doc.querySelectorAll(selector);
                elements.forEach(element => {
                    element.setAttribute('style', (element.getAttribute('style') || '') + styles);
                    appliedCount++;
                });
            }
            catch (e) {
                console.error('Defuddle', 'Error applying styles for selector:', selector, e);
            }
        });
    }
    removeHiddenElements(doc) {
        let count = 0;
        const elementsToRemove = new Set();
        // First pass: Get all elements matching hidden selectors
        const hiddenElements = doc.querySelectorAll(HIDDEN_ELEMENT_SELECTORS);
        hiddenElements.forEach(el => elementsToRemove.add(el));
        count += hiddenElements.length;
        // Second pass: Use TreeWalker for efficient traversal
        const treeWalker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (node) => {
                // Skip elements already marked for removal
                if (elementsToRemove.has(node)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        // Batch style computations
        const elements = [];
        let currentNode;
        while (currentNode = treeWalker.nextNode()) {
            elements.push(currentNode);
        }
        // Process styles in batches to minimize layout thrashing
        const BATCH_SIZE = 100;
        for (let i = 0; i < elements.length; i += BATCH_SIZE) {
            const batch = elements.slice(i, i + BATCH_SIZE);
            // Read phase - gather all computedStyles
            const styles = batch.map(el => window.getComputedStyle(el));
            // Write phase - mark elements for removal
            batch.forEach((element, index) => {
                const computedStyle = styles[index];
                if (computedStyle.display === 'none' ||
                    computedStyle.visibility === 'hidden' ||
                    computedStyle.opacity === '0') {
                    elementsToRemove.add(element);
                    count++;
                }
            });
        }
        // Final pass: Batch remove all hidden elements
        elementsToRemove.forEach(el => el.remove());
        this._log('Removed hidden elements:', count);
    }
    removeClutter(doc) {
        const startTime = performance.now();
        let exactSelectorCount = 0;
        let partialSelectorCount = 0;
        // Track all elements to be removed
        const elementsToRemove = new Set();
        // First collect elements matching exact selectors
        const exactElements = doc.querySelectorAll(EXACT_SELECTORS.join(','));
        exactElements.forEach(el => {
            if (el === null || el === void 0 ? void 0 : el.parentNode) {
                elementsToRemove.add(el);
                exactSelectorCount++;
            }
        });
        // Pre-compile regexes and combine into a single regex for better performance
        const combinedPattern = PARTIAL_SELECTORS.join('|');
        const partialRegex = new RegExp(combinedPattern, 'i');
        // Create an efficient attribute selector for elements we care about
        const attributeSelector = '[class],[id],[data-testid],[data-qa],[data-cy]';
        const allElements = doc.querySelectorAll(attributeSelector);
        // Process elements for partial matches
        allElements.forEach(el => {
            // Skip if already marked for removal
            if (elementsToRemove.has(el)) {
                return;
            }
            // Get all relevant attributes and combine into a single string
            const attrs = [
                el.className && typeof el.className === 'string' ? el.className : '',
                el.id || '',
                el.getAttribute('data-testid') || '',
                el.getAttribute('data-qa') || '',
                el.getAttribute('data-cy') || ''
            ].join(' ').toLowerCase();
            // Skip if no attributes to check
            if (!attrs.trim()) {
                return;
            }
            // Check for partial match using single regex test
            if (partialRegex.test(attrs)) {
                elementsToRemove.add(el);
                partialSelectorCount++;
            }
        });
        // Remove all collected elements in a single pass
        elementsToRemove.forEach(el => el.remove());
        const endTime = performance.now();
        this._log('Removed clutter elements:', {
            exactSelectors: exactSelectorCount,
            partialSelectors: partialSelectorCount,
            total: elementsToRemove.size,
            processingTime: `${(endTime - startTime).toFixed(2)}ms`
        });
    }
    cleanContent(element, metadata) {
        // Remove HTML comments
        this.removeHtmlComments(element);
        // Handle H1 elements - remove first one and convert others to H2
        this.handleHeadings(element, metadata.title);
        // Standardize footnotes and citations
        this.standardizeFootnotes(element);
        // Handle lazy-loaded images
        this.handleLazyImages(element);
        // Convert embedded content to standard formats
        this.standardizeElements(element);
        // Strip unwanted attributes
        this.stripUnwantedAttributes(element);
        // Remove empty elements
        this.removeEmptyElements(element);
        // Remove trailing headings
        this.removeTrailingHeadings(element);
    }
    removeTrailingHeadings(element) {
        let removedCount = 0;
        const hasContentAfter = (el) => {
            // Check if there's any meaningful content after this element
            let nextContent = '';
            let sibling = el.nextSibling;
            // First check direct siblings
            while (sibling) {
                if (sibling.nodeType === Node.TEXT_NODE) {
                    nextContent += sibling.textContent || '';
                }
                else if (sibling.nodeType === Node.ELEMENT_NODE) {
                    // If we find an element sibling, check its content
                    nextContent += sibling.textContent || '';
                }
                sibling = sibling.nextSibling;
            }
            // If we found meaningful content at this level, return true
            if (nextContent.trim()) {
                return true;
            }
            // If no content found at this level and we have a parent,
            // check for content after the parent
            const parent = el.parentElement;
            if (parent && parent !== element) {
                return hasContentAfter(parent);
            }
            return false;
        };
        // Process all headings from bottom to top
        const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'))
            .reverse();
        headings.forEach(heading => {
            if (!hasContentAfter(heading)) {
                heading.remove();
                removedCount++;
            }
            else {
                // Stop processing once we find a heading with content after it
                return;
            }
        });
        if (removedCount > 0) {
            this._log('Removed trailing headings:', removedCount);
        }
    }
    handleHeadings(element, title) {
        var _a;
        const h1s = element.getElementsByTagName('h1');
        Array.from(h1s).forEach(h1 => {
            var _a;
            const h2 = document.createElement('h2');
            h2.innerHTML = h1.innerHTML;
            // Copy allowed attributes
            Array.from(h1.attributes).forEach(attr => {
                if (ALLOWED_ATTRIBUTES.has(attr.name)) {
                    h2.setAttribute(attr.name, attr.value);
                }
            });
            (_a = h1.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(h2, h1);
        });
        // Remove first H2 if it matches title
        const h2s = element.getElementsByTagName('h2');
        if (h2s.length > 0) {
            const firstH2 = h2s[0];
            const firstH2Text = ((_a = firstH2.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) || '';
            const normalizedTitle = title.toLowerCase().trim();
            if (normalizedTitle && normalizedTitle === firstH2Text) {
                firstH2.remove();
            }
        }
    }
    removeHtmlComments(element) {
        const comments = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_COMMENT, null);
        let node;
        while (node = walker.nextNode()) {
            comments.push(node);
        }
        comments.forEach(comment => {
            comment.remove();
        });
        this._log('Removed HTML comments:', comments.length);
    }
    stripUnwantedAttributes(element) {
        let attributeCount = 0;
        const processElement = (el) => {
            // Skip SVG elements - preserve all their attributes
            if (el instanceof SVGElement) {
                return;
            }
            const attributes = Array.from(el.attributes);
            attributes.forEach(attr => {
                const attrName = attr.name.toLowerCase();
                if (!ALLOWED_ATTRIBUTES.has(attrName) && !attrName.startsWith('data-')) {
                    el.removeAttribute(attr.name);
                    attributeCount++;
                }
            });
        };
        processElement(element);
        element.querySelectorAll('*').forEach(processElement);
        this._log('Stripped attributes:', attributeCount);
    }
    removeEmptyElements(element) {
        let removedCount = 0;
        let iterations = 0;
        let keepRemoving = true;
        while (keepRemoving) {
            iterations++;
            keepRemoving = false;
            // Get all elements without children, working from deepest first
            const emptyElements = Array.from(element.getElementsByTagName('*')).filter(el => {
                if (ALLOWED_EMPTY_ELEMENTS.has(el.tagName.toLowerCase())) {
                    return false;
                }
                // Check if element has only whitespace or &nbsp;
                const textContent = el.textContent || '';
                const hasOnlyWhitespace = textContent.trim().length === 0;
                const hasNbsp = textContent.includes('\u00A0'); // Unicode non-breaking space
                // Check if element has no meaningful children
                const hasNoChildren = !el.hasChildNodes() ||
                    (Array.from(el.childNodes).every(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            const nodeText = node.textContent || '';
                            return nodeText.trim().length === 0 && !nodeText.includes('\u00A0');
                        }
                        return false;
                    }));
                return hasOnlyWhitespace && !hasNbsp && hasNoChildren;
            });
            if (emptyElements.length > 0) {
                emptyElements.forEach(el => {
                    el.remove();
                    removedCount++;
                });
                keepRemoving = true;
            }
        }
        this._log('Removed empty elements:', {
            count: removedCount,
            iterations
        });
    }
    createFootnoteItem(footnoteNumber, content, refs) {
        const newItem = document.createElement('li');
        newItem.className = 'footnote';
        newItem.id = `fn:${footnoteNumber}`;
        // Handle content
        if (typeof content === 'string') {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = content;
            newItem.appendChild(paragraph);
        }
        else {
            // Get all paragraphs from the content
            const paragraphs = Array.from(content.querySelectorAll('p'));
            if (paragraphs.length === 0) {
                // If no paragraphs, wrap content in a paragraph
                const paragraph = document.createElement('p');
                paragraph.innerHTML = content.innerHTML;
                newItem.appendChild(paragraph);
            }
            else {
                // Copy existing paragraphs
                paragraphs.forEach(p => {
                    const newP = document.createElement('p');
                    newP.innerHTML = p.innerHTML;
                    newItem.appendChild(newP);
                });
            }
        }
        // Add backlink(s) to the last paragraph
        const lastParagraph = newItem.querySelector('p:last-of-type') || newItem;
        refs.forEach((refId, index) => {
            const backlink = document.createElement('a');
            backlink.href = `#${refId}`;
            backlink.title = 'return to article';
            backlink.className = 'footnote-backref';
            backlink.innerHTML = '↩';
            if (index < refs.length - 1) {
                backlink.innerHTML += ' ';
            }
            lastParagraph.appendChild(backlink);
        });
        return newItem;
    }
    collectFootnotes(element) {
        const footnotes = {};
        let footnoteCount = 1;
        const processedIds = new Set(); // Track processed IDs
        // Collect all footnotes and their IDs from footnote lists
        const footnoteLists = element.querySelectorAll(FOOTNOTE_LIST_SELECTORS);
        footnoteLists.forEach(list => {
            // Substack has individual footnote divs with no parent
            if (list.matches('div.footnote[data-component-name="FootnoteToDOM"]')) {
                const anchor = list.querySelector('a.footnote-number');
                const content = list.querySelector('.footnote-content');
                if (anchor && content) {
                    const id = anchor.id.replace('footnote-', '').toLowerCase();
                    if (id && !processedIds.has(id)) {
                        footnotes[footnoteCount] = {
                            content: content,
                            originalId: id,
                            refs: []
                        };
                        processedIds.add(id);
                        footnoteCount++;
                    }
                }
                return;
            }
            // Common format using OL/UL and LI elements
            const items = list.querySelectorAll('li, div[role="listitem"]');
            items.forEach(li => {
                var _a, _b, _c, _d;
                let id = '';
                let content = null;
                // Handle citations with .citations class
                const citationsDiv = li.querySelector('.citations');
                if ((_a = citationsDiv === null || citationsDiv === void 0 ? void 0 : citationsDiv.id) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith('r')) {
                    id = citationsDiv.id.toLowerCase();
                    // Look for citation content within the citations div
                    const citationContent = citationsDiv.querySelector('.citation-content');
                    if (citationContent) {
                        content = citationContent;
                    }
                }
                else {
                    // Extract ID from various formats
                    if (li.id.toLowerCase().startsWith('bib.bib')) {
                        id = li.id.replace('bib.bib', '').toLowerCase();
                    }
                    else if (li.id.toLowerCase().startsWith('fn:')) {
                        id = li.id.replace('fn:', '').toLowerCase();
                    }
                    else if (li.id.toLowerCase().startsWith('fn')) {
                        id = li.id.replace('fn', '').toLowerCase();
                        // Nature.com
                    }
                    else if (li.hasAttribute('data-counter')) {
                        id = ((_c = (_b = li.getAttribute('data-counter')) === null || _b === void 0 ? void 0 : _b.replace(/\.$/, '')) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || '';
                    }
                    else {
                        const match = (_d = li.id.split('/').pop()) === null || _d === void 0 ? void 0 : _d.match(/cite_note-(.+)/);
                        id = match ? match[1].toLowerCase() : li.id.toLowerCase();
                    }
                    content = li;
                }
                if (id && !processedIds.has(id)) {
                    footnotes[footnoteCount] = {
                        content: content || li,
                        originalId: id,
                        refs: []
                    };
                    processedIds.add(id);
                    footnoteCount++;
                }
            });
        });
        return footnotes;
    }
    findOuterFootnoteContainer(el) {
        let current = el;
        let parent = el.parentElement;
        // Keep going up until we find an element that's not a span or sup
        while (parent && (parent.tagName.toLowerCase() === 'span' ||
            parent.tagName.toLowerCase() === 'sup')) {
            current = parent;
            parent = parent.parentElement;
        }
        return current;
    }
    // Every footnote reference should be a sup element with an anchor inside
    // e.g. <sup id="fnref:1"><a href="#fn:1">1</a></sup>
    createFootnoteReference(footnoteNumber, refId) {
        const sup = document.createElement('sup');
        sup.id = refId;
        const link = document.createElement('a');
        link.href = `#fn:${footnoteNumber}`;
        link.textContent = footnoteNumber;
        sup.appendChild(link);
        return sup;
    }
    standardizeFootnotes(element) {
        const footnotes = this.collectFootnotes(element);
        // Standardize inline footnotes using the collected IDs
        const footnoteInlineReferences = element.querySelectorAll(FOOTNOTE_INLINE_REFERENCES);
        // Group references by their parent sup element
        const supGroups = new Map();
        footnoteInlineReferences.forEach(el => {
            var _a, _b, _c, _d;
            if (!(el instanceof HTMLElement))
                return;
            let footnoteId = '';
            let footnoteContent = '';
            // Extract footnote ID based on element type
            // Nature.com
            if (el.matches('a[id^="ref-link"]')) {
                footnoteId = ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                // Science.org
            }
            else if (el.matches('a[role="doc-biblioref"]')) {
                const xmlRid = el.getAttribute('data-xml-rid');
                if (xmlRid) {
                    footnoteId = xmlRid;
                }
                else {
                    const href = el.getAttribute('href');
                    if (href === null || href === void 0 ? void 0 : href.startsWith('#core-R')) {
                        footnoteId = href.replace('#core-', '');
                    }
                }
                // Substack
            }
            else if (el.matches('a.footnote-anchor, span.footnote-hovercard-target a')) {
                const id = ((_b = el.id) === null || _b === void 0 ? void 0 : _b.replace('footnote-anchor-', '')) || '';
                if (id) {
                    footnoteId = id.toLowerCase();
                }
                // Arxiv
            }
            else if (el.matches('cite.ltx_cite')) {
                const link = el.querySelector('a');
                if (link) {
                    const href = link.getAttribute('href');
                    if (href) {
                        const match = (_c = href.split('/').pop()) === null || _c === void 0 ? void 0 : _c.match(/bib\.bib(\d+)/);
                        if (match) {
                            footnoteId = match[1].toLowerCase();
                        }
                    }
                }
            }
            else if (el.matches('sup.reference')) {
                const links = el.querySelectorAll('a');
                Array.from(links).forEach(link => {
                    var _a;
                    const href = link.getAttribute('href');
                    if (href) {
                        const match = (_a = href.split('/').pop()) === null || _a === void 0 ? void 0 : _a.match(/(?:cite_note|cite_ref)-(.+)/);
                        if (match) {
                            footnoteId = match[1].toLowerCase();
                        }
                    }
                });
            }
            else if (el.matches('sup[id^="fnref:"]')) {
                footnoteId = el.id.replace('fnref:', '').toLowerCase();
            }
            else if (el.matches('sup[id^="fnr"]')) {
                footnoteId = el.id.replace('fnr', '').toLowerCase();
            }
            else if (el.matches('span.footnote-reference')) {
                footnoteId = el.getAttribute('data-footnote-id') || '';
            }
            else if (el.matches('span.footnote-link')) {
                footnoteId = el.getAttribute('data-footnote-id') || '';
                footnoteContent = el.getAttribute('data-footnote-content') || '';
            }
            else if (el.matches('a.citation')) {
                footnoteId = ((_d = el.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '';
                footnoteContent = el.getAttribute('href') || '';
            }
            else if (el.matches('a[id^="fnref"]')) {
                footnoteId = el.id.replace('fnref', '').toLowerCase();
            }
            else {
                // Other citation types
                const href = el.getAttribute('href');
                if (href) {
                    const id = href.replace(/^[#]/, '');
                    footnoteId = id.toLowerCase();
                }
            }
            if (footnoteId) {
                // Find the footnote number by matching the original ID
                const footnoteEntry = Object.entries(footnotes).find(([_, data]) => data.originalId === footnoteId.toLowerCase());
                if (footnoteEntry) {
                    const [footnoteNumber, footnoteData] = footnoteEntry;
                    // Create footnote reference ID
                    const refId = footnoteData.refs.length > 0 ?
                        `fnref:${footnoteNumber}-${footnoteData.refs.length + 1}` :
                        `fnref:${footnoteNumber}`;
                    footnoteData.refs.push(refId);
                    // Find the outermost container (span or sup)
                    const container = this.findOuterFootnoteContainer(el);
                    // If container is a sup, group references
                    if (container.tagName.toLowerCase() === 'sup') {
                        if (!supGroups.has(container)) {
                            supGroups.set(container, []);
                        }
                        const group = supGroups.get(container);
                        group.push(this.createFootnoteReference(footnoteNumber, refId));
                    }
                    else {
                        // Replace the container directly
                        container.replaceWith(this.createFootnoteReference(footnoteNumber, refId));
                    }
                }
            }
        });
        // Handle grouped references
        supGroups.forEach((references, container) => {
            if (references.length > 0) {
                // Create a document fragment to hold all the references
                const fragment = document.createDocumentFragment();
                // Add each reference as its own sup element
                references.forEach((ref, index) => {
                    const link = ref.querySelector('a');
                    if (link) {
                        const sup = document.createElement('sup');
                        sup.id = ref.id;
                        sup.appendChild(link.cloneNode(true));
                        fragment.appendChild(sup);
                    }
                });
                container.replaceWith(fragment);
            }
        });
        // Create the standardized footnote list
        const newList = document.createElement('div');
        newList.className = 'footnotes';
        const orderedList = document.createElement('ol');
        // Create footnote items in order
        Object.entries(footnotes).forEach(([number, data]) => {
            const newItem = this.createFootnoteItem(parseInt(number), data.content, data.refs);
            orderedList.appendChild(newItem);
        });
        // Remove original footnote lists
        const footnoteLists = element.querySelectorAll(FOOTNOTE_LIST_SELECTORS);
        footnoteLists.forEach(list => list.remove());
        // If we have any footnotes, add the new list to the document
        if (orderedList.children.length > 0) {
            newList.appendChild(orderedList);
            element.appendChild(newList);
        }
    }
    handleLazyImages(element) {
        let processedCount = 0;
        const lazyImages = element.querySelectorAll('img[data-src], img[data-srcset]');
        lazyImages.forEach(img => {
            if (!(img instanceof HTMLImageElement))
                return;
            // Handle data-src
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc && !img.src) {
                img.src = dataSrc;
                processedCount++;
            }
            // Handle data-srcset
            const dataSrcset = img.getAttribute('data-srcset');
            if (dataSrcset && !img.srcset) {
                img.srcset = dataSrcset;
                processedCount++;
            }
            // Remove lazy loading related classes and attributes
            img.classList.remove('lazy', 'lazyload');
            img.removeAttribute('data-ll-status');
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
        });
        this._log('Processed lazy images:', processedCount);
    }
    standardizeElements(element) {
        let processedCount = 0;
        // Convert elements based on standardization rules
        ELEMENT_STANDARDIZATION_RULES.forEach(rule => {
            const elements = element.querySelectorAll(rule.selector);
            elements.forEach(el => {
                if (rule.transform) {
                    // If there's a transform function, use it to create the new element
                    const transformed = rule.transform(el);
                    el.replaceWith(transformed);
                    processedCount++;
                }
            });
        });
        // Convert lite-youtube elements
        const liteYoutubeElements = element.querySelectorAll('lite-youtube');
        liteYoutubeElements.forEach(el => {
            const videoId = el.getAttribute('videoid');
            if (!videoId)
                return;
            const iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.title = el.getAttribute('videotitle') || 'YouTube video player';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.setAttribute('allowfullscreen', '');
            el.replaceWith(iframe);
            processedCount++;
        });
        // Add future embed conversions (Twitter, Instagram, etc.)
        this._log('Converted embedded elements:', processedCount);
    }
    // Find small IMG and SVG elements
    findSmallImages(doc) {
        const MIN_DIMENSION = 33;
        const smallImages = new Set();
        const transformRegex = /scale\(([\d.]+)\)/;
        const startTime = performance.now();
        let processedCount = 0;
        // 1. Read phase - Gather all elements in a single pass
        const elements = [
            ...Array.from(doc.getElementsByTagName('img')),
            ...Array.from(doc.getElementsByTagName('svg'))
        ].filter(element => {
            // Skip lazy-loaded images that haven't been processed yet
            if (element instanceof HTMLImageElement) {
                const isLazy = element.classList.contains('lazy') ||
                    element.classList.contains('lazyload') ||
                    element.hasAttribute('data-src') ||
                    element.hasAttribute('data-srcset');
                return !isLazy;
            }
            return true;
        });
        if (elements.length === 0) {
            return smallImages;
        }
        // 2. Batch process - Collect all measurements in one go
        const measurements = elements.map(element => ({
            element,
            // Static attributes (no reflow)
            naturalWidth: element instanceof HTMLImageElement ? element.naturalWidth : 0,
            naturalHeight: element instanceof HTMLImageElement ? element.naturalHeight : 0,
            attrWidth: parseInt(element.getAttribute('width') || '0'),
            attrHeight: parseInt(element.getAttribute('height') || '0')
        }));
        // 3. Batch compute styles - Process in chunks to avoid long tasks
        const BATCH_SIZE = 50;
        for (let i = 0; i < measurements.length; i += BATCH_SIZE) {
            const batch = measurements.slice(i, i + BATCH_SIZE);
            try {
                // Read phase - compute all styles at once
                const styles = batch.map(({ element }) => window.getComputedStyle(element));
                const rects = batch.map(({ element }) => element.getBoundingClientRect());
                // Process phase - no DOM operations
                batch.forEach((measurement, index) => {
                    var _a;
                    try {
                        const style = styles[index];
                        const rect = rects[index];
                        // Get transform scale in the same batch
                        const transform = style.transform;
                        const scale = transform ?
                            parseFloat(((_a = transform.match(transformRegex)) === null || _a === void 0 ? void 0 : _a[1]) || '1') : 1;
                        // Calculate effective dimensions
                        const widths = [
                            measurement.naturalWidth,
                            measurement.attrWidth,
                            parseInt(style.width) || 0,
                            rect.width * scale
                        ].filter(dim => typeof dim === 'number' && dim > 0);
                        const heights = [
                            measurement.naturalHeight,
                            measurement.attrHeight,
                            parseInt(style.height) || 0,
                            rect.height * scale
                        ].filter(dim => typeof dim === 'number' && dim > 0);
                        // Decision phase - no DOM operations
                        if (widths.length > 0 && heights.length > 0) {
                            const effectiveWidth = Math.min(...widths);
                            const effectiveHeight = Math.min(...heights);
                            if (effectiveWidth < MIN_DIMENSION || effectiveHeight < MIN_DIMENSION) {
                                const identifier = this.getElementIdentifier(measurement.element);
                                if (identifier) {
                                    smallImages.add(identifier);
                                    processedCount++;
                                }
                            }
                        }
                    }
                    catch (e) {
                        if (this.debug) {
                            console.warn('Defuddle: Failed to process element dimensions:', e);
                        }
                    }
                });
            }
            catch (e) {
                if (this.debug) {
                    console.warn('Defuddle: Failed to process batch:', e);
                }
            }
        }
        const endTime = performance.now();
        this._log('Found small elements:', {
            count: processedCount,
            totalElements: elements.length,
            processingTime: `${(endTime - startTime).toFixed(2)}ms`
        });
        return smallImages;
    }
    removeSmallImages(doc, smallImages) {
        let removedCount = 0;
        ['img', 'svg'].forEach(tag => {
            const elements = doc.getElementsByTagName(tag);
            Array.from(elements).forEach(element => {
                const identifier = this.getElementIdentifier(element);
                if (identifier && smallImages.has(identifier)) {
                    element.remove();
                    removedCount++;
                }
            });
        });
        this._log('Removed small elements:', removedCount);
    }
    getElementIdentifier(element) {
        // Try to create a unique identifier using various attributes
        if (element instanceof HTMLImageElement) {
            // For lazy-loaded images, use data-src as identifier if available
            const dataSrc = element.getAttribute('data-src');
            if (dataSrc)
                return `src:${dataSrc}`;
            const src = element.src || '';
            const srcset = element.srcset || '';
            const dataSrcset = element.getAttribute('data-srcset');
            if (src)
                return `src:${src}`;
            if (srcset)
                return `srcset:${srcset}`;
            if (dataSrcset)
                return `srcset:${dataSrcset}`;
        }
        const id = element.id || '';
        const className = element.className || '';
        const viewBox = element instanceof SVGElement ? element.getAttribute('viewBox') || '' : '';
        if (id)
            return `id:${id}`;
        if (viewBox)
            return `viewBox:${viewBox}`;
        if (className)
            return `class:${className}`;
        return null;
    }
    findMainContent(doc) {
        // Find all potential content containers
        const candidates = [];
        ENTRY_POINT_ELEMENTS.forEach((selector, index) => {
            const elements = doc.querySelectorAll(selector);
            elements.forEach(element => {
                // Base score from selector priority (earlier = higher)
                let score = (ENTRY_POINT_ELEMENTS.length - index) * 10;
                // Add score based on content analysis
                score += this.scoreElement(element);
                candidates.push({ element, score });
            });
        });
        if (candidates.length === 0) {
            // Fall back to scoring block elements
            // Currently <body> element is used as the fallback, so this is not used
            return this.findContentByScoring(doc);
        }
        // Sort by score descending
        candidates.sort((a, b) => b.score - a.score);
        if (this.debug) {
            this._log('Content candidates:', candidates.map(c => ({
                element: c.element.tagName,
                selector: this.getElementSelector(c.element),
                score: c.score
            })));
        }
        return candidates[0].element;
    }
    findContentByScoring(doc) {
        const candidates = this.scoreElements(doc);
        return candidates.length > 0 ? candidates[0].element : null;
    }
    getElementSelector(element) {
        const parts = [];
        let current = element;
        while (current && current !== this.doc.documentElement) {
            let selector = current.tagName.toLowerCase();
            if (current.id) {
                selector += '#' + current.id;
            }
            else if (current.className && typeof current.className === 'string') {
                selector += '.' + current.className.trim().split(/\s+/).join('.');
            }
            parts.unshift(selector);
            current = current.parentElement;
        }
        return parts.join(' > ');
    }
    scoreElements(doc) {
        const candidates = [];
        BLOCK_ELEMENTS.forEach((tag) => {
            Array.from(doc.getElementsByTagName(tag)).forEach((element) => {
                const score = this.scoreElement(element);
                if (score > 0) {
                    candidates.push({ score, element });
                }
            });
        });
        return candidates.sort((a, b) => b.score - a.score);
    }
    scoreElement(element) {
        let score = 0;
        // Score based on element properties
        const className = element.className && typeof element.className === 'string' ?
            element.className.toLowerCase() : '';
        const id = element.id ? element.id.toLowerCase() : '';
        // Score based on content
        const text = element.textContent || '';
        const words = text.split(/\s+/).length;
        score += Math.min(Math.floor(words / 100), 3);
        // Score based on link density
        const links = element.getElementsByTagName('a');
        const linkText = Array.from(links).reduce((acc, link) => { var _a; return acc + (((_a = link.textContent) === null || _a === void 0 ? void 0 : _a.length) || 0); }, 0);
        const linkDensity = text.length ? linkText / text.length : 0;
        if (linkDensity > 0.5) {
            score -= 10;
        }
        // Score based on presence of meaningful elements
        const paragraphs = element.getElementsByTagName('p').length;
        score += paragraphs;
        const images = element.getElementsByTagName('img').length;
        score += Math.min(images * 3, 9);
        return score;
    }
}
exports.Defuddle = Defuddle;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Defuddle = void 0;
var defuddle_1 = __webpack_require__(/*! ./defuddle */ 628);
Object.defineProperty(exports, "Defuddle", ({ enumerable: true, get: function () { return defuddle_1.Defuddle; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLFdBQUMsVUFBRyxHQUFHLENBQUMsV0FBSSxDQUFDLFdBQVcsMENBQUUsTUFBTSxLQUFJLENBQUMsQ0FBQyxLQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25HLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFFRCxpREFBaUQ7UUFDakQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM1RCxLQUFLLElBQUksVUFBVSxDQUFDO1FBRXBCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDMUQsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqQyxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7Q0FDRDtBQTFvQ0QsNEJBMG9DQzs7Ozs7OztVQzF0RUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSw0REFBc0M7QUFBN0IsNkdBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvbWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvZGVmdWRkbGUudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVmdWRkbGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVmdWRkbGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFFeHRyYWN0b3Ige1xuXHRzdGF0aWMgZXh0cmFjdChkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBEZWZ1ZGRsZU1ldGFkYXRhIHtcblx0XHRsZXQgZG9tYWluID0gJyc7XG5cdFx0bGV0IHVybCA9ICcnO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFRyeSB0byBnZXQgVVJMIGZyb20gZG9jdW1lbnQgbG9jYXRpb25cblx0XHRcdHVybCA9IGRvYy5sb2NhdGlvbj8uaHJlZiB8fCAnJztcblx0XHRcdFxuXHRcdFx0Ly8gSWYgbm8gVVJMIGZyb20gbG9jYXRpb24sIHRyeSBvdGhlciBzb3VyY2VzXG5cdFx0XHRpZiAoIXVybCkge1xuXHRcdFx0XHR1cmwgPSB0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnVybFwiKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwidHdpdHRlcjp1cmxcIikgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3VybCcpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdtYWluRW50aXR5T2ZQYWdlLnVybCcpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdtYWluRW50aXR5LnVybCcpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdXZWJTaXRlLnVybCcpIHx8XG5cdFx0XHRcdFx0ZG9jLnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwiY2Fub25pY2FsXCJdJyk/LmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodXJsKSB7XG5cdFx0XHRcdGRvbWFpbiA9IG5ldyBVUkwodXJsKS5ob3N0bmFtZS5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIElmIFVSTCBwYXJzaW5nIGZhaWxzLCB0cnkgdG8gZ2V0IGZyb20gYmFzZSB0YWdcblx0XHRcdGNvbnN0IGJhc2VUYWcgPSBkb2MucXVlcnlTZWxlY3RvcignYmFzZVtocmVmXScpO1xuXHRcdFx0aWYgKGJhc2VUYWcpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR1cmwgPSBiYXNlVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuXHRcdFx0XHRcdGRvbWFpbiA9IG5ldyBVUkwodXJsKS5ob3N0bmFtZS5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdGYWlsZWQgdG8gcGFyc2UgYmFzZSBVUkw6JywgZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IHRoaXMuZ2V0VGl0bGUoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLmdldERlc2NyaXB0aW9uKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRkb21haW4sXG5cdFx0XHRmYXZpY29uOiB0aGlzLmdldEZhdmljb24oZG9jLCB1cmwpLFxuXHRcdFx0aW1hZ2U6IHRoaXMuZ2V0SW1hZ2UoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdHB1Ymxpc2hlZDogdGhpcy5nZXRQdWJsaXNoZWQoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGF1dGhvcjogdGhpcy5nZXRBdXRob3IoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdHNpdGU6IHRoaXMuZ2V0U2l0ZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0c2NoZW1hT3JnRGF0YSxcblx0XHRcdHdvcmRDb3VudDogMCxcblx0XHRcdHBhcnNlVGltZTogMFxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRBdXRob3IoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdhdXRob3IubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcImF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImJ5bFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImF1dGhvckxpc3RcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJjb3B5cmlnaHRcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnY29weXJpZ2h0SG9sZGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpzaXRlX25hbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAncHVibGlzaGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdzb3VyY2VPcmdhbml6YXRpb24ubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2lzUGFydE9mLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6Y3JlYXRvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImFwcGxpY2F0aW9uLW5hbWVcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFNpdGUoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdwdWJsaXNoZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnNpdGVfbmFtZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdXZWJTaXRlLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdzb3VyY2VPcmdhbml6YXRpb24ubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiY29weXJpZ2h0XCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2NvcHlyaWdodEhvbGRlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaXNQYXJ0T2YubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXBwbGljYXRpb24tbmFtZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRBdXRob3IoZG9jLCBzY2hlbWFPcmdEYXRhKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0VGl0bGUoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRjb25zdCByYXdUaXRsZSA9IChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6dGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2hlYWRsaW5lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LnRpdGxlXCIpIHx8XG5cdFx0XHRkb2MucXVlcnlTZWxlY3RvcigndGl0bGUnKT8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuY2xlYW5UaXRsZShyYXdUaXRsZSwgdGhpcy5nZXRTaXRlKGRvYywgc2NoZW1hT3JnRGF0YSkpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgY2xlYW5UaXRsZSh0aXRsZTogc3RyaW5nLCBzaXRlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRpZiAoIXRpdGxlIHx8ICFzaXRlTmFtZSkgcmV0dXJuIHRpdGxlO1xuXG5cdFx0Ly8gUmVtb3ZlIHNpdGUgbmFtZSBpZiBpdCBleGlzdHNcblx0XHRjb25zdCBzaXRlTmFtZUVzY2FwZWQgPSBzaXRlTmFtZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xuXHRcdGNvbnN0IHBhdHRlcm5zID0gW1xuXHRcdFx0YFxcXFxzKltcXFxcfFxcXFwt4oCT4oCUXVxcXFxzKiR7c2l0ZU5hbWVFc2NhcGVkfVxcXFxzKiRgLCAvLyBUaXRsZSB8IFNpdGUgTmFtZVxuXHRcdFx0YF5cXFxccyoke3NpdGVOYW1lRXNjYXBlZH1cXFxccypbXFxcXHxcXFxcLeKAk+KAlF1cXFxccypgLCAvLyBTaXRlIE5hbWUgfCBUaXRsZVxuXHRcdF07XG5cdFx0XG5cdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIHBhdHRlcm5zKSB7XG5cdFx0XHRjb25zdCByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybiwgJ2knKTtcblx0XHRcdGlmIChyZWdleC50ZXN0KHRpdGxlKSkge1xuXHRcdFx0XHR0aXRsZSA9IHRpdGxlLnJlcGxhY2UocmVnZXgsICcnKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRpdGxlLnRyaW0oKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldERlc2NyaXB0aW9uKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdkZXNjcmlwdGlvbicpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjpkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRJbWFnZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmltYWdlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjppbWFnZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdpbWFnZS51cmwnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmltYWdlLmZ1bGxcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEZhdmljb24oZG9jOiBEb2N1bWVudCwgYmFzZVVybDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBpY29uRnJvbU1ldGEgPSB0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmltYWdlOmZhdmljb25cIik7XG5cdFx0aWYgKGljb25Gcm9tTWV0YSkgcmV0dXJuIGljb25Gcm9tTWV0YTtcblxuXHRcdGNvbnN0IGljb25MaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0naWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChpY29uTGluaykgcmV0dXJuIGljb25MaW5rO1xuXG5cdFx0Y29uc3Qgc2hvcnRjdXRMaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0nc2hvcnRjdXQgaWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChzaG9ydGN1dExpbmspIHJldHVybiBzaG9ydGN1dExpbms7XG5cblx0XHQvLyBPbmx5IHRyeSB0byBjb25zdHJ1Y3QgZmF2aWNvbiBVUkwgaWYgd2UgaGF2ZSBhIHZhbGlkIGJhc2UgVVJMXG5cdFx0aWYgKGJhc2VVcmwpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVVJMKFwiL2Zhdmljb24uaWNvXCIsIGJhc2VVcmwpLmhyZWY7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIGNvbnN0cnVjdCBmYXZpY29uIFVSTDonLCBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRQdWJsaXNoZWQoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdkYXRlUHVibGlzaGVkJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJwdWJsaXNoRGF0ZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJhcnRpY2xlOnB1Ymxpc2hlZF90aW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFRpbWVFbGVtZW50KGRvYykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5kYXRlXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRNZXRhQ29udGVudChkb2M6IERvY3VtZW50LCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHNlbGVjdG9yID0gYG1ldGFbJHthdHRyfV1gO1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblx0XHRcdC5maW5kKGVsID0+IGVsLmdldEF0dHJpYnV0ZShhdHRyKT8udG9Mb3dlckNhc2UoKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKSk7XG5cdFx0Y29uc3QgY29udGVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik/LnRyaW0oKSA/PyBcIlwiIDogXCJcIjtcblx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoY29udGVudCwgZG9jKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFRpbWVFbGVtZW50KGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHNlbGVjdG9yID0gYHRpbWVgO1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlbMF07XG5cdFx0Y29uc3QgY29udGVudCA9IGVsZW1lbnQgPyAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRldGltZVwiKT8udHJpbSgpID8/IGVsZW1lbnQudGV4dENvbnRlbnQ/LnRyaW0oKSA/PyBcIlwiKSA6IFwiXCI7XG5cdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGNvbnRlbnQsIGRvYyk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBkZWNvZGVIVE1MRW50aXRpZXModGV4dDogc3RyaW5nLCBkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCB0ZXh0YXJlYSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuXHRcdHRleHRhcmVhLmlubmVySFRNTCA9IHRleHQ7XG5cdFx0cmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0U2NoZW1hUHJvcGVydHkoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55LCBwcm9wZXJ0eTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcblx0XHRpZiAoIXNjaGVtYU9yZ0RhdGEpIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cblx0XHRjb25zdCBzZWFyY2hTY2hlbWEgPSAoZGF0YTogYW55LCBwcm9wczogc3RyaW5nW10sIGZ1bGxQYXRoOiBzdHJpbmcsIGlzRXhhY3RNYXRjaDogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmdbXSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wcy5sZW5ndGggPT09IDAgPyBbZGF0YV0gOiBbXTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG5cdFx0XHRcdGNvbnN0IGN1cnJlbnRQcm9wID0gcHJvcHNbMF07XG5cdFx0XHRcdGlmICgvXlxcW1xcZCtcXF0kLy50ZXN0KGN1cnJlbnRQcm9wKSkge1xuXHRcdFx0XHRcdGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoY3VycmVudFByb3Auc2xpY2UoMSwgLTEpKTtcblx0XHRcdFx0XHRpZiAoZGF0YVtpbmRleF0pIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWFyY2hTY2hlbWEoZGF0YVtpbmRleF0sIHByb3BzLnNsaWNlKDEpLCBmdWxsUGF0aCwgaXNFeGFjdE1hdGNoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAocHJvcHMubGVuZ3RoID09PSAwICYmIGRhdGEuZXZlcnkoaXRlbSA9PiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGl0ZW0gPT09ICdudW1iZXInKSkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhLm1hcChTdHJpbmcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gZGF0YS5mbGF0TWFwKGl0ZW0gPT4gc2VhcmNoU2NoZW1hKGl0ZW0sIHByb3BzLCBmdWxsUGF0aCwgaXNFeGFjdE1hdGNoKSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IFtjdXJyZW50UHJvcCwgLi4ucmVtYWluaW5nUHJvcHNdID0gcHJvcHM7XG5cdFx0XHRcblx0XHRcdGlmICghY3VycmVudFByb3ApIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykgcmV0dXJuIFtkYXRhXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiBkYXRhLm5hbWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gW2RhdGEubmFtZV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShjdXJyZW50UHJvcCkpIHtcblx0XHRcdFx0cmV0dXJuIHNlYXJjaFNjaGVtYShkYXRhW2N1cnJlbnRQcm9wXSwgcmVtYWluaW5nUHJvcHMsIFxuXHRcdFx0XHRcdGZ1bGxQYXRoID8gYCR7ZnVsbFBhdGh9LiR7Y3VycmVudFByb3B9YCA6IGN1cnJlbnRQcm9wLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpc0V4YWN0TWF0Y2gpIHtcblx0XHRcdFx0Y29uc3QgbmVzdGVkUmVzdWx0czogc3RyaW5nW10gPSBbXTtcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgZGF0YVtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVzdWx0cyA9IHNlYXJjaFNjaGVtYShkYXRhW2tleV0sIHByb3BzLCBcblx0XHRcdFx0XHRcdFx0ZnVsbFBhdGggPyBgJHtmdWxsUGF0aH0uJHtrZXl9YCA6IGtleSwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0bmVzdGVkUmVzdWx0cy5wdXNoKC4uLnJlc3VsdHMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobmVzdGVkUmVzdWx0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5lc3RlZFJlc3VsdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0bGV0IHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoc2NoZW1hT3JnRGF0YSwgcHJvcGVydHkuc3BsaXQoJy4nKSwgJycsIHRydWUpO1xuXHRcdFx0aWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoc2NoZW1hT3JnRGF0YSwgcHJvcGVydHkuc3BsaXQoJy4nKSwgJycsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHJlc3VsdCA9IHJlc3VsdHMubGVuZ3RoID4gMCA/IHJlc3VsdHMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywgJykgOiBkZWZhdWx0VmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMocmVzdWx0LCBkb2MpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBpbiBnZXRTY2hlbWFQcm9wZXJ0eSBmb3IgJHtwcm9wZXJ0eX06YCwgZXJyb3IpO1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdFNjaGVtYU9yZ0RhdGEoZG9jOiBEb2N1bWVudCk6IGFueSB7XG5cdFx0Y29uc3Qgc2NoZW1hU2NyaXB0cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKTtcblx0XHRjb25zdCBzY2hlbWFEYXRhOiBhbnlbXSA9IFtdO1xuXG5cdFx0c2NoZW1hU2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7XG5cdFx0XHRsZXQganNvbkNvbnRlbnQgPSBzY3JpcHQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGpzb25Db250ZW50ID0ganNvbkNvbnRlbnRcblx0XHRcdFx0XHQucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3xeXFxzKlxcL1xcLy4qJC9nbSwgJycpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqPCFcXFtDREFUQVxcWyhbXFxzXFxTXSo/KVxcXVxcXT5cXHMqJC8sICckMScpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqKFxcKlxcL3xcXC9cXCopXFxzKnxcXHMqKFxcKlxcL3xcXC9cXCopXFxzKiQvZywgJycpXG5cdFx0XHRcdFx0LnRyaW0oKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0Y29uc3QganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25Db250ZW50KTtcblxuXHRcdFx0XHRpZiAoanNvbkRhdGFbJ0BncmFwaCddICYmIEFycmF5LmlzQXJyYXkoanNvbkRhdGFbJ0BncmFwaCddKSkge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaCguLi5qc29uRGF0YVsnQGdyYXBoJ10pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaChqc29uRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgc2NoZW1hLm9yZyBkYXRhOicsIGVycm9yKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignUHJvYmxlbWF0aWMgSlNPTiBjb250ZW50OicsIGpzb25Db250ZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBzY2hlbWFEYXRhO1xuXHR9XG59IiwiaW1wb3J0IHsgTWV0YWRhdGFFeHRyYWN0b3IgfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSwgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBFbnRyeSBwb2ludCBlbGVtZW50c1xuLy8gVGhlc2UgYXJlIHRoZSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgdXNlZCB0byBmaW5kIHRoZSBtYWluIGNvbnRlbnRcbmNvbnN0IEVOVFJZX1BPSU5UX0VMRU1FTlRTID0gW1xuXHQnYXJ0aWNsZScsXG5cdCdbcm9sZT1cImFydGljbGVcIl0nLFxuXHQnW2l0ZW1wcm9wPVwiYXJ0aWNsZUJvZHlcIl0nLFxuXHQnLnBvc3QtY29udGVudCcsXG5cdCcuYXJ0aWNsZS1jb250ZW50Jyxcblx0JyNhcnRpY2xlLWNvbnRlbnQnLFxuXHQnLmNvbnRlbnQtYXJ0aWNsZScsXG5cdCdtYWluJyxcblx0J1tyb2xlPVwibWFpblwiXScsXG5cdCdib2R5JyAvLyBlbnN1cmVzIHRoZXJlIGlzIGFsd2F5cyBhIG1hdGNoXG5dO1xuXG5jb25zdCBNT0JJTEVfV0lEVEggPSA2MDA7XG5jb25zdCBCTE9DS19FTEVNRU5UUyA9IFsnZGl2JywgJ3NlY3Rpb24nLCAnYXJ0aWNsZScsICdtYWluJ107XG5cbi8vIEhpZGRlbiBlbGVtZW50cyB0aGF0IHNob3VsZCBiZSByZW1vdmVkXG5jb25zdCBISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMgPSBbXG5cdCdbaGlkZGVuXScsXG5cdCdbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJyxcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nLCBjYXVzZXMgcHJvYmxlbXMgZm9yIG1hdGggZm9ybXVsYXNcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXScsXG5cdCdbc3R5bGUqPVwidmlzaWJpbGl0eTogaGlkZGVuXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OmhpZGRlblwiXScsXG5cdCcuaGlkZGVuJyxcblx0Jy5pbnZpc2libGUnXG5dLmpvaW4oJywnKTtcblxuLy8gU2VsZWN0b3JzIHRvIGJlIHJlbW92ZWRcbmNvbnN0IEVYQUNUX1NFTEVDVE9SUyA9IFtcblx0Ly8gc2NyaXB0cywgc3R5bGVzXG5cdCdub3NjcmlwdCcsXG5cdCdzY3JpcHQnLFxuXHQnc3R5bGUnLFxuXG5cdC8vIGFkc1xuXHQnLmFkOm5vdChbY2xhc3MqPVwiZ3JhZGllbnRcIl0pJyxcblx0J1tjbGFzc149XCJhZC1cIiBpXScsXG5cdCdbY2xhc3MkPVwiLWFkXCIgaV0nLFxuXHQnW2lkXj1cImFkLVwiIGldJyxcblx0J1tpZCQ9XCItYWRcIiBpXScsXG5cdCdbcm9sZT1cImJhbm5lclwiIGldJyxcblx0Jy5wcm9tbycsXG5cdCcuUHJvbW8nLFxuXG5cdC8vIGNvbW1lbnRzXG5cdCdbaWQ9XCJjb21tZW50c1wiIGldJyxcblxuXHQvLyBoZWFkZXIsIG5hdlxuXHQnaGVhZGVyJyxcblx0Jy5oZWFkZXInLFxuXHQnI2hlYWRlcicsXG5cdCduYXYnLFxuXHQnLm5hdmlnYXRpb24nLFxuXHQnI25hdmlnYXRpb24nLFxuXHQnW3JvbGU9XCJuYXZpZ2F0aW9uXCIgaV0nLFxuXHQnW3JvbGU9XCJkaWFsb2dcIiBpXScsXG5cdCdbcm9sZSo9XCJjb21wbGVtZW50YXJ5XCIgaV0nLFxuXHQnW2NsYXNzKj1cInBhZ2luYXRpb25cIiBpXScsXG5cdCcubWVudScsXG5cdCcjbWVudScsXG5cblx0Ly8gbWV0YWRhdGFcblx0Jy5hdXRob3InLFxuXHQnLkF1dGhvcicsXG5cdCcuY29udHJpYnV0b3InLFxuXHQnLmRhdGUnLFxuXHQnLm1ldGEnLFxuXHQnLnRhZ3MnLFxuXHQnLnRvYycsXG5cdCcuVG9jJyxcblx0JyN0b2MnLFxuXHQnI3RpdGxlJyxcblx0JyNUaXRsZScsXG5cdCdbaHJlZio9XCIvY2F0ZWdvcnlcIl0nLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3JpZXNcIl0nLFxuXHQnW2hyZWYqPVwiL3RhZy9cIl0nLFxuXHQnW2hyZWYqPVwiL3RhZ3MvXCJdJyxcblx0J1tocmVmKj1cIi90b3BpY3NcIl0nLFxuXHQnW2hyZWYqPVwiYXV0aG9yXCJdJyxcblx0J1tocmVmPVwiI3NpdGUtY29udGVudFwiXScsXG5cdCdbc3JjKj1cImF1dGhvclwiXScsXG5cblx0Ly8gZm9vdGVyXG5cdCdmb290ZXInLFxuXG5cdC8vIGlucHV0cywgZm9ybXMsIGVsZW1lbnRzXG5cdCdhc2lkZScsXG5cdCdidXR0b24nLFxuXHRcdC8vICdbcm9sZT1cImJ1dHRvblwiXScsIE1lZGl1bSBpbWFnZXNcblx0J2NhbnZhcycsXG5cdCdkaWFsb2cnLFxuXHQnZmllbGRzZXQnLFxuXHQnZm9ybScsXG5cdCdpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSknLFxuXHQnbGFiZWwnLFxuXHQnbGluaycsXG5cdCdvcHRpb24nLFxuXHQnc2VsZWN0Jyxcblx0J3RleHRhcmVhJyxcblx0J3RpbWUnLFxuXG5cdC8vIGlmcmFtZXNcblx0J2luc3RhcmVhZC1wbGF5ZXInLFxuXHQnaWZyYW1lOm5vdChbc3JjKj1cInlvdXR1YmVcIl0pOm5vdChbc3JjKj1cInlvdXR1LmJlXCJdKTpub3QoW3NyYyo9XCJ2aW1lb1wiXSk6bm90KFtzcmMqPVwidHdpdHRlclwiXSknLFxuXG5cdC8vIGxvZ29zXG5cdCdbY2xhc3M9XCJsb2dvXCIgaV0nLFxuXHQnI2xvZ28nLFxuXHQnI0xvZ28nLFxuXG5cdC8vIG5ld3NsZXR0ZXJcblx0JyNuZXdzbGV0dGVyJyxcblx0JyNOZXdzbGV0dGVyJyxcblxuXHQvLyBoaWRkZW4gZm9yIHByaW50XG5cdCcubm9wcmludCcsXG5cdCdbZGF0YS1saW5rLW5hbWUqPVwic2tpcFwiIGldJyxcblx0J1tkYXRhLXByaW50LWxheW91dD1cImhpZGVcIiBpXScsXG5cdCdbZGF0YS1ibG9jaz1cImRvbm90cHJpbnRcIiBpXScsXG5cblx0Ly8gZm9vdG5vdGVzLCBjaXRhdGlvbnNcblx0J1tjbGFzcyo9XCJjbGlja2FibGUtaWNvblwiIGldJyxcblx0J2xpIHNwYW5bY2xhc3MqPVwibHR4X3RhZ1wiIGldW2NsYXNzKj1cImx0eF90YWdfaXRlbVwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cImFuY2hvclwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cInJlZlwiIGldJyxcblxuXHQvLyBsaW5rIGxpc3RzXG5cdCdbZGF0YS1jb250YWluZXIqPVwibW9zdC12aWV3ZWRcIiBpXScsXG5cblx0Ly8gc2lkZWJhclxuXHQnLnNpZGViYXInLFxuXHQnLlNpZGViYXInLFxuXHQnI3NpZGViYXInLFxuXHQnI1NpZGViYXInLFxuXHQnI3NpdGVzdWInLFxuXHRcblx0Ly8gb3RoZXJcblx0J3RhYmxlLmluZm9ib3gnLFxuXHQnLnBlbmNyYWZ0Om5vdCgucGMtZGlzcGxheS1jb250ZW50cyknLCAvLyBTdWJzdGFja1xuXHQnW2RhdGEtb3B0aW1pemVseT1cInJlbGF0ZWQtYXJ0aWNsZXMtc2VjdGlvblwiIGldJyAvLyBUaGUgRWNvbm9taXN0XG5dO1xuXG4vLyBSZW1vdmFsIHBhdHRlcm5zIHRlc3RlZCBhZ2FpbnN0IGF0dHJpYnV0ZXM6IGNsYXNzLCBpZCwgZGF0YS10ZXN0aWQsIGFuZCBkYXRhLXFhXG4vLyBDYXNlIGluc2Vuc2l0aXZlLCBwYXJ0aWFsIG1hdGNoZXMgYWxsb3dlZFxuY29uc3QgUEFSVElBTF9TRUxFQ1RPUlMgPSBbXG5cdCdhY2Nlc3Mtd2FsbCcsXG5cdCdhY3Rpdml0eXB1YicsXG5cdCdhcHBlbmRpeCcsXG5cdCdhdmF0YXInLFxuXHQnYWR2ZXJ0Jyxcblx0Jy1hZC0nLFxuXHQnX2FkXycsXG5cdCdhbGx0ZXJtcycsXG5cdCdhcm91bmQtdGhlLXdlYicsXG5cdCdhcnRpY2xlX19jb3B5Jyxcblx0J2FydGljbGVfZGF0ZScsXG5cdCdhcnRpY2xlLWVuZCAnLFxuXHQnYXJ0aWNsZV9oZWFkZXInLFxuXHQnYXJ0aWNsZV9faGVhZGVyJyxcblx0J2FydGljbGVfX2luZm8nLFxuXHQnYXJ0aWNsZS1pbmZvJyxcblx0J2FydGljbGVfX21ldGEnLFxuXHQnYXJ0aWNsZS1zdWJqZWN0Jyxcblx0J2FydGljbGVfc3ViamVjdCcsXG5cdCdhcnRpY2xlLXNuaXBwZXQnLFxuXHQnYXJ0aWNsZS1zZXBhcmF0b3InLFxuXHQnYXJ0aWNsZS10YWdzJyxcblx0J2FydGljbGVfdGFncycsXG5cdCdhcnRpY2xlLXRpdGxlJyxcblx0J2FydGljbGVfdGl0bGUnLFxuXHQnYXJ0aWNsZXRvcGljcycsXG5cdCdhcnRpY2xlLXRvcGljcycsXG5cdCdhcnRpY2xlLXR5cGUnLFxuXHQnYXJ0aWNsZS0tbGVkZScsIC8vIFRoZSBWZXJnZVxuXHQnYXNzb2NpYXRlZC1wZW9wbGUnLFxuLy9cdCdhdXRob3InLCBHd2VyblxuXHQnYmFjay10by10b3AnLFxuXHQnYmFja2xpbmtzLXNlY3Rpb24nLFxuXHQnYmFubmVyJyxcblx0J2Jpby1ibG9jaycsXG5cdCdibG9nLXBhZ2VyJyxcblx0J2JvdHRvbS1vZi1hcnRpY2xlJyxcblx0J2JyYW5kLWJhcicsXG5cdCdicmVhZGNydW1iJyxcblx0J2J1dHRvbi13cmFwcGVyJyxcblx0J2J0bi0nLFxuXHQnLWJ0bicsXG5cdCdieWxpbmUnLFxuXHQnY2FwdGNoYScsXG5cdCdjYXRfaGVhZGVyJyxcblx0J2NhdGxpbmtzJyxcblx0J2NoYXB0ZXItbGlzdCcsIC8vIFRoZSBFY29ub21pc3Rcblx0J2NvbGxlY3Rpb25zJyxcblx0J2NvbW1lbnRzJyxcbi8vXHQnLWNvbW1lbnQnLCBTeW50YXggaGlnaGxpZ2h0aW5nXG5cdCdjb21tZW50LWNvdW50Jyxcblx0J2NvbW1lbnQtY29udGVudCcsXG5cdCdjb21tZW50LWZvcm0nLFxuXHQnY29tbWVudC1udW1iZXInLFxuXHQnY29tbWVudC1yZXNwb25kJyxcblx0J2NvbW1lbnQtdGhyZWFkJyxcblx0J2NvbXBsZW1lbnRhcnknLFxuXHQnY29uc2VudCcsXG5cdCdjb250ZW50LWNhcmQnLCAvLyBUaGUgVmVyZ2Vcblx0J2NvbnRlbnQtdG9waWNzJyxcblx0J2NvbnRlbnRwcm9tbycsXG5cdCdjb3JlLWNvbGxhdGVyYWwnLFxuXHQnX2N0YScsXG5cdCctY3RhJyxcblx0J2N0YS0nLFxuXHQnY3RhXycsXG5cdCdjdXJyZW50LWlzc3VlJywgLy8gVGhlIE5hdGlvblxuXHQnY3VzdG9tLWxpc3QtbnVtYmVyJyxcblx0J2RhdGVsaW5lJyxcblx0J2RhdGVoZWFkZXInLFxuXHQnZGF0ZS1oZWFkZXInLFxuXHQnZGF0ZV9oZWFkZXItJyxcbi8vXHQnZGlhbG9nJyxcblx0J2Rpc2NsYWltZXInLFxuXHQnZGlzY2xvc3VyZScsXG5cdCdkaXNjdXNzaW9uJyxcblx0J2Rpc2N1c3NfJyxcblx0J2Rpc3F1cycsXG5cdCdkb25hdGUnLFxuXHQnZHJvcGRvd24nLCAvLyBBcnMgVGVjaG5pY2Fcblx0J2VsZXR0ZXJzJyxcblx0J2VtYWlsc2lnbnVwJyxcblx0J2VuZ2FnZW1lbnQtd2lkZ2V0Jyxcblx0J2VudHJ5LWF1dGhvci1pbmZvJyxcblx0J2VudHJ5LWNhdGVnb3JpZXMnLFxuXHQnZW50cnktZGF0ZScsXG5cdCdlbnRyeS1tZXRhJyxcblx0J2VudHJ5LXRpdGxlJyxcblx0J2VudHJ5LXV0aWxpdHknLFxuXHQnZXllYnJvdycsXG5cdCdleHBhbmQtcmVkdWNlJyxcblx0J2V4dGVybmFsbGlua2VtYmVkd3JhcHBlcicsIC8vIFRoZSBOZXcgWW9ya2VyXG5cdCdleHRyYS10aXRsZScsXG5cdCdmYWNlYm9vaycsXG5cdCdmYXZvcml0ZScsXG5cdCdmZWVkYmFjaycsXG5cdCdmZWVkLWxpbmtzJyxcblx0J2ZpZWxkLXNpdGUtc2VjdGlvbnMnLFxuXHQnZml4ZWQnLFxuXHQnZm9sbG93Jyxcblx0J2Zvb3RlcicsXG5cdCdmb290bm90ZS1iYWNrJyxcblx0J2Zvb3Rub3RlYmFjaycsXG5cdCdmb3IteW91Jyxcblx0J2Zyb250bWF0dGVyJyxcblx0J2Z1cnRoZXItcmVhZGluZycsXG5cdCdnaXN0LW1ldGEnLFxuLy9cdCdnbG9iYWwnLFxuXHQnZ29vZ2xlJyxcblx0J2dvb2ctJyxcblx0J2dyYXBoLXZpZXcnLFxuXHQnaGVhZGVyLWxvZ28nLFxuXHQnaGVhZGVyLXBhdHRlcm4nLCAvLyBUaGUgVmVyZ2Vcblx0J2hlcm8tbGlzdCcsXG5cdCdoaWRlLWZvci1wcmludCcsXG5cdCdoaWRlLXByaW50Jyxcblx0J2hpZGRlbi1zaWRlbm90ZScsXG5cdCdpbnRlcmx1ZGUnLFxuXHQnaW50ZXJhY3Rpb24nLFxuXHQnanVtcGxpbmsnLFxuLy9cdCdrZXl3b3JkJywgLy8gdXNlZCBpbiBzeW50YXggaGlnaGxpZ2h0aW5nXG5cdCdraWNrZXInLFxuXHQnLWxhYmVscycsXG5cdCdsYW5ndWFnZS1uYW1lJyxcblx0J2xhdGVzdC1jb250ZW50Jyxcblx0Jy1sZWRlcy0nLCAvLyBUaGUgVmVyZ2Vcblx0Jy1saWNlbnNlJyxcblx0J2xpbmstYm94Jyxcblx0J2xpbmtzLWdyaWQnLCAvLyBCQkNcblx0J2xpbmtzLXRpdGxlJywgLy8gQkJDXG5cdCdsaXN0aW5nLWR5bmFtaWMtdGVybXMnLCAvLyBCb3N0b24gUmV2aWV3XG5cdCdsb2FkaW5nJyxcblx0J2xvYS1pbmZvJyxcblx0J2xvZ29fY29udGFpbmVyJyxcblx0J2x0eF9yb2xlX3JlZm51bScsIC8vIEFyeGl2XG5cdCdsdHhfdGFnX2JpYml0ZW0nLFxuXHQnbHR4X2Vycm9yJyxcblx0J21hcmtldGluZycsXG5cdCdtZWRpYS1pbnF1aXJ5Jyxcblx0J21lbnUtJyxcblx0J21ldGEtJyxcblx0J21ldGFkYXRhJyxcblx0J21pZ2h0LWxpa2UnLFxuXHQnX21vZGFsJyxcblx0Jy1tb2RhbCcsXG5cdCdtb3JlLScsXG5cdCdtb3JlbmV3cycsXG5cdCdtb3Jlc3RvcmllcycsXG5cdCdtdy1lZGl0c2VjdGlvbicsXG5cdCdtdy1jaXRlLWJhY2tsaW5rJyxcblx0J213LWluZGljYXRvcnMnLFxuXHQnbXctanVtcC1saW5rJyxcblx0J25hdi0nLFxuXHQnbmF2XycsXG5cdCduYXZiYXInLFxuLy9cdCduYXZpZ2F0aW9uJyxcblx0J25leHQtJyxcblx0J25ld3Mtc3RvcnktdGl0bGUnLFxuLy9cdCduZXdzbGV0dGVyJywgdXNlZCBvbiBTdWJzdGFja1xuXHQnbmV3c2xldHRlcl8nLFxuXHQnbmV3c2xldHRlci1zaWdudXAnLFxuXHQnbmV3c2xldHRlcnNpZ251cCcsXG5cdCduZXdzbGV0dGVyd2lkZ2V0Jyxcblx0J25ld3NsZXR0ZXJ3cmFwcGVyJyxcblx0J25vdC1mb3VuZCcsXG5cdCdub21vYmlsZScsXG5cdCdub3ByaW50Jyxcblx0J29yaWdpbmFsbHktcHVibGlzaGVkJywgLy8gTWVyY3VyeSBOZXdzXG5cdCdvdXRsaW5lLXZpZXcnLFxuXHQnb3ZlcmxheScsXG5cdCdwYWdlLXRpdGxlJyxcblx0Jy1wYXJ0bmVycycsXG5cdCdwbGVhJyxcblx0J3BvcHVsYXInLFxuLy9cdCdwb3B1cCcsIEd3ZXJuXG5cdCdwb3AtdXAnLFxuXHQncG9wb3ZlcicsXG5cdCdwb3N0LWJvdHRvbScsXG5cdCdwb3N0X19jYXRlZ29yeScsXG5cdCdwb3N0Y29tbWVudCcsXG5cdCdwb3N0ZGF0ZScsXG5cdCdwb3N0LWRhdGUnLFxuXHQncG9zdF9kYXRlJyxcblx0J3Bvc3QtZmVlZHMnLFxuXHQncG9zdGluZm8nLFxuXHQncG9zdC1pbmZvJyxcblx0J3Bvc3RfaW5mbycsXG5cdCdwb3N0LWlubGluZS1kYXRlJyxcblx0J3Bvc3QtbGlua3MnLFxuXHQncG9zdC1tZXRhJyxcblx0J3Bvc3RtZXRhJyxcblx0J3Bvc3RzbmlwcGV0Jyxcblx0J3Bvc3Rfc25pcHBldCcsXG5cdCdwb3N0LXNuaXBwZXQnLFxuXHQncG9zdHRpdGxlJyxcblx0J3Bvc3QtdGl0bGUnLFxuXHQncG9zdF90aXRsZScsXG5cdCdwb3N0dGF4Jyxcblx0J3Bvc3QtdGF4Jyxcblx0J3Bvc3RfdGF4Jyxcblx0J3Bvc3R0YWcnLFxuXHQncG9zdF90YWcnLFxuXHQncG9zdC10YWcnLFxuLy9cdCdwcmV2aWV3JywgdXNlZCBvbiBPYnNpZGlhbiBQdWJsaXNoXG5cdCdwcmV2bmV4dCcsXG5cdCdwcmV2aW91c25leHQnLFxuXHQncHJpbnQtbm9uZScsXG5cdCdwcmludC1oZWFkZXInLFxuXHQncHJvZmlsZScsXG4vL1x0J3Byb21vJyxcblx0J3B1YmRhdGUnLFxuXHQncHViX2RhdGUnLFxuXHQncHViLWRhdGUnLFxuXHQncHVibGljYXRpb24tZGF0ZScsXG5cdCdwdWJsaWNhdGlvbk5hbWUnLCAvLyBNZWRpdW1cblx0J3FyLWNvZGUnLFxuXHQncXJfY29kZScsXG5cdCdfcmFpbCcsXG5cdCdyZWFkbW9yZScsXG5cdCdyZWFkLW5leHQnLFxuXHQncmVhZF9uZXh0Jyxcblx0J3JlYWRfdGltZScsXG5cdCdyZWFkLXRpbWUnLFxuXHQncmVhZGluZ190aW1lJyxcblx0J3JlYWRpbmctdGltZScsXG5cdCdyZWFkaW5nLWxpc3QnLFxuXHQncmVjZW50cG9zdCcsXG5cdCdyZWNlbnRfcG9zdCcsXG5cdCdyZWNlbnQtcG9zdCcsXG5cdCdyZWNvbW1lbmQnLFxuXHQncmVkaXJlY3RlZGZyb20nLFxuXHQncmVjaXJjJyxcblx0J3JlZ2lzdGVyJyxcblx0J3JlbGF0ZWQnLFxuXHQncmV2ZXJzZWZvb3Rub3RlJyxcblx0J3NjcmVlbi1yZWFkZXItdGV4dCcsXG4vL1x0J3NoYXJlJyxcbi8vXHQnLXNoYXJlJywgc2NpdGVjaGRhaWx5LmNvbVxuXHQnc2hhcmUtYm94Jyxcblx0J3NoYXJlLWljb25zJyxcblx0J3NoYXJlbGlua3MnLFxuXHQnc2hhcmUtc2VjdGlvbicsXG5cdCdzaWRlYmFydGl0bGUnLFxuXHQnc2lkZWJhcl8nLFxuXHQnc2ltaWxhci0nLFxuXHQnc2ltaWxhcl8nLFxuXHQnc2ltaWxhcnMtJyxcblx0J3NpZGVpdGVtcycsXG5cdCdzaWRlLWJveCcsXG5cdCdzaXRlLWluZGV4Jyxcblx0J3NpdGUtaGVhZGVyJyxcblx0J3NpdGUtbG9nbycsXG5cdCdzaXRlLW5hbWUnLFxuLy9cdCdza2lwLScsXG5cdCdza2lwLWxpbmsnLFxuXHQnc29jaWFsJyxcblx0J3NwZWVjaGlmeS1pZ25vcmUnLFxuXHQnc3BvbnNvcicsXG4vL1x0Jy1zdGF0cycsXG5cdCdfc3RhdHMnLFxuXHQnc3RpY2t5Jyxcblx0J3N0b3J5cmVhZHRpbWUnLCAvLyBNZWRpdW1cblx0J3N0b3J5cHVibGlzaGRhdGUnLCAvLyBNZWRpdW1cblx0J3N1YmplY3QtbGFiZWwnLFxuXHQnc3Vic2NyaWJlJyxcblx0J190YWdzJyxcblx0J3RhZ3NfX2l0ZW0nLFxuXHQndGFnX2xpc3QnLFxuXHQndGF4b25vbXknLFxuXHQndGFibGUtb2YtY29udGVudHMnLFxuXHQndGFicy0nLFxuLy9cdCd0ZWFzZXInLCBOYXR1cmVcblx0J3Rlcm1pbmFsdG91dCcsXG5cdCd0aW1lLXJ1YnJpYycsXG5cdCd0aW1lc3RhbXAnLFxuXHQndGlwX29mZicsXG5cdCd0aXB0b3V0Jyxcblx0Jy10b2MnLFxuXHQndG9waWMtbGlzdCcsXG5cdCd0b29sYmFyJyxcblx0J3Rvb2x0aXAnLFxuXHQndG9wLXdyYXBwZXInLFxuXHQndHJlZS1pdGVtJyxcblx0J3RyZW5kaW5nJyxcblx0J3RydXN0LWZlYXQnLFxuXHQndHJ1c3QtYmFkZ2UnLFxuXHQndHdpdHRlcicsXG5cdCd2aXN1YWxseS1oaWRkZW4nLFxuXHQnd2VsY29tZWJveCdcbl07XG5cbi8vIFNlbGVjdG9ycyBmb3IgZm9vdG5vdGVzIGFuZCBjaXRhdGlvbnNcbmNvbnN0IEZPT1ROT1RFX0lOTElORV9SRUZFUkVOQ0VTID0gW1xuXHQnc3VwLnJlZmVyZW5jZScsXG5cdCdjaXRlLmx0eF9jaXRlJyxcblx0J3N1cFtpZF49XCJmbnJcIl0nLFxuXHQnc3VwW2lkXj1cImZucmVmOlwiXScsXG5cdCdzcGFuLmZvb3Rub3RlLWxpbmsnLFxuXHQnYS5jaXRhdGlvbicsXG5cdCdhW2lkXj1cInJlZi1saW5rXCJdJyxcblx0J2FbaHJlZl49XCIjZm5cIl0nLFxuXHQnYVtocmVmXj1cIiNjaXRlXCJdJyxcblx0J2FbaHJlZl49XCIjcmVmZXJlbmNlXCJdJyxcblx0J2FbaHJlZl49XCIjZm9vdG5vdGVcIl0nLFxuXHQnYVtocmVmXj1cIiNyXCJdJywgLy8gQ29tbW9uIGluIGFjYWRlbWljIHBhcGVyc1xuXHQnYVtocmVmXj1cIiNiXCJdJywgLy8gQ29tbW9uIGZvciBiaWJsaW9ncmFwaHkgcmVmZXJlbmNlc1xuXHQnYVtocmVmKj1cImNpdGVfbm90ZVwiXScsXG5cdCdhW2hyZWYqPVwiY2l0ZV9yZWZcIl0nLFxuXHQnYS5mb290bm90ZS1hbmNob3InLCAvLyBTdWJzdGFja1xuXHQnc3Bhbi5mb290bm90ZS1ob3ZlcmNhcmQtdGFyZ2V0IGEnLCAvLyBTdWJzdGFja1xuXHQnYVtyb2xlPVwiZG9jLWJpYmxpb3JlZlwiXScsIC8vIFNjaWVuY2Uub3JnXG5cdCdhW2lkXj1cImZucmVmXCJdJyxcblx0J2FbaWRePVwicmVmLWxpbmtcIl0nLCAvLyBOYXR1cmUuY29tXG5dLmpvaW4oJywnKTtcblxuY29uc3QgRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMgPSBbXG5cdCdkaXYuZm9vdG5vdGUgb2wnLFxuXHQnZGl2LmZvb3Rub3RlcyBvbCcsXG5cdCdkaXZbcm9sZT1cImRvYy1lbmRub3Rlc1wiXScsXG5cdCdkaXZbcm9sZT1cImRvYy1mb290bm90ZXNcIl0nLFxuXHQnb2wuZm9vdG5vdGVzLWxpc3QnLFxuXHQnb2wuZm9vdG5vdGVzJyxcblx0J29sLnJlZmVyZW5jZXMnLFxuXHQnb2xbY2xhc3MqPVwiYXJ0aWNsZS1yZWZlcmVuY2VzXCJdJyxcblx0J3NlY3Rpb24uZm9vdG5vdGVzIG9sJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1lbmRub3Rlc1wiXScsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtZm9vdG5vdGVzXCJdJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1iaWJsaW9ncmFwaHlcIl0nLFxuXHQndWwuZm9vdG5vdGVzLWxpc3QnLFxuXHQndWwubHR4X2JpYmxpc3QnLFxuXHQnZGl2LmZvb3Rub3RlW2RhdGEtY29tcG9uZW50LW5hbWU9XCJGb290bm90ZVRvRE9NXCJdJyAvLyBTdWJzdGFja1xuXS5qb2luKCcsJyk7XG5cbi8vIEVsZW1lbnRzIHRoYXQgYXJlIGFsbG93ZWQgdG8gYmUgZW1wdHlcbi8vIFRoZXNlIGFyZSBub3QgcmVtb3ZlZCBldmVuIGlmIHRoZXkgaGF2ZSBubyBjb250ZW50XG5jb25zdCBBTExPV0VEX0VNUFRZX0VMRU1FTlRTID0gbmV3IFNldChbXG5cdCdhcmVhJyxcblx0J2F1ZGlvJyxcblx0J2Jhc2UnLFxuXHQnYnInLFxuXHQnY2lyY2xlJyxcblx0J2NvbCcsXG5cdCdkZWZzJyxcblx0J2VsbGlwc2UnLFxuXHQnZW1iZWQnLFxuXHQnZmlndXJlJyxcblx0J2cnLFxuXHQnaHInLFxuXHQnaWZyYW1lJyxcblx0J2ltZycsXG5cdCdpbnB1dCcsXG5cdCdsaW5lJyxcblx0J2xpbmsnLFxuXHQnbWFzaycsXG5cdCdtZXRhJyxcblx0J29iamVjdCcsXG5cdCdwYXJhbScsXG5cdCdwYXRoJyxcblx0J3BhdHRlcm4nLFxuXHQncGljdHVyZScsXG5cdCdwb2x5Z29uJyxcblx0J3BvbHlsaW5lJyxcblx0J3JlY3QnLFxuXHQnc291cmNlJyxcblx0J3N0b3AnLFxuXHQnc3ZnJyxcblx0J3RkJyxcblx0J3RoJyxcblx0J3RyYWNrJyxcblx0J3VzZScsXG5cdCd2aWRlbycsXG5cdCd3YnInXG5dKTtcblxuLy8gQXR0cmlidXRlcyB0byBrZWVwXG5jb25zdCBBTExPV0VEX0FUVFJJQlVURVMgPSBuZXcgU2V0KFtcblx0J2FsdCcsXG5cdCdhbGxvdycsXG5cdCdhbGxvd2Z1bGxzY3JlZW4nLFxuXHQnYXJpYS1sYWJlbCcsXG5cdCdjbGFzcycsXG5cdCdjaGVja2VkJyxcblx0J2NvbHNwYW4nLFxuXHQnY29udHJvbHMnLFxuXHQnZGF0YS1zcmMnLFxuXHQnZGF0YS1zcmNzZXQnLFxuXHQnZGF0YS1sYW5nJyxcblx0J2RpcicsXG5cdCdmcmFtZWJvcmRlcicsXG5cdCdoZWFkZXJzJyxcblx0J2hlaWdodCcsXG5cdCdocmVmJyxcblx0J2lkJyxcblx0J2xhbmcnLFxuXHQncm9sZScsXG5cdCdyb3dzcGFuJyxcblx0J3NyYycsXG5cdCdzcmNzZXQnLFxuXHQndGl0bGUnLFxuXHQndHlwZScsXG5cdCd3aWR0aCdcbl0pO1xuXG4vLyBTdXBwb3J0ZWQgbGFuZ3VhZ2VzIGZvciBjb2RlIGJsb2Nrc1xuY29uc3QgU1VQUE9SVEVEX0xBTkdVQUdFUyA9IG5ldyBTZXQoW1xuXHQvLyBNYXJrdXAgJiBXZWJcblx0J21hcmt1cCcsICdodG1sJywgJ3htbCcsICdzdmcnLCAnbWF0aG1sJywgJ3NzbWwnLCAnYXRvbScsICdyc3MnLFxuXHQnamF2YXNjcmlwdCcsICdqcycsICdqc3gnLCAndHlwZXNjcmlwdCcsICd0cycsICd0c3gnLFxuXHQnd2ViYXNzZW1ibHknLCAnd2FzbScsXG5cdFxuXHQvLyBDb21tb24gUHJvZ3JhbW1pbmcgTGFuZ3VhZ2VzXG5cdCdweXRob24nLFxuXHQnamF2YScsXG5cdCdjc2hhcnAnLCAnY3MnLCAnZG90bmV0JywgJ2FzcG5ldCcsXG5cdCdjcHAnLCAnYysrJywgJ2MnLCAnb2JqYycsXG5cdCdydWJ5JywgJ3JiJyxcblx0J3BocCcsXG5cdCdnb2xhbmcnLFxuXHQncnVzdCcsXG5cdCdzd2lmdCcsXG5cdCdrb3RsaW4nLFxuXHQnc2NhbGEnLFxuXHQnZGFydCcsXG5cdFxuXHQvLyBTaGVsbCAmIFNjcmlwdGluZ1xuXHQnYmFzaCcsICdzaGVsbCcsICdzaCcsXG5cdCdwb3dlcnNoZWxsJyxcblx0J2JhdGNoJyxcblx0XG5cdC8vIERhdGEgJiBDb25maWdcblx0J2pzb24nLCAnanNvbnAnLFxuXHQneWFtbCcsICd5bWwnLFxuXHQndG9tbCcsXG5cdCdkb2NrZXJmaWxlJyxcblx0J2dpdGlnbm9yZScsXG5cdFxuXHQvLyBRdWVyeSBMYW5ndWFnZXNcblx0J3NxbCcsICdteXNxbCcsICdwb3N0Z3Jlc3FsJyxcblx0J2dyYXBocWwnLFxuXHQnbW9uZ29kYicsXG5cdCdzcGFycWwnLFxuXHRcblx0Ly8gTWFya3VwICYgRG9jdW1lbnRhdGlvblxuXHQnbWFya2Rvd24nLCAnbWQnLFxuXHQnbGF0ZXgnLCAndGV4Jyxcblx0J2FzY2lpZG9jJywgJ2Fkb2MnLFxuXHQnanNkb2MnLFxuXHRcblx0Ly8gRnVuY3Rpb25hbCBMYW5ndWFnZXNcblx0J2hhc2tlbGwnLCAnaHMnLFxuXHQnZWxtJyxcblx0J2VsaXhpcicsXG5cdCdlcmxhbmcnLFxuXHQnb2NhbWwnLFxuXHQnZnNoYXJwJyxcblx0J3NjaGVtZScsXG5cdCdsaXNwJywgJ2VsaXNwJyxcblx0J2Nsb2p1cmUnLFxuXHRcblx0Ly8gT3RoZXIgTGFuZ3VhZ2VzXG5cdCdtYXRsYWInLFxuXHQnZm9ydHJhbicsXG5cdCdjb2JvbCcsXG5cdCdwYXNjYWwnLFxuXHQncGVybCcsXG5cdCdsdWEnLFxuXHQnanVsaWEnLFxuXHQnZ3Jvb3Z5Jyxcblx0J2NyeXN0YWwnLFxuXHQnbmltJyxcblx0J3ppZycsXG5cdFxuXHQvLyBEb21haW4gU3BlY2lmaWNcblx0J3JlZ2V4Jyxcblx0J2dyYWRsZScsXG5cdCdjbWFrZScsXG5cdCdtYWtlZmlsZScsXG5cdCduaXgnLFxuXHQndGVycmFmb3JtJyxcblx0J3NvbGlkaXR5Jyxcblx0J2dsc2wnLFxuXHQnaGxzbCcsXG5cdFxuXHQvLyBBc3NlbWJseVxuXHQnbmFzbScsXG5cdCdtYXNtJyxcblx0J2FybWFzbScsXG5cdFxuXHQvLyBHYW1lIERldmVsb3BtZW50XG5cdCdnZHNjcmlwdCcsXG5cdCd1bnJlYWxzY3JpcHQnLFxuXHRcblx0Ly8gT3RoZXJzXG5cdCdhYmFwJyxcblx0J2FjdGlvbnNjcmlwdCcsXG5cdCdhZGEnLFxuXHQnYWdkYScsXG5cdCdhbnRscjQnLFxuXHQnYXBwbGVzY3JpcHQnLFxuXHQnYXJkdWlubycsXG5cdCdjb2ZmZWVzY3JpcHQnLFxuXHQnZGphbmdvJyxcblx0J2VybGFuZycsXG5cdCdmb3J0cmFuJyxcblx0J2hheGUnLFxuXHQnaWRyaXMnLFxuXHQna290bGluJyxcblx0J2xpdmVzY3JpcHQnLFxuXHQnbWF0bGFiJyxcblx0J25naW54Jyxcblx0J3Bhc2NhbCcsXG5cdCdwcm9sb2cnLFxuXHQncHVwcGV0Jyxcblx0J3NjYWxhJyxcblx0J3NjaGVtZScsXG5cdCd0Y2wnLFxuXHQndmVyaWxvZycsXG5cdCd2aGRsJ1xuXSk7XG5cblxuLy8gRWxlbWVudCBzdGFuZGFyZGl6YXRpb24gcnVsZXNcbi8vIE1hcHMgc2VsZWN0b3JzIHRvIHRoZWlyIHRhcmdldCBIVE1MIGVsZW1lbnQgbmFtZVxuaW50ZXJmYWNlIFN0YW5kYXJkaXphdGlvblJ1bGUge1xuXHRzZWxlY3Rvcjogc3RyaW5nO1xuXHRlbGVtZW50OiBzdHJpbmc7XG5cdHRyYW5zZm9ybT86IChlbDogRWxlbWVudCkgPT4gRWxlbWVudDtcbn1cblxuY29uc3QgRUxFTUVOVF9TVEFOREFSRElaQVRJT05fUlVMRVM6IFN0YW5kYXJkaXphdGlvblJ1bGVbXSA9IFtcblx0Ly8gQ29kZSBibG9ja3Ncblx0e1xuXHRcdHNlbGVjdG9yOiAncHJlJyxcblx0XHRlbGVtZW50OiAncHJlJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybiBlbDtcblxuXHRcdFx0Ly8gRnVuY3Rpb24gdG8gZ2V0IGxhbmd1YWdlIGZyb20gY2xhc3Ncblx0XHRcdGNvbnN0IGdldExhbmd1YWdlRnJvbUNsYXNzID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nID0+IHtcblx0XHRcdFx0Ly8gQ2hlY2sgZGF0YS1sYW5nIGF0dHJpYnV0ZSBmaXJzdFxuXHRcdFx0XHRjb25zdCBkYXRhTGFuZyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxhbmcnKTtcblx0XHRcdFx0aWYgKGRhdGFMYW5nKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGFMYW5nLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBEZWZpbmUgbGFuZ3VhZ2UgcGF0dGVybnNcblx0XHRcdFx0Y29uc3QgbGFuZ3VhZ2VQYXR0ZXJucyA9IFtcblx0XHRcdFx0XHQvXmxhbmd1YWdlLShcXHcrKSQvLCAgICAgICAgICAvLyBsYW5ndWFnZS1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15sYW5nLShcXHcrKSQvLCAgICAgICAgICAgICAgLy8gbGFuZy1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L14oXFx3KyktY29kZSQvLCAgICAgICAgICAgICAgLy8gamF2YXNjcmlwdC1jb2RlXG5cdFx0XHRcdFx0L15jb2RlLShcXHcrKSQvLCAgICAgICAgICAgICAgLy8gY29kZS1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15zeW50YXgtKFxcdyspJC8sICAgICAgICAgICAgLy8gc3ludGF4LWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXmNvZGUtc25pcHBldF9fKFxcdyspJC8sICAgICAvLyBjb2RlLXNuaXBwZXRfX2phdmFzY3JpcHRcblx0XHRcdFx0XHQvXmhpZ2hsaWdodC0oXFx3KykkLywgICAgICAgICAvLyBoaWdobGlnaHQtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eKFxcdyspLXNuaXBwZXQkLyAgICAgICAgICAgIC8vIGphdmFzY3JpcHQtc25pcHBldFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdC8vIFRoZW4gY2hlY2sgdGhlIGNsYXNzIGF0dHJpYnV0ZSBmb3IgcGF0dGVybnNcblx0XHRcdFx0aWYgKGVsZW1lbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHBhdHRlcm4gb2YgbGFuZ3VhZ2VQYXR0ZXJucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpLm1hdGNoKHBhdHRlcm4pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBUaGVuIGNoZWNrIGZvciBzdXBwb3J0ZWQgbGFuZ3VhZ2Vcblx0XHRcdFx0XHRpZiAoU1VQUE9SVEVEX0xBTkdVQUdFUy5oYXMoZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KTtcblx0XHRcdFx0XG5cdFx0XHRcdGZvciAoY29uc3QgY2xhc3NOYW1lIG9mIGNsYXNzTmFtZXMpIHtcblx0XHRcdFx0XHQvLyBDaGVjayBwYXR0ZXJucyBmaXJzdFxuXHRcdFx0XHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBsYW5ndWFnZVBhdHRlcm5zKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGNsYXNzTmFtZS5tYXRjaChwYXR0ZXJuKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPbmx5IGNoZWNrIGJhcmUgbGFuZ3VhZ2UgbmFtZXMgaWYgbm8gcGF0dGVybnMgd2VyZSBmb3VuZFxuXHRcdFx0XHRmb3IgKGNvbnN0IGNsYXNzTmFtZSBvZiBjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0aWYgKFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKGNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAnJztcblx0XHRcdH07XG5cblx0XHRcdC8vIFRyeSB0byBnZXQgdGhlIGxhbmd1YWdlIGZyb20gdGhlIGVsZW1lbnQgYW5kIGl0cyBhbmNlc3RvcnNcblx0XHRcdGxldCBsYW5ndWFnZSA9ICcnO1xuXHRcdFx0bGV0IGN1cnJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBlbDtcblx0XHRcdFxuXHRcdFx0d2hpbGUgKGN1cnJlbnRFbGVtZW50ICYmICFsYW5ndWFnZSkge1xuXHRcdFx0XHRsYW5ndWFnZSA9IGdldExhbmd1YWdlRnJvbUNsYXNzKGN1cnJlbnRFbGVtZW50KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFsc28gY2hlY2sgZm9yIGNvZGUgZWxlbWVudHMgd2l0aGluIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0XHRcdFx0aWYgKCFsYW5ndWFnZSAmJiBjdXJyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjb2RlJykpIHtcblx0XHRcdFx0XHRsYW5ndWFnZSA9IGdldExhbmd1YWdlRnJvbUNsYXNzKGN1cnJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKSEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZ1bmN0aW9uIHRvIHJlY3Vyc2l2ZWx5IGV4dHJhY3QgdGV4dCBjb250ZW50IHdoaWxlIHByZXNlcnZpbmcgc3RydWN0dXJlXG5cdFx0XHRjb25zdCBleHRyYWN0U3RydWN0dXJlZFRleHQgPSAoZWxlbWVudDogTm9kZSk6IHN0cmluZyA9PiB7XG5cdFx0XHRcdGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRsZXQgdGV4dCA9ICcnO1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG5cdFx0XHRcdFx0Ly8gSGFuZGxlIGxpbmUgYnJlYWtzXG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0JSJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdcXG4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBIYW5kbGUgY29kZSBlbGVtZW50cyBhbmQgdGhlaXIgY2hpbGRyZW5cblx0XHRcdFx0XHRlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZCA9PiB7XG5cdFx0XHRcdFx0XHR0ZXh0ICs9IGV4dHJhY3RTdHJ1Y3R1cmVkVGV4dChjaGlsZCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQWRkIG5ld2xpbmUgYWZ0ZXIgZWFjaCBjb2RlIGVsZW1lbnRcblx0XHRcdFx0XHRpZiAoZWxlbWVudC50YWdOYW1lID09PSAnQ09ERScpIHtcblx0XHRcdFx0XHRcdHRleHQgKz0gJ1xcbic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0ZXh0O1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gRXh0cmFjdCBhbGwgdGV4dCBjb250ZW50XG5cdFx0XHRsZXQgY29kZUNvbnRlbnQgPSBleHRyYWN0U3RydWN0dXJlZFRleHQoZWwpO1xuXG5cdFx0XHQvLyBDbGVhbiB1cCB0aGUgY29udGVudFxuXHRcdFx0Y29kZUNvbnRlbnQgPSBjb2RlQ29udGVudFxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IGV4dHJhIG5ld2xpbmVzIGF0IHRoZSBzdGFydFxuXHRcdFx0XHQucmVwbGFjZSgvXlxcbisvLCAnJylcblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSBleHRyYSBuZXdsaW5lcyBhdCB0aGUgZW5kXG5cdFx0XHRcdC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuXHRcdFx0XHQvLyBSZXBsYWNlIG11bHRpcGxlIGNvbnNlY3V0aXZlIG5ld2xpbmVzIHdpdGggYSBzaW5nbGUgbmV3bGluZVxuXHRcdFx0XHQucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJyk7XG5cblx0XHRcdC8vIENyZWF0ZSBuZXcgcHJlIGVsZW1lbnRcblx0XHRcdGNvbnN0IG5ld1ByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuXHRcdFx0XG5cdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlc1xuXHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0bmV3UHJlLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGNvZGUgZWxlbWVudFxuXHRcdFx0Y29uc3QgY29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcblx0XHRcdGlmIChsYW5ndWFnZSkge1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYW5nJywgbGFuZ3VhZ2UpO1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgbGFuZ3VhZ2UtJHtsYW5ndWFnZX1gKTtcblx0XHRcdH1cblx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBjb2RlQ29udGVudDtcblx0XHRcdFxuXHRcdFx0bmV3UHJlLmFwcGVuZENoaWxkKGNvZGUpO1xuXHRcdFx0cmV0dXJuIG5ld1ByZTtcblx0XHR9XG5cdH0sXG5cdC8vIFNpbXBsaWZ5IGhlYWRpbmdzIGJ5IHJlbW92aW5nIGludGVybmFsIG5hdmlnYXRpb24gZWxlbWVudHNcblx0e1xuXHRcdHNlbGVjdG9yOiAnaDEsIGgyLCBoMywgaDQsIGg1LCBoNicsXG5cdFx0ZWxlbWVudDogJ2tlZXAnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHQvLyBJZiBoZWFkaW5nIG9ubHkgY29udGFpbnMgYSBzaW5nbGUgYW5jaG9yIHdpdGggaW50ZXJuYWwgbGlua1xuXHRcdFx0aWYgKGVsLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBcblx0XHRcdFx0ZWwuZmlyc3RFbGVtZW50Q2hpbGQ/LnRhZ05hbWUgPT09ICdBJyAmJlxuXHRcdFx0XHQoZWwuZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJyk/LmluY2x1ZGVzKCcjJykgfHwgXG5cdFx0XHRcdCBlbC5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKT8uc3RhcnRzV2l0aCgnIycpKSkge1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ3JlYXRlIG5ldyBoZWFkaW5nIG9mIHNhbWUgbGV2ZWxcblx0XHRcdFx0Y29uc3QgbmV3SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwudGFnTmFtZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlcyBmcm9tIG9yaWdpbmFsIGhlYWRpbmdcblx0XHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRcdG5ld0hlYWRpbmcuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEp1c3QgdXNlIHRoZSB0ZXh0IGNvbnRlbnRcblx0XHRcdFx0bmV3SGVhZGluZy50ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gbmV3SGVhZGluZztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gSWYgaGVhZGluZyBjb250YWlucyBuYXZpZ2F0aW9uIGJ1dHRvbnMgb3Igb3RoZXIgdXRpbGl0eSBlbGVtZW50c1xuXHRcdFx0Y29uc3QgYnV0dG9ucyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXHRcdFx0aWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBuZXdIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbC50YWdOYW1lKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0XHRuZXdIZWFkaW5nLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBKdXN0IHVzZSB0aGUgdGV4dCBjb250ZW50XG5cdFx0XHRcdG5ld0hlYWRpbmcudGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIG5ld0hlYWRpbmc7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHJldHVybiBlbDtcblx0XHR9XG5cdH0sXG5cdC8vIENvbnZlcnQgZGl2cyB3aXRoIHBhcmFncmFwaCByb2xlIHRvIGFjdHVhbCBwYXJhZ3JhcGhzXG5cdHsgXG5cdFx0c2VsZWN0b3I6ICdkaXZbZGF0YS10ZXN0aWRePVwicGFyYWdyYXBoXCJdLCBkaXZbcm9sZT1cInBhcmFncmFwaFwiXScsIFxuXHRcdGVsZW1lbnQ6ICdwJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ29weSBpbm5lckhUTUxcblx0XHRcdHAuaW5uZXJIVE1MID0gZWwuaW5uZXJIVE1MO1xuXHRcdFx0XG5cdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlc1xuXHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0cC5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiBwO1xuXHRcdH1cblx0fSxcblx0Ly8gQ29udmVydCBkaXZzIHdpdGggbGlzdCByb2xlcyB0byBhY3R1YWwgbGlzdHNcblx0eyBcblx0XHRzZWxlY3RvcjogJ2Rpdltyb2xlPVwibGlzdFwiXScsIFxuXHRcdGVsZW1lbnQ6ICd1bCcsXG5cdFx0Ly8gQ3VzdG9tIGhhbmRsZXIgZm9yIGxpc3QgdHlwZSBkZXRlY3Rpb24gYW5kIHRyYW5zZm9ybWF0aW9uXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdC8vIEZpcnN0IGRldGVybWluZSBpZiB0aGlzIGlzIGFuIG9yZGVyZWQgbGlzdFxuXHRcdFx0Y29uc3QgZmlyc3RJdGVtID0gZWwucXVlcnlTZWxlY3RvcignZGl2W3JvbGU9XCJsaXN0aXRlbVwiXSAubGFiZWwnKTtcblx0XHRcdGNvbnN0IGxhYmVsID0gZmlyc3RJdGVtPy50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0Y29uc3QgaXNPcmRlcmVkID0gbGFiZWwubWF0Y2goL15cXGQrXFwpLyk7XG5cdFx0XHRcblx0XHRcdC8vIENyZWF0ZSB0aGUgYXBwcm9wcmlhdGUgbGlzdCB0eXBlXG5cdFx0XHRjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpc09yZGVyZWQgPyAnb2wnIDogJ3VsJyk7XG5cdFx0XHRcblx0XHRcdC8vIFByb2Nlc3MgZWFjaCBsaXN0IGl0ZW1cblx0XHRcdGNvbnN0IGl0ZW1zID0gZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScpO1xuXHRcdFx0aXRlbXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdFx0Y29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGNvbnRlbnQpIHtcblx0XHRcdFx0XHQvLyBDb252ZXJ0IGFueSBwYXJhZ3JhcGggZGl2cyBpbnNpZGUgY29udGVudFxuXHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaERpdnMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwicGFyYWdyYXBoXCJdJyk7XG5cdFx0XHRcdFx0cGFyYWdyYXBoRGl2cy5mb3JFYWNoKGRpdiA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdFx0cC5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIENvbnZlcnQgYW55IG5lc3RlZCBsaXN0cyByZWN1cnNpdmVseVxuXHRcdFx0XHRcdGNvbnN0IG5lc3RlZExpc3RzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImxpc3RcIl0nKTtcblx0XHRcdFx0XHRuZXN0ZWRMaXN0cy5mb3JFYWNoKG5lc3RlZExpc3QgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgZmlyc3ROZXN0ZWRJdGVtID0gbmVzdGVkTGlzdC5xdWVyeVNlbGVjdG9yKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdIC5sYWJlbCcpO1xuXHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkTGFiZWwgPSBmaXJzdE5lc3RlZEl0ZW0/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdFx0XHRjb25zdCBpc05lc3RlZE9yZGVyZWQgPSBuZXN0ZWRMYWJlbC5tYXRjaCgvXlxcZCtcXCkvKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Y29uc3QgbmV3TmVzdGVkTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXNOZXN0ZWRPcmRlcmVkID8gJ29sJyA6ICd1bCcpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBQcm9jZXNzIG5lc3RlZCBpdGVtc1xuXHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkSXRlbXMgPSBuZXN0ZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0nKTtcblx0XHRcdFx0XHRcdG5lc3RlZEl0ZW1zLmZvckVhY2gobmVzdGVkSXRlbSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZExpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkQ29udGVudCA9IG5lc3RlZEl0ZW0ucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdGlmIChuZXN0ZWRDb250ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ29udmVydCBwYXJhZ3JhcGggZGl2cyBpbiBuZXN0ZWQgaXRlbXNcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRQYXJhZ3JhcGhzID0gbmVzdGVkQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cInBhcmFncmFwaFwiXScpO1xuXHRcdFx0XHRcdFx0XHRcdG5lc3RlZFBhcmFncmFwaHMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0XHRcdFx0XHRcdHAuaW5uZXJIVE1MID0gZGl2LmlubmVySFRNTDtcblx0XHRcdFx0XHRcdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChwKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRuZXN0ZWRMaS5pbm5lckhUTUwgPSBuZXN0ZWRDb250ZW50LmlubmVySFRNTDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0bmV3TmVzdGVkTGlzdC5hcHBlbmRDaGlsZChuZXN0ZWRMaSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0bmVzdGVkTGlzdC5yZXBsYWNlV2l0aChuZXdOZXN0ZWRMaXN0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsaS5pbm5lckhUTUwgPSBjb250ZW50LmlubmVySFRNTDtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0bGlzdC5hcHBlbmRDaGlsZChsaSk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIGxpc3Q7XG5cdFx0fVxuXHR9LFxuXHR7IFxuXHRcdHNlbGVjdG9yOiAnZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScsIFxuXHRcdGVsZW1lbnQ6ICdsaScsXG5cdFx0Ly8gQ3VzdG9tIGhhbmRsZXIgZm9yIGxpc3QgaXRlbSBjb250ZW50XG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGNvbnN0IGNvbnRlbnQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHRcdFx0aWYgKCFjb250ZW50KSByZXR1cm4gZWw7XG5cdFx0XHRcblx0XHRcdC8vIENvbnZlcnQgYW55IHBhcmFncmFwaCBkaXZzIGluc2lkZSBjb250ZW50XG5cdFx0XHRjb25zdCBwYXJhZ3JhcGhEaXZzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cInBhcmFncmFwaFwiXScpO1xuXHRcdFx0cGFyYWdyYXBoRGl2cy5mb3JFYWNoKGRpdiA9PiB7XG5cdFx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdHAuaW5uZXJIVE1MID0gZGl2LmlubmVySFRNTDtcblx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdH1cblx0fSxcblx0Ly8gQ29kZSBibG9ja3Mgd2l0aCBzeW50YXggaGlnaGxpZ2h0aW5nXG5cdHtcblx0XHRzZWxlY3RvcjogJy53cC1ibG9jay1zeW50YXhoaWdobGlnaHRlci1jb2RlLCAuc3ludGF4aGlnaGxpZ2h0ZXIsIC5oaWdobGlnaHQsIC5oaWdobGlnaHQtc291cmNlLCAud3AtYmxvY2stY29kZSwgcHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgcHJlW2NsYXNzKj1cImJydXNoOlwiXScsXG5cdFx0ZWxlbWVudDogJ3ByZScsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm4gZWw7XG5cblx0XHRcdC8vIENyZWF0ZSBuZXcgcHJlIGVsZW1lbnRcblx0XHRcdGNvbnN0IG5ld1ByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuXHRcdFx0XG5cdFx0XHQvLyBUcnkgdG8gZGV0ZWN0IGxhbmd1YWdlXG5cdFx0XHRsZXQgbGFuZ3VhZ2UgPSAnJztcblx0XHRcdFxuXHRcdFx0Ly8gQ2hlY2sgZm9yIFdvcmRQcmVzcyBzeW50YXggaGlnaGxpZ2h0ZXIgc3BlY2lmaWMgZm9ybWF0XG5cdFx0XHRjb25zdCBzeW50YXhFbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zeW50YXhoaWdobGlnaHRlcicpO1xuXHRcdFx0aWYgKHN5bnRheEVsKSB7XG5cdFx0XHRcdC8vIEdldCBsYW5ndWFnZSBmcm9tIHN5bnRheGhpZ2hsaWdodGVyIGNsYXNzXG5cdFx0XHRcdGNvbnN0IGNsYXNzZXMgPSBBcnJheS5mcm9tKHN5bnRheEVsLmNsYXNzTGlzdCk7XG5cdFx0XHRcdGNvbnN0IGxhbmdDbGFzcyA9IGNsYXNzZXMuZmluZChjID0+ICFbJ3N5bnRheGhpZ2hsaWdodGVyJywgJ25vZ3V0dGVyJ10uaW5jbHVkZXMoYykpO1xuXHRcdFx0XHRpZiAobGFuZ0NsYXNzICYmIFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKGxhbmdDbGFzcy50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdGxhbmd1YWdlID0gbGFuZ0NsYXNzLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgbm8gbGFuZ3VhZ2UgZm91bmQgeWV0LCBjaGVjayBvdGhlciBjb21tb24gcGF0dGVybnNcblx0XHRcdGlmICghbGFuZ3VhZ2UpIHtcblx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lcyA9IEFycmF5LmZyb20oZWwuY2xhc3NMaXN0KTtcblx0XHRcdFx0Y29uc3QgbGFuZ3VhZ2VQYXR0ZXJucyA9IFtcblx0XHRcdFx0XHQvKD86XnxcXHMpKD86bGFuZ3VhZ2V8bGFuZ3xicnVzaHxzeW50YXgpLShcXHcrKSg/Olxcc3wkKS9pLFxuXHRcdFx0XHRcdC8oPzpefFxccykoXFx3KykoPzpcXHN8JCkvaVxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgY2xhc3NOYW1lIG9mIGNsYXNzTmFtZXMpIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHBhdHRlcm4gb2YgbGFuZ3VhZ2VQYXR0ZXJucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBjbGFzc05hbWUubWF0Y2gocGF0dGVybik7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2ggJiYgbWF0Y2hbMV0gJiYgU1VQUE9SVEVEX0xBTkdVQUdFUy5oYXMobWF0Y2hbMV0udG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2UgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGxhbmd1YWdlKSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBFeHRyYWN0IGNvZGUgY29udGVudCwgaGFuZGxpbmcgdmFyaW91cyBmb3JtYXRzXG5cdFx0XHRsZXQgY29kZUNvbnRlbnQgPSAnJztcblxuXHRcdFx0Ly8gSGFuZGxlIFdvcmRQcmVzcyBzeW50YXggaGlnaGxpZ2h0ZXIgdGFibGUgZm9ybWF0XG5cdFx0XHRjb25zdCBjb2RlQ29udGFpbmVyID0gZWwucXVlcnlTZWxlY3RvcignLnN5bnRheGhpZ2hsaWdodGVyIHRhYmxlIC5jb2RlIC5jb250YWluZXInKTtcblx0XHRcdGlmIChjb2RlQ29udGFpbmVyKSB7XG5cdFx0XHRcdC8vIFByb2Nlc3MgZWFjaCBsaW5lXG5cdFx0XHRcdGNvbnN0IGxpbmVzID0gQXJyYXkuZnJvbShjb2RlQ29udGFpbmVyLmNoaWxkcmVuKTtcblx0XHRcdFx0Y29kZUNvbnRlbnQgPSBsaW5lc1xuXHRcdFx0XHRcdC5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHQvLyBHZXQgYWxsIGNvZGUgZWxlbWVudHMgaW4gdGhpcyBsaW5lXG5cdFx0XHRcdFx0XHRjb25zdCBjb2RlUGFydHMgPSBBcnJheS5mcm9tKGxpbmUucXVlcnlTZWxlY3RvckFsbCgnY29kZScpKVxuXHRcdFx0XHRcdFx0XHQubWFwKGNvZGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdC8vIEdldCB0aGUgdGV4dCBjb250ZW50LCBwcmVzZXJ2aW5nIHNwYWNlc1xuXHRcdFx0XHRcdFx0XHRcdGxldCB0ZXh0ID0gY29kZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHRcdFx0XHQvLyBJZiB0aGlzIGlzIGEgJ3NwYWNlcycgY2xhc3MgZWxlbWVudCwgY29udmVydCB0byBhY3R1YWwgc3BhY2VzXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzcGFjZXMnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGV4dCA9ICcgJy5yZXBlYXQodGV4dC5sZW5ndGgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0LmpvaW4oJycpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNvZGVQYXJ0cyB8fCBsaW5lLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSGFuZGxlIFdvcmRQcmVzcyBzeW50YXggaGlnaGxpZ2h0ZXIgbm9uLXRhYmxlIGZvcm1hdFxuXHRcdFx0XHRjb25zdCBjb2RlTGluZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY29kZSAubGluZScpO1xuXHRcdFx0XHRpZiAoY29kZUxpbmVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjb2RlQ29udGVudCA9IEFycmF5LmZyb20oY29kZUxpbmVzKVxuXHRcdFx0XHRcdFx0Lm1hcChsaW5lID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29kZVBhcnRzID0gQXJyYXkuZnJvbShsaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGUnKSlcblx0XHRcdFx0XHRcdFx0XHQubWFwKGNvZGUgPT4gY29kZS50ZXh0Q29udGVudCB8fCAnJylcblx0XHRcdFx0XHRcdFx0XHQuam9pbignJyk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2RlUGFydHMgfHwgbGluZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRmFsbGJhY2sgdG8gcmVndWxhciB0ZXh0IGNvbnRlbnRcblx0XHRcdFx0XHRjb2RlQ29udGVudCA9IGVsLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFuIHVwIHRoZSBjb250ZW50XG5cdFx0XHRjb2RlQ29udGVudCA9IGNvZGVDb250ZW50XG5cdFx0XHRcdC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgLy8gVHJpbSBzdGFydC9lbmQgd2hpdGVzcGFjZVxuXHRcdFx0XHQucmVwbGFjZSgvXFx0L2csICcgICAgJykgLy8gQ29udmVydCB0YWJzIHRvIHNwYWNlc1xuXHRcdFx0XHQucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJykgLy8gTm9ybWFsaXplIG11bHRpcGxlIG5ld2xpbmVzXG5cdFx0XHRcdC5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7IC8vIFJlcGxhY2Ugbm9uLWJyZWFraW5nIHNwYWNlcyB3aXRoIHJlZ3VsYXIgc3BhY2VzXG5cblx0XHRcdC8vIENyZWF0ZSBjb2RlIGVsZW1lbnQgd2l0aCBsYW5ndWFnZSBjbGFzcyBpZiBkZXRlY3RlZFxuXHRcdFx0Y29uc3QgY29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcblx0XHRcdGlmIChsYW5ndWFnZSkge1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYW5nJywgbGFuZ3VhZ2UpO1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgbGFuZ3VhZ2UtJHtsYW5ndWFnZX1gKTtcblx0XHRcdH1cblx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBjb2RlQ29udGVudDtcblx0XHRcdFxuXHRcdFx0bmV3UHJlLmFwcGVuZENoaWxkKGNvZGUpO1xuXHRcdFx0cmV0dXJuIG5ld1ByZTtcblx0XHR9XG5cdH1cbl07XG5cbmludGVyZmFjZSBGb290bm90ZURhdGEge1xuXHRjb250ZW50OiBFbGVtZW50IHwgc3RyaW5nO1xuXHRvcmlnaW5hbElkOiBzdHJpbmc7XG5cdHJlZnM6IHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgRm9vdG5vdGVDb2xsZWN0aW9uIHtcblx0W2Zvb3Rub3RlTnVtYmVyOiBudW1iZXJdOiBGb290bm90ZURhdGE7XG59XG5cbmludGVyZmFjZSBDb250ZW50U2NvcmUge1xuXHRzY29yZTogbnVtYmVyO1xuXHRlbGVtZW50OiBFbGVtZW50O1xufVxuXG5pbnRlcmZhY2UgU3R5bGVDaGFuZ2Uge1xuXHRzZWxlY3Rvcjogc3RyaW5nO1xuXHRzdHlsZXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlZnVkZGxlIHtcblx0cHJpdmF0ZSBkb2M6IERvY3VtZW50O1xuXHRwcml2YXRlIG9wdGlvbnM6IERlZnVkZGxlT3B0aW9ucztcblx0cHJpdmF0ZSBkZWJ1ZzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IERlZnVkZGxlIGluc3RhbmNlXG5cdCAqIEBwYXJhbSBkb2MgLSBUaGUgZG9jdW1lbnQgdG8gcGFyc2Vcblx0ICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciBwYXJzaW5nXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihkb2M6IERvY3VtZW50LCBvcHRpb25zOiBEZWZ1ZGRsZU9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuZG9jID0gZG9jO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWcgfHwgZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgdGhlIGRvY3VtZW50IGFuZCBleHRyYWN0IGl0cyBtYWluIGNvbnRlbnRcblx0ICovXG5cdHBhcnNlKCk6IERlZnVkZGxlUmVzcG9uc2Uge1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG5cdFx0Ly8gRXh0cmFjdCBtZXRhZGF0YSBmaXJzdCBzaW5jZSB3ZSdsbCBuZWVkIGl0IGluIG11bHRpcGxlIHBsYWNlc1xuXHRcdGNvbnN0IHNjaGVtYU9yZ0RhdGEgPSBNZXRhZGF0YUV4dHJhY3Rvci5leHRyYWN0U2NoZW1hT3JnRGF0YSh0aGlzLmRvYyk7XG5cdFx0Y29uc3QgbWV0YWRhdGEgPSBNZXRhZGF0YUV4dHJhY3Rvci5leHRyYWN0KHRoaXMuZG9jLCBzY2hlbWFPcmdEYXRhKTtcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBFdmFsdWF0ZSBzdHlsZXMgYW5kIHNpemVzIG9uIG9yaWdpbmFsIGRvY3VtZW50XG5cdFx0XHRjb25zdCBtb2JpbGVTdHlsZXMgPSB0aGlzLl9ldmFsdWF0ZU1lZGlhUXVlcmllcyh0aGlzLmRvYyk7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBzbWFsbCBpbWFnZXMgaW4gb3JpZ2luYWwgZG9jdW1lbnQsIGV4Y2x1ZGluZyBsYXp5LWxvYWRlZCBvbmVzXG5cdFx0XHRjb25zdCBzbWFsbEltYWdlcyA9IHRoaXMuZmluZFNtYWxsSW1hZ2VzKHRoaXMuZG9jKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2xvbmUgZG9jdW1lbnRcblx0XHRcdGNvbnN0IGNsb25lID0gdGhpcy5kb2MuY2xvbmVOb2RlKHRydWUpIGFzIERvY3VtZW50O1xuXHRcdFx0XG5cdFx0XHQvLyBBcHBseSBtb2JpbGUgc3R5bGUgdG8gY2xvbmVcblx0XHRcdHRoaXMuYXBwbHlNb2JpbGVTdHlsZXMoY2xvbmUsIG1vYmlsZVN0eWxlcyk7XG5cblx0XHRcdC8vIEZpbmQgbWFpbiBjb250ZW50XG5cdFx0XHRjb25zdCBtYWluQ29udGVudCA9IHRoaXMuZmluZE1haW5Db250ZW50KGNsb25lKTtcblx0XHRcdGlmICghbWFpbkNvbnRlbnQpIHtcblx0XHRcdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNvbnRlbnQ6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MLFxuXHRcdFx0XHRcdC4uLm1ldGFkYXRhLFxuXHRcdFx0XHRcdHdvcmRDb3VudDogdGhpcy5jb3VudFdvcmRzKHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MKSxcblx0XHRcdFx0XHRwYXJzZVRpbWU6IE1hdGgucm91bmQoZW5kVGltZSAtIHN0YXJ0VGltZSlcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIHNtYWxsIGltYWdlcyBpZGVudGlmaWVkIGZyb20gb3JpZ2luYWwgZG9jdW1lbnRcblx0XHRcdHRoaXMucmVtb3ZlU21hbGxJbWFnZXMoY2xvbmUsIHNtYWxsSW1hZ2VzKTtcblx0XHRcdFxuXHRcdFx0Ly8gUGVyZm9ybSBvdGhlciBkZXN0cnVjdGl2ZSBvcGVyYXRpb25zIG9uIHRoZSBjbG9uZVxuXHRcdFx0dGhpcy5yZW1vdmVIaWRkZW5FbGVtZW50cyhjbG9uZSk7XG5cdFx0XHR0aGlzLnJlbW92ZUNsdXR0ZXIoY2xvbmUpO1xuXG5cdFx0XHQvLyBDbGVhbiB1cCB0aGUgbWFpbiBjb250ZW50XG5cdFx0XHR0aGlzLmNsZWFuQ29udGVudChtYWluQ29udGVudCwgbWV0YWRhdGEpO1xuXG5cdFx0XHRjb25zdCBjb250ZW50ID0gbWFpbkNvbnRlbnQgPyBtYWluQ29udGVudC5vdXRlckhUTUwgOiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTDtcblx0XHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29udGVudCxcblx0XHRcdFx0Li4ubWV0YWRhdGEsXG5cdFx0XHRcdHdvcmRDb3VudDogdGhpcy5jb3VudFdvcmRzKGNvbnRlbnQpLFxuXHRcdFx0XHRwYXJzZVRpbWU6IE1hdGgucm91bmQoZW5kVGltZSAtIHN0YXJ0VGltZSlcblx0XHRcdH07XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlJywgJ0Vycm9yIHByb2Nlc3NpbmcgZG9jdW1lbnQ6JywgZXJyb3IpO1xuXHRcdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29udGVudDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUwsXG5cdFx0XHRcdC4uLm1ldGFkYXRhLFxuXHRcdFx0XHR3b3JkQ291bnQ6IHRoaXMuY291bnRXb3Jkcyh0aGlzLmRvYy5ib2R5LmlubmVySFRNTCksXG5cdFx0XHRcdHBhcnNlVGltZTogTWF0aC5yb3VuZChlbmRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGNvdW50V29yZHMoY29udGVudDogc3RyaW5nKTogbnVtYmVyIHtcblx0XHQvLyBDcmVhdGUgYSB0ZW1wb3JhcnkgZGl2IHRvIHBhcnNlIEhUTUwgY29udGVudFxuXHRcdGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0ZW1wRGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cblx0XHQvLyBHZXQgdGV4dCBjb250ZW50LCByZW1vdmluZyBleHRyYSB3aGl0ZXNwYWNlXG5cdFx0Y29uc3QgdGV4dCA9IHRlbXBEaXYudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0Y29uc3Qgd29yZHMgPSB0ZXh0XG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIFJlcGxhY2UgbXVsdGlwbGUgc3BhY2VzIHdpdGggc2luZ2xlIHNwYWNlXG5cdFx0XHQuc3BsaXQoJyAnKVxuXHRcdFx0LmZpbHRlcih3b3JkID0+IHdvcmQubGVuZ3RoID4gMCk7IC8vIEZpbHRlciBvdXQgZW1wdHkgc3RyaW5nc1xuXG5cdFx0cmV0dXJuIHdvcmRzLmxlbmd0aDtcblx0fVxuXG5cdC8vIE1ha2UgYWxsIG90aGVyIG1ldGhvZHMgcHJpdmF0ZSBieSByZW1vdmluZyB0aGUgc3RhdGljIGtleXdvcmQgYW5kIHVzaW5nIHByaXZhdGVcblx0cHJpdmF0ZSBfbG9nKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdEZWZ1ZGRsZTonLCAuLi5hcmdzKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9ldmFsdWF0ZU1lZGlhUXVlcmllcyhkb2M6IERvY3VtZW50KTogU3R5bGVDaGFuZ2VbXSB7XG5cdFx0Y29uc3QgbW9iaWxlU3R5bGVzOiBTdHlsZUNoYW5nZVtdID0gW107XG5cdFx0Y29uc3QgbWF4V2lkdGhSZWdleCA9IC9tYXgtd2lkdGhbXjpdKjpcXHMqKFxcZCspLztcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBHZXQgYWxsIHN0eWxlcywgaW5jbHVkaW5nIGlubGluZSBzdHlsZXNcblx0XHRcdGNvbnN0IHNoZWV0cyA9IEFycmF5LmZyb20oZG9jLnN0eWxlU2hlZXRzKS5maWx0ZXIoc2hlZXQgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIEFjY2VzcyBydWxlcyBvbmNlIHRvIGNoZWNrIHZhbGlkaXR5XG5cdFx0XHRcdFx0c2hlZXQuY3NzUnVsZXM7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHQvLyBFeHBlY3RlZCBlcnJvciBmb3IgY3Jvc3Mtb3JpZ2luIHN0eWxlc2hlZXRzXG5cdFx0XHRcdFx0aWYgKGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZS5uYW1lID09PSAnU2VjdXJpdHlFcnJvcicpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdC8vIFByb2Nlc3MgYWxsIHNoZWV0cyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0XHRjb25zdCBtZWRpYVJ1bGVzID0gc2hlZXRzLmZsYXRNYXAoc2hlZXQgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJldHVybiBBcnJheS5mcm9tKHNoZWV0LmNzc1J1bGVzKVxuXHRcdFx0XHRcdFx0LmZpbHRlcigocnVsZSk6IHJ1bGUgaXMgQ1NTTWVkaWFSdWxlID0+IFxuXHRcdFx0XHRcdFx0XHRydWxlIGluc3RhbmNlb2YgQ1NTTWVkaWFSdWxlICYmXG5cdFx0XHRcdFx0XHRcdHJ1bGUuY29uZGl0aW9uVGV4dC5pbmNsdWRlcygnbWF4LXdpZHRoJylcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3Mgc3R5bGVzaGVldDonLCBlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gUHJvY2VzcyBhbGwgbWVkaWEgcnVsZXMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdFx0bWVkaWFSdWxlcy5mb3JFYWNoKHJ1bGUgPT4ge1xuXHRcdFx0XHRjb25zdCBtYXRjaCA9IHJ1bGUuY29uZGl0aW9uVGV4dC5tYXRjaChtYXhXaWR0aFJlZ2V4KTtcblx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0Y29uc3QgbWF4V2lkdGggPSBwYXJzZUludChtYXRjaFsxXSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKE1PQklMRV9XSURUSCA8PSBtYXhXaWR0aCkge1xuXHRcdFx0XHRcdFx0Ly8gQmF0Y2ggcHJvY2VzcyBhbGwgc3R5bGUgcnVsZXNcblx0XHRcdFx0XHRcdGNvbnN0IHN0eWxlUnVsZXMgPSBBcnJheS5mcm9tKHJ1bGUuY3NzUnVsZXMpXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoKHIpOiByIGlzIENTU1N0eWxlUnVsZSA9PiByIGluc3RhbmNlb2YgQ1NTU3R5bGVSdWxlKTtcblxuXHRcdFx0XHRcdFx0c3R5bGVSdWxlcy5mb3JFYWNoKGNzc1J1bGUgPT4ge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdG1vYmlsZVN0eWxlcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdG9yOiBjc3NSdWxlLnNlbGVjdG9yVGV4dCxcblx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlczogY3NzUnVsZS5zdHlsZS5jc3NUZXh0XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgQ1NTIHJ1bGU6JywgZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlOiBFcnJvciBldmFsdWF0aW5nIG1lZGlhIHF1ZXJpZXM6JywgZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vYmlsZVN0eWxlcztcblx0fVxuXG5cdHByaXZhdGUgYXBwbHlNb2JpbGVTdHlsZXMoZG9jOiBEb2N1bWVudCwgbW9iaWxlU3R5bGVzOiBTdHlsZUNoYW5nZVtdKSB7XG5cdFx0bGV0IGFwcGxpZWRDb3VudCA9IDA7XG5cblx0XHRtb2JpbGVTdHlsZXMuZm9yRWFjaCgoe3NlbGVjdG9yLCBzdHlsZXN9KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcblx0XHRcdFx0XHRcdChlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJykgKyBzdHlsZXNcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGFwcGxpZWRDb3VudCsrO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRGVmdWRkbGUnLCAnRXJyb3IgYXBwbHlpbmcgc3R5bGVzIGZvciBzZWxlY3RvcjonLCBzZWxlY3RvciwgZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlSGlkZGVuRWxlbWVudHMoZG9jOiBEb2N1bWVudCkge1xuXHRcdGxldCBjb3VudCA9IDA7XG5cdFx0Y29uc3QgZWxlbWVudHNUb1JlbW92ZSA9IG5ldyBTZXQ8RWxlbWVudD4oKTtcblxuXHRcdC8vIEZpcnN0IHBhc3M6IEdldCBhbGwgZWxlbWVudHMgbWF0Y2hpbmcgaGlkZGVuIHNlbGVjdG9yc1xuXHRcdGNvbnN0IGhpZGRlbkVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoSElEREVOX0VMRU1FTlRfU0VMRUNUT1JTKTtcblx0XHRoaWRkZW5FbGVtZW50cy5mb3JFYWNoKGVsID0+IGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsKSk7XG5cdFx0Y291bnQgKz0gaGlkZGVuRWxlbWVudHMubGVuZ3RoO1xuXG5cdFx0Ly8gU2Vjb25kIHBhc3M6IFVzZSBUcmVlV2Fsa2VyIGZvciBlZmZpY2llbnQgdHJhdmVyc2FsXG5cdFx0Y29uc3QgdHJlZVdhbGtlciA9IGRvYy5jcmVhdGVUcmVlV2Fsa2VyKFxuXHRcdFx0ZG9jLmJvZHksXG5cdFx0XHROb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCxcblx0XHRcdHtcblx0XHRcdFx0YWNjZXB0Tm9kZTogKG5vZGU6IEVsZW1lbnQpID0+IHtcblx0XHRcdFx0XHQvLyBTa2lwIGVsZW1lbnRzIGFscmVhZHkgbWFya2VkIGZvciByZW1vdmFsXG5cdFx0XHRcdFx0aWYgKGVsZW1lbnRzVG9SZW1vdmUuaGFzKG5vZGUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdC8vIEJhdGNoIHN0eWxlIGNvbXB1dGF0aW9uc1xuXHRcdGNvbnN0IGVsZW1lbnRzOiBFbGVtZW50W10gPSBbXTtcblx0XHRsZXQgY3VycmVudE5vZGU6IEVsZW1lbnQgfCBudWxsO1xuXHRcdHdoaWxlIChjdXJyZW50Tm9kZSA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSBhcyBFbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50cy5wdXNoKGN1cnJlbnROb2RlKTtcblx0XHR9XG5cblx0XHQvLyBQcm9jZXNzIHN0eWxlcyBpbiBiYXRjaGVzIHRvIG1pbmltaXplIGxheW91dCB0aHJhc2hpbmdcblx0XHRjb25zdCBCQVRDSF9TSVpFID0gMTAwO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gZWxlbWVudHMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuXHRcdFx0XG5cdFx0XHQvLyBSZWFkIHBoYXNlIC0gZ2F0aGVyIGFsbCBjb21wdXRlZFN0eWxlc1xuXHRcdFx0Y29uc3Qgc3R5bGVzID0gYmF0Y2gubWFwKGVsID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKSk7XG5cdFx0XHRcblx0XHRcdC8vIFdyaXRlIHBoYXNlIC0gbWFyayBlbGVtZW50cyBmb3IgcmVtb3ZhbFxuXHRcdFx0YmF0Y2guZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcblx0XHRcdFx0Y29uc3QgY29tcHV0ZWRTdHlsZSA9IHN0eWxlc1tpbmRleF07XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbicgfHxcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLm9wYWNpdHkgPT09ICcwJ1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLmFkZChlbGVtZW50KTtcblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBGaW5hbCBwYXNzOiBCYXRjaCByZW1vdmUgYWxsIGhpZGRlbiBlbGVtZW50c1xuXHRcdGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgaGlkZGVuIGVsZW1lbnRzOicsIGNvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlQ2x1dHRlcihkb2M6IERvY3VtZW50KSB7XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0bGV0IGV4YWN0U2VsZWN0b3JDb3VudCA9IDA7XG5cdFx0bGV0IHBhcnRpYWxTZWxlY3RvckNvdW50ID0gMDtcblxuXHRcdC8vIFRyYWNrIGFsbCBlbGVtZW50cyB0byBiZSByZW1vdmVkXG5cdFx0Y29uc3QgZWxlbWVudHNUb1JlbW92ZSA9IG5ldyBTZXQ8RWxlbWVudD4oKTtcblxuXHRcdC8vIEZpcnN0IGNvbGxlY3QgZWxlbWVudHMgbWF0Y2hpbmcgZXhhY3Qgc2VsZWN0b3JzXG5cdFx0Y29uc3QgZXhhY3RFbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKEVYQUNUX1NFTEVDVE9SUy5qb2luKCcsJykpO1xuXHRcdGV4YWN0RWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRpZiAoZWw/LnBhcmVudE5vZGUpIHtcblx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWwpO1xuXHRcdFx0XHRleGFjdFNlbGVjdG9yQ291bnQrKztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIFByZS1jb21waWxlIHJlZ2V4ZXMgYW5kIGNvbWJpbmUgaW50byBhIHNpbmdsZSByZWdleCBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG5cdFx0Y29uc3QgY29tYmluZWRQYXR0ZXJuID0gUEFSVElBTF9TRUxFQ1RPUlMuam9pbignfCcpO1xuXHRcdGNvbnN0IHBhcnRpYWxSZWdleCA9IG5ldyBSZWdFeHAoY29tYmluZWRQYXR0ZXJuLCAnaScpO1xuXG5cdFx0Ly8gQ3JlYXRlIGFuIGVmZmljaWVudCBhdHRyaWJ1dGUgc2VsZWN0b3IgZm9yIGVsZW1lbnRzIHdlIGNhcmUgYWJvdXRcblx0XHRjb25zdCBhdHRyaWJ1dGVTZWxlY3RvciA9ICdbY2xhc3NdLFtpZF0sW2RhdGEtdGVzdGlkXSxbZGF0YS1xYV0sW2RhdGEtY3ldJztcblx0XHRjb25zdCBhbGxFbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKGF0dHJpYnV0ZVNlbGVjdG9yKTtcblxuXHRcdC8vIFByb2Nlc3MgZWxlbWVudHMgZm9yIHBhcnRpYWwgbWF0Y2hlc1xuXHRcdGFsbEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0Ly8gU2tpcCBpZiBhbHJlYWR5IG1hcmtlZCBmb3IgcmVtb3ZhbFxuXHRcdFx0aWYgKGVsZW1lbnRzVG9SZW1vdmUuaGFzKGVsKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdldCBhbGwgcmVsZXZhbnQgYXR0cmlidXRlcyBhbmQgY29tYmluZSBpbnRvIGEgc2luZ2xlIHN0cmluZ1xuXHRcdFx0Y29uc3QgYXR0cnMgPSBbXG5cdFx0XHRcdGVsLmNsYXNzTmFtZSAmJiB0eXBlb2YgZWwuY2xhc3NOYW1lID09PSAnc3RyaW5nJyA/IGVsLmNsYXNzTmFtZSA6ICcnLFxuXHRcdFx0XHRlbC5pZCB8fCAnJyxcblx0XHRcdFx0ZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRlc3RpZCcpIHx8ICcnLFxuXHRcdFx0XHRlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcWEnKSB8fCAnJyxcblx0XHRcdFx0ZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN5JykgfHwgJydcblx0XHRcdF0uam9pbignICcpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdC8vIFNraXAgaWYgbm8gYXR0cmlidXRlcyB0byBjaGVja1xuXHRcdFx0aWYgKCFhdHRycy50cmltKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayBmb3IgcGFydGlhbCBtYXRjaCB1c2luZyBzaW5nbGUgcmVnZXggdGVzdFxuXHRcdFx0aWYgKHBhcnRpYWxSZWdleC50ZXN0KGF0dHJzKSkge1xuXHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLmFkZChlbCk7XG5cdFx0XHRcdHBhcnRpYWxTZWxlY3RvckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBSZW1vdmUgYWxsIGNvbGxlY3RlZCBlbGVtZW50cyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0ZWxlbWVudHNUb1JlbW92ZS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcblxuXHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgY2x1dHRlciBlbGVtZW50czonLCB7XG5cdFx0XHRleGFjdFNlbGVjdG9yczogZXhhY3RTZWxlY3RvckNvdW50LFxuXHRcdFx0cGFydGlhbFNlbGVjdG9yczogcGFydGlhbFNlbGVjdG9yQ291bnQsXG5cdFx0XHR0b3RhbDogZWxlbWVudHNUb1JlbW92ZS5zaXplLFxuXHRcdFx0cHJvY2Vzc2luZ1RpbWU6IGAkeyhlbmRUaW1lIC0gc3RhcnRUaW1lKS50b0ZpeGVkKDIpfW1zYFxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBjbGVhbkNvbnRlbnQoZWxlbWVudDogRWxlbWVudCwgbWV0YWRhdGE6IERlZnVkZGxlTWV0YWRhdGEpIHtcblx0XHQvLyBSZW1vdmUgSFRNTCBjb21tZW50c1xuXHRcdHRoaXMucmVtb3ZlSHRtbENvbW1lbnRzKGVsZW1lbnQpO1xuXHRcdFxuXHRcdC8vIEhhbmRsZSBIMSBlbGVtZW50cyAtIHJlbW92ZSBmaXJzdCBvbmUgYW5kIGNvbnZlcnQgb3RoZXJzIHRvIEgyXG5cdFx0dGhpcy5oYW5kbGVIZWFkaW5ncyhlbGVtZW50LCBtZXRhZGF0YS50aXRsZSk7XG5cdFx0XG5cdFx0Ly8gU3RhbmRhcmRpemUgZm9vdG5vdGVzIGFuZCBjaXRhdGlvbnNcblx0XHR0aGlzLnN0YW5kYXJkaXplRm9vdG5vdGVzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gSGFuZGxlIGxhenktbG9hZGVkIGltYWdlc1xuXHRcdHRoaXMuaGFuZGxlTGF6eUltYWdlcyhlbGVtZW50KTtcblxuXHRcdC8vIENvbnZlcnQgZW1iZWRkZWQgY29udGVudCB0byBzdGFuZGFyZCBmb3JtYXRzXG5cdFx0dGhpcy5zdGFuZGFyZGl6ZUVsZW1lbnRzKGVsZW1lbnQpO1xuXHRcdFxuXHRcdC8vIFN0cmlwIHVud2FudGVkIGF0dHJpYnV0ZXNcblx0XHR0aGlzLnN0cmlwVW53YW50ZWRBdHRyaWJ1dGVzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gUmVtb3ZlIGVtcHR5IGVsZW1lbnRzXG5cdFx0dGhpcy5yZW1vdmVFbXB0eUVsZW1lbnRzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gUmVtb3ZlIHRyYWlsaW5nIGhlYWRpbmdzXG5cdFx0dGhpcy5yZW1vdmVUcmFpbGluZ0hlYWRpbmdzKGVsZW1lbnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVUcmFpbGluZ0hlYWRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblxuXHRcdGNvbnN0IGhhc0NvbnRlbnRBZnRlciA9IChlbDogRWxlbWVudCk6IGJvb2xlYW4gPT4ge1xuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlcmUncyBhbnkgbWVhbmluZ2Z1bCBjb250ZW50IGFmdGVyIHRoaXMgZWxlbWVudFxuXHRcdFx0bGV0IG5leHRDb250ZW50ID0gJyc7XG5cdFx0XHRsZXQgc2libGluZyA9IGVsLm5leHRTaWJsaW5nO1xuXG5cdFx0XHQvLyBGaXJzdCBjaGVjayBkaXJlY3Qgc2libGluZ3Ncblx0XHRcdHdoaWxlIChzaWJsaW5nKSB7XG5cdFx0XHRcdGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRcdG5leHRDb250ZW50ICs9IHNpYmxpbmcudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdH0gZWxzZSBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcblx0XHRcdFx0XHQvLyBJZiB3ZSBmaW5kIGFuIGVsZW1lbnQgc2libGluZywgY2hlY2sgaXRzIGNvbnRlbnRcblx0XHRcdFx0XHRuZXh0Q29udGVudCArPSAoc2libGluZyBhcyBFbGVtZW50KS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0XHRzaWJsaW5nID0gc2libGluZy5uZXh0U2libGluZztcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgd2UgZm91bmQgbWVhbmluZ2Z1bCBjb250ZW50IGF0IHRoaXMgbGV2ZWwsIHJldHVybiB0cnVlXG5cdFx0XHRpZiAobmV4dENvbnRlbnQudHJpbSgpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBubyBjb250ZW50IGZvdW5kIGF0IHRoaXMgbGV2ZWwgYW5kIHdlIGhhdmUgYSBwYXJlbnQsXG5cdFx0XHQvLyBjaGVjayBmb3IgY29udGVudCBhZnRlciB0aGUgcGFyZW50XG5cdFx0XHRjb25zdCBwYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQgIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0cmV0dXJuIGhhc0NvbnRlbnRBZnRlcihwYXJlbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdC8vIFByb2Nlc3MgYWxsIGhlYWRpbmdzIGZyb20gYm90dG9tIHRvIHRvcFxuXHRcdGNvbnN0IGhlYWRpbmdzID0gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2gxLCBoMiwgaDMsIGg0LCBoNSwgaDYnKSlcblx0XHRcdC5yZXZlcnNlKCk7XG5cblx0XHRoZWFkaW5ncy5mb3JFYWNoKGhlYWRpbmcgPT4ge1xuXHRcdFx0aWYgKCFoYXNDb250ZW50QWZ0ZXIoaGVhZGluZykpIHtcblx0XHRcdFx0aGVhZGluZy5yZW1vdmUoKTtcblx0XHRcdFx0cmVtb3ZlZENvdW50Kys7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBTdG9wIHByb2Nlc3Npbmcgb25jZSB3ZSBmaW5kIGEgaGVhZGluZyB3aXRoIGNvbnRlbnQgYWZ0ZXIgaXRcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKHJlbW92ZWRDb3VudCA+IDApIHtcblx0XHRcdHRoaXMuX2xvZygnUmVtb3ZlZCB0cmFpbGluZyBoZWFkaW5nczonLCByZW1vdmVkQ291bnQpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaGFuZGxlSGVhZGluZ3MoZWxlbWVudDogRWxlbWVudCwgdGl0bGU6IHN0cmluZykge1xuXHRcdGNvbnN0IGgxcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2gxJyk7XG5cblx0XHRBcnJheS5mcm9tKGgxcykuZm9yRWFjaChoMSA9PiB7XG5cdFx0XHRjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG5cdFx0XHRoMi5pbm5lckhUTUwgPSBoMS5pbm5lckhUTUw7XG5cdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlc1xuXHRcdFx0QXJyYXkuZnJvbShoMS5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0aDIuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aDEucGFyZW50Tm9kZT8ucmVwbGFjZUNoaWxkKGgyLCBoMSk7XG5cdFx0fSk7XG5cblx0XHQvLyBSZW1vdmUgZmlyc3QgSDIgaWYgaXQgbWF0Y2hlcyB0aXRsZVxuXHRcdGNvbnN0IGgycyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2gyJyk7XG5cdFx0aWYgKGgycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb25zdCBmaXJzdEgyID0gaDJzWzBdO1xuXHRcdFx0Y29uc3QgZmlyc3RIMlRleHQgPSBmaXJzdEgyLnRleHRDb250ZW50Py50cmltKCkudG9Mb3dlckNhc2UoKSB8fCAnJztcblx0XHRcdGNvbnN0IG5vcm1hbGl6ZWRUaXRsZSA9IHRpdGxlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXHRcdFx0aWYgKG5vcm1hbGl6ZWRUaXRsZSAmJiBub3JtYWxpemVkVGl0bGUgPT09IGZpcnN0SDJUZXh0KSB7XG5cdFx0XHRcdGZpcnN0SDIucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVIdG1sQ29tbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGNvbnN0IGNvbW1lbnRzOiBDb21tZW50W10gPSBbXTtcblx0XHRjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuXHRcdFx0ZWxlbWVudCxcblx0XHRcdE5vZGVGaWx0ZXIuU0hPV19DT01NRU5ULFxuXHRcdFx0bnVsbFxuXHRcdCk7XG5cblx0XHRsZXQgbm9kZTtcblx0XHR3aGlsZSAobm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpKSB7XG5cdFx0XHRjb21tZW50cy5wdXNoKG5vZGUgYXMgQ29tbWVudCk7XG5cdFx0fVxuXG5cdFx0Y29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcblx0XHRcdGNvbW1lbnQucmVtb3ZlKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgSFRNTCBjb21tZW50czonLCBjb21tZW50cy5sZW5ndGgpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdHJpcFVud2FudGVkQXR0cmlidXRlcyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IGF0dHJpYnV0ZUNvdW50ID0gMDtcblxuXHRcdGNvbnN0IHByb2Nlc3NFbGVtZW50ID0gKGVsOiBFbGVtZW50KSA9PiB7XG5cdFx0XHQvLyBTa2lwIFNWRyBlbGVtZW50cyAtIHByZXNlcnZlIGFsbCB0aGVpciBhdHRyaWJ1dGVzXG5cdFx0XHRpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgYXR0cmlidXRlcyA9IEFycmF5LmZyb20oZWwuYXR0cmlidXRlcyk7XG5cdFx0XHRcblx0XHRcdGF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0Y29uc3QgYXR0ck5hbWUgPSBhdHRyLm5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0aWYgKCFBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHJOYW1lKSAmJiAhYXR0ck5hbWUuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xuXHRcdFx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyLm5hbWUpO1xuXHRcdFx0XHRcdGF0dHJpYnV0ZUNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRwcm9jZXNzRWxlbWVudChlbGVtZW50KTtcblx0XHRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5mb3JFYWNoKHByb2Nlc3NFbGVtZW50KTtcblxuXHRcdHRoaXMuX2xvZygnU3RyaXBwZWQgYXR0cmlidXRlczonLCBhdHRyaWJ1dGVDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXHRcdGxldCBpdGVyYXRpb25zID0gMDtcblx0XHRsZXQga2VlcFJlbW92aW5nID0gdHJ1ZTtcblxuXHRcdHdoaWxlIChrZWVwUmVtb3ZpbmcpIHtcblx0XHRcdGl0ZXJhdGlvbnMrKztcblx0XHRcdGtlZXBSZW1vdmluZyA9IGZhbHNlO1xuXHRcdFx0Ly8gR2V0IGFsbCBlbGVtZW50cyB3aXRob3V0IGNoaWxkcmVuLCB3b3JraW5nIGZyb20gZGVlcGVzdCBmaXJzdFxuXHRcdFx0Y29uc3QgZW1wdHlFbGVtZW50cyA9IEFycmF5LmZyb20oZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpKS5maWx0ZXIoZWwgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9FTVBUWV9FTEVNRU5UUy5oYXMoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgb25seSB3aGl0ZXNwYWNlIG9yICZuYnNwO1xuXHRcdFx0XHRjb25zdCB0ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRjb25zdCBoYXNPbmx5V2hpdGVzcGFjZSA9IHRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT09IDA7XG5cdFx0XHRcdGNvbnN0IGhhc05ic3AgPSB0ZXh0Q29udGVudC5pbmNsdWRlcygnXFx1MDBBMCcpOyAvLyBVbmljb2RlIG5vbi1icmVha2luZyBzcGFjZVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgbm8gbWVhbmluZ2Z1bCBjaGlsZHJlblxuXHRcdFx0XHRjb25zdCBoYXNOb0NoaWxkcmVuID0gIWVsLmhhc0NoaWxkTm9kZXMoKSB8fCBcblx0XHRcdFx0XHQoQXJyYXkuZnJvbShlbC5jaGlsZE5vZGVzKS5ldmVyeShub2RlID0+IHtcblx0XHRcdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBub2RlVGV4dCA9IG5vZGUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBub2RlVGV4dC50cmltKCkubGVuZ3RoID09PSAwICYmICFub2RlVGV4dC5pbmNsdWRlcygnXFx1MDBBMCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRyZXR1cm4gaGFzT25seVdoaXRlc3BhY2UgJiYgIWhhc05ic3AgJiYgaGFzTm9DaGlsZHJlbjtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoZW1wdHlFbGVtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGVtcHR5RWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdFx0ZWwucmVtb3ZlKCk7XG5cdFx0XHRcdFx0cmVtb3ZlZENvdW50Kys7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRrZWVwUmVtb3ZpbmcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBlbXB0eSBlbGVtZW50czonLCB7XG5cdFx0XHRjb3VudDogcmVtb3ZlZENvdW50LFxuXHRcdFx0aXRlcmF0aW9uc1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVGb290bm90ZUl0ZW0oXG5cdFx0Zm9vdG5vdGVOdW1iZXI6IG51bWJlcixcblx0XHRjb250ZW50OiBzdHJpbmcgfCBFbGVtZW50LFxuXHRcdHJlZnM6IHN0cmluZ1tdXG5cdCk6IEhUTUxMSUVsZW1lbnQge1xuXHRcdGNvbnN0IG5ld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdG5ld0l0ZW0uY2xhc3NOYW1lID0gJ2Zvb3Rub3RlJztcblx0XHRuZXdJdGVtLmlkID0gYGZuOiR7Zm9vdG5vdGVOdW1iZXJ9YDtcblxuXHRcdC8vIEhhbmRsZSBjb250ZW50XG5cdFx0aWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuXHRcdFx0Y29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEdldCBhbGwgcGFyYWdyYXBocyBmcm9tIHRoZSBjb250ZW50XG5cdFx0XHRjb25zdCBwYXJhZ3JhcGhzID0gQXJyYXkuZnJvbShjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3AnKSk7XG5cdFx0XHRpZiAocGFyYWdyYXBocy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0Ly8gSWYgbm8gcGFyYWdyYXBocywgd3JhcCBjb250ZW50IGluIGEgcGFyYWdyYXBoXG5cdFx0XHRcdGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9IGNvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBDb3B5IGV4aXN0aW5nIHBhcmFncmFwaHNcblx0XHRcdFx0cGFyYWdyYXBocy5mb3JFYWNoKHAgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG5ld1AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0bmV3UC5pbm5lckhUTUwgPSBwLmlubmVySFRNTDtcblx0XHRcdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKG5ld1ApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgYmFja2xpbmsocykgdG8gdGhlIGxhc3QgcGFyYWdyYXBoXG5cdFx0Y29uc3QgbGFzdFBhcmFncmFwaCA9IG5ld0l0ZW0ucXVlcnlTZWxlY3RvcigncDpsYXN0LW9mLXR5cGUnKSB8fCBuZXdJdGVtO1xuXHRcdHJlZnMuZm9yRWFjaCgocmVmSWQsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBiYWNrbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdGJhY2tsaW5rLmhyZWYgPSBgIyR7cmVmSWR9YDtcblx0XHRcdGJhY2tsaW5rLnRpdGxlID0gJ3JldHVybiB0byBhcnRpY2xlJztcblx0XHRcdGJhY2tsaW5rLmNsYXNzTmFtZSA9ICdmb290bm90ZS1iYWNrcmVmJztcblx0XHRcdGJhY2tsaW5rLmlubmVySFRNTCA9ICfihqknO1xuXHRcdFx0aWYgKGluZGV4IDwgcmVmcy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGJhY2tsaW5rLmlubmVySFRNTCArPSAnICc7XG5cdFx0XHR9XG5cdFx0XHRsYXN0UGFyYWdyYXBoLmFwcGVuZENoaWxkKGJhY2tsaW5rKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBuZXdJdGVtO1xuXHR9XG5cblx0cHJpdmF0ZSBjb2xsZWN0Rm9vdG5vdGVzKGVsZW1lbnQ6IEVsZW1lbnQpOiBGb290bm90ZUNvbGxlY3Rpb24ge1xuXHRcdGNvbnN0IGZvb3Rub3RlczogRm9vdG5vdGVDb2xsZWN0aW9uID0ge307XG5cdFx0bGV0IGZvb3Rub3RlQ291bnQgPSAxO1xuXHRcdGNvbnN0IHByb2Nlc3NlZElkcyA9IG5ldyBTZXQ8c3RyaW5nPigpOyAvLyBUcmFjayBwcm9jZXNzZWQgSURzXG5cblx0XHQvLyBDb2xsZWN0IGFsbCBmb290bm90ZXMgYW5kIHRoZWlyIElEcyBmcm9tIGZvb3Rub3RlIGxpc3RzXG5cdFx0Y29uc3QgZm9vdG5vdGVMaXN0cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT09UTk9URV9MSVNUX1NFTEVDVE9SUyk7XG5cdFx0Zm9vdG5vdGVMaXN0cy5mb3JFYWNoKGxpc3QgPT4ge1xuXHRcdFx0Ly8gU3Vic3RhY2sgaGFzIGluZGl2aWR1YWwgZm9vdG5vdGUgZGl2cyB3aXRoIG5vIHBhcmVudFxuXHRcdFx0aWYgKGxpc3QubWF0Y2hlcygnZGl2LmZvb3Rub3RlW2RhdGEtY29tcG9uZW50LW5hbWU9XCJGb290bm90ZVRvRE9NXCJdJykpIHtcblx0XHRcdFx0Y29uc3QgYW5jaG9yID0gbGlzdC5xdWVyeVNlbGVjdG9yKCdhLmZvb3Rub3RlLW51bWJlcicpO1xuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gbGlzdC5xdWVyeVNlbGVjdG9yKCcuZm9vdG5vdGUtY29udGVudCcpO1xuXHRcdFx0XHRpZiAoYW5jaG9yICYmIGNvbnRlbnQpIHtcblx0XHRcdFx0XHRjb25zdCBpZCA9IGFuY2hvci5pZC5yZXBsYWNlKCdmb290bm90ZS0nLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRpZiAoaWQgJiYgIXByb2Nlc3NlZElkcy5oYXMoaWQpKSB7XG5cdFx0XHRcdFx0XHRmb290bm90ZXNbZm9vdG5vdGVDb3VudF0gPSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQ6IGNvbnRlbnQsXG5cdFx0XHRcdFx0XHRcdG9yaWdpbmFsSWQ6IGlkLFxuXHRcdFx0XHRcdFx0XHRyZWZzOiBbXVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHByb2Nlc3NlZElkcy5hZGQoaWQpO1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVDb3VudCsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbW1vbiBmb3JtYXQgdXNpbmcgT0wvVUwgYW5kIExJIGVsZW1lbnRzXG5cdFx0XHRjb25zdCBpdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGksIGRpdltyb2xlPVwibGlzdGl0ZW1cIl0nKTtcblx0XHRcdGl0ZW1zLmZvckVhY2gobGkgPT4ge1xuXHRcdFx0XHRsZXQgaWQgPSAnJztcblx0XHRcdFx0bGV0IGNvbnRlbnQ6IEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuXHRcdFx0XHQvLyBIYW5kbGUgY2l0YXRpb25zIHdpdGggLmNpdGF0aW9ucyBjbGFzc1xuXHRcdFx0XHRjb25zdCBjaXRhdGlvbnNEaXYgPSBsaS5xdWVyeVNlbGVjdG9yKCcuY2l0YXRpb25zJyk7XG5cdFx0XHRcdGlmIChjaXRhdGlvbnNEaXY/LmlkPy50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ3InKSkge1xuXHRcdFx0XHRcdGlkID0gY2l0YXRpb25zRGl2LmlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0Ly8gTG9vayBmb3IgY2l0YXRpb24gY29udGVudCB3aXRoaW4gdGhlIGNpdGF0aW9ucyBkaXZcblx0XHRcdFx0XHRjb25zdCBjaXRhdGlvbkNvbnRlbnQgPSBjaXRhdGlvbnNEaXYucXVlcnlTZWxlY3RvcignLmNpdGF0aW9uLWNvbnRlbnQnKTtcblx0XHRcdFx0XHRpZiAoY2l0YXRpb25Db250ZW50KSB7XG5cdFx0XHRcdFx0XHRjb250ZW50ID0gY2l0YXRpb25Db250ZW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBFeHRyYWN0IElEIGZyb20gdmFyaW91cyBmb3JtYXRzXG5cdFx0XHRcdFx0aWYgKGxpLmlkLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnYmliLmJpYicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2JpYi5iaWInLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGxpLmlkLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnZm46JykpIHtcblx0XHRcdFx0XHRcdGlkID0gbGkuaWQucmVwbGFjZSgnZm46JywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2ZuJykpIHtcblx0XHRcdFx0XHRcdGlkID0gbGkuaWQucmVwbGFjZSgnZm4nLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHQvLyBOYXR1cmUuY29tXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5oYXNBdHRyaWJ1dGUoJ2RhdGEtY291bnRlcicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1jb3VudGVyJyk/LnJlcGxhY2UoL1xcLiQvLCAnJyk/LnRvTG93ZXJDYXNlKCkgfHwgJyc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gbGkuaWQuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goL2NpdGVfbm90ZS0oLispLyk7XG5cdFx0XHRcdFx0XHRpZCA9IG1hdGNoID8gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSA6IGxpLmlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRlbnQgPSBsaTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpZCAmJiAhcHJvY2Vzc2VkSWRzLmhhcyhpZCkpIHtcblx0XHRcdFx0XHRmb290bm90ZXNbZm9vdG5vdGVDb3VudF0gPSB7XG5cdFx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50IHx8IGxpLFxuXHRcdFx0XHRcdFx0b3JpZ2luYWxJZDogaWQsXG5cdFx0XHRcdFx0XHRyZWZzOiBbXVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cHJvY2Vzc2VkSWRzLmFkZChpZCk7XG5cdFx0XHRcdFx0Zm9vdG5vdGVDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBmb290bm90ZXM7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRPdXRlckZvb3Rub3RlQ29udGFpbmVyKGVsOiBFbGVtZW50KTogRWxlbWVudCB7XG5cdFx0bGV0IGN1cnJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWw7XG5cdFx0bGV0IHBhcmVudDogRWxlbWVudCB8IG51bGwgPSBlbC5wYXJlbnRFbGVtZW50O1xuXHRcdFxuXHRcdC8vIEtlZXAgZ29pbmcgdXAgdW50aWwgd2UgZmluZCBhbiBlbGVtZW50IHRoYXQncyBub3QgYSBzcGFuIG9yIHN1cFxuXHRcdHdoaWxlIChwYXJlbnQgJiYgKFxuXHRcdFx0cGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NwYW4nIHx8IFxuXHRcdFx0cGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N1cCdcblx0XHQpKSB7XG5cdFx0XHRjdXJyZW50ID0gcGFyZW50O1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBjdXJyZW50O1xuXHR9XG5cblx0Ly8gRXZlcnkgZm9vdG5vdGUgcmVmZXJlbmNlIHNob3VsZCBiZSBhIHN1cCBlbGVtZW50IHdpdGggYW4gYW5jaG9yIGluc2lkZVxuXHQvLyBlLmcuIDxzdXAgaWQ9XCJmbnJlZjoxXCI+PGEgaHJlZj1cIiNmbjoxXCI+MTwvYT48L3N1cD5cblx0cHJpdmF0ZSBjcmVhdGVGb290bm90ZVJlZmVyZW5jZShmb290bm90ZU51bWJlcjogc3RyaW5nLCByZWZJZDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuXHRcdGNvbnN0IHN1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N1cCcpO1xuXHRcdHN1cC5pZCA9IHJlZklkO1xuXHRcdGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0bGluay5ocmVmID0gYCNmbjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cdFx0bGluay50ZXh0Q29udGVudCA9IGZvb3Rub3RlTnVtYmVyO1xuXHRcdHN1cC5hcHBlbmRDaGlsZChsaW5rKTtcblx0XHRyZXR1cm4gc3VwO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGFuZGFyZGl6ZUZvb3Rub3RlcyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0Y29uc3QgZm9vdG5vdGVzID0gdGhpcy5jb2xsZWN0Rm9vdG5vdGVzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gU3RhbmRhcmRpemUgaW5saW5lIGZvb3Rub3RlcyB1c2luZyB0aGUgY29sbGVjdGVkIElEc1xuXHRcdGNvbnN0IGZvb3Rub3RlSW5saW5lUmVmZXJlbmNlcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT09UTk9URV9JTkxJTkVfUkVGRVJFTkNFUyk7XG5cdFx0XG5cdFx0Ly8gR3JvdXAgcmVmZXJlbmNlcyBieSB0aGVpciBwYXJlbnQgc3VwIGVsZW1lbnRcblx0XHRjb25zdCBzdXBHcm91cHMgPSBuZXcgTWFwPEVsZW1lbnQsIEVsZW1lbnRbXT4oKTtcblx0XHRcblx0XHRmb290bm90ZUlubGluZVJlZmVyZW5jZXMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xuXG5cdFx0XHRsZXQgZm9vdG5vdGVJZCA9ICcnO1xuXHRcdFx0bGV0IGZvb3Rub3RlQ29udGVudCA9ICcnO1xuXG5cdFx0XHQvLyBFeHRyYWN0IGZvb3Rub3RlIElEIGJhc2VkIG9uIGVsZW1lbnQgdHlwZVxuXHRcdFx0Ly8gTmF0dXJlLmNvbVxuXHRcdFx0aWYgKGVsLm1hdGNoZXMoJ2FbaWRePVwicmVmLWxpbmtcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdC8vIFNjaWVuY2Uub3JnXG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2Fbcm9sZT1cImRvYy1iaWJsaW9yZWZcIl0nKSkge1xuXHRcdFx0XHRjb25zdCB4bWxSaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteG1sLXJpZCcpO1xuXHRcdFx0XHRpZiAoeG1sUmlkKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IHhtbFJpZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdFx0aWYgKGhyZWY/LnN0YXJ0c1dpdGgoJyNjb3JlLVInKSkge1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IGhyZWYucmVwbGFjZSgnI2NvcmUtJywgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0Ly8gU3Vic3RhY2tcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYS5mb290bm90ZS1hbmNob3IsIHNwYW4uZm9vdG5vdGUtaG92ZXJjYXJkLXRhcmdldCBhJykpIHtcblx0XHRcdFx0Y29uc3QgaWQgPSBlbC5pZD8ucmVwbGFjZSgnZm9vdG5vdGUtYW5jaG9yLScsICcnKSB8fCAnJztcblx0XHRcdFx0aWYgKGlkKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IGlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblx0XHRcdC8vIEFyeGl2XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2NpdGUubHR4X2NpdGUnKSkge1xuXHRcdFx0XHRjb25zdCBsaW5rID0gZWwucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRpZiAobGluaykge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGhyZWYuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goL2JpYlxcLmJpYihcXGQrKS8pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzdXAucmVmZXJlbmNlJykpIHtcblx0XHRcdFx0Y29uc3QgbGlua3MgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0XHRcdEFycmF5LmZyb20obGlua3MpLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdFx0aWYgKGhyZWYpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gaHJlZi5zcGxpdCgnLycpLnBvcCgpPy5tYXRjaCgvKD86Y2l0ZV9ub3RlfGNpdGVfcmVmKS0oLispLyk7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwW2lkXj1cImZucmVmOlwiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5pZC5yZXBsYWNlKCdmbnJlZjonLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwW2lkXj1cImZuclwiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5pZC5yZXBsYWNlKCdmbnInLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3Bhbi5mb290bm90ZS1yZWZlcmVuY2UnKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvb3Rub3RlLWlkJykgfHwgJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3NwYW4uZm9vdG5vdGUtbGluaycpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vdG5vdGUtaWQnKSB8fCAnJztcblx0XHRcdFx0Zm9vdG5vdGVDb250ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvb3Rub3RlLWNvbnRlbnQnKSB8fCAnJztcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYS5jaXRhdGlvbicpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRmb290bm90ZUNvbnRlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYVtpZF49XCJmbnJlZlwiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5pZC5yZXBsYWNlKCdmbnJlZicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gT3RoZXIgY2l0YXRpb24gdHlwZXNcblx0XHRcdFx0Y29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdGNvbnN0IGlkID0gaHJlZi5yZXBsYWNlKC9eWyNdLywgJycpO1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBpZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmb290bm90ZUlkKSB7XG5cdFx0XHRcdC8vIEZpbmQgdGhlIGZvb3Rub3RlIG51bWJlciBieSBtYXRjaGluZyB0aGUgb3JpZ2luYWwgSURcblx0XHRcdFx0Y29uc3QgZm9vdG5vdGVFbnRyeSA9IE9iamVjdC5lbnRyaWVzKGZvb3Rub3RlcykuZmluZChcblx0XHRcdFx0XHQoW18sIGRhdGFdKSA9PiBkYXRhLm9yaWdpbmFsSWQgPT09IGZvb3Rub3RlSWQudG9Mb3dlckNhc2UoKVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmIChmb290bm90ZUVudHJ5KSB7XG5cdFx0XHRcdFx0Y29uc3QgW2Zvb3Rub3RlTnVtYmVyLCBmb290bm90ZURhdGFdID0gZm9vdG5vdGVFbnRyeTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBDcmVhdGUgZm9vdG5vdGUgcmVmZXJlbmNlIElEXG5cdFx0XHRcdFx0Y29uc3QgcmVmSWQgPSBmb290bm90ZURhdGEucmVmcy5sZW5ndGggPiAwID8gXG5cdFx0XHRcdFx0XHRgZm5yZWY6JHtmb290bm90ZU51bWJlcn0tJHtmb290bm90ZURhdGEucmVmcy5sZW5ndGggKyAxfWAgOiBcblx0XHRcdFx0XHRcdGBmbnJlZjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm9vdG5vdGVEYXRhLnJlZnMucHVzaChyZWZJZCk7XG5cblx0XHRcdFx0XHQvLyBGaW5kIHRoZSBvdXRlcm1vc3QgY29udGFpbmVyIChzcGFuIG9yIHN1cClcblx0XHRcdFx0XHRjb25zdCBjb250YWluZXIgPSB0aGlzLmZpbmRPdXRlckZvb3Rub3RlQ29udGFpbmVyKGVsKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBJZiBjb250YWluZXIgaXMgYSBzdXAsIGdyb3VwIHJlZmVyZW5jZXNcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N1cCcpIHtcblx0XHRcdFx0XHRcdGlmICghc3VwR3JvdXBzLmhhcyhjb250YWluZXIpKSB7XG5cdFx0XHRcdFx0XHRcdHN1cEdyb3Vwcy5zZXQoY29udGFpbmVyLCBbXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb25zdCBncm91cCA9IHN1cEdyb3Vwcy5nZXQoY29udGFpbmVyKSE7XG5cdFx0XHRcdFx0XHRncm91cC5wdXNoKHRoaXMuY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXIsIHJlZklkKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIFJlcGxhY2UgdGhlIGNvbnRhaW5lciBkaXJlY3RseVxuXHRcdFx0XHRcdFx0Y29udGFpbmVyLnJlcGxhY2VXaXRoKHRoaXMuY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXIsIHJlZklkKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIYW5kbGUgZ3JvdXBlZCByZWZlcmVuY2VzXG5cdFx0c3VwR3JvdXBzLmZvckVhY2goKHJlZmVyZW5jZXMsIGNvbnRhaW5lcikgPT4ge1xuXHRcdFx0aWYgKHJlZmVyZW5jZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQvLyBDcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB0byBob2xkIGFsbCB0aGUgcmVmZXJlbmNlc1xuXHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFkZCBlYWNoIHJlZmVyZW5jZSBhcyBpdHMgb3duIHN1cCBlbGVtZW50XG5cdFx0XHRcdHJlZmVyZW5jZXMuZm9yRWFjaCgocmVmLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGxpbmsgPSByZWYucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRcdGlmIChsaW5rKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdXAnKTtcblx0XHRcdFx0XHRcdHN1cC5pZCA9IHJlZi5pZDtcblx0XHRcdFx0XHRcdHN1cC5hcHBlbmRDaGlsZChsaW5rLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChzdXApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRjb250YWluZXIucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBzdGFuZGFyZGl6ZWQgZm9vdG5vdGUgbGlzdFxuXHRcdGNvbnN0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRuZXdMaXN0LmNsYXNzTmFtZSA9ICdmb290bm90ZXMnO1xuXHRcdGNvbnN0IG9yZGVyZWRMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcblxuXHRcdC8vIENyZWF0ZSBmb290bm90ZSBpdGVtcyBpbiBvcmRlclxuXHRcdE9iamVjdC5lbnRyaWVzKGZvb3Rub3RlcykuZm9yRWFjaCgoW251bWJlciwgZGF0YV0pID0+IHtcblx0XHRcdGNvbnN0IG5ld0l0ZW0gPSB0aGlzLmNyZWF0ZUZvb3Rub3RlSXRlbShcblx0XHRcdFx0cGFyc2VJbnQobnVtYmVyKSxcblx0XHRcdFx0ZGF0YS5jb250ZW50LFxuXHRcdFx0XHRkYXRhLnJlZnNcblx0XHRcdCk7XG5cdFx0XHRvcmRlcmVkTGlzdC5hcHBlbmRDaGlsZChuZXdJdGVtKTtcblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBvcmlnaW5hbCBmb290bm90ZSBsaXN0c1xuXHRcdGNvbnN0IGZvb3Rub3RlTGlzdHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMpO1xuXHRcdGZvb3Rub3RlTGlzdHMuZm9yRWFjaChsaXN0ID0+IGxpc3QucmVtb3ZlKCkpO1xuXG5cdFx0Ly8gSWYgd2UgaGF2ZSBhbnkgZm9vdG5vdGVzLCBhZGQgdGhlIG5ldyBsaXN0IHRvIHRoZSBkb2N1bWVudFxuXHRcdGlmIChvcmRlcmVkTGlzdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRuZXdMaXN0LmFwcGVuZENoaWxkKG9yZGVyZWRMaXN0KTtcblx0XHRcdGVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3TGlzdCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBoYW5kbGVMYXp5SW1hZ2VzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXHRcdGNvbnN0IGxhenlJbWFnZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZ1tkYXRhLXNyY10sIGltZ1tkYXRhLXNyY3NldF0nKTtcblxuXHRcdGxhenlJbWFnZXMuZm9yRWFjaChpbWcgPT4ge1xuXHRcdFx0aWYgKCEoaW1nIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkpIHJldHVybjtcblxuXHRcdFx0Ly8gSGFuZGxlIGRhdGEtc3JjXG5cdFx0XHRjb25zdCBkYXRhU3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblx0XHRcdGlmIChkYXRhU3JjICYmICFpbWcuc3JjKSB7XG5cdFx0XHRcdGltZy5zcmMgPSBkYXRhU3JjO1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBIYW5kbGUgZGF0YS1zcmNzZXRcblx0XHRcdGNvbnN0IGRhdGFTcmNzZXQgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0aWYgKGRhdGFTcmNzZXQgJiYgIWltZy5zcmNzZXQpIHtcblx0XHRcdFx0aW1nLnNyY3NldCA9IGRhdGFTcmNzZXQ7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBsYXp5IGxvYWRpbmcgcmVsYXRlZCBjbGFzc2VzIGFuZCBhdHRyaWJ1dGVzXG5cdFx0XHRpbWcuY2xhc3NMaXN0LnJlbW92ZSgnbGF6eScsICdsYXp5bG9hZCcpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1sbC1zdGF0dXMnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdQcm9jZXNzZWQgbGF6eSBpbWFnZXM6JywgcHJvY2Vzc2VkQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGFuZGFyZGl6ZUVsZW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXG5cdFx0Ly8gQ29udmVydCBlbGVtZW50cyBiYXNlZCBvbiBzdGFuZGFyZGl6YXRpb24gcnVsZXNcblx0XHRFTEVNRU5UX1NUQU5EQVJESVpBVElPTl9SVUxFUy5mb3JFYWNoKHJ1bGUgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocnVsZS5zZWxlY3Rvcik7XG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdFx0aWYgKHJ1bGUudHJhbnNmb3JtKSB7XG5cdFx0XHRcdFx0Ly8gSWYgdGhlcmUncyBhIHRyYW5zZm9ybSBmdW5jdGlvbiwgdXNlIGl0IHRvIGNyZWF0ZSB0aGUgbmV3IGVsZW1lbnRcblx0XHRcdFx0XHRjb25zdCB0cmFuc2Zvcm1lZCA9IHJ1bGUudHJhbnNmb3JtKGVsKTtcblx0XHRcdFx0XHRlbC5yZXBsYWNlV2l0aCh0cmFuc2Zvcm1lZCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBDb252ZXJ0IGxpdGUteW91dHViZSBlbGVtZW50c1xuXHRcdGNvbnN0IGxpdGVZb3V0dWJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpdGUteW91dHViZScpO1xuXHRcdGxpdGVZb3V0dWJlRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRjb25zdCB2aWRlb0lkID0gZWwuZ2V0QXR0cmlidXRlKCd2aWRlb2lkJyk7XG5cdFx0XHRpZiAoIXZpZGVvSWQpIHJldHVybjtcblxuXHRcdFx0Y29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cdFx0XHRpZnJhbWUud2lkdGggPSAnNTYwJztcblx0XHRcdGlmcmFtZS5oZWlnaHQgPSAnMzE1Jztcblx0XHRcdGlmcmFtZS5zcmMgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt2aWRlb0lkfWA7XG5cdFx0XHRpZnJhbWUudGl0bGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZGVvdGl0bGUnKSB8fCAnWW91VHViZSB2aWRlbyBwbGF5ZXInO1xuXHRcdFx0aWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xuXHRcdFx0aWZyYW1lLmFsbG93ID0gJ2FjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBjbGlwYm9hcmQtd3JpdGU7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmU7IHdlYi1zaGFyZSc7XG5cdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XG5cblx0XHRcdGVsLnJlcGxhY2VXaXRoKGlmcmFtZSk7XG5cdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGZ1dHVyZSBlbWJlZCBjb252ZXJzaW9ucyAoVHdpdHRlciwgSW5zdGFncmFtLCBldGMuKVxuXG5cdFx0dGhpcy5fbG9nKCdDb252ZXJ0ZWQgZW1iZWRkZWQgZWxlbWVudHM6JywgcHJvY2Vzc2VkQ291bnQpO1xuXHR9XG5cblx0Ly8gRmluZCBzbWFsbCBJTUcgYW5kIFNWRyBlbGVtZW50c1xuXHRwcml2YXRlIGZpbmRTbWFsbEltYWdlcyhkb2M6IERvY3VtZW50KTogU2V0PHN0cmluZz4ge1xuXHRcdGNvbnN0IE1JTl9ESU1FTlNJT04gPSAzMztcblx0XHRjb25zdCBzbWFsbEltYWdlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXHRcdGNvbnN0IHRyYW5zZm9ybVJlZ2V4ID0gL3NjYWxlXFwoKFtcXGQuXSspXFwpLztcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXG5cdFx0Ly8gMS4gUmVhZCBwaGFzZSAtIEdhdGhlciBhbGwgZWxlbWVudHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdGNvbnN0IGVsZW1lbnRzID0gW1xuXHRcdFx0Li4uQXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpKSxcblx0XHRcdC4uLkFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKSlcblx0XHRdLmZpbHRlcihlbGVtZW50ID0+IHtcblx0XHRcdC8vIFNraXAgbGF6eS1sb2FkZWQgaW1hZ2VzIHRoYXQgaGF2ZW4ndCBiZWVuIHByb2Nlc3NlZCB5ZXRcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuXHRcdFx0XHRjb25zdCBpc0xhenkgPSBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGF6eScpIHx8IFxuXHRcdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsYXp5bG9hZCcpIHx8XG5cdFx0XHRcdFx0ZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3JjJykgfHxcblx0XHRcdFx0XHRlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHRcdFx0cmV0dXJuICFpc0xhenk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBzbWFsbEltYWdlcztcblx0XHR9XG5cblx0XHQvLyAyLiBCYXRjaCBwcm9jZXNzIC0gQ29sbGVjdCBhbGwgbWVhc3VyZW1lbnRzIGluIG9uZSBnb1xuXHRcdGNvbnN0IG1lYXN1cmVtZW50cyA9IGVsZW1lbnRzLm1hcChlbGVtZW50ID0+ICh7XG5cdFx0XHRlbGVtZW50LFxuXHRcdFx0Ly8gU3RhdGljIGF0dHJpYnV0ZXMgKG5vIHJlZmxvdylcblx0XHRcdG5hdHVyYWxXaWR0aDogZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgPyBlbGVtZW50Lm5hdHVyYWxXaWR0aCA6IDAsXG5cdFx0XHRuYXR1cmFsSGVpZ2h0OiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCA/IGVsZW1lbnQubmF0dXJhbEhlaWdodCA6IDAsXG5cdFx0XHRhdHRyV2lkdGg6IHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd3aWR0aCcpIHx8ICcwJyksXG5cdFx0XHRhdHRySGVpZ2h0OiBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgfHwgJzAnKVxuXHRcdH0pKTtcblxuXHRcdC8vIDMuIEJhdGNoIGNvbXB1dGUgc3R5bGVzIC0gUHJvY2VzcyBpbiBjaHVua3MgdG8gYXZvaWQgbG9uZyB0YXNrc1xuXHRcdGNvbnN0IEJBVENIX1NJWkUgPSA1MDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1lYXN1cmVtZW50cy5sZW5ndGg7IGkgKz0gQkFUQ0hfU0laRSkge1xuXHRcdFx0Y29uc3QgYmF0Y2ggPSBtZWFzdXJlbWVudHMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuXHRcdFx0XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBSZWFkIHBoYXNlIC0gY29tcHV0ZSBhbGwgc3R5bGVzIGF0IG9uY2Vcblx0XHRcdFx0Y29uc3Qgc3R5bGVzID0gYmF0Y2gubWFwKCh7IGVsZW1lbnQgfSkgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkpO1xuXHRcdFx0XHRjb25zdCByZWN0cyA9IGJhdGNoLm1hcCgoeyBlbGVtZW50IH0pID0+IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gUHJvY2VzcyBwaGFzZSAtIG5vIERPTSBvcGVyYXRpb25zXG5cdFx0XHRcdGJhdGNoLmZvckVhY2goKG1lYXN1cmVtZW50LCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzdHlsZSA9IHN0eWxlc1tpbmRleF07XG5cdFx0XHRcdFx0XHRjb25zdCByZWN0ID0gcmVjdHNbaW5kZXhdO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBHZXQgdHJhbnNmb3JtIHNjYWxlIGluIHRoZSBzYW1lIGJhdGNoXG5cdFx0XHRcdFx0XHRjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm07XG5cdFx0XHRcdFx0XHRjb25zdCBzY2FsZSA9IHRyYW5zZm9ybSA/IFxuXHRcdFx0XHRcdFx0XHRwYXJzZUZsb2F0KHRyYW5zZm9ybS5tYXRjaCh0cmFuc2Zvcm1SZWdleCk/LlsxXSB8fCAnMScpIDogMTtcblxuXHRcdFx0XHRcdFx0Ly8gQ2FsY3VsYXRlIGVmZmVjdGl2ZSBkaW1lbnNpb25zXG5cdFx0XHRcdFx0XHRjb25zdCB3aWR0aHMgPSBbXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50Lm5hdHVyYWxXaWR0aCxcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQuYXR0cldpZHRoLFxuXHRcdFx0XHRcdFx0XHRwYXJzZUludChzdHlsZS53aWR0aCkgfHwgMCxcblx0XHRcdFx0XHRcdFx0cmVjdC53aWR0aCAqIHNjYWxlXG5cdFx0XHRcdFx0XHRdLmZpbHRlcihkaW0gPT4gdHlwZW9mIGRpbSA9PT0gJ251bWJlcicgJiYgZGltID4gMCk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGhlaWdodHMgPSBbXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50Lm5hdHVyYWxIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50LmF0dHJIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdHBhcnNlSW50KHN0eWxlLmhlaWdodCkgfHwgMCxcblx0XHRcdFx0XHRcdFx0cmVjdC5oZWlnaHQgKiBzY2FsZVxuXHRcdFx0XHRcdFx0XS5maWx0ZXIoZGltID0+IHR5cGVvZiBkaW0gPT09ICdudW1iZXInICYmIGRpbSA+IDApO1xuXG5cdFx0XHRcdFx0XHQvLyBEZWNpc2lvbiBwaGFzZSAtIG5vIERPTSBvcGVyYXRpb25zXG5cdFx0XHRcdFx0XHRpZiAod2lkdGhzLmxlbmd0aCA+IDAgJiYgaGVpZ2h0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVmZmVjdGl2ZVdpZHRoID0gTWF0aC5taW4oLi4ud2lkdGhzKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZWZmZWN0aXZlSGVpZ2h0ID0gTWF0aC5taW4oLi4uaGVpZ2h0cyk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGVmZmVjdGl2ZVdpZHRoIDwgTUlOX0RJTUVOU0lPTiB8fCBlZmZlY3RpdmVIZWlnaHQgPCBNSU5fRElNRU5TSU9OKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgaWRlbnRpZmllciA9IHRoaXMuZ2V0RWxlbWVudElkZW50aWZpZXIobWVhc3VyZW1lbnQuZWxlbWVudCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlkZW50aWZpZXIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNtYWxsSW1hZ2VzLmFkZChpZGVudGlmaWVyKTtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgZWxlbWVudCBkaW1lbnNpb25zOicsIGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgYmF0Y2g6JywgZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5fbG9nKCdGb3VuZCBzbWFsbCBlbGVtZW50czonLCB7XG5cdFx0XHRjb3VudDogcHJvY2Vzc2VkQ291bnQsXG5cdFx0XHR0b3RhbEVsZW1lbnRzOiBlbGVtZW50cy5sZW5ndGgsXG5cdFx0XHRwcm9jZXNzaW5nVGltZTogYCR7KGVuZFRpbWUgLSBzdGFydFRpbWUpLnRvRml4ZWQoMil9bXNgXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc21hbGxJbWFnZXM7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZVNtYWxsSW1hZ2VzKGRvYzogRG9jdW1lbnQsIHNtYWxsSW1hZ2VzOiBTZXQ8c3RyaW5nPikge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXG5cdFx0WydpbWcnLCAnc3ZnJ10uZm9yRWFjaCh0YWcgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcblx0XHRcdEFycmF5LmZyb20oZWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdGNvbnN0IGlkZW50aWZpZXIgPSB0aGlzLmdldEVsZW1lbnRJZGVudGlmaWVyKGVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoaWRlbnRpZmllciAmJiBzbWFsbEltYWdlcy5oYXMoaWRlbnRpZmllcikpIHtcblx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBzbWFsbCBlbGVtZW50czonLCByZW1vdmVkQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRFbGVtZW50SWRlbnRpZmllcihlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XG5cdFx0Ly8gVHJ5IHRvIGNyZWF0ZSBhIHVuaXF1ZSBpZGVudGlmaWVyIHVzaW5nIHZhcmlvdXMgYXR0cmlidXRlc1xuXHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuXHRcdFx0Ly8gRm9yIGxhenktbG9hZGVkIGltYWdlcywgdXNlIGRhdGEtc3JjIGFzIGlkZW50aWZpZXIgaWYgYXZhaWxhYmxlXG5cdFx0XHRjb25zdCBkYXRhU3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpZiAoZGF0YVNyYykgcmV0dXJuIGBzcmM6JHtkYXRhU3JjfWA7XG5cdFx0XHRcblx0XHRcdGNvbnN0IHNyYyA9IGVsZW1lbnQuc3JjIHx8ICcnO1xuXHRcdFx0Y29uc3Qgc3Jjc2V0ID0gZWxlbWVudC5zcmNzZXQgfHwgJyc7XG5cdFx0XHRjb25zdCBkYXRhU3Jjc2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRcblx0XHRcdGlmIChzcmMpIHJldHVybiBgc3JjOiR7c3JjfWA7XG5cdFx0XHRpZiAoc3Jjc2V0KSByZXR1cm4gYHNyY3NldDoke3NyY3NldH1gO1xuXHRcdFx0aWYgKGRhdGFTcmNzZXQpIHJldHVybiBgc3Jjc2V0OiR7ZGF0YVNyY3NldH1gO1xuXHRcdH1cblxuXHRcdGNvbnN0IGlkID0gZWxlbWVudC5pZCB8fCAnJztcblx0XHRjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSB8fCAnJztcblx0XHRjb25zdCB2aWV3Qm94ID0gZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQgPyBlbGVtZW50LmdldEF0dHJpYnV0ZSgndmlld0JveCcpIHx8ICcnIDogJyc7XG5cdFx0XG5cdFx0aWYgKGlkKSByZXR1cm4gYGlkOiR7aWR9YDtcblx0XHRpZiAodmlld0JveCkgcmV0dXJuIGB2aWV3Qm94OiR7dmlld0JveH1gO1xuXHRcdGlmIChjbGFzc05hbWUpIHJldHVybiBgY2xhc3M6JHtjbGFzc05hbWV9YDtcblx0XHRcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgZmluZE1haW5Db250ZW50KGRvYzogRG9jdW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG5cblx0XHQvLyBGaW5kIGFsbCBwb3RlbnRpYWwgY29udGVudCBjb250YWluZXJzXG5cdFx0Y29uc3QgY2FuZGlkYXRlczogeyBlbGVtZW50OiBFbGVtZW50OyBzY29yZTogbnVtYmVyIH1bXSA9IFtdO1xuXG5cdFx0RU5UUllfUE9JTlRfRUxFTUVOVFMuZm9yRWFjaCgoc2VsZWN0b3IsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdC8vIEJhc2Ugc2NvcmUgZnJvbSBzZWxlY3RvciBwcmlvcml0eSAoZWFybGllciA9IGhpZ2hlcilcblx0XHRcdFx0bGV0IHNjb3JlID0gKEVOVFJZX1BPSU5UX0VMRU1FTlRTLmxlbmd0aCAtIGluZGV4KSAqIDEwO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQWRkIHNjb3JlIGJhc2VkIG9uIGNvbnRlbnQgYW5hbHlzaXNcblx0XHRcdFx0c2NvcmUgKz0gdGhpcy5zY29yZUVsZW1lbnQoZWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRjYW5kaWRhdGVzLnB1c2goeyBlbGVtZW50LCBzY29yZSB9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGNhbmRpZGF0ZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQvLyBGYWxsIGJhY2sgdG8gc2NvcmluZyBibG9jayBlbGVtZW50c1xuXHRcdFx0Ly8gQ3VycmVudGx5IDxib2R5PiBlbGVtZW50IGlzIHVzZWQgYXMgdGhlIGZhbGxiYWNrLCBzbyB0aGlzIGlzIG5vdCB1c2VkXG5cdFx0XHRyZXR1cm4gdGhpcy5maW5kQ29udGVudEJ5U2NvcmluZyhkb2MpO1xuXHRcdH1cblxuXHRcdC8vIFNvcnQgYnkgc2NvcmUgZGVzY2VuZGluZ1xuXHRcdGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuXHRcdFxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHR0aGlzLl9sb2coJ0NvbnRlbnQgY2FuZGlkYXRlczonLCBjYW5kaWRhdGVzLm1hcChjID0+ICh7XG5cdFx0XHRcdGVsZW1lbnQ6IGMuZWxlbWVudC50YWdOYW1lLFxuXHRcdFx0XHRzZWxlY3RvcjogdGhpcy5nZXRFbGVtZW50U2VsZWN0b3IoYy5lbGVtZW50KSxcblx0XHRcdFx0c2NvcmU6IGMuc2NvcmVcblx0XHRcdH0pKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXNbMF0uZWxlbWVudDtcblx0fVxuXG5cdHByaXZhdGUgZmluZENvbnRlbnRCeVNjb3JpbmcoZG9jOiBEb2N1bWVudCk6IEVsZW1lbnQgfCBudWxsIHtcblx0XHRjb25zdCBjYW5kaWRhdGVzID0gdGhpcy5zY29yZUVsZW1lbnRzKGRvYyk7XG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXMubGVuZ3RoID4gMCA/IGNhbmRpZGF0ZXNbMF0uZWxlbWVudCA6IG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGdldEVsZW1lbnRTZWxlY3RvcihlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcblx0XHRsZXQgY3VycmVudDogRWxlbWVudCB8IG51bGwgPSBlbGVtZW50O1xuXHRcdFxuXHRcdHdoaWxlIChjdXJyZW50ICYmIGN1cnJlbnQgIT09IHRoaXMuZG9jLmRvY3VtZW50RWxlbWVudCkge1xuXHRcdFx0bGV0IHNlbGVjdG9yID0gY3VycmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAoY3VycmVudC5pZCkge1xuXHRcdFx0XHRzZWxlY3RvciArPSAnIycgKyBjdXJyZW50LmlkO1xuXHRcdFx0fSBlbHNlIGlmIChjdXJyZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgY3VycmVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHNlbGVjdG9yICs9ICcuJyArIGN1cnJlbnQuY2xhc3NOYW1lLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmpvaW4oJy4nKTtcblx0XHRcdH1cblx0XHRcdHBhcnRzLnVuc2hpZnQoc2VsZWN0b3IpO1xuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJyA+ICcpO1xuXHR9XG5cblx0cHJpdmF0ZSBzY29yZUVsZW1lbnRzKGRvYzogRG9jdW1lbnQpOiBDb250ZW50U2NvcmVbXSB7XG5cdFx0Y29uc3QgY2FuZGlkYXRlczogQ29udGVudFNjb3JlW10gPSBbXTtcblxuXHRcdEJMT0NLX0VMRU1FTlRTLmZvckVhY2goKHRhZzogc3RyaW5nKSA9PiB7XG5cdFx0XHRBcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpKS5mb3JFYWNoKChlbGVtZW50OiBFbGVtZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHNjb3JlID0gdGhpcy5zY29yZUVsZW1lbnQoZWxlbWVudCk7XG5cdFx0XHRcdGlmIChzY29yZSA+IDApIHtcblx0XHRcdFx0XHRjYW5kaWRhdGVzLnB1c2goeyBzY29yZSwgZWxlbWVudCB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gY2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG5cdH1cblxuXHRwcml2YXRlIHNjb3JlRWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogbnVtYmVyIHtcblx0XHRsZXQgc2NvcmUgPSAwO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gZWxlbWVudCBwcm9wZXJ0aWVzXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJyA/IFxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHRcdGNvbnN0IGlkID0gZWxlbWVudC5pZCA/IGVsZW1lbnQuaWQudG9Mb3dlckNhc2UoKSA6ICcnO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gY29udGVudFxuXHRcdGNvbnN0IHRleHQgPSBlbGVtZW50LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdGNvbnN0IHdvcmRzID0gdGV4dC5zcGxpdCgvXFxzKy8pLmxlbmd0aDtcblx0XHRzY29yZSArPSBNYXRoLm1pbihNYXRoLmZsb29yKHdvcmRzIC8gMTAwKSwgMyk7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBsaW5rIGRlbnNpdHlcblx0XHRjb25zdCBsaW5rcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcblx0XHRjb25zdCBsaW5rVGV4dCA9IEFycmF5LmZyb20obGlua3MpLnJlZHVjZSgoYWNjLCBsaW5rKSA9PiBhY2MgKyAobGluay50ZXh0Q29udGVudD8ubGVuZ3RoIHx8IDApLCAwKTtcblx0XHRjb25zdCBsaW5rRGVuc2l0eSA9IHRleHQubGVuZ3RoID8gbGlua1RleHQgLyB0ZXh0Lmxlbmd0aCA6IDA7XG5cdFx0aWYgKGxpbmtEZW5zaXR5ID4gMC41KSB7XG5cdFx0XHRzY29yZSAtPSAxMDtcblx0XHR9XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBwcmVzZW5jZSBvZiBtZWFuaW5nZnVsIGVsZW1lbnRzXG5cdFx0Y29uc3QgcGFyYWdyYXBocyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3AnKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gcGFyYWdyYXBocztcblxuXHRcdGNvbnN0IGltYWdlcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpLmxlbmd0aDtcblx0XHRzY29yZSArPSBNYXRoLm1pbihpbWFnZXMgKiAzLCA5KTtcblxuXHRcdHJldHVybiBzY29yZTtcblx0fVxufSAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiZXhwb3J0IHsgRGVmdWRkbGUgfSBmcm9tICcuL2RlZnVkZGxlJztcbmV4cG9ydCB0eXBlIHsgRGVmdWRkbGVPcHRpb25zLCBEZWZ1ZGRsZVJlc3BvbnNlLCBEZWZ1ZGRsZU1ldGFkYXRhIH0gZnJvbSAnLi90eXBlcyc7ICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==