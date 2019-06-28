function isCalleeOfGlobal(node) {
	if (node.type === "MemberExpression") {
		// node.object -> source
		// node.property -> method on the object
		return isCalleeOfGlobal(node.object);
	}
	// node is of type 'Identifier' (hopefully :o) ) which has a name
	return /window|global/.test(node.name);
}

function isNativeFetchCallExpression(node, context) {
	if (node.callee.type === "MemberExpression") {
		if (isCalleeOfGlobal(node.callee)) {
			if (node.callee.property.name === "fetch") {
				// e.g. window.fetch()
				return true;
			}
			if (
				node.callee.property.name === "bind" &&
				node.callee.object.property.name === "fetch"
			) {
				// e.g. window.fetch.bind(window)
				return true;
			}
		}
	}
	if (node.callee.name === "fetch") {
		return (function isReferencedInScope(scope) {
			if (scope.type === "global") {
				return true;
			}
			if (scope.variables.some(variable => variable.name === "fetch")) {
				return false;
			}
			return isReferencedInScope(scope.upper);
		})(context.getScope());
	}
	return false;
}

module.exports = {
	meta: {
		docs: {
			description:
				"enforce fetch abstraction layer instead of direct fetch usage",
			category: "frontend architecture",
			recommended: true,
		},
		schema: [],
	},

	create(context) {
		return {
			CallExpression(node) {
				if (isNativeFetchCallExpression(node, context)) {
					context.report({
						node,
						message: `global fetch should not be used. please use an abstraction layer.`,
					});
				}
			},
		};
	},
};
