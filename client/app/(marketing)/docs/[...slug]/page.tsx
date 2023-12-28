import Content from '../_content/test.mdx'
import TableOfContents from '../_components/table-of-contents'
import Breadcrumbs from '../_components/breadcrumbs'

export default function Page() {
  return (
    <div className="flex gap-4 w-full">
      <div className="py-2 px-2 md:px-4 w-full space-y-4">
        <Breadcrumbs />
        <article className="prose dark:prose-invert">
          <Content />
        </article>
      </div>
      <TableOfContents />
    </div>
  )
}
