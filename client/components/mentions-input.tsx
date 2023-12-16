import React from 'react'

import { MentionsInput as ReactMentionInput, Mention } from 'react-mentions'
import { inputStyle } from '@/styles/default-styles'
import { ListResponse, LabelResponse, TaskEntry, TaskResponse } from '@/types'

interface Event {
  target: { value: string }
}

interface AdvancedInputProps {
  value: string
  setTaskEntry: (
    id: keyof TaskEntry,
    e?: React.ChangeEvent<HTMLInputElement>,
    value?: React.SetStateAction<any>,
  ) => void
  task?: TaskResponse
  lists?: ListResponse[]
  labels?: LabelResponse[]
}

const MentionsInput = ({ value, setTaskEntry, task, lists, labels }: AdvancedInputProps) => {
  const labelIds = task?.labels?.map((label) => label.id)

  const [prompt, setPrompt] = React.useState<string>(value)
  const [selectedLabelIds, setSelectedLabelIds] = React.useState<string[]>(labelIds || [])
  const [selectedListId, setSelectedListId] = React.useState<string>(task?.listId || '')

  // Format items and only suggest non selected items
  const formattedLists = lists
    ?.filter((list) => !selectedListId.includes(list.id))
    .map((list) => ({
      id: list.id,
      display: list.name,
    }))

  const formattedLabels = labels
    ?.filter((label) => !selectedLabelIds.includes(label.id))
    .map((label) => ({
      id: label.id,
      display: label.name,
    }))

  const handleChange = (e: Event) => {
    const inputValue = e.target.value

    // Extract # mentions (labels)
    const labelMatches = inputValue.match(/@\[([^)]+)\]\(hash:([^)]+)\)/g)
    const extractedLabelIds = labelMatches
      ? Array.from(new Set(labelMatches.map((match) => match.split(':')[1].slice(0, -1))))
      : []

    // Extract @ mentions (lists)
    const listMatches = inputValue.match(/@\[([^)]+)\]\(at:([^)]+)\)/g)
    const extractedListIds = listMatches ? listMatches.map((match) => match.split(':')[1].slice(0, -1)) : []

    // Set states
    setSelectedLabelIds([...(labelIds || []), ...extractedLabelIds])
    setSelectedListId((prevSelectedListId) => {
      const newValue = extractedListIds.length > 0 ? extractedListIds[0] : ''
      return prevSelectedListId === newValue ? prevSelectedListId : newValue
    })
    // Remove mentions from taskEntry.name
    const nameWithoutMentions = inputValue
      .replace(/@\[([^)]+)\]\(hash:([^)]+)\)/g, '')
      .replace(/@\[([^)]+)\]\(at:([^)]+)\)/g, '')
      .trim()

    setPrompt(inputValue)
    setTaskEntry('name', undefined, nameWithoutMentions)
    setTaskEntry('labelIds', undefined, [...(labelIds || []), ...extractedLabelIds])
    setTaskEntry('listId', undefined, extractedListIds.length > 0 ? extractedListIds[0] : undefined)
  }

  return (
    <>
      <ReactMentionInput
        value={prompt}
        onChange={(e) => handleChange(e)}
        style={{ ...inputStyle }}
        disabled={!lists || !labels}
        className="w-full"
        placeholder="Add a new task..."
        spellCheck={false}
      >
        <Mention
          markup="@[__display__](at:__id__)"
          trigger="@"
          data={formattedLists || []}
          className="bg-emerald-200 dark:bg-emerald-700"
        />
        <Mention
          markup="@[__display__](hash:__id__)"
          trigger="#"
          data={formattedLabels || []}
          className="bg-sky-200 dark:bg-sky-700"
        />
      </ReactMentionInput>
    </>
  )
}

export default MentionsInput
