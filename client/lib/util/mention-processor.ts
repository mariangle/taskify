const listRegex = /@\[([^)]+)\]\(at:([^)]+)\)/g // @[Work](at:b35464f9-079f-481c-6b7e-08dbf3340e69)
const labelRegex = /@\[([^)]+)\]\(hash:([^)]+)\)/g // @[Shopping](hash:46d7f7f9-0fff-45aa-b984-08dbedb5b996)

import { LabelResponse } from '@/types'

interface FormatMentionInputProps {
  name: string
  labelIds: string[]
  labels: LabelResponse[]
}

/**
 * Formats the mention input by combining selected labels and task name.
 *
 * @param {FormatMentionInputProps} props - The properties containing task name, selected label IDs, and all available labels.
 * @returns {string | undefined} The formatted mention input, combining labels and task name.
 *                              If no labels are selected and task name is empty, returns undefined.
 */
export const formatMentionInput = ({ name, labelIds, labels }: FormatMentionInputProps): string | undefined => {
  // Filter the labels based on selected label IDs
  const selectedLabels = labels.filter((label) => labelIds?.includes(label.id))

  // Format the selected labels for mention input
  const formattedLabels = selectedLabels.map((label) => `@[${label.name}](hash:${label.id})`).join(' ')

  // Check if there are formatted labels, if yes, combine with task name; otherwise, return the task name
  if (formattedLabels) {
    return `${formattedLabels} ${name}`
  } else if (name) {
    return name
  } else {
    return undefined
  }
}

/**
 * Extracts a name from a given input string by removing list and label information.
 *
 * @param input - The input string which might contain lists and labels.
 * @returns The extracted name after removing list and label content, trimmed for whitespace.
 */
export const extractName = (input: string): string => {
  const result = input.replace(listRegex, '').replace(labelRegex, '').trim()

  // Use a regular expression to trim only leading spaces
  const trimmedResult = result.trimStart()

  return result
}

/**
 * Extracts list ID from a given input string.
 *
 * @param input - The input string containing list information.
 * @returns The list ID or undefined if no matches are found.
 */
export const extractListId = (input: string): string | undefined => {
  const listMatches = input.match(listRegex)

  // Extract the list ID from the last selected list, taking the portion after ':' and excluding the trailing ')'
  return listMatches ? listMatches[listMatches.length - 1].split(':')[1].slice(0, -1) : undefined
}

/**
 * Extracts label IDs from a given input string.
 *
 * @param input - The input string containing labels with IDs.
 * @returns An array of unique label IDs, or undefined if no matches are found.
 */
export const extractLabelIds = (input: string): string[] | undefined => {
  const labelMatches = input.match(labelRegex)

  const extractedLabelIds = labelMatches
    ? Array.from(new Set(labelMatches.map((match) => match.split(':')[1].slice(0, -1))))
    : []

  return labelMatches ? extractedLabelIds : undefined
}
