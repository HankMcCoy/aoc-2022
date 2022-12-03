import { part1, part2, getScoreOfGame1, getScoreOfGame2 } from './'

const input = `A Y
B X
C Z`.split('\n')

test('Part 1', () => {
	expect(part1(input)).toBe(15)
})

test('Part 2', () => {
	expect(part2(input)).toBe(12)
})

test('getScoreOfGame1', () => {
	expect(getScoreOfGame1('A Y')).toBe(8)
})
test('getScoreOfGame2', () => {
	expect(getScoreOfGame2('A Y')).toBe(4)
})
