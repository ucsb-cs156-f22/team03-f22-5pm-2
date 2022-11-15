import React from 'react';

import ArticlesTable from "main/components/Articles/ArticlesTable";
import { ArticlesFixtures } from 'fixtures/ArticlesFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Articles/ArticlesTable',
    component: ArticlesTable
};

const Template = (args) => {
    return (
        <ArticlesTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    Articles: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    Articles: ArticlesFixtures.threeMenuItems
};

export const ThreeDatesAsAdmin = Template.bind({});

ThreeDatesAsAdmin.args = {
    Articles: ArticlesFixtures.oneArticle,
    currentUser: currentUserFixtures.adminUser
};