import { parse } from 'path'
import { run, getInputLines } from '../util'

type Instruction = {
	amount: number
	from: number
	to: number
}

export const parseStacks = (lines: string[]): string[][] => {
	const linesFromBottom = [...lines].reverse()
	const numStacks = Math.ceil(linesFromBottom[0].length / 4)
	const stacks: string[][] = new Array(numStacks).fill(null).map(() => [])
	for (let crateLine of linesFromBottom) {
		for (let i = 0; i < numStacks; i++) {
			const item = crateLine[i * 4 + 1]
			if (item && item !== ' ') {
				stacks[i].push(item)
			}
		}
	}
	return stacks
}

const parseInstruction = (line: string): Instruction => {
	const [amount, from, to] =
		/move (\d+) from (\d+) to (\d+)/
			.exec(line)
			?.slice(1)
			.map((x) => parseInt(x, 10)) ?? []
	return { amount, from, to }
}
export const parseInstructions = (lines: string[]): Instruction[] => {
	return lines.map(parseInstruction)
}

const performInstructionV1 = (stacks: string[][], instr: Instruction): void => {
	for (let i = 0; i < instr.amount; i++) {
		const item = stacks[instr.from - 1].pop()
		if (!item) throw new Error('BAD')
		stacks[instr.to - 1].push(item)
	}
}

const parseInput = (
	input: string[]
): { stacks: string[][]; instructions: Instruction[] } => {
	const emptyIdx = input.indexOf('')
	const cratesLines = input.slice(0, emptyIdx - 1)
	const instructionLines = input.slice(emptyIdx + 1)
	return {
		stacks: parseStacks(cratesLines),
		instructions: parseInstructions(instructionLines),
	}
}
export function part1(input: string[]): string {
	const { stacks, instructions } = parseInput(input)

	for (let instr of instructions) {
		performInstructionV1(stacks, instr)
	}

	return stacks.map((s) => s[s.length - 1]).join('')
}

const performInstructionV2 = (stacks: string[][], instr: Instruction): void => {
	const fromStack = stacks[instr.from - 1]
	const toStack = stacks[instr.to - 1]
	const items = fromStack.splice(fromStack.length - instr.amount)
	toStack.push(...items)
}
export function part2(input: string[]): string {
	const { stacks, instructions } = parseInput(input)
	for (let instr of instructions) {
		performInstructionV2(stacks, instr)
	}

	return stacks.map((s) => s[s.length - 1]).join('')
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname, false)))
	console.log('Part 2', part2(getInputLines(__dirname, false)))
})
