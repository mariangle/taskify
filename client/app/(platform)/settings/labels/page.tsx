import LabelService from "@/services/label-service"
import LabelForm from "../../components/label-form";

const LabelsPage = async () => {
    const labels = await LabelService.getLabels();
  return (
    <div>
        <LabelForm label={null}/>
        {labels.map((label) => (
          <LabelForm label={label} key={label.id}/>
        ))}
    </div>
  )
}

export default LabelsPage