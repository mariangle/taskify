"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "./calendar"
import { TaskResponse } from "@/types"

interface CalendarPanelProps {
  tasks: TaskResponse[] | []
}

export default function CalendarPanel({
  tasks,
}: CalendarPanelProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <div className="block gap-4">
        <Card>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            tasks={tasks}
          />
        </Card>  
        <Card className="w-full">
          tets
        </Card>      
      </div>

    )
  }