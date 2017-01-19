export const FadeOutAnimation = {
	keyframes: function () {
		return [
			{ opacity: 1, offset: 0 },
			{ opacity: 0, offset: 1 }
		]
	},

	initialStyles: {
		opacity: 1,
	}
};