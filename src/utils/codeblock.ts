import fs from'fs'
import hljs from 'highlight.js'
import cheerio from 'cheerio'
import webshot from 'webshot'
const beautify = require('js-beautify').js_beautify

let styles = "pre{tab-size:4;}span::after{content: ' ';}";
let defaultTheme = "body{background:#23241f;color: white;-webkit-text-size-adjust:none;font-size:1.5em;}.aspectj .hljs-function,.css .hljs-function .hljs-preprocessor,.css .hljs-rule,.css .hljs-value,.hljs,.hljs-pragma,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong,.hljs-strongemphasis{color:#a8a8a2}.alias .hljs-keyword,.hljs-blockquote,.hljs-bullet,.hljs-hexcolor,.hljs-horizontal_rule,.hljs-literal,.hljs-number,.hljs-regexp{color:#ae81ff}.css .hljs-class,.hljs-class .hljs-title:last-child,.hljs-code,.hljs-tag .hljs-value,.hljs-title{color:#a6e22e}.hljs-link_url{font-size:80%}.hljs-strong,.hljs-strongemphasis{font-weight:700}.hljs-class .hljs-title:last-child,.hljs-emphasis,.hljs-strongemphasis,.hljs-typename{font-style:italic}.alias .hljs-keyword:first-child,.css .hljs-important,.css .hljs-tag,.css .unit,.hljs-attribute,.hljs-change,.hljs-flow,.hljs-function,.hljs-header,.hljs-keyword,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-tag .hljs-title,.hljs-value,.hljs-winutils,.nginx .hljs-title,.ruby .hljs-class .hljs-keyword:first-child,.ruby .hljs-function .hljs-keyword,.tex .hljs-special{color:#f92672}.css .hljs-attribute,.hljs-aspect .hljs-keyword:first-child,.hljs-class .hljs-keyword:first-child,.hljs-constant,.hljs-function .hljs-keyword,.hljs-name,.hljs-typename{color:#66d9ef}.hljs-aspect .hljs-title,.hljs-class .hljs-title,.hljs-params,.hljs-variable{color:#f8f8f2}.apache .hljs-cbracket,.apache .hljs-tag,.css .hljs-id,.django .hljs-filter .hljs-argument,.django .hljs-template_tag,.django .hljs-variable,.hljs-addition,.hljs-attr_selector,.hljs-built_in,.hljs-envvar,.hljs-link_label,.hljs-link_url,.hljs-prompt,.hljs-pseudo,.hljs-stream,.hljs-string,.hljs-subst,.hljs-type,.ruby .hljs-class .hljs-parent,.smalltalk .hljs-array,.smalltalk .hljs-class,.smalltalk .hljs-localvars,.tex .hljs-command{color:#e6db74}.apache .hljs-sqbracket,.hljs-annotation,.hljs-comment,.hljs-decorator,.hljs-deletion,.hljs-doctype,.hljs-javadoc,.hljs-pi,.hljs-shebang,.tex .hljs-formula{color:#75715e}.coffeescript .javascript,.javascript .xml,.php .xml,.tex .hljs-formula,.xml .css,.xml .hljs-cdata,.xml .javascript,.xml .php,.xml .vbscript{opacity:.5}";

export const code_block = (code: string, char: string = "█", theme: string = defaultTheme) => {
	if (char.length != 1)
		throw new Error(`${char} is not a single character!`);
	let style = styles + theme;
	code = beautify(code, {
		"indent_with_tabs": true,
		"jslint_happy": true,
		"end_with_newline": true
	});
	let hcode = hljs.highlight('javascript', code).value;
	hcode = "<pre>" + hcode + "</pre>";
	let $ = cheerio.load(hcode, { decodeEntities: false });
	$('head').append($("<style>").html(style));
	$('pre').contents()
		.filter(function () { return this.nodeType === 3 })
		.each(function () {
			let matches = $(this).text().match(/^([\n\t]*)(.+?)([\n\t]*)$/s)
			let elem = "<span>" + matches[2] + "</span>";
			if (matches[2].trim().length == 0)
				elem = matches[2]
			if (elem == " ") elem = "";
			$(this).replaceWith(matches[1] + elem + matches[3])
		})
	$('pre > span').each(function () {
		// get rid of sub children elems
		let text = $(this).text();
		$(this).text(text)
	})
	$('span').each(function () {
		$(this).text($(this).text().replace(/ /g, ""));
		$(this).text($(this).text().replace(/[^\s]/g, char));
		$(this).text($(this).text().replace(new RegExp("[^" + char + "\n\t]", "g"), " "));
	})
    let fname = parseInt(JSON.stringify(Math.random() * 1000000)) + ".png"
    webshot($.html(), fname, {
        siteType: 'html',
        defaultWhiteBackground: true,
        windowSize: { width: 1024, height: 1 },
        shotSize: { width: 'window', height: 'all' }
    }, function (error: Error) {
        if (error)
            return error

        const data = fs.readFileSync(fname)
        fs.unlinkSync(fname)
        return data
    })
}