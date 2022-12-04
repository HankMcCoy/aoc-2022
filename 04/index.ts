import { run, getInputLines } from '../util'

interface Assignment {
	start: number
	end: number
}
const parseAssignment = (str: string): Assignment => {
	const [start, end] = str.split('-').map((x) => parseInt(x, 10))
	return { start, end }
}
export const parseAssignmentPair = (line: string): [Assignment, Assignment] => {
	const [first, second] = line.split(',')

	return [parseAssignment(first), parseAssignment(second)]
}
export const hasTotalOverlap = ([a1, a2]: [Assignment, Assignment]) => {
	return (
		(a1.start >= a2.start && a1.end <= a2.end) ||
		(a2.start >= a1.start && a2.end <= a1.end)
	)
}
export function part1(input: string[]): number {
	return input.map(parseAssignmentPair).filter(hasTotalOverlap).length
}

export const hasAnyOverlap = ([a1, a2]: [Assignment, Assignment]) => {
	return (
		(a1.start >= a2.start && a1.start <= a2.end) ||
		(a2.start >= a1.start && a2.start <= a1.end)
	)
}
export function part2(input: string[]): number {
	return input.map(parseAssignmentPair).filter(hasAnyOverlap).length
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
