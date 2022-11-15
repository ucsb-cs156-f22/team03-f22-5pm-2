import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ArticlesForm({ initialArticle, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialArticle || {} }
    );
    // Stryker enable all

    const navigate = useNavigate();

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialArticle && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="ArticlesForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialArticle.id}
                        disabled
                    />
                </Form.Group>
            )}


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-title"
                    id="title"
                    type="text"
                    isInvalid={Boolean(errors.title)}
                    {...register("title", {
                        required: "Title is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="url">Url</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-url"
                    id="url"
                    type="text"
                    isInvalid={Boolean(errors.url)}
                    {...register("url", {
                        required: "Url is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.url?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-explanation"
                    id="explanation"
                    type="text"
                    isInvalid={Boolean(errors.explanation)}
                    {...register("explanation", {
                        required: "Explanation is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-email"
                    id="email"
                    type="text"
                    isInvalid={Boolean(errors.email)}
                    {...register("email", {
                        required: "Articles Code is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateAdded">dateAdded</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-dateAdded"
                    id="dateAdded"
                    type="text"
                    isInvalid={Boolean(errors.dateAdded)}
                    {...register("dateAdded", {
                        required: "Articles Code is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateAdded?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Button
                type="submit"
                data-testid="ArticlesForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="ArticlesForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default ArticlesForm;