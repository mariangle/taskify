import Dictaphone from "@/components/dictaphone"
import UseHydration from "@/components/use-hydration"

const SpeechPanel = () => {
  return (
    <UseHydration>
        <Dictaphone />
    </UseHydration>
  )
}

export default SpeechPanel