import LabelService from "@/services/label-service"
import LabelModal from "@/components/modals/label-modal";

const LabelsPage = async () => {
    const labels = await LabelService.getLabels();
  return (
    <div>
        {labels.map((label) => (
            <div className="flex items-center gap-x-2" key={label.id}>
                <div className="h-2 w-2 rounded-full border" style={{ backgroundColor: label.color }} />
              {label.name}
              <LabelModal label={label}/>
          </div>
        ))}
    </div>
  )
    }

export default LabelsPage