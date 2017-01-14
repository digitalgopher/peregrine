export function screenResize () {
	if (window.matchMedia('(max-width: 500px)').matches ) {
		return 'SMALL';
	}
	return 'LARGE';
}