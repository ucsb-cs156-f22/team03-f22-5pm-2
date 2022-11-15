import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ReviewForm({ initialItem, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialItem || {} }
    );
    // Stryker enable all

    const navigate = useNavigate();

    const minStars = 1;
    const maxStars = 5;

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialItem && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="ReviewForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialItem.id}
                        disabled
                    />
                </Form.Group>
            )}


            {!initialItem && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="itemId">Item ID</Form.Label>
                    <Form.Control
                        data-testid="ReviewForm-itemId"
                        id="itemId"
                        type="text"
                        isInvalid={Boolean(errors.itemId)}
                        {...register("itemId", {
                            required: "Item ID is required."
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.itemId?.message}
                    </Form.Control.Feedback>
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="comments">Comments</Form.Label>
                <Form.Control
                    data-testid="ReviewForm-comments"
                    id="comments"
                    type="text"
                    isInvalid={Boolean(errors.comments)}
                    {...register("comments", {
                        required: "Comments is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.comments?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateReviewed">Date Reviewed</Form.Label>
                <Form.Check
                    data-testid="ReviewForm-dateReviewed"
                    type="text"
                    id="dateReviewed"
                    isInvalid={Boolean(errors.dateReviewed)}
                    {...register("dateReviewed", {
                        required: "Date Reviewed is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateReviewed?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="reviewerEmail">Reviewer Email</Form.Label>
                <Form.Check
                    data-testid="ReviewForm-reviewerEmail"
                    type="text"
                    id="reviewerEmail"
                    isInvalid={Boolean(errors.reviewerEmail)}
                    {...register("reviewerEmail", {
                        required: "Reviewer Email is required"
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.reviewerEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="stars">Stars</Form.Label>
                <Form.Control
                    data-testid="ReviewForm-stars"
                    id="stars"
                    type="number"
                    isInvalid={Boolean(errors.stars)}
                    {...register("stars", { required: true, min: minStars, max: maxStars })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.stars && 'stars is required. '}
                    {errors.stars &&
                        (errors.stars.type === 'min' || errors.stars.type === 'max') && `stars should be between ${minStars} and ${maxStars}`}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="ReviewForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="ReviewForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default ReviewForm;
