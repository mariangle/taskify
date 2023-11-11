"use client"

import { 
    Breadcrumbs, 
    BreadcrumbItem
} from "@nextui-org/react";

import { useSelectedLayoutSegments } from 'next/navigation'

const BreadcrumbsLinks = () => {
    const segments = useSelectedLayoutSegments()

  return (
    <Breadcrumbs className="mb-4">
        {segments?.map((segment, index) => (
          <BreadcrumbItem key={index}>{segment}</BreadcrumbItem>
        ))}
    </Breadcrumbs>
  )
}

export default BreadcrumbsLinks