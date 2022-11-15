import React from 'react';

import ReviewForm from "main/components/Review/ReviewForm"
import { reviewFixtures } from 'fixtures/reviewFixtures';

export default {
    title: 'components/Review/ReviewForm',
    component: ReviewForm
};


const Template = (args) => {
    return (
        <ReviewForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    review: reviewFixtures.oneItem,
    submitText: "",
    submitAction: () => { }
};
