module.exports = {
	rules: {
		"no-date-fns": require("./rules/no-date-fns"),
		"no-global-fetch": require("./rules/no-global-fetch"),
	},
	configs: {
		recommended: {
			// eslint-disable-next-line unicorn/prevent-abbreviations
			env: {
				es6: true,
			},
			plugins: ["@urlaubsverwaltung/eslint-plugin"],
			rules: {
				"@urlaubsverwaltung/no-date-fns": "error",
				"@urlaubsverwaltung/no-global-fetch": "error",
			},
		},
	},
};
