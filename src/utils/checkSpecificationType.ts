export function isCorrectSpecificationFormat(input: string = '') {
    return input.match(/^([^:,]+:[^:,]+)(,[^:,]+:[^:,]+)*$/) !== null
}

export function isCorrectImageString(input: string = '') {
    return input.match(/^([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+)(#[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+)*$/) !== null
}
