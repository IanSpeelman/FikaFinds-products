export default function isCorrectFormat(input: string = '') {

    return input.match(/^([^:,]+:[^:,]+)(,[^:,]+:[^:,]+)*$/) !== null
}
