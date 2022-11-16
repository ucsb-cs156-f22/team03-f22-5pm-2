import React from 'react';

import RecommendationTable from 'main/components/Recommendation/RecommendationTable';
import { recommendationFixtures } from 'fixtures/recommendationFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Recommendation/RecommendationTable',
    component: RecommendationTable
};

const Template = (args) => {
    return (
        <RecommendationTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    review: []
};

export const ThreeItems = Template.bind({});

ThreeItems.args = {
    recommendation: recommendationFixtures.threeRecommendations
};

export const ThreeItemsAsAdmin = Template.bind({});

ThreeItemsAsAdmin.args = {
    recommendation: recommendationFixtures.threeRecommendations,
    currentUser: currentUserFixtures.adminUser
};