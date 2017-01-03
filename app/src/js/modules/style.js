export function boxShadow ( rgbCode ) {
	let c = rgbCode.match(/\d+/g);

	return `0 12px 16px 1px rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.14),
			0 4px 22px 3px rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.12),
			0 6px 7px -4px rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.4)`
}

