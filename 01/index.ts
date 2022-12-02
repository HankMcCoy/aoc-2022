import { run, getInputLines } from '../util'

const getCalorieTotals = (input: string[]) => {
	let calorieTotals = []
	let curTotal = 0

	for (let line of input) {
		if (line === '') {
			calorieTotals.push(curTotal)
			curTotal = 0
		} else {
			curTotal += parseInt(line, 10)
		}
	}
	return calorieTotals
}
export function part1(input: string[]): number {
	return Math.max(...getCalorieTotals(input))
}

export function part2(input: string[]): number {
	return getCalorieTotals(input)
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((a, b) => a + b, 0)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname, false)))
	console.log('Part 2', part2(getInputLines(__dirname, false)))
})
