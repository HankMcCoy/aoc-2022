import { run, getInputLines, intersect } from '../util'

export const getDuplicateItem = (rucksack: string): string => {
	if (rucksack.length % 2 !== 0) throw new Error('NOPE')
	const firstPart = rucksack.slice(0, rucksack.length / 2)
	const secondPart = rucksack.slice(rucksack.length / 2)
	const itemsInFirst = new Set(firstPart)

	return [...secondPart].filter((item) => itemsInFirst.has(item))[0]
}

export const getPriority = (item: string): number => {
	return item >= 'a' ? item.charCodeAt(0) - 96 : item.charCodeAt(0) - 38
}
export function part1(input: string[]): number {
	return input
		.map(getDuplicateItem)
		.map(getPriority)
		.reduce((a, b) => a + b)
}

export const getGroups = (rucksacks: string[]): string[][] => {
	const groups = []
	for (let i = 0; i < rucksacks.length; i += 3) {
		groups.push([rucksacks[i + 0], rucksacks[i + 1], rucksacks[i + 2]])
	}
	return groups
}
export const getBadgeForGroup = (group: string[]): string => {
	return intersect(intersect([...group[0]], [...group[1]]), [...group[2]])[0]
}
export function part2(input: string[]): number {
	if (input.length % 3) throw new Error('BAD')

	return getGroups(input)
		.map(getBadgeForGroup)
		.map(getPriority)
		.reduce((a, b) => a + b)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})