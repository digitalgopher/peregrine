export const SlideRightAnimation = {
	keyframes: function () {
		return [
			{ transform: 'translateX(0)', offset: 0 },
			{ transform: 'translateX(100%)', offset: 1 }
		]
	},

	initialStyles: {
		transform: 'translate(0, 0)',
		transformOrigin: '50%'
	}
};

export const SlideRightAndFadeOutAnimation = {
	keyframes: function () {
		return [
			{ transform: 'translateX(0)', opacity: 1, offset: 0 },
			{ transform: 'translateX(100%)', opacity: 0, offset: 1 }
		]
	},

	initialStyles: {
		opacity: 1,
		transform: 'translate(0, 0)',
		transformOrigin: '50%'
	}
};