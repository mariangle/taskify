"use client"

import { 
    Breadcrumbs as UIBreadcrumbs, 
    BreadcrumbItem
} from "@nextui-org/react";

import { useSelectedLayoutSegments } from 'next/navigation'

const Breadcrumbs = () => {
    const segments = useSelectedLayoutSegments()

  return (
    <UIBreadcrumbs className="mb-4">
        {segments?.map((segment, index) => (
          <BreadcrumbItem key={index}>{segment}</BreadcrumbItem>
        ))}
    </UIBreadcrumbs>
  )
}

export default Breadcrumbs