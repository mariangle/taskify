"use client"

import { IEventApiResponse as IEvent } from "@/types"
import { formatter } from "@/helpers/util"
import EventService from "@/helpers/api/task-service"
import { useRouter } from "next/navigation"
import {
  Card, 
  CardHeader, 
  CardFooter, 
  Divider, 
  Button
} from "@nextui-org/react";

import { HiTrash } from "react-icons/hi"

interface EventProps {
    event: IEvent,
}

const Event = ({
    event,
}: EventProps) => {
  const router = useRouter();

  const onDelete = async (eventId: string) => {
    try {
      await EventService.deleteEvent(eventId)
      router.refresh();
    } catch (err){
      if (err instanceof Error){
        alert(err.message)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <p className="text-md">{event.title}</p>
          <Button 
            onClick={() => onDelete(event.id)}
            isIconOnly
            radius="sm"
          >
            <HiTrash />
          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter>
        <p className="text-small text-default-500">{formatter(event.startDate)}</p>
      </CardFooter>
    </Card>
  )
}

export default Event