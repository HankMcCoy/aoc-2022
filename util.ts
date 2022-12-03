import { readFileSync } from 'fs'
import * as path from 'path'

export const getInputInts = (dir: string) =>
	getInputLines(dir).map((t) => parseInt(t, 10))

export const getInputFloats = (dir: string) =>
	getInputLines(dir).map((t) => parseFloat(t))

export function getInputLines(dir: string, removeEmpty: boolean = true) {
	const input = readFileSync(path.join(dir, './input.txt'), {
		encoding: 'utf-8',
	})
	return input.split('\n').filter((x) => (removeEmpty ? x : true))
}

export function splitOnEmpty(lines: string[]): [string[], string[]] {
	const emptyIdx = lines.indexOf('')
	return [lines.slice(0, emptyIdx), lines.slice(emptyIdx + 1)]
}

/**
 * This little utility just doesn't run the function it is given if the process
 * is running in a test environment. This enables me to put my testable pure
 * functions in the same file as my "write the solution to the console given the
 * actual input" code, but avoid having the latter bit run during tests.
 */
export function run(fnToRun: () => void) {
	if (process.env.NODE_ENV !== 'test') {
		fnToRun()
	}
}

export function range(a: number, b: number): number[] {
	if (b < a) throw new Error('NOT IMPLEMENTED: Cannot make a reverse range')
	return new Array(b - a + 1).fill(undefined).map((_, i) => a + i)
}

export function permute<T1, T2>(a1: T1[], a2: T2[]): [T1, T2][] {
	if (a1.length !== a2.length)
		throw new Error('Cannot permute arrays of different lengths')

	return a1.flatMap((a) => {
		return a2.map((b) => [a, b] as [T1, T2])
	})
}

export const uniq = <T>(a: Array<T>): Array<T> => [...new Set([...a]).values()]
export const intersect = <T>(a: Array<T>, b: Array<T>): Array<T> => {
	return [...new Set([...a].filter((x) => b.includes(x)))]
}

export const partition = <T>(
	a: Array<T>,
	chunkSize: number
): Array<Array<T>> => {
	const groups = []
	for (let i = 0; i < a.length; i += chunkSize) {
		groups.push(a.slice(i, i + chunkSize))
	}
	return groups
}

export const uniqifyPoints = (points: Point[]): Point[] =>
	uniq(points.map(serializePoint)).map(deserializePoint)

export interface Point {
	x: number
	y: number
}

export const serializePoint = (p: Point): string => `${p.x},${p.y}`
export const deserializePoint = (s: string): Point => {
	const r = /(?<x>\d+),(?<y>\d+)/.exec(s)
	if (!r || !r.groups) throw new Error('Invalid point')
	return { x: parseInt(r.groups.x, 10), y: parseInt(r.groups.y, 10) }
}

export const isInBounds = <T>(grid: T[][], { x, y }: Point): boolean =>
	x >= 0 && x < grid[0].length && y >= 0 && y < grid.length

export const getNeighbors = <T>(
	grid: T[][],
	{ x, y }: Point,
	orthogonal: boolean = true
): Array<Point> =>
	permute(range(-1, 1), range(-1, 1))
		.filter(([dx, dy]) => !(dx === 0 && dy === 0))
		.filter(([dx, dy]) => !(orthogonal && Math.abs(dx) === Math.abs(dy)))
		.map(([dx, dy]) => ({
			x: x + dx,
			y: y + dy,
		}))
		.filter((p) => isInBounds(grid, p))

export const isNotUndefined = <T>(value: T | undefined): value is T =>
	value !== undefined
