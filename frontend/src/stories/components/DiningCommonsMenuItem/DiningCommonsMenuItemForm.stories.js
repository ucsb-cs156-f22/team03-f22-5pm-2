import React from 'react';

import DiningCommonsMenuItemForm from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemForm"
import { diningCommonsMenuItemFixtures } from 'fixtures/diningCommonsMenuItemFixtures';

export default {
    title: 'components/DiningCommons/DiningCommonsMenuItemForm',
    component: DiningCommonsMenuItemForm
};


const Template = (args) => {
    return (
        <DiningCommonsMenuItemForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log('Submit was clicked'); }
};

export const Show = Template.bind({});

Show.args = {
    initialMenuItem: diningCommonsMenuItemFixtures.oneDiningMenuItem,
    submitText: "",
    submitAction: () => { }
};
