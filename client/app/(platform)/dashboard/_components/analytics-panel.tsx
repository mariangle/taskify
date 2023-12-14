import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import PieChart from "./pie-chart"
import LineChart from "./line-chart"
import { TaskResponse } from "@/types"

export default function AnalyticsPanel({ tasks} : { tasks: TaskResponse[] | []}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📈 Analytics</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <div className="flex-center">
        <PieChart />
      </div>
    </Card>
  )
}