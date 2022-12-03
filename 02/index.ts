import { run, getInputLines } from '../util'

const getChoiceScore = (yourChoice: Choice): number => {
	switch (yourChoice) {
		case 'ROCK':
			return 1
		case 'PAPER':
			return 2
		case 'SCISSORS':
			return 3
	}
}

const convertChoice = (choice: string): Choice => {
	if (['A', 'X'].includes(choice)) return 'ROCK'
	if (['B', 'Y'].includes(choice)) return 'PAPER'
	if (['C', 'Z'].includes(choice)) return 'SCISSORS'

	throw new Error(`WTF is this: ${choice}`)
}

type Choice = 'ROCK' | 'PAPER' | 'SCISSORS'
type YourChoice = Choice
type TheirChoice = Choice

const getOutcomeScore = (
	opponentChoice: Choice,
	yourChoice: Choice
): number => {
	const outcome = outcomes[yourChoice][opponentChoice]
	switch (outcome) {
		case 'LOSE':
			return 0
		case 'DRAW':
			return 3
		case 'WIN':
			return 6
		default:
			throw new Error('WTF')
	}
}

const outcomes: Record<YourChoice, Record<TheirChoice, Outcome>> = {
	ROCK: {
		ROCK: 'DRAW',
		PAPER: 'LOSE',
		SCISSORS: 'WIN',
	},
	PAPER: {
		ROCK: 'WIN',
		PAPER: 'DRAW',
		SCISSORS: 'LOSE',
	},
	SCISSORS: {
		ROCK: 'LOSE',
		PAPER: 'WIN',
		SCISSORS: 'DRAW',
	},
}
export const getScoreOfGame1 = (guideLine: string): number => {
	const [opponentChoiceRaw, yourChoiceRaw] = guideLine.split(' ')
	const opponentChoice = convertChoice(opponentChoiceRaw)
	const yourChoice = convertChoice(yourChoiceRaw)
	return (
		getChoiceScore(yourChoice) + getOutcomeScore(opponentChoice, yourChoice)
	)
}

export function part1(input: string[]): number {
	return input.map(getScoreOfGame1).reduce((a, b) => a + b)
}

type Outcome = 'LOSE' | 'DRAW' | 'WIN'
const convertOutcome = (rawOutcome: string): Outcome => {
	switch (rawOutcome) {
		case 'X':
			return 'LOSE'
		case 'Y':
			return 'DRAW'
		case 'Z':
			return 'WIN'
		default:
			throw new Error('WTF')
	}
}
const yourChoiceByOutcome: Record<TheirChoice, Record<Outcome, YourChoice>> = {
	ROCK: {
		LOSE: 'SCISSORS',
		DRAW: 'ROCK',
		WIN: 'PAPER',
	},
	PAPER: {
		LOSE: 'ROCK',
		DRAW: 'PAPER',
		WIN: 'SCISSORS',
	},
	SCISSORS: {
		LOSE: 'PAPER',
		DRAW: 'SCISSORS',
		WIN: 'ROCK',
	},
}
export const getScoreOfGame2 = (guideLine: string): number => {
	const [rawOpponentChoice, rawOutcome] = guideLine.split(' ')
	const opponentChoice = convertChoice(rawOpponentChoice)
	const outcome = convertOutcome(rawOutcome)
	const yourChoice = yourChoiceByOutcome[opponentChoice][outcome]

	return (
		getChoiceScore(yourChoice) + getOutcomeScore(opponentChoice, yourChoice)
	)
}

export function part2(input: string[]): number {
	return input.map(getScoreOfGame2).reduce((a, b) => a + b)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
