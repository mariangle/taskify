import * as React from 'react'

import LabelItem from '@/components/shared/label/label-item'
import { useSignal } from '@/hooks/use-signal'
import { LabelResponse } from '@/types'
import LabelService from '@/services/label-service'

export default function LabelTab() {
  const [labels, setLabels] = React.useState<LabelResponse[]>([])
  const { signal } = useSignal()

  React.useEffect(() => {
    const subscribe = async () => {
      try {
        const labels = await LabelService.getLabels()
        setLabels(labels)
      } catch (err) {
        console.error('Error fetching labels:', err)
      }
    }

    subscribe()
  }, [signal])

  return (
    <div>
      <ul className="space-y-2">
        {labels.map((label) => (
          <LabelItem key={label.id} label={label} />
        ))}
        <LabelItem />
      </ul>
    </div>
  )
}
