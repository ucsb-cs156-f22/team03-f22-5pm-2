import React from 'react';

import ArticlesTable from 'main/components/Articles/ArticlesTable';
import { articlesFixtures } from 'fixtures/ArticlesFixtures';

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
    article: []
};

export const ThreeArticles = Template.bind({});

ThreeArticles.args = {
    article: articlesFixtures.threeArticles
};