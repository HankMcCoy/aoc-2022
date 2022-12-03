import { permute, range, getNeighbors, partition } from './util'

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

test('getNeighbors, corner', () => {
	const grid = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]
	const neighbors = getNeighbors(grid, { x: 0, y: 0 })
	expect(neighbors.length).toBe(2)
	expect(neighbors).toContainEqual({ x: 1, y: 0 })
	expect(neighbors).toContainEqual({ x: 0, y: 1 })
})

test('getNeighbors, center orthogonal', () => {
	const grid = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]
	const neighbors = getNeighbors(grid, { x: 1, y: 1 })
	expect(neighbors.length).toBe(4)
})

test('getNeighbors, center non-orthogonal', () => {
	const grid = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]
	const neighbors = getNeighbors(grid, { x: 1, y: 1 }, false)
	expect(neighbors.length).toBe(8)
})

test('partition', () => {
	expect(partition([1, 2, 3, 4, 5, 6], 3)).toEqual([
		[1, 2, 3],
		[4, 5, 6],
	])
})
