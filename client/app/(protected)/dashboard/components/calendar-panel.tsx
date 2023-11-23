"use client"
import * as React from "react"

import PanelHeader from "./panel-header"
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
      <div className="card">
        <PanelHeader title="📅 Calendar"/>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          tasks={tasks}
        />
      </div>
    )
  }