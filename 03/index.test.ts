import {
	part1,
	part2,
	getDuplicateItem,
	getPriority,
	getGroups,
	getBadgeForGroup,
} from './'

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split('\n')

test('Part 1', () => {
	expect(part1(input)).toBe(157)
})

test('Part 2', () => {
	expect(part2(input)).toBe(0)
})

test('getDuplicateItem', () => {
	expect(getDuplicateItem('aBcdcC')).toBe('c')
})

test('getPriority', () => {
	expect(getPriority('a')).toBe(1)
	expect(getPriority('z')).toBe(26)
	expect(getPriority('A')).toBe(27)
	expect(getPriority('Z')).toBe(52)
})

test('getGroups', () => {
	expect(getGroups(['a', 'b', 'c', 'A', 'B', 'C'])).toEqual([
		['a', 'b', 'c'],
		['A', 'B', 'C'],
	])
})

test('getBadgeForGroup', () => {
	expect(getBadgeForGroup(['ab', 'ca', 'aA'])).toBe('a')
})
