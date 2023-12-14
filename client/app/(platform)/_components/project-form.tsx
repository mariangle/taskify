import { useProjectForm } from "@/hooks/use-project-form"
import { Form } from "@/components/ui/form"

import FormButton from "@/components/common/form-button";
import FormInput from "@/components/common/form-input";
import { ProjectResponse } from "@/types";

interface ProjectFormProps {
    project?: ProjectResponse,
    close: () => void,
}

export default function ProjectForm({
    project,
    close
}: ProjectFormProps ){
    const { isLoading, form, submit, deleteProject } = useProjectForm(project, close);

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
                <FormInput form={form} name="name" />
                <div className="flex-between">
                    <div>
                        { project && (
                            <FormButton
                                variant={'destructive'}
                                onClick={() => deleteProject(project.id)} 
                                disabled={isLoading}
                            >
                                Delete
                            </FormButton>
                        )}
                    </div>
                    <div className="flex-gap">
                        <FormButton 
                            type="button"
                            variant={'secondary'}
                            onClick={close}
                        >
                            Cancel
                        </FormButton>
                        <FormButton 
                            type="submit" 
                            variant={'default'}
                            onClick={form.handleSubmit(submit)}
                            disabled={isLoading}
                            >
                            { project ? 'Save Changes' : 'Create'}
                        </FormButton>
                    </div>
                </div>
            </form>
        </Form>
    )
}

