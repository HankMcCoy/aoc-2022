import { hasTotalOverlap, parseAssignmentPair, part1, part2 } from './'

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split('\n')

test('Part 1', () => {
	expect(part1(input)).toBe(2)
})

test('Part 2', () => {
	expect(part2(input)).toBe(4)
})

test('parseAssignments', () => {
	expect(parseAssignmentPair('1-2,4-8')).toEqual([
		{ start: 1, end: 2 },
		{ start: 4, end: 8 },
	])
})

test('hasTotalOverlap', () => {
	expect(
		hasTotalOverlap([
			{ start: 1, end: 2 },
			{ start: 1, end: 2 },
		])
	).toBe(true)
	expect(
		hasTotalOverlap([
			{ start: 1, end: 5 },
			{ start: 2, end: 4 },
		])
	).toBe(true)
	expect(
		hasTotalOverlap([
			{ start: 3, end: 4 },
			{ start: 1, end: 8 },
		])
	).toBe(true)
	expect(
		hasTotalOverlap([
			{ start: 3, end: 5 },
			{ start: 4, end: 7 },
		])
	).toBe(false)
})
