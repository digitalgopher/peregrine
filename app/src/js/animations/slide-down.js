export const SlideDownAnimation = {
	keyframes: function () {
		return [
			{ 
				transform: 'transformY(0)', 
				offset: 0 
			},
			{ 
				transform: 'transformY(100%)', 
				offset: 1 
			}
		]
	},

	initialStyles: {
		transformOrigin: '50%'
	}
};

export const SlideDownAndFadeOutAnimation = {
	keyframes: function () {
		return [
			{ 
				transform: 'transformY(0)', 
				opacity: 1, 
				offset: 0 
			},
			{ 
				transform: 'transformY(100%)', 
				opacity: 0, 
				offset: 1 
			}
		]
	},

	initialStyles: {
		opacity: 1,
		transform: 'transformY(0)',
		transformOrigin: '50%'
	}	
}