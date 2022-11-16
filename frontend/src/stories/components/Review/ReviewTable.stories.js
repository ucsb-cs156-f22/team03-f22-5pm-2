import React from 'react';

import ReviewTable from "main/components/Review/ReviewTable";
import { reviewFixtures } from 'fixtures/reviewFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Review/ReviewTable',
    component: ReviewTable
};

const Template = (args) => {
    return (
        <ReviewTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    review: []
};

export const ThreeItems = Template.bind({});

ThreeItems.args = {
    review: reviewFixtures.threeItems
};

export const ThreeItemsAsAdmin = Template.bind({});

ThreeItemsAsAdmin.args = {
    review: reviewFixtures.threeItems,
    currentUser: currentUserFixtures.adminUser
};

