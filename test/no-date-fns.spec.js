const test = require("ava");
const avaRuleTester = require("eslint-ava-rule-tester");
const rule = require("../rules/no-date-fns");

const ruleTester = avaRuleTester(test, {
	parserOptions: {
		ecmaVersion: 2015,
		sourceType: "module",
	},
});

ruleTester.run("no-react-intl", rule, {
	valid: [
		"import { startOfYear } from 'date-fns';",
		"import { getYear, setYear, startOfYear, subMonths, addMonths } from 'date-fns';",
	],

	invalid: [
		{
			code: "import DateFns from 'date-fns';",
			errors: ["date-fns (imported as 'DateFns') should not be used directly"],
		},
		{
			code: "import { startOfYear, format } from 'date-fns';",
			errors: ["please use format function from our own libs/date-fns package"],
		},
		{
			code: "import { startOfYear, startOfWeek } from 'date-fns';",
			errors: [
				"please use startOfWeek function from our own libs/date-fns package",
			],
		},
		{
			code: "import { startOfYear, format, startOfWeek } from 'date-fns';",
			errors: [
				"please use format function from our own libs/date-fns package",
				"please use startOfWeek function from our own libs/date-fns package",
			],
		},
	],
});
