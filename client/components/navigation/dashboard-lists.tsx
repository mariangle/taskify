import ListService from "@/helpers/services/list-service";

const Lists = async () => {
  const tasks = await ListService.getLists();

  return (
    <div>lists</div>
  )
}

export default Lists