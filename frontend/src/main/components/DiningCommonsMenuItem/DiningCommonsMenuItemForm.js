import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function DiningCommonsMenuItemForm({ initialMenuItem, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialMenuItem || {} }
    );
    // Stryker enable all

    const navigate = useNavigate();

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialMenuItem && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="DiningCommonsMenuItemForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialMenuItem.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="diningCommonsCode">Dining Commons Code</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsMenuItemForm-diningcommonscode"
                    id="diningCommonsCode"
                    type="text"
                    isInvalid={Boolean(errors.diningCommonsCode)}
                    {...register("diningCommonsCode", {
                        required: "Dinning Commons Code is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.diningCommonsCode?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsMenuItemForm-name"
                    id="name"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("name", {
                        required: "Name is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="station">Station</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsMenuItemForm-station"
                    id="station"
                    type="text"
                    isInvalid={Boolean(errors.station)}
                    {...register("station", {
                        required: "Station is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.station?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Button
                type="submit"
                data-testid="DiningCommonsMenuItemForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="DiningCommonsMenuItemForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default DiningCommonsMenuItemForm;
