"use client"
import * as React from "react"
import { Icons } from "@/components/icons"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Chat() {
  const [open, setOpen] = React.useState(false)

  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
  ])
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Agent</p>
              <p className="text-sm text-muted-foreground">.taskify</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-[300px] overflow-y-scroll">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              if (inputLength === 0) return
              setMessages([
                ...messages,
                {
                  role: "user",
                  content: input,
                },
              ])
              setInput("")
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Icons.send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}