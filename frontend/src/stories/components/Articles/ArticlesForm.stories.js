import React from 'react';

import Articles from "main/components/Articles/ArticlesForm"
import { ArticlesFixtures } from 'fixtures/ArticlesFixtures';

export default {
    title: 'components/Articles/ArticlesForm',
    component: ArticlesForm
};


const Template = (args) => {
    return (
        <ArticlesForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log('Submit was clicked'); }
};

export const Show = Template.bind({});

Show.args = {
    initialMenuItem: ArticlesFixtures.oneArticle,
    submitText: "",
    submitAction: () => { }
};