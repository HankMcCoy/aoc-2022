import { permute, range, intersect, partition } from './util'

test('permute', () => {
	const permutations = permute(['a', 'b'], [1, 2])
	expect(permutations).toContainEqual(['a', 1])
	expect(permutations).toContainEqual(['a', 2])
	expect(permutations).toContainEqual(['b', 1])
	expect(permutations).toContainEqual(['b', 2])
})

test('range', () => {
	expect(range(1, 3)).toStrictEqual([1, 2, 3])
	expect(() => range(3, 1)).toThrow()
})

test('partition', () => {
	expect(partition([1, 2, 3, 4, 5, 6], 3)).toEqual([
		[1, 2, 3],
		[4, 5, 6],
	])
})

test('intersect', () => {
	expect(intersect([1, 2, 3], [3, 4, 8], [12, 48, 3])).toEqual([3])
})
