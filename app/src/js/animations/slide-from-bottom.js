export const SlideFromBottomAnimation = {
	keyframes: function () {
		return [
			{
				transform: 'translateY(100%)',
				offset: 0
			},
			{
				transform: 'translateY(0',
				offset: 1
			}
		]
	},

	initialStyles: {
		transform: 'translateY(100%)',
		transformOrigin: '50%'
	}
}

export const SlideFromBottomAndFadeInAnimation = {
		keyframes: function () {
		return [
			{
				transform: 'translateY(100%)',
				opacity: 0,
				offset: 0
			},
			{
				transform: 'translateY(0)',
				opacity: 1,
				offset: 1
			}
		]
	},

	initialStyles: {
		transform: 'translateY(100%)',
		opacity: 0,
		transformOrigin: '50%'
	}
}

export const SlideFromNearTopAndFadeInAnimation = {
	keyframes: function () {
		return [
			{
				transform: 'translateY(200px)',
				opacity: 0,
				offset: 0
			},
			{
				opacity: 1,
				offset: 0.25
			},
			{
				transform: 'translateY(0)',
				opacity: 1,
				offset: 1
			}
		]
	},

	initialStyles: {
		transform: 'translateY(200px)',
		opacity: 0,
		transformOrigin: '50%'
	}
}