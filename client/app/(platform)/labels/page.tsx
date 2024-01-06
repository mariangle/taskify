import { PageList, PageHeading, LabelList } from '@/components/ui/page';
import { getLabels } from '@/actions/get-labels';

export default async function Labels() {
  const labels = await getLabels();
  return (
    <PageList>
      <PageHeading>Labels</PageHeading>
      <LabelList labels={labels} />
    </PageList>
  );
}
