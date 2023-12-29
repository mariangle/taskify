import { LabelService } from '@/services/label-service'

import { PageList, PageHeading, LabelList } from '@/components/ui/page'

export default async function Labels() {
  const labels = await LabelService.getLabels()
  return (
    <PageList>
      <PageHeading>Labels</PageHeading>
      <LabelList labels={labels} />
    </PageList>
  )
}
