const test = require("ava");
const avaRuleTester = require("eslint-ava-rule-tester");
const rule = require("../rules/no-global-fetch");

const ruleTester = avaRuleTester(test, {
	parserOptions: {
		ecmaVersion: 2015,
		sourceType: "module",
	},
});

ruleTester.run("no-global-fetch", rule, {
	valid: [
		"fetch.getJSON('/api')",
		"const fetch = () => {}; fetch('/api');",
		"import fetch from 'fetch'; fetch('/api');",
	],

	invalid: [
		{
			code: "fetch('/api')",
			errors: [
				"global fetch should not be used. please use an abstraction layer.",
			],
		},
		{
			code: "window.fetch('/api')",
			errors: [
				"global fetch should not be used. please use an abstraction layer.",
			],
		},
		{
			code: "global.fetch('/api')",
			errors: [
				"global fetch should not be used. please use an abstraction layer.",
			],
		},
		{
			code: "const fetch = window.fetch.bind(window); fetch('/api')",
			errors: [
				"global fetch should not be used. please use an abstraction layer.",
			],
		},
		{
			code: "const fetch = url => window.fetch(url); fetch('/api')",
			errors: [
				"global fetch should not be used. please use an abstraction layer.",
			],
		},
		{
			// error refers to 'global.fetch'. not to the #fetch function invocation hwich is a custom defined one in scope
			code: "const fetch = url => global.fetch(url); fetch('/api')",
			errors: [
				"global fetch should not be used. please use an abstraction layer.",
			],
		},
		{
			// error refers to 'global.fetch'. not to the #fetch function within #muchDeep0r
			code:
				"const fetch = url => global.fetch(url); function deep0r() { function muchDeep0r() { fetch('/api') } }",
			errors: [
				"global fetch should not be used. please use an abstraction layer.",
			],
		},
	],
});
