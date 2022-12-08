import { parseInstructions, parseStacks, part1, part2 } from './'

const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
	.slice(1)
	.split('\n')

test('Part 1', () => {
	expect(part1(input)).toBe('CMZ')
})

test('parseStacks', () => {
	expect(
		parseStacks(
			`
    [D]
[N] [C]
[Z] [M] [P]`
				.slice(1)
				.split('\n')
		)
	).toEqual([['Z', 'N'], ['M', 'C', 'D'], ['P']])
})
test('parseInstructions', () => {
	expect(parseInstructions(['move 3 from 1 to 3'])).toEqual([
		{
			amount: 3,
			from: 1,
			to: 3,
		},
	])
})

test('Part 2', () => {
	expect(part2(input)).toBe('MCD')
})
